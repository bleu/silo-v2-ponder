// silo-v2/src/utils/helpers.ts
import { Log, Transaction } from "ponder";
import { type Context } from "ponder:registry";
import { Account, Token, Position } from "ponder:schema";
import { Address, erc20Abi } from "viem";

// Create an array with a default value
export function buildArray(
  length: number,
  defaultValue: string | number = "0"
): any[] {
  return Array(length).fill(defaultValue);
}

// Helper to create chain-specific IDs
export function createChainId(chainId: number | string): string {
  return `${chainId}`;
}

// Create unique IDs for events that include chain information
export function createEventId(
  log: Log,
  tx: Transaction,
  chainId: number | string
): string {
  return `-${tx.hash}-${log.logIndex}-${chainId}`;
}

// Create unique entity IDs that include chain information
export function createEntityId(
  address: string,
  chainId: number | string
): string {
  return `${address.toLowerCase()}-${chainId}`;
}

export function createPositionId(
  marketId: string,
  accountId: string,
  chainId: number | string
): string {
  return `${accountId}-${marketId}-${chainId}`;
}

export function createProgramId(marketId: string, programName: string): string {
  return `${marketId}-${programName}`;
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

// Updated getOrCreateAccount to handle multi-chain
// TBD: Add update logic
export async function createOrUpdateAccount(
  address: string,
  context: Context
): Promise<typeof Account.$inferSelect> {
  const chainId = context.network.chainId;
  const accountId = createEntityId(address, chainId) as `0x${string}`;

  // TBD: Change to upsert
  return await context.db
    .insert(Account)
    .values({
      id: accountId,
      chainId,
    })
    .onConflictDoUpdate({});
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

// TODO: On the future we might want to remove this call just for the input token
export async function getOrCreateToken(
  address: Address,
  context: Context
): Promise<typeof Token.$inferSelect> {
  const chainId = context.network.chainId;
  const tokenId = createEntityId(address, chainId);

  const token = await context.db.find(Token, { id: tokenId });

  if (token) return token;

  const tokenData = await context.client.multicall({
    contracts: [
      { address, abi: erc20Abi, functionName: "symbol" },
      { address, abi: erc20Abi, functionName: "decimals" },
      { address, abi: erc20Abi, functionName: "name" },
    ],
  });

  if (tokenData.some((data) => data === null)) {
    throw new Error(`Failed to fetch token data for ${address}`);
  }

  return await context.db.insert(Token).values({
    id: tokenId,
    chainId,
    symbol: tokenData[0].result as string,
    decimals: tokenData[1].result as number,
    name: tokenData[2].result as string,
  });
}

export async function insertOrUpdatePosition(
  context: Context,
  params: Omit<typeof Position.$inferInsert, "id">
) {
  const id = createPositionId(
    params.marketId,
    params.accountId,
    context.network.chainId
  );

  return await context.db
    .insert(Position)
    .values({
      id,
      ...params,
    })
    .onConflictDoUpdate(({ spTokenBalance, sTokenBalance, dTokenBalance }) => ({
      spTokenBalance: spTokenBalance + (params.spTokenBalance || 0n),
      sTokenBalance: sTokenBalance + (params.sTokenBalance || 0n),
      dTokenBalance: dTokenBalance + (params.dTokenBalance || 0n),
    }));
}
