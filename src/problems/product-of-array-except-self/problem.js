export default {
    id: 17,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Array',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in **O(n)** time and without using the division operation.`,
    examples: [
        { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: null },
        { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: null },
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix is guaranteed to fit in a 32-bit integer.'],
    hints: [
        'Think about prefix and suffix products.',
        'First pass: calculate prefix products. Second pass: multiply by suffix products.',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  // Write your solution here

}`,
    functionName: 'productExceptSelf',
};
