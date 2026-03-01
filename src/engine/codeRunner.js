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
 */
export async function runAllTests(userCode, functionName, language, testCases, timeLimit = 3000, onProgress = null) {
    if (language === 'python') {
        return runPythonTests(userCode, functionName, testCases, timeLimit, onProgress);
    } else if (language === 'cpp') {
        return runCppTests(userCode, functionName, testCases, timeLimit, onProgress);
    } else {
        return runJavaScriptTests(userCode, functionName, testCases, timeLimit, onProgress);
    }
}

async function runJavaScriptTests(userCode, functionName, testCases, timeLimit, onProgress) {
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
    return formatSummary(results, testCases.length, totalEnd - totalStart);
}

let pyodide = null;
async function getPyodide() {
    if (!pyodide) {
        pyodide = await window.loadPyodide();
    }
    return pyodide;
}

async function runPythonTests(userCode, functionName, testCases, timeLimit, onProgress) {
    const totalStart = performance.now();
    const results = [];
    const py = await getPyodide();

    try {
        // Create a dedicated namespace for this entire challenge/batch to avoid state leakage
        const ns = py.runPython("dict()");

        // Setup boilerplate and types in the local namespace
        py.runPython(`
from typing import List, Optional, Dict
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        `, { globals: ns });

        // Execute user code in the isolated namespace
        py.runPython(userCode, { globals: ns });

        // Check if Solution class exists in the namespace
        const hasSolutionClass = ns.has("Solution");

        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i];
            let status = 'pass';
            let error = null;
            let actual = null;
            const start = performance.now();

            try {
                let result;
                // Pass inputs into the namespace efficiently
                ns.set("__tc_input__", py.toPy(tc.input));

                if (hasSolutionClass) {
                    // Instantiate the class and call the method while correctly passing the instance (self)
                    result = py.runPython(`
instance = Solution()
instance.${functionName}(*__tc_input__)
`, { globals: ns });
                } else {
                    result = py.runPython(`${functionName}(*__tc_input__)`, { globals: ns });
                }

                // Convert python objects to JS
                actual = result?.toJS ? result.toJS() : result;

                const passed = compareResults(actual, tc.expected, tc.compare);
                status = passed ? 'pass' : 'fail';
            } catch (err) {
                status = 'error';
                error = err.message;
            }

            const end = performance.now();
            results.push({
                id: tc.id,
                status,
                error,
                input: tc.input,
                expected: tc.expected,
                actual,
                time: end - start,
            });

            if (onProgress) {
                onProgress([...results], i + 1, testCases.length);
            }
        }

        ns.destroy(); // Clean up the namespace
    } catch (err) {
        // Handle global error (like syntax error)
        return {
            results: testCases.map(tc => ({
                id: tc.id, status: 'error', error: err.message, input: tc.input, expected: tc.expected
            })),
            summary: {
                total: testCases.length,
                passed: 0,
                failed: 0,
                errors: testCases.length,
                tles: 0,
                allPassed: false,
                totalTime: performance.now() - totalStart,
            }
        };
    }

    const totalEnd = performance.now();
    return formatSummary(results, testCases.length, totalEnd - totalStart);
}

// C++ execution using Judge0 (Industry standard for remote code execution)
async function runCppTests(userCode, functionName, testCases, timeLimit, onProgress) {
    const totalStart = performance.now();
    const results = [];

    // Use the public Judge0 instance
    const JUDGE0_BASE_URL = 'https://ce.judge0.com';

    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        let status = 'pass';
        let error = null;
        let actual = null;
        const start = performance.now();

        try {
            const wrapper = generateCppWrapper(userCode, functionName, tc);

            // Explicitly request plaintext to avoid base64 decoding issues
            const response = await fetch(`${JUDGE0_BASE_URL}/submissions?wait=true&base64_encoded=false`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source_code: wrapper,
                    language_id: 54, // C++ (GCC 9.2.0)
                    stdin: '',
                })
            });

            const data = await response.json();

            // Judge0 status ids: 1=Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 6=Compilation Error, etc.
            if (data.status?.id === 6) { // Compilation Error
                status = 'error';
                error = "Compilation Error:\n" + (data.compile_output || data.stderr || "Check for missing semicolons or syntax errors.");
            } else if (data.status?.id > 3 && data.status?.id !== 4) {
                status = 'error';
                error = data.stderr || data.compile_output || data.status.description;
            } else {
                // Parse stdout output
                const output = data.stdout?.trim();
                try {
                    actual = (output === undefined || output === '') ? null : JSON.parse(output);

                    if (actual === null && tc.expected !== null && output === '') {
                        status = 'error';
                        error = data.stderr || 'No output produced by the program. (Check for runtime errors or invalid memory access)';
                    } else {
                        const passed = compareResults(actual, tc.expected, tc.compare);
                        status = passed ? 'pass' : 'fail';
                    }
                } catch (parseErr) {
                    status = 'error';
                    if (output && typeof tc.expected === 'string' && output === tc.expected) {
                        actual = output;
                        status = 'pass';
                    } else {
                        error = 'Failed to parse C++ output: ' + (output || 'Empty output');
                    }
                }
            }
        } catch (err) {
            status = 'error';
            error = err.message;
        }

        const end = performance.now();
        results.push({
            id: tc.id,
            status,
            error,
            input: tc.input,
            expected: tc.expected,
            actual: actual === null ? undefined : actual,
            time: end - start,
        });

        if (onProgress) onProgress([...results], i + 1, testCases.length);
    }

    return formatSummary(results, testCases.length, performance.now() - totalStart);
}

