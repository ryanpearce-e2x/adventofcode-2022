import { Day, IDay, Solution } from "../Day";

type MatchType = 'full' | 'partial';

export default class Day4 extends Day implements IDay {
    constructor() {
        super(4);
    }

    assignmentPairs = this.input.split(/\n/);

    getBounds = (range: string) => range.split('-').map((x) => parseInt(x));

    createRange = (from: number, to: number) => Array.from({ length: to + 1 - from }, (_x, i) => i + from);

    arrayContains(array1: any[], array2: any[], matchType: MatchType) {
        return matchType === 'full' ? array2.every(x => array1.includes(x)) : array2.some(x => array1.includes(x));
    }

    getOverlapCount(matchType: MatchType) {
        let overlapCount = 0;
        for (let i = 0; i < this.assignmentPairs.length; i++) {
            const pair = this.assignmentPairs[i];
            const [range1, range2] = pair.split(',');
            const [lowerBound1, upperBound1] = this.getBounds(range1);
            const [lowerBound2, upperBound2] = this.getBounds(range2);
            const [array1, array2] = [this.createRange(lowerBound1, upperBound1), this.createRange(lowerBound2, upperBound2)];
            const contains = this.arrayContains(array1, array2, matchType) || this.arrayContains(array2, array1, matchType);
            if (contains) overlapCount++;
        }
        return overlapCount;
    }

    partOne(): Solution {
        return this.getOverlapCount('full');
    }

    partTwo(): Solution {
        return this.getOverlapCount('partial');
    }
}