export default {
    id: 18,
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'String',
    description: `Given a string \`s\`, return the **longest palindromic substring** in \`s\`.`,
    examples: [
        { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
        { input: 's = "cbbd"', output: '"bb"', explanation: null },
    ],
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'],
    hints: [
        'Try expanding around each center.',
        'There are 2n - 1 centers (each character and each gap between characters).',
    ],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  // Write your solution here

}`,
    functionName: 'longestPalindrome',
};
