export default [
    {
        id: 1,
        input: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        compare: 'unorderedArray',
    },
    {
        id: 2,
        input: [[3, 2, 4], 6],
        expected: [1, 2],
        compare: 'unorderedArray',
    },
    {
        id: 3,
        input: [[3, 3], 6],
        expected: [0, 1],
        compare: 'unorderedArray',
    },
    {
        id: 4,
        input: [[1, 5, 3, 7, 8, 2], 10],
        expected: [3, 4],
        compare: 'unorderedArray',
    },
    {
        id: 5,
        input: [[-1, -2, -3, -4, -5], -8],
        expected: [2, 4],
        compare: 'unorderedArray',
    },
];
