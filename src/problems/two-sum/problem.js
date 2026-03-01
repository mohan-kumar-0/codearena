export default {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
        {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        },
        {
            input: 'nums = [3,2,4], target = 6',
            output: '[1,2]',
            explanation: null,
        },
        {
            input: 'nums = [3,3], target = 6',
            output: '[0,1]',
            explanation: null,
        },
    ],
    constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.',
    ],
    hints: [
        'A brute force approach would check every pair of numbers. Can you do better?',
        'Try using a hash map to store numbers you\'ve already seen, mapping each value to its index.',
    ],
    starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here

}`,
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`
    },
    functionName: 'twoSum',
    editorial: {
        approach: 'Hash Map',
        intuition: `The brute force solution checks every pair, giving O(n^2) time. We can do better by recognizing that for each number, we need to find if its complement (target - num) exists in the array.

A hash map lets us store each number as we iterate and look up complements in O(1) time.`,
        steps: [
            'Create an empty hash map to store values and their indices.',
            'Iterate through the array. For each element, compute \`complement = target - nums[i]\`.',
            'Check if the complement already exists in the map. If yes, return \`[map[complement], i]\`.',
            'Otherwise, store \`nums[i] -> i\` in the map and continue.',
        ],
        solution: {
            javascript: `function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in map) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
}`,
            python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {} # val : index
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i`,
            cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> prevMap;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (prevMap.find(diff) != prevMap.end()) {
            return {prevMap[diff], i};
        }
        prevMap[nums[i]] = i;
    }
    return {};
}`
        },
        timeComplexity: 'O(n) -- single pass through the array',
        spaceComplexity: 'O(n) -- hash map stores up to n elements',
    },
};
