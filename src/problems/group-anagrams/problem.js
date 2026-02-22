export default {
    id: 14,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Hash Map',
    description: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in **any order**.

An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.`,
    examples: [
        { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: null },
        { input: 'strs = [""]', output: '[[""]]', explanation: null },
        { input: 'strs = ["a"]', output: '[["a"]]', explanation: null },
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
    hints: [
        'Two strings are anagrams if and only if their sorted forms are equal.',
        'Use a hash map where the key is the sorted string.',
    ],
    starterCode: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // Write your solution here

}`,
    functionName: 'groupAnagrams',
    editorial: {
        approach: 'Sorted Key Hash Map',
        intuition: `Two strings are anagrams if and only if they have the same characters in sorted order. Use the sorted string as a hash map key to group anagrams together.`,
        steps: [
            'Create a hash map where keys are sorted strings and values are arrays of original strings.',
            'For each string, sort its characters to get the key.',
            'Push the original string into the corresponding group.',
            'Return all values from the map.',
        ],
        solution: `function groupAnagrams(strs) {
  const map = {};
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(s);
  }
  return Object.values(map);
}`,
        timeComplexity: 'O(n * k log k) -- where k is the max string length',
        spaceComplexity: 'O(n * k) -- storing all strings in the map',
    },
};
