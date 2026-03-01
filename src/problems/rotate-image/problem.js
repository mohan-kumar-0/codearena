export default {
  id: 15,
  title: 'Rotate Image',
  difficulty: 'Medium',
  category: 'Matrix',
  description: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90 degrees** (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.`,
  examples: [
    { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: null },
    { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]', explanation: null },
  ],
  constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
  hints: [
    'First transpose the matrix, then reverse each row.',
    'Alternatively, rotate layer by layer from the outside in.',
  ],
  starterCode: {
    javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
  // Write your solution here

}`,
    python: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # Write your solution here
        pass`,
    cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        // Write your solution here
        
    }
};`
  },
  functionName: 'rotate',
  editorial: {
    approach: 'Transpose + Reverse',
    intuition: `A 90-degree clockwise rotation is equivalent to transposing the matrix (swap rows and columns) and then reversing each row.`,
    steps: [
      'Transpose: swap \`matrix[i][j]\` with \`matrix[j][i]\` for all i < j.',
      'Reverse each row in place.',
    ],
    solution: {
      javascript: `function rotate(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // Reverse each row
  for (const row of matrix) {
    row.reverse();
  }
}`,
      python: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        # Transpose
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        # Reverse each row
        for i in range(n):
            matrix[i].reverse()`,
      cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // Reverse each row
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};`
    },
    timeComplexity: 'O(n^2) -- visit each element once',
    spaceComplexity: 'O(1) -- in-place',
  },
};
