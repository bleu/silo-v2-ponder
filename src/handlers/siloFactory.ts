import { ponder } from "ponder:registry";
import { LendingProtocol, Silo, Market } from "ponder:schema";
import { constants } from "../utils/constants";
import { sql } from "drizzle-orm";
import { createEntityId } from "../utils/helpers";
import { create } from "domain";

function getProtocolId(chainId: number) {
  return `LendingProtocol-ChainId#${chainId}`;
}

async function idempotentProtocolCreateOrUpdate(
  db: any,
  chainId: number,
  networkName: string,
  onConflictDoUpdateCallback?: (
    record: typeof LendingProtocol.$inferSelect
  ) => Partial<typeof LendingProtocol.$inferInsert>
) {
  const protocol = await db
    .insert(LendingProtocol)
    .values({
      id: getProtocolId(chainId),
      name: "Silo Protocol",
      chainId: chainId,
      network: networkName,
      type: "LENDING",
      slug: "silo",
      schemaVersion: "1.0.0",
      subgraphVersion: "1.0.0",
      methodologyVersion: "1.0.0",
      daoFeeReceiver: "0x0000000000000000000000000000000000000000",
      maxDeployerFee: BigInt(0),
      maxFlashloanFee: BigInt(0),
      maxLiquidationFee: BigInt(0),
      minDaoFee: BigInt(0),
      maxDaoFee: BigInt(0),
      totalPoolCount: 0,
      cumulativeUniqueUsers: 0,
      lendingType: "CDP",
      riskType: "ISOLATED",
    })
    .onConflictDoUpdate(onConflictDoUpdateCallback);

  return protocol;
}

ponder.on("SiloFactory:NewSilo", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;

  const protocol = await idempotentProtocolCreateOrUpdate(
    db,
    chainId,
    context.network.name,
    (record) => ({
      totalPoolCount: record.totalPoolCount + 1,
    })
  );

  if (!protocol) return;

  const siloId = createEntityId(event.args.siloConfig, chainId);

  await db.insert(Silo).values({
    id: siloId,
    name: `Silo ${event.args.silo0}-${event.args.silo1}`,
    chainId,
    deployerFee: constants.BIGINT_ZERO,
    daoFee: constants.BIGINT_ZERO,
    protocolId: protocol.id,
    siloId: BigInt(event.args.silo0),
    configAddress: event.args.siloConfig,
    implementation: event.args.implementation,
    asset1Id: event.args.token0.toLowerCase(),
    asset2Id: event.args.token1.toLowerCase(),
    market1Id: event.args.silo0.toLowerCase(),
    market2Id: event.args.silo1.toLowerCase(),
    createdTimestamp: event.block.timestamp,
    deployerId: event.transaction.from,
    interestLastUpdated: event.block.number,
  });

  await db.insert(Market).values({
    id: event.args.silo0.toLowerCase(),
    name: `Market ${event.args.silo0}`,
    protocolId: protocol.id,
    siloId: siloId,
    inputTokenId: event.args.token0.toLowerCase(),
    sTokenId: `${event.args.silo0.toLowerCase()}-stoken`,
    spTokenId: `${event.args.silo0.toLowerCase()}-sptoken`,
    dTokenId: `${event.args.silo0.toLowerCase()}-dtoken`,
    createdTimestamp: event.block.timestamp,
    createdBlockNumber: event.block.number,
    flashLoanFee: constants.BIGINT_ZERO,
    liquidationFee: constants.BIGINT_ZERO,
    liquidationTargetLtv: constants.BIGINT_ZERO,
    solvencyOracleAddress: "0x0000000000000000000000000000000000000000",
    maxLtvOracleAddress: "0x0000000000000000000000000000000000000000",
    interestRateModel: "0x0000000000000000000000000000000000000000",
    maxLtv: constants.BIGINT_ZERO,
    lt: constants.BIGINT_ZERO,
    collateralSupply: constants.BIGINT_ZERO,
    protectedSupply: constants.BIGINT_ZERO,
    totalSupply: constants.BIGINT_ZERO,
    balance: constants.BIGINT_ZERO,
    borrowed: constants.BIGINT_ZERO,
    supplyIndex: "1",
    borrowIndex: "1",
  });

  await db.insert(Market).values({
    id: event.args.silo1.toLowerCase(),
    name: `Market ${event.args.silo1}`,
    protocolId: protocol.id,
    siloId: siloId,
    inputTokenId: event.args.token1.toLowerCase(),
    sTokenId: `${event.args.silo1.toLowerCase()}-stoken`,
    spTokenId: `${event.args.silo1.toLowerCase()}-sptoken`,
    dTokenId: `${event.args.silo1.toLowerCase()}-dtoken`,
    createdTimestamp: event.block.timestamp,
    createdBlockNumber: event.block.number,
    flashLoanFee: constants.BIGINT_ZERO,
    liquidationFee: constants.BIGINT_ZERO,
    liquidationTargetLtv: constants.BIGINT_ZERO,
    solvencyOracleAddress: "0x0000000000000000000000000000000000000000",
    maxLtvOracleAddress: "0x0000000000000000000000000000000000000000",
    interestRateModel: "0x0000000000000000000000000000000000000000",
    maxLtv: constants.BIGINT_ZERO,
    lt: constants.BIGINT_ZERO,
    collateralSupply: constants.BIGINT_ZERO,
    protectedSupply: constants.BIGINT_ZERO,
    totalSupply: constants.BIGINT_ZERO,
    balance: constants.BIGINT_ZERO,
    borrowed: constants.BIGINT_ZERO,
    supplyIndex: "1",
    borrowIndex: "1",
  });
});

ponder.on("SiloFactory:DaoFeeChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(db, chainId, context.network.name);
  await db.update(LendingProtocol, { id: getProtocolId(chainId) }).set({
    minDaoFee: event.args.minDaoFee,
    maxDaoFee: event.args.maxDaoFee,
  });
});

ponder.on("SiloFactory:DaoFeeReceiverChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(db, chainId, context.network.name);
  await db.update(LendingProtocol, { id: getProtocolId(chainId) }).set({
    daoFeeReceiver: event.args.daoFeeReceiver,
  });
});

ponder.on(
  "SiloFactory:MaxLiquidationFeeChanged",
  async ({ event, context }) => {
    const { db } = context;
    const chainId = context.network.chainId;
    await idempotentProtocolCreateOrUpdate(db, chainId, context.network.name);
    await db.update(LendingProtocol, { id: getProtocolId(chainId) }).set({
      maxLiquidationFee: event.args.maxLiquidationFee,
    });
  }
);

ponder.on("SiloFactory:MaxFlashloanFeeChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(db, chainId, context.network.name);
  await db.update(LendingProtocol, { id: getProtocolId(chainId) }).set({
    maxFlashloanFee: event.args.maxFlashloanFee,
  });
});

ponder.on("SiloFactory:MaxDeployerFeeChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(db, chainId, context.network.name);
  await db.update(LendingProtocol, { id: getProtocolId(chainId) }).set({
    maxDeployerFee: event.args.maxDeployerFee,
  });
});
