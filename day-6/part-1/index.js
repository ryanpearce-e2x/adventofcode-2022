var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').toString();

const duplicatesExist = (arr) => new Set(arr).size !== arr.length;

for (let i = 0; i < input.length; i++) {
  if(i <= input.length - 4) {
    const sequence = [...input].slice(i, i + 4);
    if(!duplicatesExist(sequence)) {
      console.log(sequence, i + 4);
      break;
    }
  }
}