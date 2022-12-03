var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').toString();

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const scoring = [...alphabet, ...alphabet.toUpperCase()]

const splitArrayInHalf = (array) => {
    const halfWay = array.length / 2;
    const leftHalf = array.slice(0, halfWay);
    const rightHalf = array.slice(halfWay, array.length);
    return [leftHalf, rightHalf];
}

const rucksacks = input.split(/\n/);
let totalScore = 0;
for (let i = 0; i < rucksacks.length; i++) {
    const rucksack = rucksacks[i];
    const compartments = splitArrayInHalf(rucksack);
    const sharedItem = [...compartments[0]].find((x) => [...compartments[1]].includes(x));
    const score = scoring.indexOf(sharedItem) + 1;
    totalScore += score;
}

console.log(totalScore);