export default [
    { id: 1, input: ['ADOBECODEBANC', 'ABC'], expected: 'BANC', compare: 'exact' },
    { id: 2, input: ['a', 'a'], expected: 'a', compare: 'exact' },
    { id: 3, input: ['a', 'aa'], expected: '', compare: 'exact' },
    { id: 4, input: ['ab', 'b'], expected: 'b', compare: 'exact' },
    { id: 5, input: ['bba', 'ab'], expected: 'ba', compare: 'exact' },
];
