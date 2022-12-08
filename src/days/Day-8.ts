import { Day, IDay, Solution } from '../Day';

export default class Day8 extends Day implements IDay {
  constructor() {
    super(8);
  }

  createMap(rowCount: number, columnCount: number) {
    const map = Array.from({ length: rowCount }, (_, _i) =>
      Array.from({ length: columnCount }, (_, _j) => 0),
    );
    return map;
  }

  buildTreeGrid() {
    const gridLines = this.input.split(/\n/);
    const treeGrid = this.createMap(gridLines.length, gridLines.length);
    gridLines.forEach((line, i) => {
      const trees = [...line].map(Number);
      trees.forEach((tree, j) => {
        treeGrid[i][j] = tree;
      });
    });
    return treeGrid;
  }

  partOne(): Solution {
    const treeGrid = this.buildTreeGrid();
    let visibleTrees = 0;
    for (let y = 0; y < treeGrid.length; y++) {
      for (let x = 0; x < treeGrid.length; x++) {
        if (x === 0 || y === 0 || x === treeGrid.length - 1 || y === treeGrid.length - 1) {
          //count edge trees
          visibleTrees++;
          continue;
        }
        const currentTree = treeGrid[y][x];
        const adjacentTrees: Record<string, number[]> = {
          left: [],
          right: [],
          up: [],
          down: [],
        };
        //search left
        for (let newX = x - 1; newX >= 0; newX--) {
          const tree = treeGrid[y][newX];
          adjacentTrees.left.push(tree);
        }
        //search right
        for (let newX = x + 1; newX < treeGrid.length; newX++) {
          const tree = treeGrid[y][newX];
          adjacentTrees.right.push(tree);
        }
        //search up
        for (let newY = y - 1; newY >= 0; newY--) {
          const tree = treeGrid[newY][x];
          adjacentTrees.up.push(tree);
        }
        //search down
        for (let newY = y + 1; newY < treeGrid.length; newY++) {
          const tree = treeGrid[newY][x];
          adjacentTrees.down.push(tree);
        }
        const isVisible =
          adjacentTrees.left.every((x) => x < currentTree) ||
          adjacentTrees.right.every((x) => x < currentTree) ||
          adjacentTrees.up.every((x) => x < currentTree) ||
          adjacentTrees.down.every((x) => x < currentTree);
        if (isVisible) visibleTrees++;
      }
    }
    return visibleTrees;
  }

  partTwo(): Solution {
    return 0;
  }
}
