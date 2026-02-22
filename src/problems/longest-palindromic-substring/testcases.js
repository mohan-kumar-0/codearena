// For "babad", both "bab" and "aba" are valid, so we check length
export default [
    { id: 1, input: ['babad'], expected: 3, compare: 'palindromeLength' },
    { id: 2, input: ['cbbd'], expected: 2, compare: 'palindromeLength' },
    { id: 3, input: ['a'], expected: 1, compare: 'palindromeLength' },
    { id: 4, input: ['ac'], expected: 1, compare: 'palindromeLength' },
    { id: 5, input: ['racecar'], expected: 7, compare: 'palindromeLength' },
    { id: 6, input: ['aacabdkacaa'], expected: 3, compare: 'palindromeLength' },
];
