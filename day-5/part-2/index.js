var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').toString();

const lines = input.match(/.*?]/gs).join('').split(/\n/);

const map = [[], [], [], [], [], [], [], [], []];

lines.forEach((line, _i) => {
    for (let i = 0; i < 9; i++) {
        const letter = line[i * 4 + 1];
        if(letter !== ' ') {
            map[i].push(letter);
        }
    }
});

const matches = input.matchAll(/move (\d+) from (\d+) to (\d+)/g);
for(const match of matches) {
    const [, amount, from, to] = match;
    const moveFrom = map[from - 1];
    const moveTo = map[to - 1];
    const lettersToMove = [];
    for (let i = 0; i < amount; i++) {
        const letterToMove = moveFrom.reverse().pop();
        lettersToMove.push(letterToMove);
        moveFrom.reverse();
    }
    lettersToMove.reverse();
    moveTo.reverse()
    moveTo.push(...lettersToMove)
    moveTo.reverse();
}

console.log(map.map((x) => x[0]).join(''));