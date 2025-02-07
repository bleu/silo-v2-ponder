import { Address } from "viem";
import { sonic } from "viem/chains";

const COINGECKO_BASE_PUBLIC_URL = "https://api.coingecko.com/api/v3/";

export const getCoingeckoNetworkName = (chainId: number | string) => {
  const chainIdNumber = parseInt(chainId.toString());
  switch (chainIdNumber) {
    case sonic.id:
      return "sonic";
    default:
      throw new Error(`ChainId ${chainId} not supported`);
  }
};

// TODO: Add cache on this function
export const getCoingeckoTokenPrice = async (
  contractAddress: string,
  chainId: number | string
) => {
  const url = `${COINGECKO_BASE_PUBLIC_URL}simple/token_price/${getCoingeckoNetworkName(
    chainId
  )}?contract_addresses=${contractAddress}&vs_currencies=usd`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as Record<
    string,
    Record<string, number>
  >;
  const price = data[contractAddress]?.usd as number;
  return price;
};
