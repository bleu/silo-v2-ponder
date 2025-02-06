import { onchainTable, relations, index, primaryKey, sql } from "ponder";

/* =====================================================
   PROTOCOL LEVEL TABLES
   ===================================================== */

export const LendingProtocol = onchainTable(
  "LendingProtocol",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    name: t.text().notNull(),
    slug: t.text().notNull(),
    schemaVersion: t.text().notNull(),
    subgraphVersion: t.text().notNull(),
    methodologyVersion: t.text().notNull(),
    network: t.text().notNull(),
    type: t.text().notNull(),
    lendingType: t.text().notNull(),
    riskType: t.text().notNull(),
    totalPoolCount: t.integer().notNull().default(0),
    cumulativeUniqueUsers: t.integer().notNull().default(0),
    cumulativeUniqueDeployers: t.integer().notNull().default(0),
    cumulativeUniqueDepositors: t.integer().notNull().default(0),
    cumulativeUniqueBorrowers: t.integer().notNull().default(0),
    minDaoFee: t.bigint().notNull(),
    maxDaoFee: t.bigint().notNull(),
    daoFeeReceiver: t.text().notNull(),
    maxLiquidationFee: t.bigint().notNull(),
    maxFlashloanFee: t.bigint().notNull(),
    maxDeployerFee: t.bigint().notNull(),
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
    name: t.text().notNull(),
    protocolId: t.text().notNull(),
    asset1Id: t.text().notNull(),
    asset2Id: t.text().notNull(),
    market1Id: t.text().notNull(),
    market2Id: t.text().notNull(),
    configAddress: t.hex().notNull(),
    siloId: t.bigint().notNull(),
    daoFee: t.bigint().notNull(),
    deployerFee: t.bigint().notNull(),
    createdTimestamp: t.bigint().notNull(),
    deployerId: t.hex().notNull(),
    implementation: t.hex().notNull(),
    interestLastUpdated: t.bigint().notNull(),
  }),
  (table) => ({
    protocolIdx: index().on(table.protocolId),
    deployerIdx: index().on(table.deployerId),
    chainIdx: index().on(table.chainId),
  })
);

export const siloRelations = relations(Silo, ({ one, many }) => ({
  protocol: one(LendingProtocol, {
    fields: [Silo.protocolId],
    references: [LendingProtocol.id],
  }),
  markets: many(Market),
}));

export const Market = onchainTable(
  "Market",
  (t) => ({
    id: t.text().primaryKey(),
    protocolId: t.text().notNull(),
    siloId: t.text().notNull(),
    name: t.text().notNull(),
    inputTokenId: t.text().notNull(),
    otherMarketId: t.text(),
    sTokenId: t.text().notNull(),
    spTokenId: t.text().notNull(),
    dTokenId: t.text().notNull(),
    createdTimestamp: t.bigint().notNull(),
    createdBlockNumber: t.bigint().notNull(),
    flashLoanFee: t.bigint().notNull(),
    liquidationFee: t.bigint().notNull(),
    liquidationTargetLtv: t.bigint().notNull(),
    solvencyOracleAddress: t.hex().notNull(),
    maxLtvOracleAddress: t.hex().notNull(),
    interestRateModel: t.hex().notNull(),
    maxLtv: t.bigint().notNull(),
    lt: t.bigint().notNull(),
    collateralSupply: t.bigint().notNull().default(0n),
    protectedSupply: t.bigint().notNull().default(0n),
    totalSupply: t.bigint().notNull().default(0n),
    balance: t.bigint().notNull().default(0n),
    borrowed: t.bigint().notNull().default(0n),
    supplyIndex: t.numeric().notNull(),
    borrowIndex: t.numeric().notNull(),
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
  interestRates: many(InterestRate),
}));

/* =====================================================
   INTEREST RATE TABLES
   ===================================================== */

export const InterestRateModelConfig = onchainTable(
  "InterestRateModelConfig",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    config: t.hex().notNull(),
    modelVersion: t.integer().notNull(),
    createdBlockNumber: t.bigint().notNull(),
  }),
  (table) => ({
    chainIdx: index().on(table.chainId),
  })
);

export const InterestRate = onchainTable(
  "InterestRate",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    rate: t.numeric().notNull().default("0"),
    side: t.text().notNull(),
    type: t.text().notNull(),
    siloId: t.text().notNull(),
    marketId: t.text().notNull(),
    tokenId: t.text().notNull(),
    uopt: t.bigint().notNull(),
    ucrit: t.bigint().notNull(),
    ulow: t.bigint().notNull(),
    ki: t.bigint().notNull(),
    kcrit: t.bigint().notNull(),
    klow: t.bigint().notNull(),
    klin: t.bigint().notNull(),
    beta: t.bigint().notNull(),
    ri: t.bigint().notNull(),
    Tcrit: t.bigint().notNull(),
    utilization: t.numeric().notNull().default("0"),
  }),
  (table) => ({
    marketIdx: index().on(table.marketId),
    siloIdx: index().on(table.siloId),
    chainIdx: index().on(table.chainId),
  })
);

