export default [
    {
        id: 1,
        input: [[[1, 3], [2, 6], [8, 10], [15, 18]]],
        expected: [[1, 6], [8, 10], [15, 18]],
        compare: 'deepEqual',
    },
    {
        id: 2,
        input: [[[1, 4], [4, 5]]],
        expected: [[1, 5]],
        compare: 'deepEqual',
    },
    {
        id: 3,
        input: [[[1, 4], [0, 4]]],
        expected: [[0, 4]],
        compare: 'deepEqual',
    },
    {
        id: 4,
        input: [[[1, 4], [2, 3]]],
        expected: [[1, 4]],
        compare: 'deepEqual',
    },
    {
        id: 5,
        input: [[[1, 2], [3, 4], [5, 6]]],
        expected: [[1, 2], [3, 4], [5, 6]],
        compare: 'deepEqual',
    },
];
