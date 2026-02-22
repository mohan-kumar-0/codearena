/**
 * Code execution engine with TLE (Time Limit Exceeded) support.
 * Runs user code in a Web Worker so infinite loops can be terminated.
 */

const WORKER_CODE = `
// ListNode constructor for linked list problems
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function buildLinkedList(values, pos) {
  if (!values || values.length === 0) return null;
  var nodes = values.map(function(v) { return new ListNode(v); });
  for (var i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  if (pos >= 0 && pos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[pos];
  }
  return nodes[0];
}

self.onmessage = function(e) {
  var data = e.data;
  var code = data.code;
  var functionName = data.functionName;
  var input = data.input;
  var checkMutated = data.checkMutated;
  var preprocessInput = data.preprocessInput;

  try {
    var clonedInput = JSON.parse(JSON.stringify(input));

    // Preprocess input for linked list problems
    if (preprocessInput) {
      var head = buildLinkedList(clonedInput[0], clonedInput[1]);
      clonedInput = [head];
    }

    // Include ListNode in user code scope
    var wrappedCode = 'function ListNode(val) { this.val = val; this.next = null; }\\n' +
      code + '\\nreturn ' + functionName + ';';
    var factory = new Function(wrappedCode);
    var userFn = factory();

    if (typeof userFn !== 'function') {
      self.postMessage({ status: 'error', error: '"' + functionName + '" is not defined or not a function.', time: 0 });
      return;
    }

    var start = performance.now();
    var result = userFn.apply(null, clonedInput);
    var end = performance.now();

    var actual;
    if (checkMutated !== undefined) {
      actual = clonedInput[checkMutated];
    } else {
      actual = result;
    }

    // Serialize - handle non-serializable results
    var serialized;
    try {
      serialized = JSON.parse(JSON.stringify(actual));
    } catch(serErr) {
      serialized = String(actual);
    }

    self.postMessage({ status: 'done', actual: serialized, time: end - start });
  } catch (err) {
    self.postMessage({ status: 'error', error: err.message, time: 0 });
  }
};
`;

const workerBlob = new Blob([WORKER_CODE], { type: 'application/javascript' });
const workerUrl = URL.createObjectURL(workerBlob);

/**
 * Deep equality comparison
 */
function deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;

    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        return a.every((val, i) => deepEqual(val, b[i]));
    }

    if (typeof a === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        return keysA.every((key) => deepEqual(a[key], b[key]));
    }

    return false;
}

/**
 * Compare two arrays ignoring order
 */
function unorderedArrayEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort((x, y) => x - y);
    const sortedB = [...b].sort((x, y) => x - y);
    return deepEqual(sortedA, sortedB);
}

/**
 * Compare groups of anagrams (order of groups doesn't matter, order within groups doesn't matter)
 */
function unorderedGroupsEqual(actual, expected) {
    if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
    if (actual.length !== expected.length) return false;

    const normalize = (groups) =>
        groups
            .map((g) => [...g].sort().join(','))
            .sort();

    const normA = normalize(actual);
    const normB = normalize(expected);
    return deepEqual(normA, normB);
}

/**
 * Check if a string is a palindrome
 */
function isPalindrome(s) {
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        if (s[i] !== s[j]) return false;
    }
    return true;
}

/**
 * Compare results based on comparison type
 */
function compareResults(actual, expected, compareType) {
    switch (compareType) {
        case 'exact':
            return actual === expected;
        case 'deepEqual':
            return deepEqual(actual, expected);
        case 'unorderedArray':
            return unorderedArrayEqual(actual, expected);
        case 'unorderedGroups':
            return unorderedGroupsEqual(actual, expected);
        case 'palindromeLength':
            // actual should be a palindromic string of the expected length
            return (
                typeof actual === 'string' &&
                actual.length === expected &&
                isPalindrome(actual)
            );
        default:
            return deepEqual(actual, expected);
    }
}

/**
 * Run a single test case in a Web Worker with timeout
 */
function runSingleTestInWorker(userCode, functionName, testCase, timeLimit) {
    return new Promise((resolve) => {
        const worker = new Worker(workerUrl);
        let resolved = false;

        const timer = setTimeout(() => {
            if (!resolved) {
                resolved = true;
                worker.terminate();
                resolve({
                    id: testCase.id,
                    status: 'tle',
                    error: `Time Limit Exceeded (>${timeLimit}ms)`,
                    input: testCase.input,
                    expected: testCase.expected,
                    actual: undefined,
                    time: timeLimit,
                });
            }
        }, timeLimit);

        worker.onmessage = (e) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timer);
            worker.terminate();

            const { status, actual, error, time } = e.data;

            if (status === 'error') {
                resolve({
                    id: testCase.id,
                    status: 'error',
                    error,
                    input: testCase.input,
                    expected: testCase.expected,
                    actual: undefined,
                    time,
                });
            } else {
                const passed = compareResults(actual, testCase.expected, testCase.compare);
                resolve({
                    id: testCase.id,
                    status: passed ? 'pass' : 'fail',
                    input: testCase.input,
                    expected: testCase.expected,
                    actual,
                    time,
                });
            }
        };

        worker.onerror = (e) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timer);
            worker.terminate();
            resolve({
                id: testCase.id,
                status: 'error',
                error: e.message || 'Unknown worker error',
                input: testCase.input,
                expected: testCase.expected,
                actual: undefined,
                time: 0,
            });
        };

        worker.postMessage({
            code: userCode,
            functionName,
            input: testCase.input,
            checkMutated: testCase.checkMutated,
            preprocessInput: testCase.preprocessInput,
        });
    });
}

/**
 * Run user code against all test cases (async, with TLE support)
 * @param {string} userCode - The user's code as a string
 * @param {string} functionName - The function name to call
 * @param {Array} testCases - Array of test case objects
 * @param {number} timeLimit - Time limit in ms per test case (default 3000)
 * @param {Function} onProgress - Optional callback called after each test case
 * @returns {Promise<Object>} Results summary with individual test case results
 */
export async function runAllTests(userCode, functionName, testCases, timeLimit = 3000, onProgress = null) {
    const totalStart = performance.now();
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
        const result = await runSingleTestInWorker(userCode, functionName, testCases[i], timeLimit);
        results.push(result);
        if (onProgress) {
            onProgress([...results], i + 1, testCases.length);
        }
    }

    const totalEnd = performance.now();
    const totalTime = totalEnd - totalStart;

    const passed = results.filter((r) => r.status === 'pass').length;
    const failed = results.filter((r) => r.status === 'fail').length;
    const errors = results.filter((r) => r.status === 'error').length;
    const tles = results.filter((r) => r.status === 'tle').length;

    return {
        results,
        summary: {
            total: testCases.length,
            passed,
            failed,
            errors,
            tles,
            allPassed: passed === testCases.length,
            totalTime,
        },
    };
}
