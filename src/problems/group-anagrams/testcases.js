// Special comparison: groups can be in any order, and items within groups can be in any order
export default [
    {
        id: 1,
        input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
        expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']],
        compare: 'unorderedGroups',
    },
    {
        id: 2,
        input: [['']],
        expected: [['']],
        compare: 'unorderedGroups',
    },
    {
        id: 3,
        input: [['a']],
        expected: [['a']],
        compare: 'unorderedGroups',
    },
    {
        id: 4,
        input: [['abc', 'bca', 'cab', 'xyz', 'zyx']],
        expected: [['abc', 'bca', 'cab'], ['xyz', 'zyx']],
        compare: 'unorderedGroups',
    },
];
