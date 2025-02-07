export const WAD = 1000000000000000000n;
export const RAY = 1000000000000000000000000000000000000n;

export const TWO_WAD = 2000000000000000000n;
export const FOUR_WAD = 4000000000000000000n;
export const HUNDRED_WAD = 100000000000000000000n;

export const abs = (n: bigint): bigint => (n < 0n ? -n : n);

export const min = (values: bigint[]): bigint =>
  values.reduce((a, b) => (a < b ? a : b));

export const max = (values: bigint[]): bigint =>
  values.reduce((a, b) => (a > b ? a : b));

export class MathSol {
  static max(a: bigint, b: bigint): bigint {
    return a >= b ? a : b;
  }

  static min(a: bigint, b: bigint): bigint {
    return a < b ? a : b;
  }

  static MAX_POW_RELATIVE_ERROR = 10000n;

  static mulDownFixed(a: bigint, b: bigint): bigint {
    const product = a * b;
    return product / WAD;
  }

  static mulUpFixed(a: bigint, b: bigint): bigint {
    const product = a * b;

    if (product === 0n) {
      return 0n;
    }
    return (product - 1n) / WAD + 1n;
  }

  static divDownFixed(a: bigint, b: bigint): bigint {
    if (a === 0n) {
      return 0n;
    }
    const aInflated = a * WAD;
    return aInflated / b;
  }

  static divUpFixed(a: bigint, b: bigint): bigint {
    if (a === 0n) {
      return 0n;
    }
    const aInflated = a * WAD;
    return (aInflated - 1n) / b + 1n;
  }

  static divUp(a: bigint, b: bigint): bigint {
    if (a === 0n) {
      return 0n;
    }
    return 1n + (a - 1n) / b;
  }
}
