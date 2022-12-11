import { Day, IDay, Solution } from '../Day';

export default class Day9 extends Day implements IDay {
  constructor() {
    super(9);
  }

  directions: Record<string, number[]> = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, -1],
    D: [0, 1],
  };

  parseInstruction(instruction: string): [string, number] {
    const parts = instruction.split(' ');
    return [parts[0], Number(parts[1])];
  }

  simulate(knots: number) {
    const rope = Array.from({ length: knots }, () => [0, 0]),
      visited = new Set();

    this.input.split(/\n/).map((line) => {
      // eslint-disable-next-line prefer-const
      let [dir, steps] = this.parseInstruction(line);
      while (steps--) {
        rope[0] = rope[0].map((v, d) => v + this.directions[dir][d]);
        for (let i = 1; i < knots; i++) {
          if (rope[i - 1].some((v, d) => Math.abs(v - rope[i][d]) > 1)) {
            rope[i] = rope[i].map((v, d) => v + Math.sign(rope[i - 1][d] - v));
          }
        }
        visited.add(rope[knots - 1].join('_'));
      }
    });

    return visited.size;
  }

  partOne(): Solution {
    return this.simulate(2);
  }

  partTwo(): Solution {
    return this.simulate(10);
  }
}
