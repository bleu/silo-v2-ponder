import { ponder } from "ponder:registry";
import { InterestRateModelConfig } from "ponder:schema";

ponder.on(
  "InterestRateModelV2Factory:NewInterestRateModelV2",
  async ({ event, context }) => {
    const irmId = (event.args.configHash as string).toLowerCase();

    const existingConfig = await context.db.find(InterestRateModelConfig, {
      id: irmId,
    });
    if (existingConfig) return;

    // Cast event.args.irm to string
    const irmValue = (event.args.irm as string).toLowerCase();

    await context.db.insert(InterestRateModelConfig).values({
      id: irmId,
      chainId: context.network.chainId,
      config: irmValue as `0x${string}`,
      modelVersion: 2,
      createdBlockNumber: event.block.number,
    });
  }
);
