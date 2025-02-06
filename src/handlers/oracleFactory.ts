import { ponder } from "ponder:registry";
import { Oracle } from "ponder:schema";
import { getOrCreateToken, createEntityId } from "../utils/helpers";

const oracleConfigAbi = [
  {
    name: "oracleConfig",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address", name: "config" }],
  },
] as const;

const uniV3ConfigAbi = [
  {
    name: "getConfig",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        components: [
          { name: "pool", type: "address" },
          { name: "baseToken", type: "address" },
          { name: "quoteToken", type: "address" },
        ],
        type: "tuple",
      },
    ],
  },
] as const;

const chainlinkConfigAbi = [
  {
    name: "getConfig",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        components: [
          { name: "primaryAggregator", type: "address" },
          { name: "secondaryAggregator", type: "address" },
          { name: "baseToken", type: "address" },
          { name: "quoteToken", type: "address" },
        ],
        type: "tuple",
      },
    ],
  },
] as const;

// Handle new Uniswap V3 Oracle creation
ponder.on("UniswapV3OracleFactory:NewOracle", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;

  const oracleId = createEntityId(event.args.oracle, chainId);

  // Get oracle config from contract
  const oracleConfigResult = await context.client.readContract({
    address: event.args.oracle,
    abi: oracleConfigAbi,
    functionName: "oracleConfig",
    args: [],
  });

  const configResult = await context.client.readContract({
    address: oracleConfigResult,
    abi: uniV3ConfigAbi,
    functionName: "getConfig",
    args: [],
  });

  // Get or create tokens
  const quoteToken = await getOrCreateToken(configResult.quoteToken, context);
  const baseToken = await getOrCreateToken(configResult.baseToken, context);

  // Create oracle record
  await db.insert(Oracle).values({
    id: oracleId,
    chainId,
    type: "UNIV3",
    name: `UNIV3-${baseToken.symbol}->${quoteToken.symbol}`,
    primaryPool: configResult.pool,
    baseTokenId: baseToken.id,
    quoteTokenId: quoteToken.id,
    timestamp: event.block.timestamp,
    blockNumber: event.block.number,
  });
});

// Handle new Chainlink V3 Oracle creation
ponder.on("ChainlinkV3OracleFactory:NewOracle", async ({ event, context }) => {
  const { db } = context;
  const chainId = context.network.chainId;

  const oracleId = createEntityId(event.args.oracle, chainId);

  // Get oracle config from contract
  const oracleConfigResult = await context.client.readContract({
    address: event.args.oracle,
    abi: oracleConfigAbi,
    functionName: "oracleConfig",
    args: [],
  });

  const configResult = await context.client.readContract({
    address: oracleConfigResult,
    abi: chainlinkConfigAbi,
    functionName: "getConfig",
    args: [],
  });

  // Get or create tokens
  const baseToken = await getOrCreateToken(configResult.baseToken, context);
  const quoteToken = await getOrCreateToken(configResult.quoteToken, context);

  // Create oracle record
  await db.insert(Oracle).values({
    id: oracleId,
    chainId,
    type: "CHAINLINKV3",
    name: `CHAINLINKV3-${baseToken.symbol}->${quoteToken.symbol}`,
    primaryPool: configResult.primaryAggregator,
    secondaryPool: configResult.secondaryAggregator,
    baseTokenId: baseToken.id,
    quoteTokenId: quoteToken.id,
    timestamp: event.block.timestamp,
    blockNumber: event.block.number,
  });
});
