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
};
