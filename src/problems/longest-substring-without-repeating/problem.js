export default {
    id: 13,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Hash Map',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
        { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
        { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
        { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    hints: [
        'Use a sliding window approach.',
        'Use a Set or Map to track characters in the current window.',
    ],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Write your solution here

}`,
    functionName: 'lengthOfLongestSubstring',
};
