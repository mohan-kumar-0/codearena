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
    editorial: {
        approach: 'Expand Around Center',
        intuition: `A palindrome mirrors around its center. There are 2n - 1 possible centers (each character, and each gap between characters). Expand outward from each center and track the longest palindrome found.`,
        steps: [
            'For each index i, expand around center (i, i) for odd-length palindromes.',
            'Also expand around center (i, i+1) for even-length palindromes.',
            'Track the start and length of the longest palindrome found.',
        ],
        solution: `function longestPalindrome(s) {
  let start = 0, maxLen = 1;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--;
      r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.substring(start, start + maxLen);
}`,
        timeComplexity: 'O(n^2) -- expanding from each center',
        spaceComplexity: 'O(1)',
    },
};
