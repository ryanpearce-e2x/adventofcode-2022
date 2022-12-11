import { Day, IDay, Solution } from '../Day';

interface Operation {
  opCode: string;
  value?: number;
}

class CPU {
  program: Operation[];
  currentLine: number;
  cycle: number;
  wait: number;
  registers: {
    X: number;
  };

  constructor(program: Operation[]) {
    this.program = program;
    this.currentLine = 0;
    this.cycle = 1;
    this.wait = 0;
    this.registers = {
      X: 1,
    };
  }

  runCycle() {
    if (this.currentLine >= this.program.length) {
      return false;
    }
    this.cycle++;

    const line = this.program[this.currentLine];

    switch (line.opCode) {
      case 'noop':
        this.currentLine++;
        break;

      case 'addx':
        if (this.wait === 0) {
          this.wait = 1;
        } else {
          this.wait--;
          if (this.wait === 0) {
            this.registers.X += line.value ?? 0;
            this.currentLine++;
          }
        }
        break;
    }
    return true;
  }
}

class CRT {
  width: number;
  height: number;
  currentIndex: number;
  content: string[][];

  constructor(width = 40, height = 6) {
    this.width = width;
    this.height = height;
    this.currentIndex = 0;

    this.content = new Array(this.height).fill(0).map((_) => new Array(this.width).fill(' '));
  }

  runCycle(pos: number) {
    const x = this.currentIndex % this.width;
    const y = Math.floor(this.currentIndex / this.width);

    if (y >= this.height) {
      return;
    }

    if (Math.abs(x - pos) < 2) {
      this.content[y][x] = '#';
    } else {
      this.content[y][x] = '.';
    }

    this.currentIndex++;
  }

  print() {
    return this.content.map((line) => line.join('')).join('\n');
  }
}

export default class Day10 extends Day implements IDay {
  constructor() {
    super(10);
  }

  program: Operation[] = this.input
    .trim()
    .split(/\n/)
    .map((line) => {
      const input = line.split(' ');
      const operation: Operation = {
        opCode: input[0],
        value: input[0] === 'addx' ? Number(input[1]) : undefined,
      };
      return operation;
    });

  partOne(): Solution {
    const cpu = new CPU(this.program);
    let sum = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!cpu.runCycle()) {
        break;
      }
      if (cpu.cycle % 40 === 20) {
        sum += cpu.cycle * cpu.registers.X;
      }
    }
    return sum;
  }

  partTwo(): Solution {
    const cpu = new CPU(this.program);
    const crt = new CRT();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      crt.runCycle(cpu.registers.X);
      if (!cpu.runCycle()) {
        break;
      }
    }
    return '\n' + crt.print();
  }
}
