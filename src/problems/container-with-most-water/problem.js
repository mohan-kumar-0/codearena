export default {
    id: 12,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Notice** that you may not slant the container.`,
    examples: [
        { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The max area is between indices 1 and 8.' },
        { input: 'height = [1,1]', output: '1', explanation: null },
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    hints: [
        'Use two pointers starting from both ends.',
        'Always move the pointer with the shorter height inward.',
    ],
    starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Write your solution here

}`,
    functionName: 'maxArea',
    editorial: {
        approach: 'Two Pointers',
        intuition: `Start with the widest container (pointers at both ends). Always move the shorter side inward, since moving the taller side can only reduce the area.`,
        steps: [
            'Initialize \`left = 0\`, \`right = n - 1\`, \`maxArea = 0\`.',
            'Compute area = \`Math.min(height[left], height[right]) * (right - left)\`.',
            'Update maxArea if this area is larger.',
            'Move the pointer with the smaller height inward.',
        ],
        solution: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}`,
        timeComplexity: 'O(n) -- single pass',
        spaceComplexity: 'O(1)',
    },
};
