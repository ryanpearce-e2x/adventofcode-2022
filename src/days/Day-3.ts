import { Day, IDay, Solution } from '../Day';

export default class Day3 extends Day implements IDay {
  constructor() {
    super(3);
  }

  rucksacks = this.input.split(/\n/);
  alphabet = 'abcdefghijklmnopqrstuvwxyz';
  scoring = [...this.alphabet, ...this.alphabet.toUpperCase()];

  splitArrayInHalf(array: any[]) {
    const halfWay = array.length / 2;
    const leftHalf = array.slice(0, halfWay);
    const rightHalf = array.slice(halfWay, array.length);
    return [leftHalf, rightHalf];
  }

  *splitArrayIntoChunks(array: any[], n: number) {
    for (let i = 0; i < array.length; i += n) {
      yield array.slice(i, i + n);
    }
  }

  partOne(): Solution {
    let totalScore = 0;
    for (let i = 0; i < this.rucksacks.length; i++) {
      const rucksack = this.rucksacks[i];
      const compartments = this.splitArrayInHalf([...rucksack]);
      const sharedItem = [...compartments[0]].find((x) => [...compartments[1]].includes(x));
      const score = this.scoring.indexOf(sharedItem) + 1;
      totalScore += score;
    }
    return totalScore;
  }

  partTwo(): Solution {
    const groups = [...this.splitArrayIntoChunks(this.rucksacks, 3)];
    let totalScore = 0;
    for (let i = 0; i < groups.length; i++) {
      const rucksacks = groups[i];
      const sharedItem = [...rucksacks[0]].find(
        (x) => [...rucksacks[1]].includes(x) && [...rucksacks[2]].includes(x),
      );
      const score = this.scoring.indexOf(sharedItem) + 1;
      totalScore += score;
    }
    return totalScore;
  }
}
