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
    editorial: {
        approach: 'Sliding Window with Frequency Map',
        intuition: `Expand the right pointer to find a window that contains all characters of t. Then contract the left pointer to find the smallest such window. Use frequency maps to track required vs. current character counts.`,
        steps: [
            'Build a frequency map of characters in t.',
            'Use two pointers (left, right) and a counter for how many characters are still needed.',
            'Expand right: add characters, decrement the needed counter when a required character is fully satisfied.',
            'When all characters are satisfied, try to shrink from the left to find the minimum window.',
            'Track the smallest valid window throughout.',
        ],
        solution: `function minWindow(s, t) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let required = Object.keys(need).length;
  const window = {};
  let formed = 0, left = 0;
  let minLen = Infinity, minStart = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;
    if (need[c] && window[c] === need[c]) formed++;
    while (formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const d = s[left];
      window[d]--;
      if (need[d] && window[d] < need[d]) formed--;
      left++;
    }
  }
  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}`,
        timeComplexity: 'O(m + n) -- each character is visited at most twice',
        spaceComplexity: 'O(m + n) -- frequency maps',
    },
};
