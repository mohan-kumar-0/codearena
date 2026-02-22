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
};
