# CodeArena

A browser-based JavaScript coding challenge platform. Solve algorithmic problems, run test cases directly in your browser, and track your progress -- no backend server required.

**Live:** [kumarmohan.com/codearena](https://kumarmohan.com/codearena)

---

## Features

- **20 coding problems** across 10 categories (Array, String, Stack, Dynamic Programming, Two Pointers, Hash Map, Binary Search, Linked List, Matrix, Sliding Window)
- **In-browser code execution** using Web Workers for sandboxed, safe evaluation
- **Time Limit Exceeded (TLE) detection** -- infinite loops are caught and terminated automatically
- **Monaco Editor** (the same editor powering VS Code) with syntax highlighting, bracket matching, and auto-completion
- **Dark and light themes** with persistent preference
- **Search and multi-filter** by difficulty (Easy/Medium/Hard) and topic
- **Auto-save** -- your code is saved to localStorage as you type
- **Progress tracking** -- solved problems are marked and persisted across sessions
- **Keyboard shortcut** -- Ctrl + Enter to run code

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build Tool | [Vite](https://vitejs.dev) |
| UI Framework | [React 18](https://react.dev) |
| Routing | [React Router](https://reactrouter.com) (HashRouter) |
| Code Editor | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| Styling | Vanilla CSS with CSS Custom Properties |
| Execution | Web Workers API |
| Persistence | localStorage |

## Getting Started

```bash
# Clone
git clone https://github.com/mohan-kumar-0/codearena.git
cd codearena

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
  main.jsx                  # Entry point
  App.jsx                   # Root component with routes
  index.css                 # Design system (dark + light themes)
  context/ThemeContext.jsx   # Theme state management
  data/problemRegistry.js   # Auto-discovers problems via import.meta.glob
  engine/codeRunner.js      # Web Worker execution engine with TLE support
  engine/storage.js         # localStorage wrapper
  pages/ProblemList.jsx     # Home page (problem table, filters, search)
  pages/ProblemSolve.jsx    # Editor page (Monaco + results panel)
  components/               # Reusable UI components
  problems/                 # Each subfolder contains problem.js + testcases.js
```

## Adding a New Problem

1. Create a folder: `src/problems/your-problem-slug/`
2. Add `problem.js` with title, description, examples, constraints, starter code, and function name
3. Add `testcases.js` with test case inputs, expected outputs, and comparison type
4. The problem is automatically discovered -- no imports or config changes needed

## How the Execution Engine Works

User code runs inside a **Web Worker** (separate thread) using the `Function` constructor. Each test case gets its own worker with a timeout. If the worker doesn't respond within the time limit, it is terminated and marked as TLE. This approach safely handles infinite loops without freezing the browser.

Comparison strategies include exact equality, deep structural comparison, unordered arrays, unordered groups (for anagram-type problems), and palindrome validation.

## Author

**Kumar Mohan** -- [kumarmohan.com](https://kumarmohan.com) | [GitHub](https://github.com/mohan-kumar-0)

## License

Copyright 2026 Kumar Mohan. All rights reserved.
