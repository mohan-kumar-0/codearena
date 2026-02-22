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
    editorial: {
        approach: 'Sorting',
        intuition: `If we sort intervals by their start time, overlapping intervals will be adjacent. We can then merge them in a single pass by comparing each interval's start with the previous interval's end.`,
        steps: [
            'Sort intervals by their start value.',
            'Initialize a result array with the first interval.',
            'For each subsequent interval, compare its start with the end of the last merged interval.',
            'If they overlap (start <= previous end), extend the previous end to \`Math.max(prevEnd, currentEnd)\`.',
            'Otherwise, push the current interval as a new entry.',
        ],
        solution: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}`,
        timeComplexity: 'O(n log n) -- dominated by the sort',
        spaceComplexity: 'O(n) -- result array',
    },
};
