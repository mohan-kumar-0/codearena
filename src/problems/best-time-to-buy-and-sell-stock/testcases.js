export default [
    { id: 1, input: [[7, 1, 5, 3, 6, 4]], expected: 5, compare: 'exact' },
    { id: 2, input: [[7, 6, 4, 3, 1]], expected: 0, compare: 'exact' },
    { id: 3, input: [[2, 4, 1]], expected: 2, compare: 'exact' },
    { id: 4, input: [[1]], expected: 0, compare: 'exact' },
    { id: 5, input: [[1, 2]], expected: 1, compare: 'exact' },
    { id: 6, input: [[3, 3, 3, 3]], expected: 0, compare: 'exact' },
];
