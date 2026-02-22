export default [
    { id: 1, input: [3], expected: ['1', '2', 'Fizz'], compare: 'deepEqual' },
    { id: 2, input: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'], compare: 'deepEqual' },
    { id: 3, input: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'], compare: 'deepEqual' },
    { id: 4, input: [1], expected: ['1'], compare: 'deepEqual' },
];
