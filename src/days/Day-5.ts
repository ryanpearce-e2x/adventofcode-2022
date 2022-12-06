import { Day, IDay, Solution } from "../Day";

export default class Day5 extends Day implements IDay {
    constructor() {
        super(5);
    }

    lines = this.input.match(/.*?]/gs)?.join('').split(/\n/);
    map: string[][] = [];

    setMap() {
        this.map = [[], [], [], [], [], [], [], [], []];
        this.lines?.forEach((line, _i) => {
            for (let i = 0; i < 9; i++) {
                const letter = line[i * 4 + 1];
                if (letter !== ' ') {
                    this.map[i].push(letter);
                }
            }
        });
    }

    get moves() {
        return this.input.matchAll(/move (\d+) from (\d+) to (\d+)/g);
    }

    getMoveCommands = (move: RegExpMatchArray) => [move[1], move[2], move[3]].map(Number);

    partOne(): Solution {
        this.setMap();
        const moves = this.moves;
        for (const move of moves) {
            const [amount, from, to] = this.getMoveCommands(move);
            const moveFrom = this.map[from - 1];
            const moveTo = this.map[to - 1];
            for (let i = 0; i < amount; i++) {
                const letterToMove = moveFrom.reverse().pop()!!;
                moveFrom.reverse();
                moveTo.reverse()
                moveTo.push(letterToMove)
                moveTo.reverse();
            }
        }
        return this.map.map((x) => x[0]).join('');
    }

    partTwo(): Solution {
        this.setMap();
        const moves = this.moves;
        for (const move of moves) {
            const [amount, from, to] = this.getMoveCommands(move);
            const moveFrom = this.map[from - 1];
            const moveTo = this.map[to - 1];
            const lettersToMove: string[] = [];
            for (let i = 0; i < amount; i++) {
                const letterToMove = moveFrom.reverse().pop()!!;
                lettersToMove.push(letterToMove);
                moveFrom.reverse();
            }
            lettersToMove.reverse();
            moveTo.reverse()
            moveTo.push(...lettersToMove)
            moveTo.reverse();
        }
        return this.map.map((x) => x[0]).join('');
    }
}