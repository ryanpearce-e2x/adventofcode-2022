import { Day, IDay, Solution } from "../Day";

type Move = 'rock' | 'paper' | 'scissors';

interface RuleSet {
    aliases: string[],
    beats: Move,
    points: number,
}

interface Ruling {
    rock: RuleSet,
    paper: RuleSet,
    scissors: RuleSet,
}

export default class Day2 extends Day implements IDay {
    constructor() {
        super(2)
    }

    getRealMove = (move: string, ruling: Ruling): Move => {
        const realMove = Object.keys(ruling).find((key) => ruling[key as Move].aliases.includes(move))!!
        return realMove as Move;
    }

    getResponseMove = (move: Move, condition: string, ruling: Ruling): Move => {
        if (condition === 'X') {
            //Lose
            return Object.keys(ruling).find((key) => ruling[key as Move].beats !== move && key !== move) as Move;
        }
        else if (condition === 'Z') {
            //Win
            return Object.keys(ruling).find((key) => ruling[key as Move].beats === move) as Move;
        }
        else {
            //Draw
            return move;
        }
    }

    playGame(move1: string, move2: string, ruling: Ruling, part: number) {
        const realMove1 = this.getRealMove(move1, ruling);
        const realMove2 = part === 1 ? this.getRealMove(move2, ruling) : this.getResponseMove(realMove1, move2, ruling);
        const move1Ruling = ruling[realMove1];
        const move2Ruling = ruling[realMove2];
        let points = 0;

        if (move2Ruling.beats === realMove1) {
            //Win
            points += 6 + move2Ruling.points;
        }
        else if (move1Ruling.beats === realMove2) {
            //Loss
            points += move2Ruling.points;
        }
        else {
            //Draw
            points += 3 + move2Ruling.points;
        }
        return points;
    }

    playGames(ruling: Ruling, part: number) {
        const movesArray = this.input.split(/\n/);
        let totalScore = 0;
        for (let i = 0; i < movesArray.length; i++) {
            const moves = movesArray[i].split(' ');
            const gameScore = this.playGame(moves[0], moves[1], ruling, part);
            totalScore += gameScore;
        }
        return totalScore;
    }

    partOne(): Solution {
        const ruling: Ruling = {
            rock: {
                aliases: ['A', 'X'],
                beats: 'scissors',
                points: 1
            },
            paper: {
                aliases: ['B', 'Y'],
                beats: 'rock',
                points: 2
            },
            scissors: {
                aliases: ['C', 'Z'],
                beats: 'paper',
                points: 3
            }
        }
        return this.playGames(ruling, 1);
    }

    partTwo(): Solution {
        const ruling: Ruling = {
            rock: {
                aliases: ['A'],
                beats: 'scissors',
                points: 1
            },
            paper: {
                aliases: ['B'],
                beats: 'rock',
                points: 2
            },
            scissors: {
                aliases: ['C'],
                beats: 'paper',
                points: 3
            }
        }
        return this.playGames(ruling, 2);
    }
}