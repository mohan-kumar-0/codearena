export default {
    id: 5,
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Array',
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
        {
            input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
            output: '[[1,6],[8,10],[15,18]]',
            explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
        },
        {
            input: 'intervals = [[1,4],[4,5]]',
            output: '[[1,5]]',
            explanation: 'Intervals [1,4] and [4,5] are considered overlapping.',
        },
    ],
    constraints: [
        '1 <= intervals.length <= 10^4',
        'intervals[i].length == 2',
        '0 <= start_i <= end_i <= 10^4',
    ],
    hints: [
        'Sort the intervals by their start time.',
        'Iterate through sorted intervals and merge if the current interval overlaps with the previous one.',
    ],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  // Write your solution here

}`,
    functionName: 'merge',
};
