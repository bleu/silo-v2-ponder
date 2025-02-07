// src/handlers/market.ts
import { ponder, Event, Context } from "ponder:registry";
import { Borrow, Deposit, Market, Repay, Withdraw } from "ponder:schema";
import {
  createEntityId,
  createEventId,
  createOrUpdateAccount,
  insertOrUpdatePosition,
} from "../utils/helpers";

async function marketDepositHandler({
  context,
  event,
}: {
  event: Event<"Market1:Deposit" | "Market1:DepositProtected">;
  context: Context;
}) {
  const { db } = context;
  const chainId = context.network.chainId;

  const depositId = createEventId(event.log, event.transaction, chainId);

  const marketId = createEntityId(event.log.address, chainId);
  const accountId = createEntityId(event.args.owner, chainId);

  const userDepositBalance =
    event.name === "DepositProtected"
      ? {
          psTokenBalance: event.args.shares,
        }
      : {
          sTokenBalance: event.args.shares,
        };

  const marketDepositBalances =
    event.name === "DepositProtected"
      ? {
          protectedShares: event.args.shares,
          collateralShares: 0n,
          protectedAssets: event.args.assets,
          collateralAssets: 0n,
        }
      : {
          protectedShares: 0n,
          collateralShares: event.args.shares,
          protectedAssets: 0n,
          collateralAssets: event.args.assets,
        };

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
      totalAssets: market.totalAssets + event.args.assets,
      protectedAssets:
        market.protectedAssets + marketDepositBalances.protectedAssets,
      collateralAssets:
        market.collateralAssets + marketDepositBalances.collateralAssets,
      protectedShares:
        market.protectedShares + marketDepositBalances.protectedShares,
      collateralShares:
        market.collateralShares + marketDepositBalances.collateralShares,
      totalShares: market.totalShares + event.args.shares,
    })),
    createOrUpdateAccount(event.args.owner, context),
    insertOrUpdatePosition(context, {
      marketId,
      accountId,
      ...userDepositBalance,
    }),
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
    createOrUpdateAccount(event.args.owner, context),
    insertOrUpdatePosition(context, {
      marketId,
      accountId,
      dTokenBalance: event.args.shares,
    }),
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
    createOrUpdateAccount(event.args.owner, context),
    insertOrUpdatePosition(context, {
      marketId,
      accountId,
      dTokenBalance: -event.args.shares,
    }),
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

  const userWithdrawBalance =
    event.name === "WithdrawProtected"
      ? {
          psTokenBalance: -event.args.shares,
        }
      : {
          sTokenBalance: -event.args.shares,
        };

  const marketWithdrawBalances =
    event.name === "WithdrawProtected"
      ? {
          protectedShares: event.args.shares,
          collateralShares: 0n,
          protectedAssets: event.args.assets,
          collateralAssets: 0n,
        }
      : {
          protectedShares: 0n,
          collateralShares: event.args.shares,
          protectedAssets: 0n,
          collateralAssets: event.args.assets,
        };

  await Promise.all([
    db.insert(Withdraw).values({
      id: withdrawId,
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
      isProtected: event.name === "WithdrawProtected",
    }),
    db.update(Market, { id: marketId }).set((market) => ({
      totalAssets: market.totalAssets - event.args.assets,
      protectedAssets:
        market.protectedAssets - marketWithdrawBalances.protectedAssets,
      collateralAssets:
        market.collateralAssets - marketWithdrawBalances.collateralAssets,
      protectedShares:
        market.protectedShares - marketWithdrawBalances.protectedShares,
      collateralShares:
        market.collateralShares - marketWithdrawBalances.collateralShares,
      totalShares: market.totalShares - event.args.shares,
    })),
    createOrUpdateAccount(event.args.owner, context),
    insertOrUpdatePosition(context, {
      marketId,
      accountId,
      ...userWithdrawBalance,
    }),
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
