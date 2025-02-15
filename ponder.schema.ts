import { onchainTable, relations, index } from "ponder";
import { parseEther } from "viem";

/* =====================================================
   PROTOCOL LEVEL TABLES
   ===================================================== */

export const LendingProtocol = onchainTable(
  "LendingProtocol",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    name: t.text(),
    slug: t.text(),
    schemaVersion: t.text(),
    subgraphVersion: t.text(),
    methodologyVersion: t.text(),
    network: t.text(),
    type: t.text(),
    lendingType: t.text(),
    riskType: t.text(),
    totalPoolCount: t.integer().notNull().default(0),
    cumulativeUniqueUsers: t.integer(),
    cumulativeUniqueDeployers: t.integer(),
    cumulativeUniqueDepositors: t.integer(),
    cumulativeUniqueBorrowers: t.integer(),
    minDaoFee: t.bigint(),
    maxDaoFee: t.bigint(),
    daoFeeReceiver: t.text(),
    maxLiquidationFee: t.bigint(),
    maxFlashloanFee: t.bigint(),
    maxDeployerFee: t.bigint(),
    gaugeHookAddress: t.hex(),
    gaugeHookInitialized: t.boolean().notNull().default(false),
    gaugeHookInitializedAt: t.bigint(),
    lastUpdated: t.bigint(),
  }),
  (table) => ({
    slugIdx: index().on(table.slug),
    chainIdx: index().on(table.chainId),
  })
);

export const lendingProtocolRelations = relations(
  LendingProtocol,
  ({ many }) => ({
    silos: many(Silo),
  })
);

/* =====================================================
   SILO AND MARKET TABLES
   ===================================================== */

export const Silo = onchainTable(
  "Silo",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    name: t.text(),
    protocolId: t.text().notNull(),
    asset0Id: t.text().notNull(),
    asset1Id: t.text().notNull(),
    market0Id: t.text().notNull(),
    market1Id: t.text().notNull(),
    configAddress: t.hex().notNull(),
    siloId: t.bigint().notNull(),
    createdTimestamp: t.bigint().notNull(),
    deployer: t.hex().notNull(),
    implementation: t.hex().notNull(),
    interestLastUpdated: t.bigint().notNull(),
  }),
  (table) => ({
    protocolIdx: index().on(table.protocolId),
    deployerIdx: index().on(table.deployer),
    chainIdx: index().on(table.chainId),
  })
);

export const siloRelations = relations(Silo, ({ one, many }) => ({
  protocol: one(LendingProtocol, {
    fields: [Silo.protocolId],
    references: [LendingProtocol.id],
  }),
  markets: many(Market),
  market0: one(Market, {
    fields: [Silo.market0Id],
    references: [Market.id],
  }),
  market1: one(Market, {
    fields: [Silo.market1Id],
    references: [Market.id],
  }),
  asset0: one(Token, {
    fields: [Silo.asset0Id],
    references: [Token.id],
  }),
  asset1: one(Token, {
    fields: [Silo.asset1Id],
    references: [Token.id],
  }),
}));

export const Market = onchainTable(
  "Market",
  (t) => ({
    id: t.text().primaryKey(),
    address: t.hex().notNull(),
    protocolId: t.text().notNull(),
    siloId: t.text().notNull(),
    name: t.text(),
    inputTokenId: t.text().notNull(),
    otherMarketId: t.text().notNull(),
    sTokenId: t.text().notNull(),
    spTokenId: t.text().notNull(),
    dTokenId: t.text().notNull(),
    createdTimestamp: t.bigint().notNull(),
    createdBlockNumber: t.bigint().notNull(),
    collateralAssets: t.bigint().notNull().default(0n),
    protectedAssets: t.bigint().notNull().default(0n),
    totalAssets: t.bigint().notNull().default(0n),
    protectedShares: t.bigint().notNull().default(0n),
    collateralShares: t.bigint().notNull().default(0n),
    totalShares: t.bigint().notNull().default(0n),
    borrowed: t.bigint().notNull().default(0n),
    supplyIndex: t.bigint().notNull().default(parseEther("1")),
    borrowIndex: t.bigint().notNull().default(parseEther("1")),
    rewardGauge: t.text(),
    daoFee: t.bigint().notNull(),
    deployerFee: t.bigint().notNull(),
    solvencyOracle: t.hex().notNull(),
    maxLtvOracle: t.hex().notNull(),
    interestRateModel: t.hex().notNull(),
    maxLtv: t.bigint().notNull(),
    lt: t.bigint().notNull(),
    liquidationTargetLtv: t.bigint().notNull(),
    liquidationFee: t.bigint().notNull(),
    flashloanFee: t.bigint().notNull(),
    hookReceiver: t.hex().notNull(),
    callBeforeQuote: t.boolean().notNull(),
  }),
  (table) => ({
    siloIdx: index().on(table.siloId),
    protocolIdx: index().on(table.protocolId),
  })
);

