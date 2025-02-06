export const ChainlinkV3OracleAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "beforeQuote",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getAggregatorPrice",
    inputs: [
      {
        name: "_primary",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "success",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "price",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_configAddress",
        type: "address",
        internalType: "contract ChainlinkV3OracleConfig",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "oracleConfig",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ChainlinkV3OracleConfig",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quote",
    inputs: [
      {
        name: "_baseAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_baseToken",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "quoteAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quoteToken",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AggregatorDisabled",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "aggregator",
        type: "address",
        indexed: true,
        internalType: "contract AggregatorV3Interface",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ChainlinkV3ConfigDeployed",
    inputs: [
      {
        name: "configAddress",
        type: "address",
        indexed: false,
        internalType: "contract ChainlinkV3OracleConfig",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewAggregator",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "aggregator",
        type: "address",
        indexed: true,
        internalType: "contract AggregatorV3Interface",
      },
      {
        name: "convertToQuote",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewHeartbeat",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "heartbeat",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewQuoteAggregatorHeartbeat",
    inputs: [
      {
        name: "heartbeat",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressZero",
    inputs: [],
  },
  {
    type: "error",
    name: "AggregatorsAreTheSame",
    inputs: [],
  },
  {
    type: "error",
    name: "AssetNotSupported",
    inputs: [],
  },
  {
    type: "error",
    name: "BaseAmountOverflow",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEthAggregatorDecimals",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEthHeartbeat",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidHeartbeat",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidPrice",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidSecondPrice",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "QuoteTokenNotMatchEth",
    inputs: [],
  },
  {
    type: "error",
    name: "TokensAreTheSame",
    inputs: [],
  },
] as const;
