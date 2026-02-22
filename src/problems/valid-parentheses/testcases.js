export default [
    {
        id: 1,
        input: ['()'],
        expected: true,
        compare: 'exact',
    },
    {
        id: 2,
        input: ['()[]{}'],
        expected: true,
        compare: 'exact',
    },
    {
        id: 3,
        input: ['(]'],
        expected: false,
        compare: 'exact',
    },
    {
        id: 4,
        input: ['([)]'],
        expected: false,
        compare: 'exact',
    },
    {
        id: 5,
        input: ['{[]}'],
        expected: true,
        compare: 'exact',
    },
    {
        id: 6,
        input: [''],
        expected: true,
        compare: 'exact',
    },
    {
        id: 7,
        input: ['(((('],
        expected: false,
        compare: 'exact',
    },
];
