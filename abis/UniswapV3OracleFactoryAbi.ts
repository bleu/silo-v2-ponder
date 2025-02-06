export const UniswapV3OracleFactoryAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_factory",
        type: "address",
        internalType: "contract IUniswapV3Factory",
      },
    ],
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
    name: "UNISWAPV3_FACTORY",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IUniswapV3Factory",
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
    ],
    outputs: [
      {
        name: "oracle",
        type: "address",
        internalType: "contract UniswapV3Oracle",
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
    name: "observationsStatus",
    inputs: [
      {
        name: "_pool",
        type: "address",
        internalType: "contract IUniswapV3Pool",
      },
      {
        name: "_requiredCardinality",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "bufferFull",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "enoughObservations",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "currentCardinality",
        type: "uint16",
        internalType: "uint16",
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
    ],
    outputs: [
      {
        name: "requiredCardinality",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "verifyPool",
    inputs: [
      {
        name: "_pool",
        type: "address",
        internalType: "contract IUniswapV3Pool",
      },
      {
        name: "_quoteToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_requiredCardinality",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [],
    stateMutability: "view",
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
] as const;
