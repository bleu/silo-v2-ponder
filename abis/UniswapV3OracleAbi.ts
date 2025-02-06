export const UniswapV3OracleAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "OLD_ERROR_HASH",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "adjustOracleCardinality",
    inputs: [],
    outputs: [],
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
    name: "initialize",
    inputs: [
      {
        name: "_configAddress",
        type: "address",
        internalType: "contract UniswapV3OracleConfig",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "oldestTimestamp",
    inputs: [],
    outputs: [
      {
        name: "oldestTimestamps",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "oracleConfig",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract UniswapV3OracleConfig",
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
    type: "function",
    name: "resolveOldestObservationTimestamp",
    inputs: [
      {
        name: "_pool",
        type: "address",
        internalType: "contract IUniswapV3Pool",
      },
      {
        name: "_currentObservationIndex",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "_currentObservationCardinality",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "lastObservationTimestamp",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "UniswapV3ConfigDeployed",
    inputs: [
      {
        name: "configAddress",
        type: "address",
        indexed: false,
        internalType: "contract UniswapV3OracleConfig",
      },
    ],
    anonymous: false,
  },
] as const;
