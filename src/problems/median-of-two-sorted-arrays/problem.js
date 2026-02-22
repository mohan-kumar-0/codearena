export default {
    id: 19,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Binary Search',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be **O(log (m+n))**.`,
    examples: [
        { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0', explanation: 'Merged array = [1,2,3] and median is 2.' },
        { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5', explanation: 'Merged array = [1,2,3,4] and median is (2+3)/2 = 2.5.' },
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
    hints: [
        'Binary search on the shorter array.',
        'Partition both arrays such that elements on the left side are smaller than elements on the right side.',
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here

}`,
    functionName: 'findMedianSortedArrays',
};
