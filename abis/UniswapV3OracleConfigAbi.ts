export const UniswapV3OracleConfigAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_config",
        type: "tuple",
        internalType: "struct IUniswapV3Oracle.UniswapV3DeploymentConfig",
        components: [
          {
            name: "pool",
            type: "address",
            internalType: "contract IUniswapV3Pool",
          },
          {
            name: "baseToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "quoteToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "periodForAvgPrice",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "blockTime",
            type: "uint8",
            internalType: "uint8",
          },
        ],
      },
      {
        name: "_requiredCardinality",
        type: "uint16",
        internalType: "uint16",
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
        internalType: "struct IUniswapV3Oracle.UniswapV3Config",
        components: [
          {
            name: "pool",
            type: "address",
            internalType: "contract IUniswapV3Pool",
          },
          {
            name: "baseToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "quoteToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "periodForAvgPrice",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "requiredCardinality",
            type: "uint16",
            internalType: "uint16",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
] as const;
