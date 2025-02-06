import { ponder } from "ponder:registry";
import { Gauge } from "ponder:schema";
import { createChainId, createEntityId } from "../utils/helpers";
import { SiloGaugeAbi } from "../../abis/SiloGaugeAbi";

ponder.on("GaugeFactory:GaugeLikeCreated", async ({ event, context }) => {
  const chainId = context.network.chainId;

  const market = await context.client.readContract({
    address: event.args.gaugeLike,
    abi: SiloGaugeAbi,
    functionName: "SHARE_TOKEN",
  });

  await context.db.insert(Gauge).values({
    id: createEntityId(event.args.gaugeLike, chainId),
    chainId,
    marketId: createEntityId(market, chainId),
  });
});

// id: t.text().primaryKey(),
// chainId: t.integer().notNull(),
// siloId: t.text().notNull(),
// marketId: t.text().notNull(),
// weight: t.bigint().notNull(),
// lastUpdated: t.bigint().notNull(),