export const interestRateRelations = relations(InterestRate, ({ one }) => ({
  market: one(Market, {
    fields: [InterestRate.marketId],
    references: [Market.id],
  }),
  silo: one(Silo, {
    fields: [InterestRate.siloId],
    references: [Silo.id],
  }),
}));

// NEW: Hourly timeseries table for interest rates
export const InterestRateHourly = onchainTable(
  "InterestRateHourly",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    hour: t.integer().notNull(), // hour bucket (e.g. hours since Unix epoch)
    timestamp: t.bigint().notNull(), // start-of-hour timestamp
    interestRateId: t.text().notNull(),
    ri: t.bigint(), // optional: initial integrator value
    Tcrit: t.bigint(), // optional: critical time threshold
    utilization: t.numeric(), // utilization as a numeric value
    rateLast: t.numeric().notNull(),
    rateHigh: t.numeric().notNull(),
    rateLow: t.numeric().notNull(),
    rateAvg: t.numeric().notNull(),
    rateSum: t.numeric().notNull(),
    rateCount: t.integer().notNull(),
  }),
  (table) => ({
    interestRateIdx: index().on(table.interestRateId),
    chainIdx: index().on(table.chainId),
  })
);

// NEW: Daily timeseries table for interest rates
export const InterestRateDaily = onchainTable(
  "InterestRateDaily",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    day: t.integer().notNull(), // day bucket (e.g. days since Unix epoch)
    timestamp: t.bigint().notNull(), // start-of-day timestamp
    interestRateId: t.text().notNull(),
    ri: t.bigint(),
    Tcrit: t.bigint(),
    utilization: t.numeric(),
    rateLast: t.numeric().notNull(),
    rateHigh: t.numeric().notNull(),
    rateLow: t.numeric().notNull(),
    rateAvg: t.numeric().notNull(),
    rateSum: t.numeric().notNull(),
    rateCount: t.integer().notNull(),
  }),
  (table) => ({
    interestRateIdx: index().on(table.interestRateId),
    chainIdx: index().on(table.chainId),
  })
);

/* =====================================================
   ACCOUNT AND POSITION TABLES
   ===================================================== */

export const Account = onchainTable(
  "Account",
  (t) => ({
    id: t.hex().primaryKey(),
    chainId: t.integer().notNull(),
    positionCount: t.integer().notNull().default(0),
    openPositionCount: t.integer().notNull().default(0),
    closedPositionCount: t.integer().notNull().default(0),
    depositCount: t.integer().notNull().default(0),
    withdrawCount: t.integer().notNull().default(0),
    borrowCount: t.integer().notNull().default(0),
    repayCount: t.integer().notNull().default(0),
    liquidateCount: t.integer().notNull().default(0),
    liquidationCount: t.integer().notNull().default(0),
  }),
  (table) => ({
    chainIdx: index().on(table.chainId),
  })
);

export const accountRelations = relations(Account, ({ many }) => ({
  positions: many(Position),
}));

