import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblemBySlug } from '../data/problemRegistry';
import { runAllTests } from '../engine/codeRunner';
import { markSolved, saveCode, getSavedCode } from '../engine/storage';
import { useTheme } from '../context/ThemeContext';
import DescriptionPanel from '../components/DescriptionPanel';
import ResultsPanel from '../components/ResultsPanel';

export default function ProblemSolve() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const problem = getProblemBySlug(slug);

    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [results, setResults] = useState(null);
    const [running, setRunning] = useState(false);
    const [progress, setProgress] = useState(null); // { completed, total, results }
    const [descWidth, setDescWidth] = useState(45);
    const [resultsHeight, setResultsHeight] = useState(280);
    const resizerRef = useRef(null);
    const resultsResizerRef = useRef(null);
    const layoutRef = useRef(null);
    const editorResultsRef = useRef(null);

    // Get starter code for a specific language
    const getStarterCode = (lang) => {
        if (!problem) return '';
        if (typeof problem.starterCode === 'string') {
            return lang === 'javascript' ? problem.starterCode : '';
        }
        return problem.starterCode[lang] || '';
    };

    // Load problem + saved code
    useEffect(() => {
        if (problem) {
            const saved = getSavedCode(slug, language);
            setCode(saved || getStarterCode(language));
            setResults(null);
            setProgress(null);
        }
    }, [slug, problem, language]);

    // Auto-save code
    useEffect(() => {
        if (code && slug) {
            const id = setTimeout(() => saveCode(slug, code, language), 500);
            return () => clearTimeout(id);
        }
    }, [code, slug, language]);

    // Horizontal resizer
    useEffect(() => {
        const resizer = resizerRef.current;
        const layout = layoutRef.current;
        if (!resizer || !layout) return;

        let isDragging = false;

        const onMouseDown = (e) => {
            isDragging = true;
            resizer.classList.add('active');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const rect = layout.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setDescWidth(Math.max(20, Math.min(70, pct)));
        };

        const onMouseUp = () => {
            isDragging = false;
            resizer.classList.remove('active');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        resizer.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            resizer.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    // Vertical resizer
    useEffect(() => {
        const resizer = resultsResizerRef.current;
        const container = editorResultsRef.current;
        if (!resizer || !container) return;

        let isDragging = false;

        const onMouseDown = (e) => {
            isDragging = true;
            resizer.classList.add('active');
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            const fromBottom = rect.bottom - e.clientY;
            setResultsHeight(Math.max(100, Math.min(rect.height - 150, fromBottom)));
        };

        const onMouseUp = () => {
            isDragging = false;
            resizer.classList.remove('active');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        resizer.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            resizer.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    const handleRun = useCallback(async () => {
        if (!problem || running) return;
        setRunning(true);
        setResults(null);
        setProgress(null);

        const timeLimit = problem.timeLimit || 3000;

        const result = await runAllTests(
            code,
            problem.functionName,
            language,
            problem.testcases,
            timeLimit,
            (partialResults, completed, total) => {
                setProgress({ completed, total, results: partialResults });
            }
        );

        setResults(result);
        setRunning(false);
        setProgress(null);

        if (result.summary.allPassed) {
            markSolved(slug);
        }
    }, [code, problem, running, slug, language]);

    const handleReset = useCallback(() => {
        if (problem) {
            setCode(getStarterCode(language));
            setResults(null);
            setProgress(null);
        }
    }, [problem, language, getStarterCode]);

    // Keyboard shortcut
    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleRun();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handleRun]);

    if (!problem) {
        return (
            <div className="solve-page">
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: '100vh', flexDirection: 'column', gap: '16px',
                }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>404</span>
                    <p style={{ color: 'var(--text-secondary)' }}>Problem not found.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Back to Problems
                    </button>
                </div>
            </div>
        );
    }

    const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

    return (
        <div className="solve-page">
            {/* Header */}
            <header className="solve-header">
                <div className="solve-nav">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span>Problems</span>
                    </button>
                    <div className="solve-title-bar">
                        <span className="problem-number">#{problem.id}</span>
                        <h2 className="solve-problem-title">{problem.title}</h2>
                        <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <div className="solve-actions">
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            style={{ width: '34px', height: '34px' }}
                        >
                            {theme === 'dark' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                                    <circle cx="12" cy="12" r="5" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>
                        <button className="btn btn-secondary" onClick={handleReset}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                            </svg>
                            Reset
                        </button>
                        <button
                            className={`btn btn-primary ${running ? 'running' : ''}`}
                            onClick={handleRun}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            {running ? 'Running...' : 'Run Code'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Split layout */}
            <div className="solve-layout" ref={layoutRef}>
                <div className="panel panel-description" style={{ width: `${descWidth}%` }}>
                    <DescriptionPanel problem={problem} />
                </div>

                <div className="resizer" ref={resizerRef} />

                <div className="panel panel-editor-results" ref={editorResultsRef}>
                    <div className="editor-section">
                        <div className="editor-toolbar">
                            <select
                                className="lang-selector"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="cpp">C++</option>
                            </select>
                            <span style={{
                                marginLeft: 'auto', fontSize: '0.78rem',
                                color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                            }}>
                                Ctrl + Enter to run
                            </span>
                        </div>
                        <div className="editor-wrap">
                            <Editor
                                height="100%"
                                language={language === 'cpp' ? 'cpp' : language}
                                value={code}
                                onChange={(val) => setCode(val || '')}
                                theme={editorTheme}
                                options={{
                                    fontSize: 14,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    padding: { top: 16, bottom: 16 },
                                    lineNumbers: 'on',
                                    renderLineHighlight: 'line',
                                    smoothScrolling: true,
                                    cursorBlinking: 'smooth',
                                    cursorSmoothCaretAnimation: 'on',
                                    bracketPairColorization: { enabled: true },
                                    tabSize: 2,
                                    wordWrap: 'on',
                                    automaticLayout: true,
                                }}
                            />
                        </div>
                    </div>

                    <div className="results-resizer" ref={resultsResizerRef} />

                    <ResultsPanel
                        results={results}
                        running={running}
                        progress={progress}
                        height={resultsHeight}
                    />
                </div>
            </div>
        </div>
    );
}
