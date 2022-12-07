import { Day, IDay, Solution } from '../Day';

export default class Day1 extends Day implements IDay {
  constructor() {
    super(1);
  }

  getElfCalories(): number[] {
    const elfCaloriesArray = this.input.split(/\n{2}/);
    const elfCalories = elfCaloriesArray.map((calorieList) =>
      calorieList
        .split(/\n/)
        .map((calories) => parseInt(calories))
        .reduce((a, b) => a + b),
    );
    return elfCalories;
  }

  partOne(): Solution {
    const elfCalories = this.getElfCalories();
    const highestCalories = Math.max(...elfCalories);
    return highestCalories;
  }

  partTwo(): Solution {
    const elfCalories = this.getElfCalories();
    const topThree = elfCalories.sort((a, b) => b - a).slice(0, 3);
    const totalCalories = topThree.reduce((a, b) => a + b);
    return totalCalories;
  }
}
