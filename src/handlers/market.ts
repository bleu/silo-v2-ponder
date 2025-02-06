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
  event: Event<"Market1:Deposit"> | Event<"Market1:DepositProtected">;
  context: Context;
}) {
  const { db } = context;
  const chainId = context.network.chainId;

  const depositId = createEventId(event.log, event.transaction, chainId);

  const marketId = createEntityId(event.log.address, chainId);
  const accountId = createEntityId(event.args.owner, chainId);

  const depositBalance =
    event.name === "DepositProtected"
      ? {
          psTokenBalance: event.args.shares,
        }
      : {
          sTokenBalance: event.args.shares,
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
      collateralSupply: market.collateralSupply + event.args.assets,
      totalSupply: market.totalSupply + event.args.assets,
      balance: market.balance + event.args.assets,
    })),
    createOrUpdateAccount(event.args.owner, context),
    insertOrUpdatePosition(context, {
      marketId,
      accountId,
      ...depositBalance,
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

  const withdrawBalance =
    event.name === "WithdrawProtected"
      ? {
          psTokenBalance: -event.args.shares,
        }
      : {
          sTokenBalance: -event.args.shares,
        };

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
    createOrUpdateAccount(event.args.owner, context),
    insertOrUpdatePosition(context, {
      marketId,
      accountId,
      ...withdrawBalance,
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
