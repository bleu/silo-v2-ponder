import { ponder } from "ponder:registry";
import { SiloGaugeAbi } from "../../abis/SiloGaugeAbi";
import { Program } from "ponder:schema";
import {
  createEntityId,
  createProgramId,
  getOrCreateToken,
} from "../utils/helpers";

ponder.on("Gauge:IncentivesProgramCreated", async ({ event, context }) => {
  const incentivesProgram = await context.client.readContract({
    address: event.log.address,
    abi: SiloGaugeAbi,
    functionName: "incentivesProgram",
    args: [event.args.name],
  });

  const chainId = context.network.chainId;

  const gaugeId = createEntityId(event.log.address, chainId);

  await Promise.all([
    context.db.insert(Program).values({
      id: createProgramId(gaugeId, event.args.name),
      chainId,
      gaugeId,
      name: event.args.name,
      index: incentivesProgram.index,
      rewardTokenId: createEntityId(incentivesProgram.rewardToken, chainId),
      distributionEnd: BigInt(incentivesProgram.distributionEnd),
      createdAt: event.block.timestamp,
      updatedAt: event.block.timestamp,
      emissionPerSecond: incentivesProgram.emissionPerSecond,
    }),
    getOrCreateToken(incentivesProgram.rewardToken, context),
  ]);
});

ponder.on("Gauge:IncentivesProgramUpdated", async ({ event, context }) => {
  const id = await context.client.readContract({
    address: event.log.address,
    abi: SiloGaugeAbi,
    functionName: "getProgramId",
    args: [event.args.name],
  });

  const incentivesProgram = await context.client.readContract({
    address: event.log.address,
    abi: SiloGaugeAbi,
    functionName: "incentivesProgram",
    args: [id],
  });

  const chainId = context.network.chainId;

  const gaugeId = createEntityId(event.log.address, chainId);

  const programId = createProgramId(gaugeId, event.args.name);

  await context.db.update(Program, { id: programId }).set({
    distributionEnd: BigInt(incentivesProgram.distributionEnd),
    updatedAt: event.block.timestamp,
    emissionPerSecond: incentivesProgram.emissionPerSecond,
  });
});
