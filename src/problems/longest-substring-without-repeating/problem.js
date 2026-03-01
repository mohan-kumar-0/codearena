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
  starterCode: {
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Write your solution here

}`,
    python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your solution here
        pass`,
    cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your solution here
        
    }
};`
  },
  functionName: 'lengthOfLongestSubstring',
  editorial: {
    approach: 'Sliding Window with Set',
    intuition: `Maintain a window of unique characters using a Set. Expand the right pointer to include new characters. When a duplicate is found, shrink from the left until the duplicate is removed.`,
    steps: [
      'Initialize a Set, \`left = 0\`, and \`maxLen = 0\`.',
      'Iterate right from 0 to n-1.',
      'While \`s[right]\` is in the Set, remove \`s[left]\` and increment left.',
      'Add \`s[right]\` to the Set and update \`maxLen\`.',
    ],
    solution: {
      javascript: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charSet = set()
        left = 0
        res = 0
        for right in range(len(s)):
            while s[right] in charSet:
                charSet.remove(s[left])
                left += 1
            charSet.add(s[right])
            res = max(res, right - left + 1)
        return res`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> charSet;
        int left = 0, res = 0;
        for (int right = 0; right < s.length(); right++) {
            while (charSet.find(s[right]) != charSet.end()) {
                charSet.erase(s[left]);
                left++;
            }
            charSet.insert(s[right]);
            res = max(res, right - left + 1);
        }
        return res;
    }
};`
    },
    timeComplexity: 'O(n) -- each character is added and removed from the Set at most once',
    spaceComplexity: 'O(min(n, m)) -- where m is the size of the character set',
  },
};
