export default [
    { id: 1, input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4, compare: 'exact' },
    { id: 2, input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1, compare: 'exact' },
    { id: 3, input: [[5], 5], expected: 0, compare: 'exact' },
    { id: 4, input: [[5], -5], expected: -1, compare: 'exact' },
    { id: 5, input: [[2, 5], 5], expected: 1, compare: 'exact' },
    { id: 6, input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7], expected: 6, compare: 'exact' },
];
