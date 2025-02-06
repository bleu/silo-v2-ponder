// src/handlers/gaugeHookReceiver.ts
import { ponder } from "ponder:registry";
import {
  Liquidation,
  Market,
  Account,
  Gauge,
  LendingProtocol,
} from "ponder:schema";
import { createOrUpdateAccount, createEntityId } from "../utils/helpers";

// ponder.on("GaugeHookReceiver:LiquidationCall", async ({ event, context }) => {
//   const { db } = context;
//   const chainId = context.network.chainId;

//   // Cast event.args to our expected interface.
//   const args = event.args as unknown as LiquidationCallEventArgs;

//   // Now we can use args.market, args.borrower, etc.
//   const liquidationId = createEntityId(
//     `${event.log.address}-${event.transaction.hash}-${event.log.logIndex}`,
//     chainId
//   );

//   // Look up the market. (Assuming args.market is the market address.)
//   const market = await db.find(Market, { id: args.market.toLowerCase() });
//   if (!market) return;

//   // Get the borrower account.
//   const borrower = await createOrUpdateAccount(args.borrower, context);
//   // Get the liquidator account.
//   const liquidator = await createOrUpdateAccount(args.liquidator, context);

//   // Insert the liquidation record.
//   await db.insert(Liquidation).values({
//     id: liquidationId,
//     chainId,
//     hash: event.transaction.hash,
//     nonce: BigInt(event.transaction.nonce),
//     logIndex: event.log.logIndex,
//     blockNumber: event.block.number,
//     timestamp: event.block.timestamp,
//     accountId: borrower.id,
//     marketId: market.id,
//     amount: args.seizeAmount,
//     amountUSD: "0", // Price conversion to be implemented
//     profit: BigInt(0), // Provide a default value for the missing property
//     profitUSD: "0", // Price conversion to be implemented
//     liquidatorId: liquidator.id,
//     positionId: `${borrower.id}-${market.id}-BORROWER`,
//   });

//   // Update borrower and liquidator stats.
//   await db.update(Account, { id: borrower.id }).set({
//     liquidationCount: borrower.liquidationCount + 1,
//   });
//   await db.update(Account, { id: liquidator.id }).set({
//     liquidateCount: liquidator.liquidateCount + 1,
//   });
// });

ponder.on("GaugeHookReceiver:GaugeConfigured", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;

  const gaugeId = event.args.gauge.toLowerCase();

  const gaugeData = {
    id: gaugeId,
    chainId,
    siloId: event.args.shareToken.toLowerCase(),
    marketId: gaugeId, // In this example, we use the gauge address as the marketId. Adjust as needed.
    weight: BigInt(1),
    lastUpdated: event.block.timestamp,
  };

  const existing = await db.find(Gauge, { id: gaugeId });
  if (existing) {
    await db.update(Gauge, { id: gaugeId }).set({
      lastUpdated: event.block.timestamp,
    });
  } else {
    await db.insert(Gauge).values(gaugeData);
  }
});

ponder.on("GaugeHookReceiver:GaugeRemoved", async ({ event, context }) => {
  const { db } = context;
  const gaugeId = event.args.shareToken.toLowerCase();
  await db.delete(Gauge, { id: gaugeId });
});

ponder.on("GaugeHookReceiver:HookConfigured", async ({ event, context }) => {
  const { db } = context;
  const protocol = await db.find(LendingProtocol, { id: "1" });
  if (!protocol) return;
  await db.update(LendingProtocol, { id: protocol.id }).set({
    gaugeHookAddress: event.args.silo as `0x${string}`,
    lastUpdated: event.block.timestamp,
  });
});

ponder.on("GaugeHookReceiver:Initialized", async ({ event, context }) => {
  const { db } = context;
  const protocol = await db.find(LendingProtocol, { id: "1" });
  if (!protocol) return;
  await db.update(LendingProtocol, { id: protocol.id }).set({
    gaugeHookInitialized: true,
    gaugeHookInitializedAt: event.block.timestamp,
  });
});
