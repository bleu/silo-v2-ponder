export const SiloOracleAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "AddressZero", type: "error" },
  { inputs: [], name: "AggregatorsAreTheSame", type: "error" },
  { inputs: [], name: "AssetNotSupported", type: "error" },
  { inputs: [], name: "BaseAmountOverflow", type: "error" },
  { inputs: [], name: "InvalidEthAggregatorDecimals", type: "error" },
  { inputs: [], name: "InvalidEthHeartbeat", type: "error" },
  { inputs: [], name: "InvalidHeartbeat", type: "error" },
  { inputs: [], name: "InvalidInitialization", type: "error" },
  { inputs: [], name: "InvalidPrice", type: "error" },
  { inputs: [], name: "InvalidSecondPrice", type: "error" },
  { inputs: [], name: "NotInitializing", type: "error" },
  { inputs: [], name: "QuoteTokenNotMatchEth", type: "error" },
  { inputs: [], name: "TokensAreTheSame", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract AggregatorV3Interface",
        name: "aggregator",
        type: "address",
      },
    ],
    name: "AggregatorDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ChainlinkV3OracleConfig",
        name: "configAddress",
        type: "address",
      },
    ],
    name: "ChainlinkV3ConfigDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract AggregatorV3Interface",
        name: "aggregator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "convertToQuote",
        type: "bool",
      },
    ],
    name: "NewAggregator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "heartbeat",
        type: "uint256",
      },
    ],
    name: "NewHeartbeat",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "heartbeat",
        type: "uint256",
      },
    ],
    name: "NewQuoteAggregatorHeartbeat",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "beforeQuote",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_primary", type: "bool" }],
    name: "getAggregatorPrice",
    outputs: [
      { internalType: "bool", name: "success", type: "bool" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ChainlinkV3OracleConfig",
        name: "_configAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oracleConfig",
    outputs: [
      {
        internalType: "contract ChainlinkV3OracleConfig",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_baseAmount", type: "uint256" },
      { internalType: "address", name: "_baseToken", type: "address" },
    ],
    name: "quote",
    outputs: [
      { internalType: "uint256", name: "quoteAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "quoteToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