export const marketRelations = relations(Market, ({ one, many }) => ({
  silo: one(Silo, {
    fields: [Market.siloId],
    references: [Silo.id],
  }),
  positions: many(Position),
  sToken: one(Token, {
    fields: [Market.sTokenId],
    references: [Token.id],
  }),
  spToken: one(Token, {
    fields: [Market.spTokenId],
    references: [Token.id],
  }),
  dToken: one(Token, {
    fields: [Market.dTokenId],
    references: [Token.id],
  }),
  inputToken: one(Token, {
    fields: [Market.inputTokenId],
    references: [Token.id],
  }),
  rewardPrograms: many(RewardProgram),
}));

/* =====================================================
   ACCOUNT AND POSITION TABLES
   ===================================================== */

export const Account = onchainTable(
  "Account",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    positionCount: t.integer(),
    openPositionCount: t.integer(),
    closedPositionCount: t.integer(),
    depositCount: t.integer(),
    withdrawCount: t.integer(),
    borrowCount: t.integer(),
    repayCount: t.integer(),
    liquidateCount: t.integer(),
    liquidationCount: t.integer(),
  }),
  (table) => ({
    chainIdx: index().on(table.chainId),
  })
);

export const accountRelations = relations(Account, ({ many }) => ({
  positions: many(Position),
  deposits: many(Deposit),
  withdraws: many(Withdraw),
  borrows: many(Borrow),
  repays: many(Repay),
}));

export const Position = onchainTable(
  "Position",
  (t) => ({
    id: t.text().primaryKey(),
    accountId: t.text().notNull(),
    marketId: t.text().notNull(),
    sTokenBalance: t.bigint().notNull().default(0n),
    spTokenBalance: t.bigint().notNull().default(0n),
    dTokenBalance: t.bigint().notNull().default(0n),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    marketIdx: index().on(table.marketId),
  })
);

export const positionRelations = relations(Position, ({ one }) => ({
  account: one(Account, {
    fields: [Position.accountId],
    references: [Account.id],
  }),
  market: one(Market, {
    fields: [Position.marketId],
    references: [Market.id],
  }),
}));

/* =====================================================
   TOKEN TABLES
   ===================================================== */

export const Token = onchainTable("Token", (t) => ({
  id: t.text().primaryKey(),
  chainId: t.integer().notNull(),
  address: t.hex().notNull(),
  name: t.text().notNull(),
  symbol: t.text().notNull(),
  decimals: t.integer().notNull(),
}));

/* =====================================================
   LIQUIDATION TABLE
   ===================================================== */

export const Liquidation = onchainTable(
  "Liquidation",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    hash: t.hex().notNull(),
    nonce: t.bigint().notNull(),
    logIndex: t.integer().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    accountId: t.text().notNull(),
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(),
    profit: t.bigint().notNull(), // NEW: raw profit value from liquidation
    profitUSD: t.numeric().notNull(),
    liquidatorId: t.text().notNull(),
    positionId: t.text().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    marketIdx: index().on(table.marketId),
    liquidatorIdx: index().on(table.liquidatorId),
    positionIdx: index().on(table.positionId),
    chainIdx: index().on(table.chainId),
  })
);

export const liquidationRelations = relations(Liquidation, ({ one }) => ({
  account: one(Account, {
    fields: [Liquidation.accountId],
    references: [Account.id],
  }),
  market: one(Market, {
    fields: [Liquidation.marketId],
    references: [Market.id],
  }),
  position: one(Position, {
    fields: [Liquidation.positionId],
    references: [Position.id],
  }),
}));

