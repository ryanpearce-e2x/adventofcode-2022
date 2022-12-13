import { Day, IDay, Solution } from '../Day';

export default class Day13 extends Day implements IDay {
  constructor() {
    super(13);
  }

  get pairs() {
    return this.input.split(/\n{2}/).map((pair) => pair.split(/\n/).map((signal) => eval(signal)));
  }

  wrapArray<T>(a: T | T[]): T[] {
    return Array.isArray(a) ? a : [a];
  }

  deepClone<T>(input: T): T {
    return JSON.parse(JSON.stringify(input));
  }

  compareToBoolean = (num: number): boolean | undefined => {
    if (num === 0) return undefined;
    if (num < 0) return true;
    return false;
  };

  compare = (a: number | number[], b: number | number[]): number | boolean | undefined => {
    if (!Array.isArray(a) && !Array.isArray(b)) return this.compareToBoolean(a - b);
    const [aArray, bArray] = [a, b].map(this.wrapArray).map(this.deepClone);
    while (aArray.length && bArray.length) {
      const result = this.compare(aArray.shift()!, bArray.shift()!);
      if (result !== undefined) return result;
    }
    if (aArray.length) return false;
    if (bArray.length) return true;
    return undefined;
  };

  sort(arr: number[][][]) {
    let swapped = true;
    while (swapped) {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (this.compare(arr[i + 1] as unknown as number, arr[i] as unknown as number)) {
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    }
    return arr;
  }

  findDecoderKeys = (pairs: number[][][][]) => {
    const decoderKeys: number[][][] = [[[2]], [[6]]];
    const sortedSignals = this.sort(this.deepClone(pairs).flat().concat(decoderKeys));
    const keys = decoderKeys
      .map((key) =>
        sortedSignals.findIndex((signal) => JSON.stringify(signal) === JSON.stringify(key)),
      )
      .map((key) => key + 1);
    return keys;
  };

  partOne(): Solution {
    return Number(
      this.deepClone(this.pairs)
        .map(([a, b]) => this.compare(a, b))
        .reduce((acc, bool, i) => (bool ? Number(acc) + i + 1 : acc), 0),
    );
  }

  partTwo(): Solution {
    return this.findDecoderKeys(this.pairs).reduce((a, b) => a * b);
  }
}
