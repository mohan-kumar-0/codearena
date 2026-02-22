export default [
    { id: 1, input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6], compare: 'deepEqual' },
    { id: 2, input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0], compare: 'deepEqual' },
    { id: 3, input: [[2, 3]], expected: [3, 2], compare: 'deepEqual' },
    { id: 4, input: [[1, 1, 1, 1]], expected: [1, 1, 1, 1], compare: 'deepEqual' },
    { id: 5, input: [[0, 0]], expected: [0, 0], compare: 'deepEqual' },
];
