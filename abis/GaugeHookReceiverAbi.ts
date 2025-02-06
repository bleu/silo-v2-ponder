export const GaugeHookReceiverAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "acceptOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "afterAction",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_action",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_inputAndOutput",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "beforeAction",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "configuredGauges",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IShareToken",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IGaugeLike",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "gauge",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IGaugeLike",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hookReceiverConfig",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "hooksBefore",
        type: "uint24",
        internalType: "uint24",
      },
      {
        name: "hooksAfter",
        type: "uint24",
        internalType: "uint24",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_siloConfig",
        type: "address",
        internalType: "contract ISiloConfig",
      },
      {
        name: "_data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "liquidationCall",
    inputs: [
      {
        name: "_collateralAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_debtAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
      {
        name: "_maxDebtToCover",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_receiveSToken",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "withdrawCollateral",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "repayDebtAssets",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "maxLiquidation",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "collateralToLiquidate",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "debtToRepay",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sTokenRequired",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
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
    name: "pendingOwner",
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
    name: "removeGauge",
    inputs: [
      {
        name: "_shareToken",
        type: "address",
        internalType: "contract IShareToken",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGauge",
    inputs: [
      {
        name: "_gauge",
        type: "address",
        internalType: "contract IGaugeLike",
      },
      {
        name: "_shareToken",
        type: "address",
        internalType: "contract IShareToken",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "shareToken",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IShareToken",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "siloConfig",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ISiloConfig",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "GaugeConfigured",
    inputs: [
      {
        name: "gauge",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "shareToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GaugeRemoved",
    inputs: [
      {
        name: "shareToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "HookConfigured",
    inputs: [
      {
        name: "silo",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "hooksBefore",
        type: "uint24",
        indexed: false,
        internalType: "uint24",
      },
      {
        name: "hooksAfter",
        type: "uint24",
        indexed: false,
        internalType: "uint24",
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
    name: "LiquidationCall",
    inputs: [
      {
        name: "liquidator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "receiveSToken",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferStarted",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AlreadyConfigured",
    inputs: [],
  },
  {
    type: "error",
    name: "CantRemoveActiveGauge",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptyGaugeAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptySiloConfig",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "FullLiquidationRequired",
    inputs: [],
  },
  {
    type: "error",
    name: "GaugeAlreadyConfigured",
    inputs: [],
  },
  {
    type: "error",
    name: "GaugeIsNotConfigured",
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
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidShareToken",
    inputs: [],
  },
  {
    type: "error",
    name: "NoDebtToCover",
    inputs: [],
  },
  {
    type: "error",
    name: "NoRepayAssets",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnerIsZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "RequestNotSupported",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "UnexpectedCollateralToken",
    inputs: [],
  },
  {
    type: "error",
    name: "UnexpectedDebtToken",
    inputs: [],
  },
  {
    type: "error",
    name: "UnknownRatio",
    inputs: [],
  },
  {
    type: "error",
    name: "UserIsSolvent",
    inputs: [],
  },
  {
    type: "error",
    name: "WrongGaugeShareToken",
    inputs: [],
  },
] as const;
