export default [
    {
        id: 1,
        input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
        expected: 6,
        compare: 'exact',
    },
    {
        id: 2,
        input: [[4, 2, 0, 3, 2, 5]],
        expected: 9,
        compare: 'exact',
    },
    {
        id: 3,
        input: [[1, 0, 1]],
        expected: 1,
        compare: 'exact',
    },
    {
        id: 4,
        input: [[3, 0, 0, 2, 0, 4]],
        expected: 10,
        compare: 'exact',
    },
    {
        id: 5,
        input: [[0, 0, 0]],
        expected: 0,
        compare: 'exact',
    },
];
