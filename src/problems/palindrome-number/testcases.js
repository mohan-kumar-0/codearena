export default [
    { id: 1, input: [121], expected: true, compare: 'exact' },
    { id: 2, input: [-121], expected: false, compare: 'exact' },
    { id: 3, input: [10], expected: false, compare: 'exact' },
    { id: 4, input: [0], expected: true, compare: 'exact' },
    { id: 5, input: [12321], expected: true, compare: 'exact' },
    { id: 6, input: [1234], expected: false, compare: 'exact' },
];
