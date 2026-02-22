export default [
    {
        id: 1,
        input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
        expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
        compare: 'deepEqual',
        checkMutated: 0,
    },
    {
        id: 2,
        input: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]],
        expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]],
        compare: 'deepEqual',
        checkMutated: 0,
    },
    {
        id: 3,
        input: [[[1]]],
        expected: [[1]],
        compare: 'deepEqual',
        checkMutated: 0,
    },
    {
        id: 4,
        input: [[[1, 2], [3, 4]]],
        expected: [[3, 1], [4, 2]],
        compare: 'deepEqual',
        checkMutated: 0,
    },
];
