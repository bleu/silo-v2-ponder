import { ponder } from "ponder:registry";
import { SiloGaugeAbi } from "../../abis/SiloGaugeAbi";
import { Market, RewardProgram } from "ponder:schema";
import {
  createEntityId,
  createProgramId,
  createTokenIfNotExists,
} from "../utils/helpers";

ponder.on("Gauge:IncentivesProgramCreated", async ({ event, context }) => {
  const [{ result: incentivesProgram }, { result: marketAddress }] =
    await context.client.multicall({
      contracts: [
        {
          address: event.log.address,
          abi: SiloGaugeAbi,
          functionName: "incentivesProgram",
          args: [event.args.name],
        },
        {
          address: event.log.address,
          abi: SiloGaugeAbi,
          functionName: "SHARE_TOKEN",
        },
      ],
    });

  if (!marketAddress || !incentivesProgram) {
    console.error("Failed to fetch market address or incentives program");
    return;
  }

  const chainId = context.network.chainId;

  const marketId = createEntityId(marketAddress, chainId);

  await Promise.all([
    context.db
      .insert(RewardProgram)
      .values({
        id: createProgramId(marketId, event.args.name),
        chainId,
        marketId,
        name: event.args.name,
        index: incentivesProgram.index,
        rewardTokenId: createEntityId(incentivesProgram.rewardToken, chainId),
        distributionEnd: BigInt(incentivesProgram.distributionEnd),
        createdAt: event.block.timestamp,
        updatedAt: event.block.timestamp,
        emissionPerSecond: incentivesProgram.emissionPerSecond,
      })
      .onConflictDoNothing(),
    createTokenIfNotExists(incentivesProgram.rewardToken, context),
  ]);
});

ponder.on("Gauge:IncentivesProgramUpdated", async ({ event, context }) => {
  const [{ result: incentivesProgram }, { result: marketAddress }] =
    await context.client.multicall({
      contracts: [
        {
          address: event.log.address,
          abi: SiloGaugeAbi,
          functionName: "incentivesProgram",
          args: [event.args.name],
        },
        {
          address: event.log.address,
          abi: SiloGaugeAbi,
          functionName: "SHARE_TOKEN",
        },
      ],
    });

  if (!marketAddress || !incentivesProgram) {
    console.error("Failed to fetch market address or incentives program");
    return;
  }

  const chainId = context.network.chainId;

  const marketId = createEntityId(marketAddress, chainId);

  const programId = createProgramId(marketId, event.args.name);

  await context.db.update(RewardProgram, { id: programId }).set({
    distributionEnd: BigInt(incentivesProgram.distributionEnd),
    updatedAt: event.block.timestamp,
    emissionPerSecond: incentivesProgram.emissionPerSecond,
  });
});
