# CodeArena - Technical Documentation

## Overview

CodeArena is a browser-based coding challenge platform, similar to LeetCode, built entirely on the client side. Users can solve JavaScript problems, run their code against predefined test cases, and see real-time results -- all without a backend server. The execution engine, test runner, and result validation all happen in the browser.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Build Tool** | Vite | Fast HMR (Hot Module Replacement), native ES module support, and `import.meta.glob` for dynamic problem discovery |
| **UI Framework** | React 18 | Component-based architecture, declarative rendering, efficient re-renders via virtual DOM |
| **Routing** | React Router (HashRouter) | Client-side routing. HashRouter was chosen over BrowserRouter so the app can be deployed as a static site without server-side URL rewriting |
| **Code Editor** | Monaco Editor (@monaco-editor/react) | Same editor that powers VS Code. Provides syntax highlighting, IntelliSense, bracket matching, and a professional editing experience |
| **Styling** | Vanilla CSS with CSS Custom Properties | Full theme system (dark/light) driven by CSS variables on `:root`. No CSS framework dependency |
| **Code Execution** | Web Workers + Function constructor | Sandboxed execution with timeout-based TLE (Time Limit Exceeded) detection |
| **State Persistence** | localStorage | Saves user code, solved status, and theme preference across sessions |

---

## Project Structure

```
src/
  main.jsx                    # App entry point, renders React into the DOM
  App.jsx                     # Root component with route definitions
  index.css                   # Complete design system with dark/light themes

  context/
    ThemeContext.jsx           # React Context for theme state (dark/light toggle)

  data/
    problemRegistry.js        # Auto-discovers all problems using import.meta.glob

  engine/
    codeRunner.js             # Web Worker-based execution engine with TLE support
    storage.js                # localStorage wrapper for code and progress persistence

  pages/
    ProblemList.jsx            # Home page with problem table, filters, search
    ProblemSolve.jsx           # Split-pane editor page with Monaco + results

  components/
    DescriptionPanel.jsx       # Problem description, examples, constraints, hints
    ResultsPanel.jsx           # Test result cards with pass/fail/error/TLE states

  problems/                   # Each subfolder is a self-contained problem
    two-sum/
      problem.js              # Title, description, examples, constraints, starter code
      testcases.js            # Array of test cases with inputs, expected outputs, comparison type
    reverse-string/
    valid-parentheses/
    ...
```

---

## Core Architecture

### 1. Dynamic Problem Discovery

The problem registry (`src/data/problemRegistry.js`) uses Vite's `import.meta.glob` to automatically discover all problems at build time:

```js
const problemModules = import.meta.glob('/src/problems/*/problem.js', { eager: true });
const testcaseModules = import.meta.glob('/src/problems/*/testcases.js', { eager: true });
```

This is a **compile-time file system scan**. Vite statically analyzes the glob pattern and generates import statements for every matching module. The `{ eager: true }` flag means all modules are imported immediately rather than lazily.

The slug is extracted from the file path (`/src/problems/<slug>/problem.js`), and the problem metadata is merged with its test cases into a single object. This approach means **adding a new problem requires zero changes to any existing code** -- just create the folder with the two files.

### 2. Code Execution Engine

This is the most technically interesting part. The challenge is: how do you safely execute arbitrary user-written JavaScript in the browser?

**Approach: Web Worker + Function Constructor + Timeout**

```
User Code (string) --> Web Worker --> Function() constructor --> Execute --> Result
                          |
                     setTimeout() -- if no response --> terminate worker --> TLE
```

**Step by step:**

1. **Web Worker creation**: A Blob URL is created from a string containing the worker code. This avoids needing a separate worker file and keeps everything self-contained.

```js
const workerBlob = new Blob([WORKER_CODE], { type: 'application/javascript' });
const workerUrl = URL.createObjectURL(workerBlob);
```

2. **For each test case**, a new Worker is spawned. The user's code string and test case input are sent via `postMessage()`.

3. **Inside the worker**, the user's code is wrapped and executed using the `Function` constructor:

```js
const wrappedCode = userCode + '\nreturn ' + functionName + ';';
const factory = new Function(wrappedCode);
const userFn = factory();
const result = userFn(...inputs);
```

The `Function` constructor is similar to `eval()` but creates a new function scope. The wrapper appends `return functionName;` so that after the user's code defines the function, the factory returns a reference to it. Then we call it with the test case inputs.

4. **Timing**: `performance.now()` is called before and after execution to measure per-test-case runtime in milliseconds.

5. **TLE Detection**: A `setTimeout` is set on the main thread (not inside the worker). If the worker doesn't respond within the time limit (default 3 seconds), the timer fires, calls `worker.terminate()`, and resolves the promise with a TLE result. This is the key insight -- **you cannot interrupt a synchronous infinite loop on the main thread**, but because the code runs in a separate Worker thread, `terminate()` kills the thread entirely.

