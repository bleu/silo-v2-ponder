export const SiloConfigAbi = [
  {
    type: "function",
    name: "SILO_ID",
    inputs: [],
    outputs: [
      {
        name: "siloId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "accrueInterestForBothSilos",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "accrueInterestForSilo",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "borrowerCollateralSilo",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "collateralSilo",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAssetForSilo",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollateralShareTokenAndAsset",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_collateralType",
        type: "uint8",
        internalType: "enum ISilo.CollateralType",
      },
    ],
    outputs: [
      {
        name: "shareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
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
        name: "config",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getConfigsForBorrow",
    inputs: [
      {
        name: "_debtSilo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "collateralConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "debtConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getConfigsForSolvency",
    inputs: [
      {
        name: "borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "collateralConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "debtConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getConfigsForWithdraw",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "depositConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.DepositConfig",
        components: [
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
        ],
      },
      {
        name: "collateralConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "debtConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebtShareTokenAndAsset",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "shareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebtSilo",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "debtSilo",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeesWithAsset",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "daoFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deployerFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "flashloanFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getShareTokens",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "protectedShareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "collateralShareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "debtShareToken",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSilos",
    inputs: [],
    outputs: [
      {
        name: "silo0",
        type: "address",
        internalType: "address",
      },
      {
        name: "silo1",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasDebtInOtherSilo",
    inputs: [
      {
        name: "_thisSilo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "hasDebt",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onDebtTransfer",
    inputs: [
      {
        name: "_sender",
        type: "address",
        internalType: "address",
      },
      {
        name: "_recipient",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reentrancyGuardEntered",
    inputs: [],
    outputs: [
      {
        name: "entered",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setOtherSiloAsCollateralSilo",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setThisSiloAsCollateralSilo",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "turnOffReentrancyProtection",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "turnOnReentrancyProtection",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "CrossReentrancyNotActive",
    inputs: [],
  },
  {
    type: "error",
    name: "CrossReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "DebtExistInOtherSilo",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlyDebtShareToken",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlySilo",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlySiloOrTokenOrHookReceiver",
    inputs: [],
  },
  {
    type: "error",
    name: "WrongSilo",
    inputs: [],
  },
] as const;
