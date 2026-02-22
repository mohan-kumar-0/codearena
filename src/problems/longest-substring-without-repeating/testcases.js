export default [
    { id: 1, input: ['abcabcbb'], expected: 3, compare: 'exact' },
    { id: 2, input: ['bbbbb'], expected: 1, compare: 'exact' },
    { id: 3, input: ['pwwkew'], expected: 3, compare: 'exact' },
    { id: 4, input: [''], expected: 0, compare: 'exact' },
    { id: 5, input: ['au'], expected: 2, compare: 'exact' },
    { id: 6, input: ['dvdf'], expected: 3, compare: 'exact' },
];