export const Position = onchainTable(
  "Position",
  (t) => ({
    id: t.text().primaryKey(),
    accountId: t.hex().notNull(),
    marketId: t.text().notNull(),
    hashOpened: t.hex().notNull(),
    hashClosed: t.hex(),
    blockNumberOpened: t.bigint().notNull(),
    timestampOpened: t.bigint().notNull(),
    blockNumberClosed: t.bigint(),
    timestampClosed: t.bigint(),
    side: t.text().notNull(),
    isCollateral: t.boolean().notNull(),
    sTokenBalance: t.bigint().notNull().default(0n),
    spTokenBalance: t.bigint().notNull().default(0n),
    dTokenBalance: t.bigint().notNull().default(0n),
    depositCount: t.integer().notNull().default(0),
    withdrawCount: t.integer().notNull().default(0),
    borrowCount: t.integer().notNull().default(0),
    repayCount: t.integer().notNull().default(0),
    liquidationCount: t.integer().notNull().default(0),
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

export const Token = onchainTable(
  "Token",
  (t) => ({
    id: t.text().primaryKey(),
    name: t.text().notNull(),
    symbol: t.text().notNull(),
    decimals: t.integer().notNull(),
    type: t.text().notNull(),
    siloId: t.text().notNull(),
    marketId: t.text().notNull(),
    assetId: t.text().notNull(),
    protocolId: t.text().notNull(),
  }),
  (table) => ({
    siloIdx: index().on(table.siloId),
    marketIdx: index().on(table.marketId),
    protocolIdx: index().on(table.protocolId),
  })
);

export const tokenRelations = relations(Token, ({ one }) => ({
  silo: one(Silo, { fields: [Token.siloId], references: [Silo.id] }),
  market: one(Market, { fields: [Token.marketId], references: [Market.id] }),
  protocol: one(LendingProtocol, {
    fields: [Token.protocolId],
    references: [LendingProtocol.id],
  }),
}));

/* =====================================================
   ORACLE TABLE
   ===================================================== */

export const Oracle = onchainTable(
  "Oracle",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    type: t.text().notNull(),
    primaryPool: t.hex().notNull(),
    secondaryPool: t.hex(),
    baseTokenId: t.text().notNull(),
    quoteTokenId: t.text().notNull(),
    name: t.text().notNull(),
    timestamp: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
  }),
  (table) => ({
    baseTokenIdx: index().on(table.baseTokenId),
    quoteTokenIdx: index().on(table.quoteTokenId),
    chainIdx: index().on(table.chainId),
  })
);

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
    accountId: t.hex().notNull(),
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(),
    profit: t.bigint().notNull(), // NEW: raw profit value from liquidation
    profitUSD: t.numeric().notNull(),
    liquidatorId: t.hex().notNull(),
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

// Deposit Event Table – NEW fields: senderId and amountUSD
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
    accountId: t.hex().notNull(),
    senderId: t.hex().notNull(), // NEW: account that initiated the deposit
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(), // NEW: deposit amount in USD
    shares: t.bigint().notNull(),
    isProtected: t.boolean().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    senderIdx: index().on(table.senderId),
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
    accountId: t.hex().notNull(),
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

// Borrow Event Table – NEW fields: senderId and amountUSD
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
    accountId: t.hex().notNull(),
    senderId: t.hex().notNull(), // NEW: account initiating the borrow
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(), // NEW: borrow amount in USD
    shares: t.bigint().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    senderIdx: index().on(table.senderId),
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

// Repay Event Table – NEW fields: senderId and amountUSD
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
    accountId: t.hex().notNull(),
    senderId: t.hex().notNull(), // NEW: account that initiated the repay
    marketId: t.text().notNull(),
    amount: t.bigint().notNull(),
    amountUSD: t.numeric().notNull(), // NEW: repay amount in USD
    shares: t.bigint().notNull(),
  }),
  (table) => ({
    accountIdx: index().on(table.accountId),
    senderIdx: index().on(table.senderId),
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

export const Gauge = onchainTable(
  "Gauge",
  (t) => ({
    id: t.text().primaryKey(),
    chainId: t.integer().notNull(),
    siloId: t.text().notNull(),
    marketId: t.text().notNull(),
    weight: t.bigint().notNull(),
    lastUpdated: t.bigint().notNull(),
  }),
  (table) => ({
    siloIdx: index().on(table.siloId),
    marketIdx: index().on(table.marketId),
    chainIdx: index().on(table.chainId),
  })
);

export const gaugeRelations = relations(Gauge, ({ one }) => ({
  silo: one(Silo, { fields: [Gauge.siloId], references: [Silo.id] }),
  market: one(Market, { fields: [Gauge.marketId], references: [Market.id] }),
}));

/* =====================================================
   PRICE FEED TABLE
   ===================================================== */

export const PriceFeed = onchainTable(
  "PriceFeed",
  (t) => ({
    id: t.text().primaryKey(),
    token: t.text().notNull(),
    price: t.numeric().notNull(),
    timestamp: t.bigint().notNull(),
  }),
  (table) => ({
    tokenIdx: index().on(table.token),
    timestampIdx: index().on(table.timestamp),
  })
);

/* =====================================================
   POSITION SNAPSHOT TABLE
   ===================================================== */

export const PositionSnapshot = onchainTable(
  "PositionSnapshot",
  (t) => ({
    id: t.text().primaryKey(),
    hash: t.text().notNull(),
    logIndex: t.integer().notNull(),
    nonce: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
    account: t.text().notNull(),
    market: t.text().notNull(),
    position: t.text().notNull(),
    balance: t.bigint().notNull(),
    side: t.text().notNull(),
  }),
  (table) => ({
    positionIdx: index().on(table.position),
    marketIdx: index().on(table.market),
    accountIdx: index().on(table.account),
  })
);

export const positionSnapshotRelations = relations(
  PositionSnapshot,
  ({ one }) => ({
    account: one(Account, {
      fields: [PositionSnapshot.account],
      references: [Account.id],
    }),
    market: one(Market, {
      fields: [PositionSnapshot.market],
      references: [Market.id],
    }),
    position: one(Position, {
      fields: [PositionSnapshot.position],
      references: [Position.id],
    }),
  })
);
