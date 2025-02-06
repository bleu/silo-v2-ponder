export const SiloGaugeFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "gaugeLike",
        type: "address",
      },
    ],
    name: "GaugeLikeCreated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_notifier", type: "address" },
      { internalType: "address", name: "_shareToken", type: "address" },
    ],
    name: "createGaugeLike",
    outputs: [{ internalType: "address", name: "gaugeLike", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "createdInFactory",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
