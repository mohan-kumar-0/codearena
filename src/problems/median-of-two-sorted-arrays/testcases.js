export default [
    { id: 1, input: [[1, 3], [2]], expected: 2.0, compare: 'exact' },
    { id: 2, input: [[1, 2], [3, 4]], expected: 2.5, compare: 'exact' },
    { id: 3, input: [[], [1]], expected: 1.0, compare: 'exact' },
    { id: 4, input: [[2], []], expected: 2.0, compare: 'exact' },
    { id: 5, input: [[1, 2, 3], [4, 5, 6]], expected: 3.5, compare: 'exact' },
    { id: 6, input: [[1], [2, 3, 4, 5, 6]], expected: 3.5, compare: 'exact' },
];