/**
 * Generates a C++ wrapper to execute user code and print the result as JSON.
 */
function generateCppWrapper(userCode, functionName, testCase) {
    const serializeInput = (val) => {
        if (Array.isArray(val)) {
            if (Array.isArray(val[0])) return `{${val.map(row => serializeInput(row)).join(', ')}}`;
            return `{${val.map(v => {
                if (typeof v === 'string') return `"${v}"`;
                if (typeof v === 'boolean') return v ? 'true' : 'false';
                return v;
            }).join(', ')}}`;
        }
        if (typeof val === 'string') return `"${val}"`;
        if (typeof val === 'boolean') return val ? 'true' : 'false';
        return val;
    };

    const usesMutation = testCase.checkMutated !== undefined;
    const inputNames = testCase.input.map((_, i) => `arg${i}`);
    const inputDeclarations = testCase.input.map((val, i) => {
        const type = getCppType(val);
        return `${type} ${inputNames[i]} = ${serializeInput(val)};`;
    }).join('\n    ');

    return `
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <type_traits>

using namespace std;

${userCode}

// Robust JSON Serializer
template<typename T>
void printJSON(const T& v) {
    if constexpr (is_same_v<T, bool>) {
        cout << (v ? "true" : "false");
    } else if constexpr (is_integral_v<T> || is_floating_point_v<T>) {
        cout << v;
    } else if constexpr (is_same_v<T, string> || is_same_v<T, char>) {
        cout << "\\"" << v << "\\"";
    }
}

template<typename T>
void printJSON(const vector<T>& v) {
    cout << "[";
    for(size_t i=0; i<v.size(); ++i) {
        printJSON(v[i]);
        if(i < v.size()-1) cout << ",";
    }
    cout << "]";
}

int main() {
    Solution sol;
    ${inputDeclarations}
    
    try {
        if constexpr (is_same_v<decltype(sol.${functionName}(${inputNames.join(', ')})), void>) {
            sol.${functionName}(${inputNames.join(', ')});
            ${usesMutation ? `printJSON(${inputNames[testCase.checkMutated]});` : `cout << "null";`}
        } else {
            auto result = sol.${functionName}(${inputNames.join(', ')});
            printJSON(result);
        }
    } catch (...) {}
    
    cout << endl; 
    return 0;
}
    `;
}

function getCppType(val) {
    if (Array.isArray(val)) {
        if (val.length === 0) return "vector<int>";
        if (Array.isArray(val[0])) {
            const innerType = getCppType(val[0]);
            return `vector<${innerType}>`;
        }
        if (typeof val[0] === 'number') return "vector<int>";
        if (typeof val[0] === 'string' && val[0].length === 1) return "vector<char>";
        if (typeof val[0] === 'boolean') return "vector<bool>";
        return "vector<string>";
    }
    if (typeof val === 'number') {
        if (Number.isInteger(val)) return "int";
        return "double";
    }
    if (typeof val === 'string') return "string";
    if (typeof val === 'boolean') return "bool";
    return "auto";
}

function formatSummary(results, total, totalTime) {
    const passed = results.filter((r) => r.status === 'pass').length;
    const failed = results.filter((r) => r.status === 'fail').length;
    const errors = results.filter((r) => r.status === 'error').length;
    const tles = results.filter((r) => r.status === 'tle').length;

    return {
        results,
        summary: {
            total,
            passed,
            failed,
            errors,
            tles,
            allPassed: passed === total,
            totalTime,
        },
    };
}