/* =====================================================
   TRANSACTION EVENT TABLES
   ===================================================== */

// Deposit Event Table – NEW fields: sender and amountUSD
export const Deposit = onchainTable(
  "Deposit",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    hash: t.hex().notNull(),
    nonce: t.bigint().notNull(),
    logIndex: t.integer().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    accountId: t.text().notNull(),
    sender: t.hex().notNull(), // NEW: account that initiated the deposit
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(), // NEW: deposit amount in USD
    shares: t.bigint().notNull(),
    isProtected: t.boolean().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    senderIdx: index().on(table.sender),
    marketIdx: index().on(table.marketId),
    chainIdx: index().on(table.chainId),
  })
);

export const depositRelations = relations(Deposit, ({ one }) => ({
  account: one(Account, {
    fields: [Deposit.accountId],
    references: [Account.id],
  }),
  market: one(Market, { fields: [Deposit.marketId], references: [Market.id] }),
}));

// Withdraw Event Table – NEW field: amountUSD
export const Withdraw = onchainTable(
  "Withdraw",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    hash: t.hex().notNull(),
    nonce: t.bigint().notNull(),
    logIndex: t.integer().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    accountId: t.text().notNull(),
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(), // NEW: withdrawal amount in USD
    shares: t.bigint().notNull(),
    isProtected: t.boolean().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    marketIdx: index().on(table.marketId),
    chainIdx: index().on(table.chainId),
  })
);

export const withdrawRelations = relations(Withdraw, ({ one }) => ({
  account: one(Account, {
    fields: [Withdraw.accountId],
    references: [Account.id],
  }),
  market: one(Market, { fields: [Withdraw.marketId], references: [Market.id] }),
}));

export const Borrow = onchainTable(
  "Borrow",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    hash: t.hex().notNull(),
    nonce: t.bigint().notNull(),
    logIndex: t.integer().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    accountId: t.text().notNull(),
    sender: t.hex().notNull(),
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(), // NEW: borrow amount in USD
    shares: t.bigint().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    senderIdx: index().on(table.sender),
    marketIdx: index().on(table.marketId),
    chainIdx: index().on(table.chainId),
  })
);

export const borrowRelations = relations(Borrow, ({ one }) => ({
  account: one(Account, {
    fields: [Borrow.accountId],
    references: [Account.id],
  }),
  market: one(Market, { fields: [Borrow.marketId], references: [Market.id] }),
}));

// Repay Event Table – NEW fields: sender and amountUSD
export const Repay = onchainTable(
  "Repay",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    hash: t.hex().notNull(),
    nonce: t.bigint().notNull(),
    logIndex: t.integer().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    accountId: t.text().notNull(),
    sender: t.hex().notNull(),
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(), // NEW: repay amount in USD
    shares: t.bigint().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    senderIdx: index().on(table.sender),
    marketIdx: index().on(table.marketId),
    chainIdx: index().on(table.chainId),
  })
);

export const repayRelations = relations(Repay, ({ one }) => ({
  account: one(Account, {
    fields: [Repay.accountId],
    references: [Account.id],
  }),
  market: one(Market, { fields: [Repay.marketId], references: [Market.id] }),
}));

/* =====================================================
   GAUGE TABLE
   ===================================================== */

export const RewardProgram = onchainTable(
  "RewardProgram",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    marketId: t.text().notNull(),
    name: t.text().notNull(),
    rewardTokenId: t.text().notNull(),
    distributionEnd: t.bigint().notNull(),
    createdAt: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
    emissionPerSecond: t.bigint().notNull(),
    index: t.bigint().notNull(),
  }),
  (table) => ({
    marketIdx: index().on(table.marketId),
    rewardTokenIdx: index().on(table.rewardTokenId),
  })
);

export const programRelations = relations(RewardProgram, ({ one }) => ({
  token: one(Token, {
    fields: [RewardProgram.rewardTokenId],
    references: [Token.id],
  }),
  market: one(Market, {
    fields: [RewardProgram.marketId],
    references: [Market.id],
  }),
}));
