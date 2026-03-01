export default {
    id: 2,
    title: 'Reverse String',
    difficulty: 'Easy',
    category: 'String',
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with O(1) extra memory.`,
    examples: [
        {
            input: 's = ["h","e","l","l","o"]',
            output: '["o","l","l","e","h"]',
            explanation: null,
        },
        {
            input: 's = ["H","a","n","n","a","h"]',
            output: '["h","a","n","n","a","H"]',
            explanation: null,
        },
    ],
    constraints: [
        '1 <= s.length <= 10^5',
        's[i] is a printable ASCII character.',
    ],
    hints: [
        'Use two pointers — one starting from the beginning and one from the end.',
        'Swap the characters at the two pointers and move them towards the center.',
    ],
    starterCode: {
        javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Write your solution here

}`,
        python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        # Write your solution here
        pass`,
        cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your solution here
        
    }
};`
    },
    functionName: 'reverseString',
    editorial: {
        approach: 'Two Pointers',
        intuition: `Use two pointers starting from both ends of the array and swap characters moving inward until they meet.`,
        steps: [
            'Initialize a left pointer at 0 and a right pointer at \`s.length - 1\`.',
            'Swap \`s[left]\` and \`s[right]\`.',
            'Move left forward and right backward.',
            'Repeat until left >= right.',
        ],
        solution: {
            javascript: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}`,
            python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1`,
            cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};`
        },
        timeComplexity: 'O(n) -- each element is visited once',
        spaceComplexity: 'O(1) -- in-place swap, no extra space',
    },
};
