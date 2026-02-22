export default {
    id: 8,
    title: 'FizzBuzz',
    difficulty: 'Easy',
    category: 'Math',
    description: `Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:

- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.`,
    examples: [
        { input: 'n = 3', output: '["1","2","Fizz"]', explanation: null },
        { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]', explanation: null },
        { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', explanation: null },
    ],
    constraints: ['1 <= n <= 10^4'],
    hints: ['No tricks here — just iterate and check divisibility.'],
    starterCode: `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
  // Write your solution here

}`,
    functionName: 'fizzBuzz',
};
