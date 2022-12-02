var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').toString();

const ruling = {
    rock: {
        alias: 'A',
        beats: 'scissors',
        points: 1
    },
    paper: {
        alias: 'B',
        beats: 'rock',
        points: 2
    },
    scissors: {
        alias: 'C',
        beats: 'paper',
        points: 3
    }
}

const playGame = (move1, condition) => {
    const realMove1 = getRealMove(move1);
    const realMove2 = getResponseMove(realMove1, condition);
    const move1Ruling = ruling[realMove1];
    const move2Ruling = ruling[realMove2];
    let points = 0;

    if(move2Ruling.beats === realMove1) {
        //Win
        points += 6 + move2Ruling.points;
    }
    else if(move1Ruling.beats === realMove2) {
        //Loss
        points += move2Ruling.points;
    }
    else {
        //Draw
        points += 3 + move2Ruling.points;
    }
    return points;
}

const getRealMove = (move) => {
    const realMove = Object.keys(ruling).find((key) => ruling[key].alias === move);
    return realMove;
}

const getResponseMove = (move, condition) => {
    if(condition === 'X') {
        //Lose
        return Object.keys(ruling).find((key) => ruling[key].beats !== move && key !== move);
    }
    else if(condition === 'Z') {
        //Win
        return Object.keys(ruling).find((key) => ruling[key].beats === move);
    }
    else {
        //Draw
        return move;
    }
}

const playGames = (input) => {
    const movesArray = input.split(/\n/);
    let totalScore = 0;
    for(let i = 0; i < movesArray.length; i++) {
        const moves = movesArray[i].split(' ');
        const gameScore = playGame(moves[0], moves[1]);
        totalScore += gameScore;
    }
    return totalScore;
}

console.log(playGames(input));