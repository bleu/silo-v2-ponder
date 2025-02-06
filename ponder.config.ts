import { createConfig, factory } from "ponder";
import { http } from "viem";
import { parseAbiItem } from "viem";

import { InterestRateModelV2FactoryAbi } from "./abis/InterestRateModelV2FactoryAbi";
import { SiloFactoryAbi } from "./abis/SiloFactoryAbi";
import { UniswapV3OracleFactoryAbi } from "./abis/UniswapV3OracleFactoryAbi";
import { ChainlinkV3OracleFactoryAbi } from "./abis/ChainlinkV3OracleFactoryAbi";
import { GaugeHookReceiverAbi } from "./abis/GaugeHookReceiverAbi";
import { SiloAbi } from "./abis/SiloAbi";
import { InterestRateModelV2Abi } from "./abis/InterestRateModelV2Abi";
import { UniswapV3OracleAbi } from "./abis/UniswapV3OracleAbi";
import { ChainlinkV3OracleAbi } from "./abis/ChainlinkV3OracleAbi";
import { Erc20Abi } from "./abis/Erc20Abi";

export default createConfig({
  networks: {
    sonic: {
      chainId: 146,
      transport: http("https://sonic-rpc.publicnode.com"),
      // transport: http(process.env.PONDER_RPC_URL_42220),
    },
    // arbitrum: {
    //   chainId: 42161,
    //   transport: http(process.env.PONDER_RPC_URL_42161),
    // },
    // optimism: {
    //   chainId: 10,
    //   transport: http(process.env.PONDER_RPC_URL_10),
    // },
  },
  contracts: {
    InterestRateModelV2Factory: {
      abi: InterestRateModelV2FactoryAbi,
      network: {
        sonic: {
          address: "0x45adB05683a27a71BF161825de3291aC2F9B6c3F",
          startBlock: 2550467,
        },
        // arbitrum: {
        //   address: "0xCce964AAb03Ca650ADF6F0496A30b1Ef0a29bd69",
        //   startBlock: 283921533,
        // },
        // optimism: {
        //   address: "0xDA91d956498d667f5DB71eEcd58Ba02C4B960a53",
        //   startBlock: 127347200,
        // },
      },
    },
    InterestRateModelV2: {
      abi: InterestRateModelV2Abi,
      network: {
        sonic: {
          address: factory({
            address: "0x45adB05683a27a71BF161825de3291aC2F9B6c3F",
            event: parseAbiItem(
              "event NewInterestRateModelV2(bytes32 indexed configHash, address indexed irm)"
            ),
            parameter: "irm",
          }),
          startBlock: 2550467,
        },
        // arbitrum: {
        //   address: factory({
        //     address: "0xCce964AAb03Ca650ADF6F0496A30b1Ef0a29bd69",
        //     event: parseAbiItem(
        //       "event NewInterestRateModelV2(bytes32 indexed configHash, address indexed irm)"
        //     ),
        //     parameter: "irm",
        //   }),
        //   startBlock: 283921533,
        // },
        // optimism: {
        //   address: factory({
        //     address: "0xDA91d956498d667f5DB71eEcd58Ba02C4B960a53",
        //     event: parseAbiItem(
        //       "event NewInterestRateModelV2(bytes32 indexed configHash, address indexed irm)"
        //     ),
        //     parameter: "irm",
        //   }),
        //   startBlock: 127347200,
        // },
      },
    },
    SiloFactory: {
      abi: SiloFactoryAbi,
      network: {
        sonic: {
          address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
          startBlock: 2550467,
        },
        // arbitrum: {
        //   address: "0xf7dc975C96B434D436b9bF45E7a45c95F0521442",
        //   startBlock: 283921533,
        // },
        // optimism: {
        //   address: "0xB25255036f210D7E32FC96e25460aB121FF0C25d",
        //   startBlock: 127347200,
        // },
      },
    },
    Silo: {
      abi: SiloAbi,
      network: {
        sonic: {
          address: factory({
            address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
            event: parseAbiItem(
              "event NewSilo(address silo, address config, address implementation, address market1, address market2)"
            ),
            parameter: "silo",
          }),
          startBlock: 2550467,
        },
        // arbitrum: {
        //   address: factory({
        //     address: "0xf7dc975C96B434D436b9bF45E7a45c95F0521442",
        //     event: parseAbiItem(
        //       "event NewSilo(address silo, address config, address implementation, address market1, address market2)"
        //     ),
        //     parameter: "silo",
        //   }),
        //   startBlock: 283921533,
        // },
        // optimism: {
        //   address: factory({
        //     address: "0xB25255036f210D7E32FC96e25460aB121FF0C25d",
        //     event: parseAbiItem(
        //       "event NewSilo(address silo, address config, address implementation, address market1, address market2)"
        //     ),
        //     parameter: "silo",
        //   }),
        //   startBlock: 127347200,
        // },
      },
    },
    UniswapV3OracleFactory: {
      abi: UniswapV3OracleFactoryAbi,
      network: {
        sonic: {
          address: "0x0000000000000000000000000000000000000000",
          startBlock: 2550467,
        },
        // arbitrum: {
        //   address: "0xadf6A18168c710de96E421A3a8eaaFfF0c5D59Ed",
        //   startBlock: 283921533,
        // },
        // optimism: {
        //   address: "0x31dFC9b88cb4C1C4ac0f4A11F21A330620E520ed",
        //   startBlock: 127347200,
        // },
      },
    },
    ChainlinkV3OracleFactory: {
      abi: ChainlinkV3OracleFactoryAbi,
      network: {
        sonic: {
          address: "0x0000000000000000000000000000000000000000",
          startBlock: 2550467,
        },
        // arbitrum: {
        //   address: "0x86AE73b783EC1B6FEbA46B54B85Dd098E30b04f2",
        //   startBlock: 283921533,
        // },
        // optimism: {
        //   address: "0x757748e1A208f23bfeb08b925Fac64971eF0584E",
        //   startBlock: 127347200,
        // },
      },
    },
    GaugeHookReceiver: {
      abi: GaugeHookReceiverAbi,
      network: {
        sonic: {
          address: "0x757748e1A208f23bfeb08b925Fac64971eF0584E",
          startBlock: 2550467,
        },
        // arbitrum: {
        //   address: "0xfE3c1955d3a65154e75bAa688342a66343b7b3CA",
        //   startBlock: 283921533,
        // },
        // optimism: {
        //   address: "0xed25Da94B2D2E1a039233Dc621dC811Bd9DF15bF",
        //   startBlock: 127347200,
        // },
      },
    },
    Erc20: {
      abi: Erc20Abi,
      network: {
        sonic: {
          address: factory({
            address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
            event: parseAbiItem(
              "event NewSilo(address silo, address config, address implementation, address market1, address market2)"
            ),
            parameter: "market1",
          }),
          startBlock: 2550467,
        },
      },
    },
    Erc20Market2: {
      abi: Erc20Abi,
      network: {
        sonic: {
          address: factory({
            address: "0xa42001D6d2237d2c74108FE360403C4b796B7170",
            event: parseAbiItem(
              "event NewSilo(address silo, address config, address implementation, address market1, address market2)"
            ),
            parameter: "market2",
          }),
          startBlock: 2550467,
        },
      },
    },
  },
  // blocks: {
  //   MarketUpdates: {
  //     network: {
  //       // arbitrum: {
  //       //   startBlock: 0,
  //       //   interval: 60 / 12, // Every 60 seconds (assuming 12s block time)
  //       // },
  //       // optimism: {
  //       //   startBlock: 0,
  //       //   interval: 60 / 2, // Every 60 seconds (assuming 2s block time)
  //       // },
  //       sonic: {
  //         startBlock: 0,
  //         interval: 60 / 5, // Every 60 seconds (assuming 5s block time)
  //       },
  //     },
  //   },
  // },
});
