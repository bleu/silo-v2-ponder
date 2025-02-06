import { Context, ponder } from "ponder:registry";
import { LendingProtocol, Silo, Market } from "ponder:schema";
import {
  createChainId,
  createEntityId,
  getOrCreateToken,
} from "../utils/helpers";

async function idempotentProtocolCreateOrUpdate(
  { db }: Context,
  chainId: number,
  onConflictDoUpdateCallback: (
    record: typeof LendingProtocol.$inferSelect
  ) => Partial<typeof LendingProtocol.$inferInsert> = () => ({})
) {
  const protocol = await db
    .insert(LendingProtocol)
    .values({
      id: createChainId(chainId),
      chainId: chainId,
    })
    .onConflictDoUpdate(onConflictDoUpdateCallback);

  return protocol;
}

ponder.on("SiloFactory:NewSilo", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;

  const protocol = await idempotentProtocolCreateOrUpdate(
    context,
    chainId,
    (record) => ({
      totalPoolCount: record.totalPoolCount + 1,
    })
  );

  const siloId = createEntityId(event.args.siloConfig, chainId);

  const market0Id = createEntityId(event.args.silo0, chainId);
  const market1Id = createEntityId(event.args.silo1, chainId);

  await Promise.all([
    db.insert(Silo).values({
      id: siloId,
      name: `Silo ${event.args.silo0}-${event.args.silo1}`,
      chainId,
      protocolId: protocol.id,
      siloId: BigInt(event.args.silo0),
      configAddress: event.args.siloConfig,
      implementation: event.args.implementation,
      asset1Id: event.args.token0,
      asset2Id: event.args.token1,
      market1Id: event.args.silo0,
      market2Id: event.args.silo1,
      createdTimestamp: event.block.timestamp,
      deployer: event.transaction.from,
      interestLastUpdated: event.block.number,
    }),
    db.insert(Market).values({
      id: market0Id,
      protocolId: protocol.id,
      siloId: siloId,
      otherMarketId: market1Id,
      inputTokenId: createEntityId(event.args.token0, chainId),
      sTokenId: market0Id,
      createdTimestamp: event.block.timestamp,
      createdBlockNumber: event.block.number,
    }),
    db.insert(Market).values({
      id: market1Id,
      protocolId: protocol.id,
      siloId: siloId,
      otherMarketId: market0Id,
      inputTokenId: createEntityId(event.args.token1, chainId),
      sTokenId: market1Id,
      createdTimestamp: event.block.timestamp,
      createdBlockNumber: event.block.number,
    }),
    getOrCreateToken(event.args.token0, context),
    getOrCreateToken(event.args.token1, context),
  ]);
});

ponder.on("SiloFactory:DaoFeeChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(context, chainId);
  await db.update(LendingProtocol, { id: createChainId(chainId) }).set({
    minDaoFee: event.args.minDaoFee,
    maxDaoFee: event.args.maxDaoFee,
  });
});

ponder.on("SiloFactory:DaoFeeReceiverChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(context, chainId);
  await db.update(LendingProtocol, { id: createChainId(chainId) }).set({
    daoFeeReceiver: event.args.daoFeeReceiver,
  });
});

ponder.on(
  "SiloFactory:MaxLiquidationFeeChanged",
  async ({ event, context }) => {
    const { db } = context;
    const chainId = context.network.chainId;
    await idempotentProtocolCreateOrUpdate(context, chainId);
    await db.update(LendingProtocol, { id: createChainId(chainId) }).set({
      maxLiquidationFee: event.args.maxLiquidationFee,
    });
  }
);

ponder.on("SiloFactory:MaxFlashloanFeeChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(context, chainId);
  await db.update(LendingProtocol, { id: createChainId(chainId) }).set({
    maxFlashloanFee: event.args.maxFlashloanFee,
  });
});

ponder.on("SiloFactory:MaxDeployerFeeChanged", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;
  await idempotentProtocolCreateOrUpdate(context, chainId);
  await db.update(LendingProtocol, { id: createChainId(chainId) }).set({
    maxDeployerFee: event.args.maxDeployerFee,
  });
});
