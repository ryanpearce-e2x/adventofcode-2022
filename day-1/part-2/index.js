var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').toString();

const getHighestCalories = (input) => {
    const elfCaloriesArray = input.split(/\n{2}/)
    const elfCalories = elfCaloriesArray.map((calorieList) => calorieList.split(/\n/).map((calories) => parseInt(calories)).reduce((a, b) => a + b));
    const topThree = elfCalories.sort((a, b) => b - a).slice(0, 3);
    const totalCalories = topThree.reduce((a, b) => a + b);
    return totalCalories;
}

console.log(getHighestCalories(input));