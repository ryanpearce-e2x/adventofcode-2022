var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').toString();

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const scoring = [...alphabet, ...alphabet.toUpperCase()]

function* splitArrayIntoChunks(array, n) {
    for (let i = 0; i < array.length; i += n) {
      yield array.slice(i, i + n);
    }
  }

const rucksacks = input.split(/\n/);
const groups = [...splitArrayIntoChunks(rucksacks, 3)];

let totalScore = 0;
for (let i = 0; i < groups.length; i++) {
    const rucksacks = groups[i];
    const sharedItem = [...rucksacks[0]].find((x) => [...rucksacks[1]].includes(x) && [...rucksacks[2]].includes(x))
    const score = scoring.indexOf(sharedItem) + 1;
    totalScore += score;
}

console.log(totalScore);