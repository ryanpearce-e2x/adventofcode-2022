import { Day, IDay, Solution } from '../Day';

class Directory {
  name: string;
  parent?: Directory;
  directories: Directory[];
  files: File[];

  constructor(name: string, parent?: Directory) {
    this.name = name;
    this.parent = parent;
    this.directories = [];
    this.files = [];
  }

  calculateSize(): number {
    let total = 0;
    this.directories.forEach((dir) => {
      total += dir.calculateSize();
    });
    total += this.files.map((x) => x.size).reduce((a, b) => a + b, 0);
    return total;
  }

  get size(): number {
    return this.calculateSize();
  }

  get allDirectories(): Directory[] {
    const directories: Directory[] = [];
    this.directories.forEach((dir) => {
      directories.push(...dir.allDirectories);
    });
    return [...this.directories, ...directories];
  }

  addDirectory(d: Directory) {
    this.directories.push(d);
  }

  addFile(f: File) {
    this.files.push(f);
  }
}

class File {
  size: number;

  constructor(size: number) {
    this.size = size;
  }
}

export default class Day7 extends Day implements IDay {
  constructor() {
    super(7);
  }

  terminalLines = this.input.split(/\n/);

  buildRootDirectory(): Directory {
    const rootDirectory = new Directory('/');
    let currentDirectory: Directory | undefined = rootDirectory;
    this.terminalLines.forEach((line) => {
      const cdMatch = line.match(/^\$ cd (.*)/);
      const fileSizeMatch = line.match(/^(\d+) .*/);
      if (cdMatch) {
        const dirName = cdMatch[1];
        if (dirName != '..') {
          if (dirName !== '/') {
            const newDir = new Directory(dirName, currentDirectory);
            currentDirectory?.addDirectory(newDir);
            currentDirectory = newDir;
          }
        } else {
          currentDirectory = currentDirectory?.parent;
        }
      } else if (fileSizeMatch) {
        const fileSize = parseInt(fileSizeMatch[1]);
        currentDirectory?.addFile(new File(fileSize));
      }
    });
    return rootDirectory;
  }

  partOne(): Solution {
    const rootDirectory = this.buildRootDirectory();
    const oneHundredKDirs = rootDirectory.allDirectories.filter((x) => x.size <= 100000);
    return oneHundredKDirs.map((x) => x.size).reduce((a, b) => a + b);
  }

  partTwo(): Solution {
    return '';
  }
}
