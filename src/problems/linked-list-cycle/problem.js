export default {
    id: 11,
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    category: 'Linked List',
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

A cycle exists if some node in the list can be reached again by continuously following the \`next\` pointer.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.

**Note:** For this problem, the linked list is represented as an array and a \`pos\` value. The array defines the node values in order, and \`pos\` is the index of the node that the tail connects to (-1 if no cycle). Your function receives the head node of the constructed linked list.`,
    examples: [
        { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle where the tail connects to index 1.' },
        { input: 'head = [1,2], pos = 0', output: 'true', explanation: 'There is a cycle where the tail connects to index 0.' },
        { input: 'head = [1], pos = -1', output: 'false', explanation: 'There is no cycle.' },
    ],
    constraints: [
        'The number of nodes is in the range [0, 10^4].',
        '-10^5 <= Node.val <= 10^5',
        'pos is -1 or a valid index.',
    ],
    hints: [
        'Use two pointers — a slow pointer that moves one step and a fast pointer that moves two steps.',
        'If there is a cycle, the fast pointer will eventually meet the slow pointer.',
    ],
    starterCode: `/**
 * Definition: function ListNode(val) { this.val = val; this.next = null; }
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  // Write your solution here

}`,
    functionName: 'hasCycle',
};
