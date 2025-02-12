import { Context, ponder } from "ponder:registry";
import { LendingProtocol, Silo, Market } from "ponder:schema";
import {
  createChainId,
  createEntityId,
  createTokenIfNotExists,
} from "../utils/helpers";
import { SiloConfigAbi } from "../../abis/SiloConfigAbi";

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

  const siloId = createEntityId(event.args.siloConfig, chainId);
  const protocolId = createChainId(chainId);

  const market0Id = createEntityId(event.args.silo0, chainId);
  const market1Id = createEntityId(event.args.silo1, chainId);

  const [{ result: market0Config }, { result: market1Config }] =
    await context.client.multicall({
      contracts: [
        {
          address: event.args.siloConfig,
          abi: SiloConfigAbi,
          functionName: "getConfig",
          args: [event.args.silo0],
        },

        {
          address: event.args.siloConfig,
          abi: SiloConfigAbi,
          functionName: "getConfig",
          args: [event.args.silo1],
        },
      ],
    });

  if (!market0Config || !market1Config) {
    console.error(
      `Could not get market config for Silo ${event.args.silo0}-${event.args.silo1}`
    );
    return;
  }

  const market0TokensId = {
    inputTokenId: createEntityId(event.args.token0, chainId),
    sTokenId: market0Id,
    spTokenId: createEntityId(market0Config.protectedShareToken, chainId),
    dTokenId: createEntityId(market0Config.debtShareToken, chainId),
  };

  const market1TokensId = {
    inputTokenId: createEntityId(event.args.token1, chainId),
    sTokenId: market1Id,
    spTokenId: createEntityId(market1Config.protectedShareToken, chainId),
    dTokenId: createEntityId(market1Config.debtShareToken, chainId),
  };

  await Promise.all([
    idempotentProtocolCreateOrUpdate(context, chainId, (record) => ({
      totalPoolCount: record.totalPoolCount + 1,
    })),
    db
      .insert(Silo)
      .values({
        id: siloId,
        name: `Silo ${event.args.silo0}-${event.args.silo1}`,
        chainId,
        protocolId: protocolId,
        siloId: BigInt(event.args.silo0),
        configAddress: event.args.siloConfig,
        implementation: event.args.implementation,
        asset0Id: market0TokensId.inputTokenId,
        asset1Id: market1TokensId.inputTokenId,
        market0Id: market0Id,
        market1Id: market1Id,
        createdTimestamp: event.block.timestamp,
        deployer: event.transaction.from,
        interestLastUpdated: event.block.number,
      })
      .onConflictDoNothing(),
    db
      .insert(Market)
      .values({
        id: market0Id,
        address: event.args.silo0,
        protocolId: protocolId,
        siloId: siloId,
        otherMarketId: market1Id,
        createdTimestamp: event.block.timestamp,
        createdBlockNumber: event.block.number,
        ...market0Config,
        ...market0TokensId,
      })
      .onConflictDoNothing(),
    db
      .insert(Market)
      .values({
        id: market1Id,
        address: event.args.silo1,
        protocolId: protocolId,
        siloId: siloId,
        otherMarketId: market0Id,
        createdTimestamp: event.block.timestamp,
        createdBlockNumber: event.block.number,
        ...market0Config,
        ...market1TokensId,
      })
      .onConflictDoNothing(),
    createTokenIfNotExists(event.args.token0, context),
    createTokenIfNotExists(event.args.silo0, context),
    createTokenIfNotExists(market0Config.protectedShareToken, context),
    createTokenIfNotExists(market0Config.debtShareToken, context),
    createTokenIfNotExists(event.args.token1, context),
    createTokenIfNotExists(event.args.silo1, context),
    createTokenIfNotExists(market1Config.protectedShareToken, context),
    createTokenIfNotExists(market1Config.debtShareToken, context),
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
