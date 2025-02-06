// src/handlers/market.ts
import { ponder, Event, Context } from "ponder:registry";
import {
  Account,
  Borrow,
  Deposit,
  Market,
  Repay,
  Withdraw,
} from "ponder:schema";
import { createEntityId, createEventId } from "../utils/helpers";

async function marketDepositHandler({
  context,
  event,
}: {
  event: Event<"Market1:Deposit"> | Event<"Market1:DepositProtected">;
  context: Context;
}) {
  const { db } = context;
  const chainId = context.network.chainId;

  const depositId = createEventId(event.log, event.transaction, chainId);

  const marketId = createEntityId(event.log.address, chainId);
  const accountId = createEntityId(event.args.owner, chainId);

  await Promise.all([
    db.insert(Deposit).values({
      id: depositId,
      chainId,
      hash: event.transaction.hash,
      nonce: BigInt(event.transaction.nonce),
      logIndex: event.log.logIndex,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      accountId,
      sender: event.args.sender,
      marketId,
      amount: event.args.assets,
      amountUSD: "0", // TBD
      shares: event.args.shares,
      isProtected: event.name === "DepositProtected",
    }),
    db.update(Market, { id: marketId }).set((market) => ({
      collateralSupply: market.collateralSupply + event.args.assets,
      totalSupply: market.totalSupply + event.args.assets,
      balance: market.balance + event.args.assets,
    })),
    db
      .insert(Account)
      .values({
        id: accountId,
        chainId,
        depositCount: 1,
      })
      .onConflictDoUpdate(({ depositCount }) => ({
        depositCount: depositCount + 1,
      })),
  ]);
}

async function marketBorrowHandler({
  context,
  event,
}: {
  event: Event<"Market1:Borrow">;
  context: Context;
}) {
  const { db } = context;
  const chainId = context.network.chainId;
  const borrowId = createEventId(event.log, event.transaction, chainId);

  const marketId = createEntityId(event.log.address, chainId);
  const accountId = createEntityId(event.args.owner, chainId);

  await Promise.all([
    db.update(Market, { id: marketId }).set((market) => ({
      borrowed: market.borrowed + event.args.assets,
      balance: market.balance - event.args.assets,
    })),
    db.insert(Borrow).values({
      id: borrowId,
      chainId,
      hash: event.transaction.hash,
      nonce: BigInt(event.transaction.nonce),
      logIndex: event.log.logIndex,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      accountId,
      sender: event.args.sender,
      marketId,
      amount: event.args.assets,
      amountUSD: "0", // Placeholder for amountUSD
      shares: event.args.shares,
    }),
    db
      .insert(Account)
      .values({
        id: accountId,
        chainId,
        borrowCount: 1,
      })
      .onConflictDoUpdate(({ borrowCount }) => ({
        borrowCount: borrowCount + 1,
      })),
  ]);
}

async function marketRepayHandler({
  context,
  event,
}: {
  event: Event<"Market1:Repay">;
  context: Context;
}) {
  const { db } = context;
  const chainId = context.network.chainId;
  const repayId = createEventId(event.log, event.transaction, chainId);

  const marketId = createEntityId(event.log.address, chainId);
  const accountId = createEntityId(event.args.owner, chainId);

  await Promise.all([
    db.update(Market, { id: marketId }).set((market) => ({
      borrowed: market.borrowed - event.args.assets,
      balance: market.balance + event.args.assets,
    })),
    db.insert(Repay).values({
      id: repayId,
      chainId,
      hash: event.transaction.hash,
      nonce: BigInt(event.transaction.nonce),
      logIndex: event.log.logIndex,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      accountId,
      sender: event.args.sender,
      marketId,
      amount: event.args.assets,
      amountUSD: "0", // Placeholder for amountUSD
      shares: event.args.shares,
    }),
    db
      .insert(Account)
      .values({
        id: accountId,
        chainId,
        repayCount: 1,
      })
      .onConflictDoUpdate(({ repayCount }) => ({
        repayCount: repayCount + 1,
      })),
  ]);
}

