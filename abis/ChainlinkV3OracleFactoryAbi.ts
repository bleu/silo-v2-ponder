export const ChainlinkV3OracleFactoryAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ORACLE_IMPLEMENTATION",
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
    name: "create",
    inputs: [
      {
        name: "_config",
        type: "tuple",
        internalType: "struct IChainlinkV3Oracle.ChainlinkV3DeploymentConfig",
        components: [
          {
            name: "baseToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "quoteToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "primaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "primaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "secondaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "secondaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "oracle",
        type: "address",
        internalType: "contract ChainlinkV3Oracle",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getConfigAddress",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
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
    name: "getOracleAddress",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "hashConfig",
    inputs: [
      {
        name: "_config",
        type: "tuple",
        internalType: "struct IChainlinkV3Oracle.ChainlinkV3DeploymentConfig",
        components: [
          {
            name: "baseToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "quoteToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "primaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "primaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "secondaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "secondaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "configId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verifyConfig",
    inputs: [
      {
        name: "_config",
        type: "tuple",
        internalType: "struct IChainlinkV3Oracle.ChainlinkV3DeploymentConfig",
        components: [
          {
            name: "baseToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "quoteToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "primaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "primaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "secondaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "secondaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "secondaryPriceDecimals",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verifyHeartbeat",
    inputs: [
      {
        name: "_config",
        type: "tuple",
        internalType: "struct IChainlinkV3Oracle.ChainlinkV3DeploymentConfig",
        components: [
          {
            name: "baseToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "quoteToken",
            type: "address",
            internalType: "contract IERC20Metadata",
          },
          {
            name: "primaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "primaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "secondaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "secondaryHeartbeat",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "pure",
  },
  {
    type: "event",
    name: "NewOracle",
    inputs: [
      {
        name: "oracle",
        type: "address",
        indexed: true,
        internalType: "address",
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
    name: "FailedDeployment",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "Overflow",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenIsNotAContract",
    inputs: [],
  },
  {
    type: "error",
    name: "TokensAreTheSame",
    inputs: [],
  },
] as const;
