export default {
    id: 10,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Array',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
        { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
        { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No transactions are done and max profit = 0.' },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    hints: [
        'Track the minimum price seen so far.',
        'At each step, calculate the profit if you sold at the current price.',
    ],
    starterCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Write your solution here

}`,
    functionName: 'maxProfit',
    editorial: {
        approach: 'Single Pass with Min Tracking',
        intuition: `Track the minimum price seen so far. At each day, the maximum profit if we sold today is \`price - minPrice\`. Keep a running maximum of this value.`,
        steps: [
            'Initialize \`minPrice = Infinity\` and \`maxProfit = 0\`.',
            'Iterate through prices.',
            'Update \`minPrice\` if current price is lower.',
            'Update \`maxProfit\` if \`price - minPrice\` is greater.',
        ],
        solution: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
        timeComplexity: 'O(n) -- single pass',
        spaceComplexity: 'O(1)',
    },
};
