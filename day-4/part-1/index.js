var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').toString();

const assignmentPairs = input.split(/\n/);

const getBounds = (range) => {
    return range.split('-').map((x) => parseInt(x));
}

const createRange = (from, to) => {
    return Array.from({ length: to + 1 - from }, (_x, i) => i + from);
}

const arrayFullyContains = (array1, array2) => {
    return array2.every(x => array1.includes(x));
}

let overlapCount = 0;
for (let i = 0; i < assignmentPairs.length; i++) {
    const pair = assignmentPairs[i];
    const [range1, range2] = pair.split(',');
    const [lowerBound1, upperBound1] = getBounds(range1);
    const [lowerBound2, upperBound2] = getBounds(range2);
    const [array1, array2] = [createRange(lowerBound1, upperBound1), createRange(lowerBound2, upperBound2)];
    const fullyContains = arrayFullyContains(array1, array2) || arrayFullyContains(array2, array1);
    if(fullyContains) overlapCount++;
}

console.log(overlapCount);