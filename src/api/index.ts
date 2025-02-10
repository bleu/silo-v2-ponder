import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { and, eq, graphql, gt } from "ponder";
import { createEntityId } from "../utils/helpers";
import { getCoingeckoTokenPrice } from "../utils/coigecko";
import { constants } from "../utils/constants";
import { MathSol } from "../utils/math";
import { formatEther, formatUnits, parseEther } from "viem";
import { serializeObjWithBigInt } from "../utils/serialiaze";

const app = new Hono();

app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

app.get("/chain/:chainId/market/:marketAddress/reward_apy", async (c) => {
  const address = c.req.param("marketAddress").toLowerCase();

  const chainId = c.req.param("chainId");

  const marketId = createEntityId(address, chainId);

  const currentTimestamp = BigInt((Date.now() / 1000).toFixed());

  const [rewardsData, marketsResult] = await Promise.all([
    db
      .select()
      .from(schema.RewardProgram)
      .innerJoin(
        schema.Token,
        eq(schema.Token.id, schema.RewardProgram.rewardTokenId)
      )
      .where(
        and(
          eq(schema.RewardProgram.marketId, marketId),
          gt(schema.RewardProgram.distributionEnd, currentTimestamp)
        )
      ),
    db
      .select({
        marketAssetAddress: schema.Token.address,
        marketAssetDecimals: schema.Token.decimals,
        marketAssetSymbol: schema.Token.symbol,
        collateralAssets: schema.Market.collateralAssets,
      })
      .from(schema.Market)
      .innerJoin(schema.Token, eq(schema.Token.id, schema.Market.inputTokenId))
      .where(eq(schema.Market.id, marketId))
      .limit(1),
  ]);

  const market = marketsResult[0];

  if (!market) {
    return c.json({
      error: "Market not found",
    });
  }
  if (!rewardsData.length) {
    return c.json({
      error: "No rewards found for this market",
    });
  }

  const [rewardTokenPrices, assetPrice] = await Promise.all([
    Promise.all(
      rewardsData.map(({ Token: token }) =>
        getCoingeckoTokenPrice(token.address, chainId)
      )
    ),
    getCoingeckoTokenPrice(market.marketAssetAddress, chainId),
  ]);

  const emissionsPerYear = rewardsData.map(({ RewardProgram: program }) =>
    MathSol.mulDownFixed(
      program.emissionPerSecond,
      parseEther(constants.YEAR_IN_SECONDS)
    )
  );

  const usdRewardsPerYear = emissionsPerYear.map((emission, i) =>
    parseEther(
      formatUnits(
        MathSol.mulDownFixed(
          emission,
          parseEther(rewardTokenPrices[i]?.toString() || "0")
        ),
        rewardsData[i]?.Token.decimals || 18
      )
    )
  );

  const totalUsdRewardsPerYear = usdRewardsPerYear.reduce(
    (acc, reward) => acc + reward,
    0n
  );

  const totalMarketValueUsd = parseEther(
    formatUnits(
      MathSol.mulDownFixed(
        parseEther(assetPrice.toString()),
        market.collateralAssets
      ),
      market.marketAssetDecimals
    )
  );

  return c.json(
    serializeObjWithBigInt({
      programs: rewardsData.map(({ RewardProgram: program }, index) => ({
        ...program,
        rewardEmissionsPerYear: emissionsPerYear[index],
        rewardTokenPrice: rewardTokenPrices[index]?.toString(),
        usdRewardsPerYear: formatEther(usdRewardsPerYear[index] || 0n),
      })),
      marketData: {
        ...market,
        assetPrice,
      },
      totalUsdRewardsPerYear: formatEther(totalUsdRewardsPerYear),
      rewardAPY: formatEther(
        MathSol.divDownFixed(totalUsdRewardsPerYear, totalMarketValueUsd)
      ),
    })
  );
});

export default app;
