// src/handlers/market.ts
import { ponder } from "ponder:registry";
import {
  Borrow,
  Deposit,
  InterestRate,
  LendingProtocol,
  Market,
  Repay,
  Token,
  Withdraw,
} from "ponder:schema";
import {
  calculateUsdValue,
  checkExistingEntity,
  createEntityId,
  createEventId,
  getOrCreateAccount,
} from "../utils/helpers";

ponder.on("Silo:Deposit", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  const depositId = createEventId(event.log, event.transaction, chainId);
  if (await checkExistingEntity(db, "Deposit", depositId, chainId)) return;

  const account = await getOrCreateAccount(event.args.owner, context);
  const marketId = createEntityId(event.log.address, chainId);
  const market = await db.find(Market, { id: marketId });
  if (!market) return;

  // Look up the token record (assume token record has a property 'price' even if not in the TS type)
  const token = await db.find(Token, { id: market.inputTokenId });
  if (!token) return;
  const price = Number((token as any).price || "0");
  const amountUSD = calculateUsdValue(event.args.assets, token.decimals, price);

  await db.insert(Deposit).values({
    id: depositId,
    chainId,
    hash: event.transaction.hash,
    nonce: BigInt(event.transaction.nonce),
    logIndex: event.log.logIndex,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    accountId: account.id,
    senderId: event.transaction.from,
    marketId,
    amount: event.args.assets,
    amountUSD: amountUSD.toString(),
    shares: event.args.shares,
    isProtected: false,
  });

  await db.update(Market, { id: marketId }).set({
    collateralSupply: market.collateralSupply + event.args.assets,
    totalSupply: market.totalSupply + event.args.assets,
    balance: market.balance + event.args.assets,
  });
});

ponder.on("Silo:Borrow", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  const borrowId = createEventId(event.log, event.transaction, chainId);
  if (await checkExistingEntity(db, "Borrow", borrowId, chainId)) return;

  const account = await getOrCreateAccount(event.args.owner, context);
  const marketId = createEntityId(event.log.address, chainId);
  const market = await db.find(Market, { id: marketId });
  if (!market) return;

  await db.update(Market, { id: marketId }).set({
    borrowed: market.borrowed + event.args.assets,
    balance: market.balance - event.args.assets,
  });

  const token = await db.find(Token, { id: market.inputTokenId });
  if (!token) return;
  const price = Number((token as any).price || "0");
  const amountUSD = calculateUsdValue(event.args.assets, token.decimals, price);

  await db.insert(Borrow).values({
    id: borrowId,
    chainId,
    hash: event.transaction.hash,
    nonce: BigInt(event.transaction.nonce),
    logIndex: event.log.logIndex,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    accountId: account.id,
    senderId: event.transaction.from,
    marketId,
    amount: event.args.assets,
    amountUSD: amountUSD.toString(),
    shares: event.args.shares,
  });

  if (account.borrowCount === 1) {
    const protocol = await db.find(LendingProtocol, { id: "1" });
    if (protocol) {
      await db.update(LendingProtocol, { id: protocol.id }).set({
        cumulativeUniqueBorrowers: protocol.cumulativeUniqueBorrowers + 1,
      });
    }
  }
});

ponder.on("Silo:Repay", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  const repayId = createEventId(event.log, event.transaction, chainId);
  if (await checkExistingEntity(db, "Repay", repayId, chainId)) return;

  const account = await getOrCreateAccount(event.args.owner, context);
  const marketId = createEntityId(event.log.address, chainId);
  const market = await db.find(Market, { id: marketId });
  if (!market) return;

  await db.update(Market, { id: marketId }).set({
    borrowed: market.borrowed - event.args.assets,
    balance: market.balance + event.args.assets,
  });

  const token = await db.find(Token, { id: market.inputTokenId });
  if (!token) return;
  const price = Number((token as any).price || "0");
  const amountUSD = calculateUsdValue(event.args.assets, token.decimals, price);

  await db.insert(Repay).values({
    id: repayId,
    chainId,
    hash: event.transaction.hash,
    nonce: BigInt(event.transaction.nonce),
    logIndex: event.log.logIndex,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    accountId: account.id,
    senderId: event.transaction.from,
    marketId,
    amount: event.args.assets,
    amountUSD: amountUSD.toString(),
    shares: event.args.shares,
  });
});

ponder.on("Silo:Withdraw", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  const withdrawId = createEventId(event.log, event.transaction, chainId);
  if (await checkExistingEntity(db, "Withdraw", withdrawId, chainId)) return;

  const account = await getOrCreateAccount(event.args.receiver, context);
  const marketId = createEntityId(event.log.address, chainId);
  const market = await db.find(Market, { id: marketId });
  if (!market) return;

  await db.update(Market, { id: marketId }).set({
    collateralSupply: market.collateralSupply - event.args.assets,
    totalSupply: market.totalSupply - event.args.assets,
    balance: market.balance - event.args.assets,
  });

  const token = await db.find(Token, { id: market.inputTokenId });
  if (!token) return;
  const price = Number((token as any).price || "0");
  const amountUSD = calculateUsdValue(event.args.assets, token.decimals, price);

  await db.insert(Withdraw).values({
    id: withdrawId,
    chainId,
    hash: event.transaction.hash,
    nonce: BigInt(event.transaction.nonce),
    logIndex: event.log.logIndex,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    accountId: account.id,
    marketId,
    amount: event.args.assets,
    amountUSD: amountUSD.toString(),
    shares: event.args.shares,
    isProtected: false,
  });
});

ponder.on("Silo:AccruedInterest", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;

  // Get market
  const marketId = createEntityId(event.log.address, chainId);
  const market = await db.find(Market, { id: marketId });
  if (!market) return;

  // Get current indices from contract
  const supplyIndex = await context.client.readContract({
    address: market.id as `0x${string}`,
    abi: [
      {
        name: "convertToAssets1",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "uint256", name: "shares" },
          { type: "uint8", name: "assetType" },
        ],
        outputs: [{ type: "uint256", name: "assets" }],
      },
    ] as const,
    functionName: "convertToAssets1",
    args: [BigInt("1000000000000000000000"), 1], // 1e21 shares, Collateral type
  });

  const borrowIndex = await context.client.readContract({
    address: market.id as `0x${string}`,
    abi: [
      {
        name: "convertToAssets1",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "uint256", name: "shares" },
          { type: "uint8", name: "assetType" },
        ],
        outputs: [{ type: "uint256", name: "assets" }],
      },
    ] as const,
    functionName: "convertToAssets1",
    args: [BigInt("1000000000000000000"), 2], // 1e18 shares, Debt type
  });

  // Update market with new interest rates
  await db.update(Market, { id: marketId }).set({
    supplyIndex: (
      (supplyIndex || BigInt("10000000000000000")) /
      BigInt("1000000000000000000000")
    ).toString(), // Default to 0.01
    borrowIndex: (
      (borrowIndex || BigInt("1000000000000000000")) /
      BigInt("1000000000000000000")
    ).toString(), // Default to 1
  });

  // Get all interest rates for this market
  const rates = await db.find(InterestRate, { marketId });

  if (rates) {
    for (const rate of rates) {
      // Calculate utilization
      const utilization =
        market.collateralSupply > 0n
          ? (
              (market.borrowed * BigInt("1000000000000000000")) /
              market.collateralSupply
            ).toString()
          : "0";

      // Update interest rate
      await db.update(InterestRate, { id: rate.id }).set({
        utilization,
      });
    }
  }
});
