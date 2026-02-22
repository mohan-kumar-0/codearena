export default [
    {
        id: 1,
        input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expected: 6,
        compare: 'exact',
    },
    {
        id: 2,
        input: [[1]],
        expected: 1,
        compare: 'exact',
    },
    {
        id: 3,
        input: [[5, 4, -1, 7, 8]],
        expected: 23,
        compare: 'exact',
    },
    {
        id: 4,
        input: [[-1]],
        expected: -1,
        compare: 'exact',
    },
    {
        id: 5,
        input: [[-2, -1]],
        expected: -1,
        compare: 'exact',
    },
    {
        id: 6,
        input: [[1, 2, 3, 4, 5]],
        expected: 15,
        compare: 'exact',
    },
];
