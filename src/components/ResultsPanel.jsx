import { useState } from 'react';

export default function ResultsPanel({ results, running, progress, height }) {
    if (running) {
        return (
            <div className="results-section" style={{ height: `${height}px` }}>
                <ResultsHeader />
                <div className="results-body">
                    {progress ? (
                        <div style={{ padding: '12px 0' }}>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)',
                            }}>
                                <span>Running test cases...</span>
                                <span style={{ fontFamily: 'var(--font-mono)' }}>
                                    {progress.completed}/{progress.total}
                                </span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                                />
                            </div>
                            {progress.results.map((tc, i) => (
                                <TestCaseCard key={tc.id} tc={tc} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="running-indicator">
                            <div className="spinner" />
                            <span className="running-text">Preparing test cases...</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="results-section" style={{ height: `${height}px` }}>
                <ResultsHeader />
                <div className="results-body">
                    <div className="results-placeholder">
                        <p>
                            Click <strong>Run Code</strong> to execute your solution against all
                            test cases.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const { summary } = results;

    return (
        <div className="results-section" style={{ height: `${height}px` }}>
            <ResultsHeader summary={summary} />
            <div className="results-body">
                {summary.allPassed && (
                    <div className="celebration">
                        <div className="celebration-text">All Test Cases Passed</div>
                        <div className="celebration-subtext">
                            Completed in {summary.totalTime.toFixed(2)}ms
                        </div>
                    </div>
                )}
                {results.results.map((tc, i) => (
                    <TestCaseCard key={tc.id} tc={tc} index={i} />
                ))}
            </div>
        </div>
    );
}

function ResultsHeader({ summary }) {
    const buildSummaryText = () => {
        if (!summary) return null;
        const parts = [`${summary.passed}/${summary.total} passed`];
        if (summary.tles > 0) parts.push(`${summary.tles} TLE`);
        if (summary.errors > 0) parts.push(`${summary.errors} error${summary.errors > 1 ? 's' : ''}`);
        parts.push(`${summary.totalTime.toFixed(2)}ms`);
        return parts.join(' • ');
    };

    return (
        <div className="results-header">
            <h3 className="results-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                </svg>
                Test Results
            </h3>
            {summary && (
                <span className={`results-summary ${summary.allPassed ? 'all-pass' : 'some-fail'}`}>
                    {buildSummaryText()}
                </span>
            )}
        </div>
    );
}

function TestCaseCard({ tc, index }) {
    const [expanded, setExpanded] = useState(tc.status !== 'pass');

    const statusSymbol = {
        pass: '\u2713',
        fail: '\u2717',
        error: '!',
        tle: 'T',
    }[tc.status] || '?';

    const statusLabel = {
        pass: 'Accepted',
        fail: 'Wrong Answer',
        error: 'Runtime Error',
        tle: 'Time Limit Exceeded',
    }[tc.status] || tc.status;

    return (
        <div
            className={`test-case-card ${tc.status}`}
            style={{ animationDelay: `${index * 60}ms` }}
        >
            <div className="tc-header" onClick={() => setExpanded(!expanded)}>
                <div className="tc-header-left">
                    <span className={`tc-status-icon ${tc.status}`}>{statusSymbol}</span>
                    <span className="tc-label">Test Case {tc.id}</span>
                    <span className={`tc-status-text ${tc.status}`}>{statusLabel}</span>
                </div>
                <span className="tc-timing">
                    {tc.status === 'tle' ? `>${tc.time}ms` : `${tc.time.toFixed(3)}ms`}
                </span>
            </div>
            {expanded && (
                <div className="tc-details">
                    <div className="tc-detail-row">
                        <span className="tc-detail-label">Input</span>
                        <span className="tc-detail-value">{formatValue(tc.input)}</span>
                    </div>
                    <div className="tc-detail-row">
                        <span className="tc-detail-label">Expected</span>
                        <span className="tc-detail-value">{formatValue(tc.expected)}</span>
                    </div>
                    {tc.status === 'error' || tc.status === 'tle' ? (
                        <div className="tc-detail-row">
                            <span className="tc-detail-label">{tc.status === 'tle' ? 'Status' : 'Error'}</span>
                            <span className={`tc-detail-value ${tc.status === 'tle' ? 'tle-msg' : 'error-msg'}`}>
                                {tc.error}
                            </span>
                        </div>
                    ) : (
                        <div className="tc-detail-row">
                            <span className="tc-detail-label">Output</span>
                            <span className={`tc-detail-value ${tc.status === 'fail' ? 'error-msg' : ''}`}>
                                {formatValue(tc.actual)}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function formatValue(val) {
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    try {
        return JSON.stringify(val);
    } catch {
        return String(val);
    }
}
