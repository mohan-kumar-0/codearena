export default {
    id: 20,
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    category: 'Sliding Window',
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.

The testcases will be generated such that the answer is **unique**.`,
    examples: [
        { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes A, B, and C from string t.' },
        { input: 's = "a", t = "a"', output: '"a"', explanation: 'The entire string s is the minimum window.' },
        { input: 's = "a", t = "aa"', output: '""', explanation: 'Both a\'s from t must be included, which is impossible.' },
    ],
    constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
    hints: [
        'Use the sliding window technique with two pointers.',
        'Expand the right pointer to find a valid window, then contract the left pointer to find the minimum.',
        'Use a frequency map to track required characters.',
    ],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
  // Write your solution here

}`,
    functionName: 'minWindow',
};
