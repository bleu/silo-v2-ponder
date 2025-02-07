import { ponder } from "ponder:registry";
import { Market } from "ponder:schema";
import { createEntityId } from "../utils/helpers";
import { SiloGaugeAbi } from "../../abis/SiloGaugeAbi";

ponder.on("GaugeFactory:GaugeLikeCreated", async ({ event, context }) => {
  const chainId = context.network.chainId;

  const market = await context.client.readContract({
    address: event.args.gaugeLike,
    abi: SiloGaugeAbi,
    functionName: "SHARE_TOKEN",
  });

  const marketId = createEntityId(market, chainId);

  await context.db.update(Market, { id: marketId }).set({
    rewardGauge: event.args.gaugeLike,
  });
});
