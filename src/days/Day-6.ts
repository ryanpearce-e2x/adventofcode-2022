import { Day, IDay, Solution } from "../Day";

export default class Day6 extends Day implements IDay {
    constructor() {
        super(6);
    }

    duplicatesExist = (arr: any[]) => new Set(arr).size !== arr.length;

    getStartOfMessage(commandLength: number) {
        for (let i = 0; i < this.input.length; i++) {
            if (i <= this.input.length - commandLength) {
                const sequence = [...this.input].slice(i, i + commandLength);
                if (!this.duplicatesExist(sequence)) {
                    return i + commandLength;
                }
            } else {
                return -1;
            }
        }
        return -1;
    }

    partOne(): Solution {
        return this.getStartOfMessage(4);
    }

    partTwo(): Solution {
        return this.getStartOfMessage(14);
    }
}