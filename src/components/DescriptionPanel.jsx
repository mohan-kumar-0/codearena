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
                {problem.hints && problem.hints.length > 0 && (
                    <button
                        className={`panel-tab ${activeTab === 'hints' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hints')}
                    >
                        Hints ({problem.hints.length})
                    </button>
                )}
            </div>
            <div className="panel-body">
                {activeTab === 'description' ? (
                    <DescriptionTab problem={problem} />
                ) : (
                    <HintsTab hints={problem.hints} />
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
        </div>
    );
}

function HintsTab({ hints }) {
    return (
        <div className="hints-section">
            {hints.map((hint, i) => (
                <HintItem key={i} index={i} hint={hint} />
            ))}
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

/**
 * Simple inline code formatting: converts `code` to <code>code</code>
 * and **bold** to <strong>bold</strong>
 */
function formatInlineCode(text) {
    return text
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
