import { useState } from 'react';

export default function DescriptionPanel({ problem }) {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <>
            <div className="panel-tabs">
                <button
                    className={`panel-tab ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                {problem.editorial && (
                    <button
                        className={`panel-tab ${activeTab === 'editorial' ? 'active' : ''}`}
                        onClick={() => setActiveTab('editorial')}
                    >
                        Editorial
                    </button>
                )}
            </div>
            <div className="panel-body">
                {activeTab === 'description' ? (
                    <DescriptionTab problem={problem} />
                ) : (
                    <EditorialTab editorial={problem.editorial} />
                )}
            </div>
        </>
    );
}

function DescriptionTab({ problem }) {
    return (
        <div className="description-content">
            {/* Description text */}
            <div style={{ marginBottom: '24px' }}>
                {problem.description.split('\n').map((paragraph, i) => {
                    if (!paragraph.trim()) return null;
                    return (
                        <p key={i} dangerouslySetInnerHTML={{ __html: formatInlineCode(paragraph) }} />
                    );
                })}
            </div>

            {/* Examples */}
            {problem.examples && problem.examples.length > 0 && (
                <>
                    <h2>Examples</h2>
                    {problem.examples.map((ex, i) => (
                        <div className="example-box" key={i}>
                            <div className="example-label">Example {i + 1}</div>
                            <div className="example-line">
                                <strong>Input: </strong>
                                <code>{ex.input}</code>
                            </div>
                            <div className="example-line">
                                <strong>Output: </strong>
                                <code>{ex.output}</code>
                            </div>
                            {ex.explanation && (
                                <div className="example-line" style={{ marginTop: '6px' }}>
                                    <strong>Explanation: </strong>{ex.explanation}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* Constraints */}
            {problem.constraints && problem.constraints.length > 0 && (
                <>
                    <h2>Constraints</h2>
                    <ul className="constraints-list">
                        {problem.constraints.map((c, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineCode(c) }} />
                        ))}
                    </ul>
                </>
            )}

            {/* Hints - inline, collapsible */}
            {problem.hints && problem.hints.length > 0 && (
                <>
                    <h2>Hints</h2>
                    <div className="hints-section">
                        {problem.hints.map((hint, i) => (
                            <HintItem key={i} index={i} hint={hint} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function EditorialTab({ editorial }) {
    if (!editorial) return null;

    return (
        <div className="description-content editorial-content">
            {/* Approach heading */}
            {editorial.approach && (
                <>
                    <h2>Approach: {editorial.approach}</h2>
                </>
            )}

            {/* Intuition */}
            {editorial.intuition && (
                <div className="editorial-section">
                    <h3>Intuition</h3>
                    {editorial.intuition.split('\n').map((p, i) => {
                        if (!p.trim()) return null;
                        return <p key={i} dangerouslySetInnerHTML={{ __html: formatInlineCode(p) }} />;
                    })}
                </div>
            )}

            {/* Algorithm steps */}
            {editorial.steps && editorial.steps.length > 0 && (
                <div className="editorial-section">
                    <h3>Algorithm</h3>
                    <ol className="editorial-steps">
                        {editorial.steps.map((step, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineCode(step) }} />
                        ))}
                    </ol>
                </div>
            )}

            {/* Solution code */}
            {editorial.solution && (
                <div className="editorial-section">
                    <h3>Solution</h3>
                    {typeof editorial.solution === 'string' ? (
                        <pre className="editorial-code"><code>{editorial.solution}</code></pre>
                    ) : (
                        <SolutionTabs solutions={editorial.solution} />
                    )}
                </div>
            )}

            {/* Complexity */}
            {(editorial.timeComplexity || editorial.spaceComplexity) && (
                <div className="editorial-section">
                    <h3>Complexity Analysis</h3>
                    <ul className="complexity-list">
                        {editorial.timeComplexity && (
                            <li>
                                <strong>Time: </strong>
                                <span dangerouslySetInnerHTML={{ __html: formatInlineCode(editorial.timeComplexity) }} />
                            </li>
                        )}
                        {editorial.spaceComplexity && (
                            <li>
                                <strong>Space: </strong>
                                <span dangerouslySetInnerHTML={{ __html: formatInlineCode(editorial.spaceComplexity) }} />
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

function HintItem({ index, hint }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="hint-item">
            <button
                className={`hint-toggle ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <span>Hint {index + 1}</span>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open && <div className="hint-body">{hint}</div>}
        </div>
    );
}

function SolutionTabs({ solutions }) {
    const langs = Object.keys(solutions);
    const [activeLang, setActiveLang] = useState(langs[0]);

    return (
        <div className="solution-tabs-container">
            <div className="solution-tabs-header">
                {langs.map(lang => (
                    <button
                        key={lang}
                        className={`solution-tab ${activeLang === lang ? 'active' : ''}`}
                        onClick={() => setActiveLang(lang)}
                    >
                        {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'C++'}
                    </button>
                ))}
            </div>
            <pre className="editorial-code"><code>{solutions[activeLang]}</code></pre>
        </div>
    );
}

/**
 * Simple inline code formatting: converts `code` to <code>code</code>
 * and **bold** to <strong>bold</strong>
 */
function formatInlineCode(text) {
    return text
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
