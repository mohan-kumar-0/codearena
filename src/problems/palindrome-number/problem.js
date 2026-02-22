export default {
    id: 7,
    title: 'Palindrome Number',
    difficulty: 'Easy',
    category: 'Math',
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

An integer is a **palindrome** when it reads the same forward and backward.

For example, \`121\` is a palindrome while \`123\` is not.`,
    examples: [
        { input: 'x = 121', output: 'true', explanation: '121 reads as 121 from left to right and from right to left.' },
        { input: 'x = -121', output: 'false', explanation: 'From left to right, it reads -121. From right to left it becomes 121-. Therefore it is not a palindrome.' },
        { input: 'x = 10', output: 'false', explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.' },
    ],
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    hints: [
        'Could you solve it without converting the integer to a string?',
        'Try reversing half of the number and compare.',
    ],
    starterCode: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  // Write your solution here

}`,
    functionName: 'isPalindrome',
    editorial: {
        approach: 'Reverse Half the Number',
        intuition: `Negative numbers are never palindromes. For non-negative numbers, reverse the second half and compare it to the first half. This avoids string conversion.`,
        steps: [
            'Return false if x is negative or ends with 0 (but is not 0).',
            'Reverse digits from the right until reversed >= remaining.',
            'Compare: \`x === reversed\` or \`x === Math.floor(reversed / 10)\` (for odd-length numbers).',
        ],
        solution: `function isPalindrome(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversed = 0;
  while (x > reversed) {
    reversed = reversed * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  return x === reversed || x === Math.floor(reversed / 10);
}`,
        timeComplexity: 'O(log n) -- we process half the digits',
        spaceComplexity: 'O(1) -- no extra space',
    },
};
