export default {
    id: 3,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
        {
            input: 's = "()"',
            output: 'true',
            explanation: null,
        },
        {
            input: 's = "()[]{}"',
            output: 'true',
            explanation: null,
        },
        {
            input: 's = "(]"',
            output: 'false',
            explanation: null,
        },
    ],
    constraints: [
        '1 <= s.length <= 10^4',
        "s consists of parentheses only '()[]{}'.",
    ],
    hints: [
        'Use a stack data structure.',
        'When you encounter an opening bracket, push it onto the stack. When you encounter a closing bracket, check if it matches the top of the stack.',
    ],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your solution here

}`,
    functionName: 'isValid',
    editorial: {
        approach: 'Stack',
        intuition: `Every closing bracket must match the most recent unmatched opening bracket. A stack naturally tracks the most recent one at the top.`,
        steps: [
            'Create an empty stack and a map of closing-to-opening brackets.',
            'Iterate through each character in the string.',
            'If it is an opening bracket, push it onto the stack.',
            'If it is a closing bracket, check if the stack top matches. If not, return false.',
            'After iteration, return true only if the stack is empty.',
        ],
        solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
        timeComplexity: 'O(n) -- single pass through the string',
        spaceComplexity: 'O(n) -- stack can hold up to n/2 elements',
    },
};
