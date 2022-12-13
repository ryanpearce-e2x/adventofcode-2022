import { Day, IDay, Solution } from '../Day';

export default class Day12 extends Day implements IDay {
  constructor() {
    super(12);
  }

  searchShortestPath = (map: number[], rowLength: number, start: number, end: number) => {
    let queue = [[start, 0]];
    const visited = new Set([start]);
    while (queue.length) {
      const [pos, steps] = queue.shift()!;
      if (pos === end) return steps;
      queue = queue.concat(
        [rowLength, -rowLength, 1, -1]
          .map((d) => d + pos)
          .filter((p) => map[p] <= map[pos] + 1)
          .filter((c) => !visited.has(c))
          .map((c) => (visited.add(c), [c, steps + 1])),
      );
    }
    return Number.MAX_SAFE_INTEGER;
  };

  parseMap = ([...input]: string): [number[], number, number, number] => {
    const rowLength = input.indexOf('\n');
    const map = input.filter((c) => c !== '\n').map((v) => v.charCodeAt(0));

    const [start, end] = ['S', 'E']
      .map((v) => v.charCodeAt(0))
      .map((p) => map.findIndex((i) => i === p));
    (
      [
        ['a', start],
        ['z', end],
      ] as [string, number][]
    ).forEach(([c, p]) => (map[p] = c.charCodeAt(0)));
    return [map, rowLength, start, end];
  };

  partOne(): Solution {
    return this.searchShortestPath(...this.parseMap(this.input));
  }

  partTwo(): Solution {
    return (([map, rowLength, , end]) =>
      map
        .map((c: any, i: any) => [c, i])
        .filter(([c]) => c === 'a'.charCodeAt(0))
        .map(([, start]) => this.searchShortestPath(map, rowLength, start, end))
        .reduce((min: number, v: number) => (min < v ? min : v)))(this.parseMap(this.input));
  }
}
