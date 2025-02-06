export const InterestRateModelV2Abi = [
  {
    type: "function",
    name: "calculateCompoundInterestRate",
    inputs: [
      {
        name: "_c",
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
      {
        name: "_totalDeposits",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_totalBorrowAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_interestRateTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_blockTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "rcomp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "ri",
        type: "int256",
        internalType: "int256",
      },
      {
        name: "Tcrit",
        type: "int256",
        internalType: "int256",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "calculateCompoundInterestRateWithOverflowDetection",
    inputs: [
      {
        name: "_c",
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
      {
        name: "_totalDeposits",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_totalBorrowAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_interestRateTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_blockTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "rcomp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "ri",
        type: "int256",
        internalType: "int256",
      },
      {
        name: "Tcrit",
        type: "int256",
        internalType: "int256",
      },
      {
        name: "overflow",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "calculateCurrentInterestRate",
    inputs: [
      {
        name: "_c",
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
      {
        name: "_totalDeposits",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_totalBorrowAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_interestRateTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_blockTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "rcur",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getConfig",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
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
    stateMutability: "view",
  },
  {
    type: "function",
    name: "overflowDetected",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_blockTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "overflow",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "error",
    name: "AddressZero",
    inputs: [],
  },
  {
    type: "error",
    name: "AlreadyInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "DeployConfigFirst",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidBeta",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidKcrit",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidKi",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidKlin",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidKlow",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidRi",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidTcrit",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidTimestamps",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidUcrit",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidUlow",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidUopt",
    inputs: [],
  },
] as const;
