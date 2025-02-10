import { ponder } from "ponder:registry";
import { Market, Token } from "ponder:schema";
import { SiloOracleAbi } from "../../abis/SiloOracleAbi";
import { eq } from "ponder";
import { parseUnits } from "viem";
import { createEntityId } from "../utils/helpers";

ponder.on("UpdateMarketPrice:block", async ({ event, context }) => {
  // Include marketId in the select
  const markets = await context.db.sql
    .select({
      id: Market.id,
      marketAddress: Market.address,
      solvencyOracle: Market.solvencyOracle,
      tokenAddress: Token.address,
      tokenDecimals: Token.decimals,
    })
    .from(Market)
    .leftJoin(Token, eq(Market.inputTokenId, Token.id));

  const multicallAddress = markets.map((market) => {
    const tokenUnit = parseUnits("1", market.tokenDecimals || 18);

    return {
      address: market.solvencyOracle,
      abi: SiloOracleAbi,
      functionName: "getQuote",
      args: [tokenUnit, market.tokenAddress],
    };
  });

  const pricesCalls = await context.client.multicall({
    contracts: multicallAddress,
  });

  await Promise.all(
    pricesCalls.map(async (priceCall, i) => {
      const market = markets[i];
      if (!market) return;

      const price = priceCall.result;

      return context.db.update(Market, { id: market.id }).set({
        inputTokenPrice: price,
      });
    })
  ).catch((error) => {
    console.error("Error updating market prices:", error);
  });
});
