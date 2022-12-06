import fs from 'fs';
import path from 'path';

export type Solution = number | string;

export class Day {
  input: string;
  constructor(day: number) {
    this.input = fs.readFileSync(path.join(__dirname, `/inputs/day-${day}.txt`), 'utf-8').toString();
  }
}

export interface IDay {
  partOne(): Solution;
  partTwo(): Solution;
}