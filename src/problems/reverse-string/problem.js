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
    starterCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Write your solution here

}`,
    functionName: 'reverseString',
};
