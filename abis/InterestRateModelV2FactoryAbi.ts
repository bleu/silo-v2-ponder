export const InterestRateModelV2FactoryAbi = [
  {
    type: "function",
    name: "DP",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
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
        internalType: "struct IInterestRateModelV2.Config",
        components: [
          {
            name: "uopt",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ucrit",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ulow",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ki",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "kcrit",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "klow",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "klin",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "beta",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ri",
            type: "int112",
            internalType: "int112",
          },
          {
            name: "Tcrit",
            type: "int112",
            internalType: "int112",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "configHash",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "irm",
        type: "address",
        internalType: "contract IInterestRateModelV2",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hashConfig",
    inputs: [
      {
        name: "_config",
        type: "tuple",
        internalType: "struct IInterestRateModelV2.Config",
        components: [
          {
            name: "uopt",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ucrit",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ulow",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ki",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "kcrit",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "klow",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "klin",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "beta",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ri",
            type: "int112",
            internalType: "int112",
          },
          {
            name: "Tcrit",
            type: "int112",
            internalType: "int112",
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
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "verifyConfig",
    inputs: [
      {
        name: "_config",
        type: "tuple",
        internalType: "struct IInterestRateModelV2.Config",
        components: [
          {
            name: "uopt",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ucrit",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ulow",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ki",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "kcrit",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "klow",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "klin",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "beta",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "ri",
            type: "int112",
            internalType: "int112",
          },
          {
            name: "Tcrit",
            type: "int112",
            internalType: "int112",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "NewInterestRateModelV2",
    inputs: [
      {
        name: "configHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "irm",
        type: "address",
        indexed: true,
        internalType: "contract IInterestRateModelV2",
      },
    ],
    anonymous: false,
  },
] as const;
