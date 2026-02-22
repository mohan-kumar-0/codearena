export default [
    {
        id: 1,
        input: [['h', 'e', 'l', 'l', 'o']],
        expected: ['o', 'l', 'l', 'e', 'h'],
        compare: 'deepEqual',
        // For in-place: we pass the array, function modifies it, we check the first arg
        checkMutated: 0,
    },
    {
        id: 2,
        input: [['H', 'a', 'n', 'n', 'a', 'h']],
        expected: ['h', 'a', 'n', 'n', 'a', 'H'],
        compare: 'deepEqual',
        checkMutated: 0,
    },
    {
        id: 3,
        input: [['A']],
        expected: ['A'],
        compare: 'deepEqual',
        checkMutated: 0,
    },
    {
        id: 4,
        input: [['a', 'b']],
        expected: ['b', 'a'],
        compare: 'deepEqual',
        checkMutated: 0,
    },
];
