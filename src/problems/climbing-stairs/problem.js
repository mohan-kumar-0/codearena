export default {
    id: 9,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
        { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps.' },
        { input: 'n = 3', output: '3', explanation: 'There are three ways: 1+1+1, 1+2, 2+1.' },
    ],
    constraints: ['1 <= n <= 45'],
    hints: [
        'This is essentially the Fibonacci sequence.',
        'dp[i] = dp[i-1] + dp[i-2]',
    ],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Write your solution here

}`,
    functionName: 'climbStairs',
};