6. **Result comparison** happens on the main thread after receiving the worker's response. Multiple comparison strategies are supported:
   - `exact`: Strict equality (`===`)
   - `deepEqual`: Recursive structural comparison for nested objects/arrays
   - `unorderedArray`: Sorts both arrays before comparing (for problems where output order doesn't matter, like Two Sum)
   - `unorderedGroups`: For Group Anagrams -- normalizes groups (sort within, sort across) before comparing
   - `palindromeLength`: Verifies the result is a palindrome string of the expected length (for Longest Palindromic Substring where multiple valid answers exist)

7. **In-place mutation checking**: For problems like Reverse String or Rotate Image where the function modifies the input in place rather than returning a value, the `checkMutated` field on the test case tells the engine to check `input[0]` (the mutated array) instead of the return value.

### 3. Theme System

The theme is implemented using **CSS Custom Properties** (CSS variables) with a `data-theme` attribute on the document root:

```css
:root, [data-theme="dark"] {
  --bg-primary: #0a0a0f;
  --text-primary: #e8e8f0;
  /* ... */
}

[data-theme="light"] {
  --bg-primary: #f5f5f9;
  --text-primary: #1a1a2e;
  /* ... */
}
```

A React Context (`ThemeContext`) manages the current theme string ("dark" or "light"), persists it to localStorage, and sets the `data-theme` attribute on `document.documentElement`. All CSS references `var(--bg-primary)`, `var(--text-primary)`, etc., so changing the attribute instantly switches all colors.

The Monaco Editor theme is also switched dynamically -- `vs-dark` for dark mode, `light` for light mode.

### 4. Split-Pane Resizer

The solve page uses a split-pane layout (description on the left, editor + results on the right). Both the horizontal and vertical dividers are draggable resizers implemented with native mouse events:

- `mousedown` on the resizer div sets a dragging flag
- `mousemove` on the document calculates the new percentage/pixel position
- `mouseup` clears the flag

The horizontal resizer controls the description panel width as a percentage. The vertical resizer controls the results panel height in pixels. `useRef` is used to reference the DOM elements, and `useEffect` attaches and cleans up the event listeners.

### 5. Progressive Results

Test cases run sequentially (not in parallel) because each spawns a separate Worker and we want to show results as they complete. An `onProgress` callback is called after each test case finishes, updating the UI with partial results and a progress bar. This gives the user immediate feedback even on large test suites.

### 6. Problem Data Model

Each problem exports a default object with:

```js
{
  id: 1,                        // Display number
  title: 'Two Sum',             // Display title
  difficulty: 'Easy',           // Easy | Medium | Hard
  category: 'Array',            // Topic tag for filtering
  description: '...',           // Markdown-like description text
  examples: [{ input, output, explanation }],
  constraints: ['...'],
  hints: ['...'],
  starterCode: '...',           // Pre-filled code in the editor
  functionName: 'twoSum',       // Function name the engine calls
  timeLimit: 3000,              // Optional per-problem time limit (ms)
}
```

Test cases are a separate file exporting an array:

```js
[{
  id: 1,
  input: [[2, 7, 11, 15], 9],  // Array of arguments to pass to the function
  expected: [0, 1],             // Expected return value
  compare: 'unorderedArray',    // Comparison strategy
  checkMutated: 0,              // Optional: check input[0] instead of return value
  preprocessInput: true,        // Optional: build linked list from array before calling
}]
```

### 7. Routing

React Router with `HashRouter` provides two routes:
- `/` renders the `ProblemList` page
- `/problem/:slug` renders the `ProblemSolve` page

HashRouter was chosen because it uses the URL hash (`#/problem/two-sum`) rather than the pathname. This means the app works correctly when deployed as a static site on any hosting service (GitHub Pages, Netlify, etc.) without needing server-side URL rewriting or a catch-all redirect rule.

### 8. State Persistence

The `storage.js` module wraps localStorage with a simple API:
- `saveCode(slug, code)` / `getSavedCode(slug)` -- auto-saves the editor content with a 500ms debounce
- `markSolved(slug)` / `isSolved(slug)` -- tracks which problems have been solved
- Theme preference is stored separately by the ThemeContext

All data is stored under a single localStorage key (`codearena_progress`) as a JSON object.

---

## How to Add a New Problem

1. Create a new folder: `src/problems/your-problem-slug/`
2. Add `problem.js` with the problem metadata (title, description, examples, starter code, function name)
3. Add `testcases.js` with an array of test cases (inputs, expected outputs, comparison type)
4. Restart the dev server -- the problem is automatically discovered and appears in the list

No registration step, no imports to update, no configuration changes.

---

## Design Decisions

**Why Web Workers instead of eval()?**
`eval()` runs on the main thread. An infinite loop would freeze the entire browser tab with no way to recover. Web Workers run in a separate thread and can be forcefully terminated, making TLE detection possible.

**Why Function constructor instead of eval() inside the Worker?**
The `Function` constructor creates a new function scope, which is slightly cleaner than `eval()`. It also makes it straightforward to extract the user's function by name via `return functionName`.

**Why sequential test execution?**
Running all tests in parallel would require spawning many Workers simultaneously and doesn't allow for progressive result display. Sequential execution lets us show each result as it completes and keeps resource usage predictable.

**Why CSS variables for theming?**
CSS variables cascade through the DOM. Setting them on `:root` means every descendant inherits them without needing JavaScript to touch individual elements. Toggling the theme is a single attribute change on the document root.

**Why import.meta.glob?**
It eliminates the need for a manual registry file. Conventionally you'd have an `index.js` that imports every problem -- this scales poorly and is easy to forget. The glob pattern automates discovery at build time.
