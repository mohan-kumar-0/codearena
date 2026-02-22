// Special test cases for linked list cycle - we build the linked list in the runner
// Since we can't serialize cyclic structures, we use a custom wrapper
// The input format is [values_array, pos] where pos is the cycle position (-1 for no cycle)
// The test runner will construct the linked list

function ListNode(val) {
    this.val = val;
    this.next = null;
}

function buildLinkedList(values, pos) {
    if (values.length === 0) return null;
    const nodes = values.map((v) => new ListNode(v));
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    if (pos >= 0 && pos < nodes.length) {
        nodes[nodes.length - 1].next = nodes[pos];
    }
    return nodes[0];
}

// We wrap inputs as pre-built linked lists
export default [
    { id: 1, input: [[3, 2, 0, -4], 1], expected: true, compare: 'exact', preprocessInput: true },
    { id: 2, input: [[1, 2], 0], expected: true, compare: 'exact', preprocessInput: true },
    { id: 3, input: [[1], -1], expected: false, compare: 'exact', preprocessInput: true },
    { id: 4, input: [[], -1], expected: false, compare: 'exact', preprocessInput: true },
    { id: 5, input: [[1, 2, 3, 4, 5], -1], expected: false, compare: 'exact', preprocessInput: true },
];
