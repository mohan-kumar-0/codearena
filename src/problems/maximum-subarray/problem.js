export default {
    id: 4,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A **subarray** is a contiguous non-empty sequence of elements within an array.`,
    examples: [
        {
            input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
            output: '6',
            explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
        },
        {
            input: 'nums = [1]',
            output: '1',
            explanation: 'The subarray [1] has the largest sum 1.',
        },
        {
            input: 'nums = [5,4,-1,7,8]',
            output: '23',
            explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.',
        },
    ],
    constraints: [
        '1 <= nums.length <= 10^5',
        '-10^4 <= nums[i] <= 10^4',
    ],
    hints: [
        'Think about Kadane\'s algorithm.',
        'At each position, decide whether to extend the current subarray or start a new one.',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your solution here

}`,
    functionName: 'maxSubArray',
    editorial: {
        approach: "Kadane's Algorithm",
        intuition: `At each position, we decide: should we extend the current subarray or start a new one here? If the running sum becomes negative, it is better to start fresh from the current element.`,
        steps: [
            'Initialize \`currentSum\` and \`maxSum\` both to \`nums[0]\`.',
            'Iterate from index 1. At each step, set \`currentSum = Math.max(nums[i], currentSum + nums[i])\`.',
            'Update \`maxSum = Math.max(maxSum, currentSum)\`.',
            'Return \`maxSum\` after the loop.',
        ],
        solution: `function maxSubArray(nums) {
  let current = nums[0];
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    max = Math.max(max, current);
  }
  return max;
}`,
        timeComplexity: 'O(n) -- single pass',
        spaceComplexity: 'O(1) -- only two variables',
    },
};
