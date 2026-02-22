export default {
    id: 6,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Two Pointers',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
        {
            input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
            output: '6',
            explanation: 'The elevation map can trap 6 units of rain water.',
        },
        {
            input: 'height = [4,2,0,3,2,5]',
            output: '9',
            explanation: null,
        },
    ],
    constraints: [
        'n == height.length',
        '1 <= n <= 2 * 10^4',
        '0 <= height[i] <= 10^5',
    ],
    hints: [
        'Think about what determines the water level at each position.',
        'The water at any position is determined by the minimum of the maximum heights to its left and right, minus the height at that position.',
        'Can you use two pointers to solve this in O(n) time and O(1) space?',
    ],
    starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  // Write your solution here

}`,
    functionName: 'trap',
    editorial: {
        approach: 'Two Pointers',
        intuition: `Water trapped at each position depends on the minimum of the maximum heights to its left and right, minus the current height. Two pointers from both ends let us track these maxima without extra arrays.`,
        steps: [
            'Initialize \`left = 0\`, \`right = n - 1\`, \`leftMax = 0\`, \`rightMax = 0\`, \`water = 0\`.',
            'While left < right:',
            'If \`height[left] < height[right]\`, process the left side: update leftMax, add \`leftMax - height[left]\` to water, increment left.',
            'Otherwise, process the right side: update rightMax, add \`rightMax - height[right]\` to water, decrement right.',
        ],
        solution: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
        timeComplexity: 'O(n) -- single pass with two pointers',
        spaceComplexity: 'O(1) -- constant extra space',
    },
};
