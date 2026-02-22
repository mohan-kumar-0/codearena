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
    editorial: {
        approach: 'Prefix and Suffix Products',
        intuition: `For each index, the answer is the product of everything to its left multiplied by the product of everything to its right. We can compute these in two passes without division.`,
        steps: [
            'First pass (left to right): build a prefix product array where \`result[i]\` = product of all elements before i.',
            'Second pass (right to left): multiply each \`result[i]\` by the running suffix product.',
        ],
        solution: `function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n);
  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}`,
        timeComplexity: 'O(n) -- two passes',
        spaceComplexity: 'O(1) -- output array does not count as extra space',
    },
};