async function marketWithdrawHandler({
  context,
  event,
}: {
  event: Event<"Market1:Withdraw" | "Market1:WithdrawProtected">;
  context: Context;
}) {
  const { db } = context;
  const chainId = context.network.chainId;
  const withdrawId = createEventId(event.log, event.transaction, chainId);

  const marketId = createEntityId(event.log.address, chainId);
  const accountId = createEntityId(event.args.receiver, chainId);

  await Promise.all([
    db.update(Market, { id: marketId }).set((market) => ({
      collateralSupply: market.collateralSupply - event.args.assets,
      totalSupply: market.totalSupply - event.args.assets,
      balance: market.balance - event.args.assets,
    })),
    db.insert(Withdraw).values({
      id: withdrawId,
      chainId,
      hash: event.transaction.hash,
      nonce: BigInt(event.transaction.nonce),
      logIndex: event.log.logIndex,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      accountId,
      marketId,
      amount: event.args.assets,
      amountUSD: "0", // Placeholder for amountUSD
      shares: event.args.shares,
      isProtected: event.name === "WithdrawProtected",
    }),
    db
      .insert(Account)
      .values({
        id: accountId,
        chainId,
        withdrawCount: 1,
      })
      .onConflictDoUpdate(({ withdrawCount }) => ({
        withdrawCount: withdrawCount + 1,
      })),
  ]);
}

ponder.on("Market1:Deposit", marketDepositHandler);
ponder.on("Market2:Deposit", marketDepositHandler);
ponder.on("Market1:DepositProtected", marketDepositHandler);
ponder.on("Market2:DepositProtected", marketDepositHandler);
ponder.on("Market1:Borrow", marketBorrowHandler);
ponder.on("Market2:Borrow", marketBorrowHandler);
ponder.on("Market1:Repay", marketRepayHandler);
ponder.on("Market2:Repay", marketRepayHandler);
ponder.on("Market1:Withdraw", marketWithdrawHandler);
ponder.on("Market2:Withdraw", marketWithdrawHandler);
ponder.on("Market1:WithdrawProtected", marketWithdrawHandler);
ponder.on("Market2:WithdrawProtected", marketWithdrawHandler);

// ponder.on("Market1:AccruedInterest", async ({ event, context }) => {
//   const { db } = context;
//   const chainId = context.network.chainId;

//   // Get market
//   const marketId = createEntityId(event.log.address, chainId);

//   // Get current indices from contract
//   const supplyIndex = await context.client.readContract({
//     address: marketId as `0x${string}`,
//     abi: [
//       {
//         name: "convertToAssets1",
//         type: "function",
//         stateMutability: "view",
//         inputs: [
//           { type: "uint256", name: "shares" },
//           { type: "uint8", name: "assetType" },
//         ],
//         outputs: [{ type: "uint256", name: "assets" }],
//       },
//     ] as const,
//     functionName: "convertToAssets1",
//     args: [BigInt("1000000000000000000000"), 1], // 1e21 shares, Collateral type
//   });

//   const borrowIndex = await context.client.readContract({
//     address: marketId as `0x${string}`,
//     abi: [
//       {
//         name: "convertToAssets1",
//         type: "function",
//         stateMutability: "view",
//         inputs: [
//           { type: "uint256", name: "shares" },
//           { type: "uint8", name: "assetType" },
//         ],
//         outputs: [{ type: "uint256", name: "assets" }],
//       },
//     ] as const,
//     functionName: "convertToAssets1",
//     args: [BigInt("1000000000000000000"), 2], // 1e18 shares, Debt type
//   });

//   // Update market with new interest rates
//   await db.update(Market, { id: marketId }).set({
//     supplyIndex: (
//       (supplyIndex || BigInt("10000000000000000")) /
//       BigInt("1000000000000000000000")
//     ).toString(), // Default to 0.01
//     borrowIndex: (
//       (borrowIndex || BigInt("1000000000000000000")) /
//       BigInt("1000000000000000000")
//     ).toString(), // Default to 1
//   });

//   // Get all interest rates for this market
//   const rates = await db.find(InterestRate, { marketId });

//   if (rates) {
//     for (const rate of rates) {
//       // Calculate utilization
//       const utilization =
//         market.collateralSupply > 0n
//           ? (
//               (market.borrowed * BigInt("1000000000000000000")) /
//               market.collateralSupply
//             ).toString()
//           : "0";

//       // Update interest rate
//       await db.update(InterestRate, { id: rate.id }).set({
//         utilization,
//       });
//     }
//   }
// });
