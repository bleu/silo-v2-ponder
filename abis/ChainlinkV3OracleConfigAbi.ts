export const ChainlinkV3OracleConfigAbi = [
  {
    type: "constructor",
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
      {
        name: "_normalizationDivider",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_normalizationMultiplier",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getConfig",
    inputs: [],
    outputs: [
      {
        name: "config",
        type: "tuple",
        internalType: "struct IChainlinkV3Oracle.ChainlinkV3Config",
        components: [
          {
            name: "primaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "secondaryAggregator",
            type: "address",
            internalType: "contract AggregatorV3Interface",
          },
          {
            name: "primaryHeartbeat",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "secondaryHeartbeat",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "normalizationDivider",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "normalizationMultiplier",
            type: "uint256",
            internalType: "uint256",
          },
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
            name: "convertToQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
] as const;
