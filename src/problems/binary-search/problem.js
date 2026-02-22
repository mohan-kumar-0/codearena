export default {
    id: 16,
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
        { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
        { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique.', 'nums is sorted in ascending order.'],
    hints: [
        'Use two pointers: left and right.',
        'Compare the middle element with the target and eliminate half of the search space.',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Write your solution here

}`,
    functionName: 'search',
    editorial: {
        approach: 'Binary Search',
        intuition: `Since the array is sorted, compare the target with the middle element. If it matches, return the index. If the target is smaller, search the left half. Otherwise, search the right half.`,
        steps: [
            'Initialize \`left = 0\`, \`right = nums.length - 1\`.',
            'While left <= right, compute \`mid = Math.floor((left + right) / 2)\`.',
            'If \`nums[mid] === target\`, return mid.',
            'If \`nums[mid] < target\`, set \`left = mid + 1\`.',
            'Else set \`right = mid - 1\`.',
            'If not found, return -1.',
        ],
        solution: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        timeComplexity: 'O(log n) -- halve the search space each step',
        spaceComplexity: 'O(1)',
    },
};
