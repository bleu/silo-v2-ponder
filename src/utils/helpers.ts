// silo-v2/src/utils/helpers.ts
import { Log, Transaction } from "ponder";
import { type Context } from "ponder:registry";
import { Account, Token } from "ponder:schema";

// Create an array with a default value
export function buildArray(
  length: number,
  defaultValue: string | number = "0"
): any[] {
  return Array(length).fill(defaultValue);
}

// Helper to create chain-specific IDs
export function createChainId(chainId: number | string): string {
  return `chain_${chainId}`;
}

// Create unique IDs for events that include chain information
export function createEventId(
  log: Log,
  tx: Transaction,
  chainId: number | string
): string {
  return `${createChainId(chainId)}_${tx.hash}_${log.logIndex}`;
}

// Create unique entity IDs that include chain information
export function createEntityId(
  address: string,
  chainId: number | string
): string {
  return `${createChainId(chainId)}_${address.toLowerCase()}`;
}

/**
 * Helper to calculate USD value.
 * This function uses native number arithmetic.
 *
 * @param amount - The raw amount as a bigint.
 * @param decimals - The number of decimals the token uses.
 * @param price - The token price as a native number.
 * @returns The USD value as a number.
 */
export function calculateUsdValue(
  amount: bigint,
  decimals: number,
  price: number
): number {
  // Convert the raw amount to a native number.
  // Note: This conversion may lose precision if the bigint is huge.
  const amt = Number(amount);
  const divisor = Math.pow(10, decimals);
  return (amt / divisor) * price;
}

// Updated getOrCreateToken to handle multi-chain
export async function getOrCreateToken(address: string, context: Context) {
  const chainId = context.network.chainId;
  const tokenId = createEntityId(address, chainId);

  let token = await context.db.find(Token, { id: tokenId });
  if (token) return token;

  token = await context.db.insert(Token).values({
    id: tokenId,
    chainId,
    name: "", // Optionally, fetch name from the contract
    symbol: "",
    decimals: 18,
    type: "ERC20",
    siloId: "",
    marketId: "",
    assetId: "",
    protocolId: `silo-finance-${chainId}`,
  });

  return token;
}

// Updated getOrCreateAccount to handle multi-chain
export async function getOrCreateAccount(address: string, context: Context) {
  const chainId = context.network.chainId;
  const accountId = createEntityId(address, chainId) as `0x${string}`;

  const account = await context.db.find(Account, { id: accountId });
  if (account) return account;

  return await context.db.insert(Account).values({
    id: accountId,
    chainId,
    positionCount: 0,
    openPositionCount: 0,
    closedPositionCount: 0,
    depositCount: 0,
    withdrawCount: 0,
    borrowCount: 0,
    repayCount: 0,
    liquidateCount: 0,
    liquidationCount: 0,
  });
}

// Helper to check if an entity exists (with chain-specific ID)
export async function checkExistingEntity(
  db: any,
  entityName: string,
  id: string,
  chainId: number | string
): Promise<boolean> {
  const chainSpecificId = createEntityId(id, chainId);
  const entity = await db[entityName].findUnique({
    where: { id: chainSpecificId },
  });
  return entity !== null;
}
