import { Day, IDay, Solution } from '../Day';

interface Monkey {
  list: bigint[];
  operation: string;
  test: number;
  trueCondition: number;
  falseCondition: number;
  itemChecks: number;
}

export default class Day11 extends Day implements IDay {
  constructor() {
    super(11);
  }

  getMonkeys(): Monkey[] {
    return this.input.split(/\n{2}/).map((parts) => {
      const lines = parts.split(/\n/);
      const list = lines[1]
        .split(': ')[1]
        .split(', ')
        .map((num) => BigInt(num));
      const operation = lines[2].split(' = ')[1];
      const test = Number(lines[3].split('by ')[1]);
      const trueCondition = Number(lines[4].split('monkey ')[1]);
      const falseCondition = Number(lines[5].split('monkey ')[1]);

      return { list, operation, test, trueCondition, falseCondition, itemChecks: 0 };
    });
  }

  doRounds(monkeys: Monkey[], rounds: number) {
    const highestValue = monkeys.reduce((acc, monkey) => (acc *= monkey.test), 1);
    for (let round = 0; round < rounds; round++) {
      for (let i = 0; i < monkeys.length; i++) {
        while (monkeys[i].list.length != 0) {
          const worryLevel =
            rounds > 20
              ? eval(
                  monkeys[i].operation.replace(/old/g, monkeys[i].list.shift()?.toString() ?? ''),
                ) % highestValue
              : Math.floor(
                  eval(
                    monkeys[i].operation.replace(/old/g, monkeys[i].list.shift()?.toString() ?? ''),
                  ) / 3,
                );
          monkeys[
            monkeys[i][worryLevel % monkeys[i].test == 0 ? 'trueCondition' : 'falseCondition']
          ].list.push(BigInt(worryLevel));
          monkeys[i].itemChecks++;
        }
      }
    }
  }

  partOne(): Solution {
    const monkeys = this.getMonkeys();
    this.doRounds(monkeys, 20);

    monkeys.sort((a, b) => b.itemChecks - a.itemChecks);
    return monkeys[0].itemChecks * monkeys[1].itemChecks;
  }

  partTwo(): Solution {
    const monkeys = this.getMonkeys();
    this.doRounds(monkeys, 10000);

    monkeys.sort((a, b) => b.itemChecks - a.itemChecks);
    return monkeys[0].itemChecks * monkeys[1].itemChecks;
  }
}
