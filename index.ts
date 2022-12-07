import { Day1, Day2, Day3, Day4, Day5, Day6 } from './src/days';

const currentDays = [new Day1(), new Day2(), new Day3(), new Day4(), new Day5(), new Day6()];

currentDays.forEach((day, i) => {
  console.log(`-----Day ${i + 1}-----`);
  console.log('Part 1: ', day.partOne());
  console.log('Part 2: ', day.partTwo());
  console.log(`---------------`);
});
