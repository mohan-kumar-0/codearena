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
  starterCode: {
    javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here

}`,
    python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Write your solution here
        pass`,
    cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your solution here
        
    }
};`
  },
  functionName: 'findMedianSortedArrays',
  editorial: {
    approach: 'Binary Search on Partition',
    intuition: `We need to find a partition that divides the combined elements into two equal halves, where every element on the left is smaller than every element on the right. Binary search on the shorter array to find this partition efficiently.`,
    steps: [
      'Ensure nums1 is the shorter array.',
      'Binary search on nums1 to find partition index i. Partition index j in nums2 is derived: \`j = (m + n + 1) / 2 - i\`.',
      'Check if \`maxLeft1 <= minRight2\` and \`maxLeft2 <= minRight1\`.',
      'If valid, the median is computed from the boundary elements.',
      'Adjust the binary search range until the valid partition is found.',
    ],
    solution: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;
    const left1 = i > 0 ? nums1[i - 1] : -Infinity;
    const right1 = i < m ? nums1[i] : Infinity;
    const left2 = j > 0 ? nums2[j - 1] : -Infinity;
    const right2 = j < n ? nums2[j] : Infinity;
    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2 === 0) {
        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
      }
      return Math.max(left1, left2);
    } else if (left1 > right2) {
      hi = i - 1;
    } else {
      lo = i + 1;
    }
  }
}`,
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            return self.findMedianSortedArrays(nums2, nums1)
        
        m, n = len(nums1), len(nums2)
        left, right = 0, m
        
        while left <= right:
            i = (left + right) // 2
            j = (m + n + 1) // 2 - i
            
            nums1LeftMax = nums1[i-1] if i > 0 else float("-inf")
            nums1RightMin = nums1[i] if i < m else float("inf")
            nums2LeftMax = nums2[j-1] if j > 0 else float("-inf")
            nums2RightMin = nums2[j] if j < n else float("inf")
            
            if nums1LeftMax <= nums2RightMin and nums2LeftMax <= nums1RightMin:
                if (m + n) % 2 == 1:
                    return max(nums1LeftMax, nums2LeftMax)
                return (max(nums1LeftMax, nums2LeftMax) + min(nums1RightMin, nums2RightMin)) / 2.0
            elif nums1LeftMax > nums2RightMin:
                right = i - 1
            else:
                left = i + 1`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int lo = 0, hi = m;
        while (lo <= hi) {
            int i = (lo + hi) / 2;
            int j = (m + n + 1) / 2 - i;
            double left1 = i > 0 ? nums1[i-1] : -1e9;
            double right1 = i < m ? nums1[i] : 1e9;
            double left2 = j > 0 ? nums2[j-1] : -1e9;
            double right2 = j < n ? nums2[j] : 1e9;
            if (left1 <= right2 && left2 <= right1) {
                if ((m + n) % 2 == 0) return (max(left1, left2) + min(right1, right2)) / 2.0;
                return max(left1, left2);
            } else if (left1 > right2) hi = i - 1;
            else lo = i + 1;
        }
        return 0.0;
    }
};`
    },
    timeComplexity: 'O(log(min(m, n))) -- binary search on the shorter array',
    spaceComplexity: 'O(1)',
  },
};
