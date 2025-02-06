export const SiloFactoryAbi = [
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "_siloIdToBurn",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createSilo",
    inputs: [
      {
        name: "_initData",
        type: "tuple",
        internalType: "struct ISiloConfig.InitData",
        components: [
          {
            name: "deployer",
            type: "address",
            internalType: "address",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "token0",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle0",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle0",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel0",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "callBeforeQuote0",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "token1",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle1",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle1",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel1",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "callBeforeQuote1",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "_siloConfig",
        type: "address",
        internalType: "contract ISiloConfig",
      },
      {
        name: "_siloImpl",
        type: "address",
        internalType: "address",
      },
      {
        name: "_shareProtectedCollateralTokenImpl",
        type: "address",
        internalType: "address",
      },
      {
        name: "_shareDebtTokenImpl",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "daoFeeRange",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ISiloFactory.Range",
        components: [
          {
            name: "min",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "max",
            type: "uint128",
            internalType: "uint128",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "daoFeeReceiver",
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
    name: "getApproved",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeeReceivers",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "dao",
        type: "address",
        internalType: "address",
      },
      {
        name: "deployer",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNextSiloId",
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
    name: "idToSiloConfig",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
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
    name: "isApprovedForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isSilo",
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
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxDeployerFee",
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
    name: "maxFlashloanFee",
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
    name: "maxLiquidationFee",
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
    name: "ownerOf",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBaseURI",
    inputs: [
      {
        name: "_newBaseURI",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDaoFee",
    inputs: [
      {
        name: "_minFee",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "_maxFee",
        type: "uint128",
        internalType: "uint128",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDaoFeeReceiver",
    inputs: [
      {
        name: "_newDaoFeeReceiver",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMaxDeployerFee",
    inputs: [
      {
        name: "_newMaxDeployerFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMaxFlashloanFee",
    inputs: [
      {
        name: "_newMaxFlashloanFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMaxLiquidationFee",
    inputs: [
      {
        name: "_newMaxLiquidationFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "validateSiloInitData",
    inputs: [
      {
        name: "_initData",
        type: "tuple",
        internalType: "struct ISiloConfig.InitData",
        components: [
          {
            name: "deployer",
            type: "address",
            internalType: "address",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "token0",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle0",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle0",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel0",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee0",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "callBeforeQuote0",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "token1",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle1",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle1",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel1",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee1",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "callBeforeQuote1",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BaseURI",
    inputs: [
      {
        name: "newBaseURI",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DaoFeeChanged",
    inputs: [
      {
        name: "minDaoFee",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "maxDaoFee",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DaoFeeReceiverChanged",
    inputs: [
      {
        name: "daoFeeReceiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MaxDeployerFeeChanged",
    inputs: [
      {
        name: "maxDeployerFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MaxFlashloanFeeChanged",
    inputs: [
      {
        name: "maxFlashloanFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MaxLiquidationFeeChanged",
    inputs: [
      {
        name: "maxLiquidationFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewSilo",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token0",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token1",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "silo0",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "silo1",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "siloConfig",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "DaoFeeReceiverZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "DaoMaxRangeExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "DaoMinRangeExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptyToken0",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptyToken1",
    inputs: [],
  },
  {
    type: "error",
    name: "HookIsZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidCallBeforeQuote",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidDeployer",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidFeeRange",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidIrm",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidLt",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidMaxLtv",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidQuoteToken",
    inputs: [],
  },
  {
    type: "error",
    name: "LiquidationTargetLtvTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxDeployerFeeExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxFeeExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxFlashloanFeeExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxLiquidationFeeExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "MissingHookReceiver",
    inputs: [],
  },
  {
    type: "error",
    name: "OracleMisconfiguration",
    inputs: [],
  },
  {
    type: "error",
    name: "SameAsset",
    inputs: [],
  },
  {
    type: "error",
    name: "SameRange",
    inputs: [],
  },
  {
    type: "error",
    name: "ZeroAddress",
    inputs: [],
  },
] as const;
