import { createConfig, factory, mergeAbis } from "ponder";
import { http } from "viem";
import { parseAbiItem } from "viem";

import { SiloFactoryAbi } from "./abis/SiloFactoryAbi";
import { SiloAbi } from "./abis/SiloAbi";
import { Erc20Abi } from "./abis/Erc20Abi";
import { Erc20BytesAbi } from "./abis/Erc20BytesAbi";
import { SiloConfigAbi } from "./abis/SiloConfigAbi";
import { SiloGaugeAbi } from "./abis/SiloGaugeAbi";
import { SiloGaugeFactoryAbi } from "./abis/SiloGaugeFactoryAbi";

export default createConfig({
  // database: {
  //   kind: "postgres",
  //   connectionString: process.env.DATABASE_URL,
  // },
  networks: {
    sonic: {
      chainId: 146,
      transport: http(process.env.SONIC_RPC_URL),
    },
  },
  contracts: {
    SiloFactory: {
      abi: SiloFactoryAbi,
      network: {
        sonic: {
          address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
          startBlock: 2550467,
        },
      },
    },
    Silo: {
      abi: SiloConfigAbi,
      network: {
        sonic: {
          address: factory({
            address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
            event: parseAbiItem(
              "event NewSilo(address indexed implementation, address indexed token0, address indexed token1, address silo0, address silo1, address siloConfig)"
            ),
            parameter: "siloConfig",
          }),
          startBlock: 2550467,
        },
      },
    },
    Market1: {
      abi: mergeAbis([SiloAbi, Erc20Abi, Erc20BytesAbi]),
      network: {
        sonic: {
          address: factory({
            address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
            event: parseAbiItem(
              "event NewSilo(address indexed implementation, address indexed token0, address indexed token1, address silo0, address silo1, address siloConfig)"
            ),
            parameter: "silo0",
          }),
          startBlock: 2550467,
        },
      },
    },
    Market2: {
      abi: mergeAbis([SiloAbi, Erc20Abi, Erc20BytesAbi]),
      network: {
        sonic: {
          address: factory({
            address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
            event: parseAbiItem(
              "event NewSilo(address indexed implementation, address indexed token0, address indexed token1, address silo0, address silo1, address siloConfig)"
            ),
            parameter: "silo1",
          }),
          startBlock: 2550467,
        },
      },
    },
    Gauge: {
      abi: SiloGaugeAbi,
      network: {
        sonic: {
          address: factory({
            address: "0x2b07e8b10293019Cb89410894E62A090a7b5bFE6",
            event: parseAbiItem("event GaugeLikeCreated(address gaugeLike)"),
            parameter: "gaugeLike",
          }),
          startBlock: 4428108,
        },
      },
    },
    GaugeFactory: {
      abi: SiloGaugeFactoryAbi,
      network: {
        sonic: {
          address: "0x2b07e8b10293019Cb89410894E62A090a7b5bFE6",
          startBlock: 4428108,
        },
      },
    },
  },
});
