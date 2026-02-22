import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { problems } from '../data/problemRegistry';
import { getSolvedProblems } from '../engine/storage';
import { useTheme } from '../context/ThemeContext';

export default function ProblemList() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('all');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const solved = useMemo(() => new Set(getSolvedProblems()), []);

    // Extract unique topics
    const allTopics = useMemo(() => {
        const topics = [...new Set(problems.map((p) => p.category))];
        topics.sort();
        return topics;
    }, []);

    const filtered = useMemo(() => {
        return problems.filter((p) => {
            const matchesSearch =
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase());
            const matchesDifficulty =
                difficulty === 'all' || p.difficulty === difficulty;
            const matchesTopic =
                selectedTopics.length === 0 || selectedTopics.includes(p.category);
            return matchesSearch && matchesDifficulty && matchesTopic;
        });
    }, [search, difficulty, selectedTopics]);

    const stats = useMemo(() => {
        const total = problems.length;
        const solvedCount = problems.filter((p) => solved.has(p.slug)).length;
        return { total, solved: solvedCount };
    }, [solved]);

    const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

    const toggleTopic = (topic) => {
        setSelectedTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
        );
    };

    return (
        <div className="page-list">
            {/* Hero */}
            <header className="hero">
                <div className="hero-bg" />
                <nav className="navbar">
                    <div className="logo">
                        <span className="logo-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </span>
                        <span className="logo-text">
                            Code<span className="accent">Arena</span>
                        </span>
                    </div>
                    <div className="nav-right">
                        <div className="nav-stats">
                            <div className="nav-stat">
                                Solved:{' '}
                                <span className="stat-value">
                                    {stats.solved}/{stats.total}
                                </span>
                            </div>
                        </div>
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Sharpen Your <span className="accent">JavaScript</span> Skills
                    </h1>
                    <p className="hero-subtitle">
                        Solve challenges, run tests in your browser, and track your progress
                        — no server needed.
                    </p>
                    <div className="hero-search">
                        <svg
                            className="search-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            id="search-input"
                            placeholder="Search problems..."
                            autoComplete="off"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="filters-section">
                        <div className="hero-filters">
                            {difficulties.map((d) => (
                                <button
                                    key={d}
                                    className={`filter-btn ${d.toLowerCase()} ${difficulty === d ? 'active' : ''
                                        }`}
                                    onClick={() => setDifficulty(d)}
                                >
                                    {d === 'all' ? 'All' : d}
                                </button>
                            ))}
                        </div>
                        <div className="topic-filters">
                            {allTopics.map((topic) => (
                                <button
                                    key={topic}
                                    className={`topic-btn ${selectedTopics.includes(topic) ? 'active' : ''
                                        }`}
                                    onClick={() => toggleTopic(topic)}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Problem Table */}
            <main className="problem-list-container">
                <div className="problem-table-wrap">
                    {filtered.length > 0 ? (
                        <table className="problem-table">
                            <thead>
                                <tr>
                                    <th className="th-status">Status</th>
                                    <th className="th-id">#</th>
                                    <th className="th-title">Title</th>
                                    <th className="th-difficulty">Difficulty</th>
                                    <th className="th-category">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p) => (
                                    <tr
                                        key={p.slug}
                                        onClick={() => navigate(`/problem/${p.slug}`)}
                                    >
                                        <td className="td-status">
                                            <span
                                                className={`status-icon ${solved.has(p.slug) ? 'solved' : 'unsolved'
                                                    }`}
                                            >
                                                {solved.has(p.slug) ? '\u2713' : ''}
                                            </span>
                                        </td>
                                        <td className="td-id">{p.id}</td>
                                        <td className="td-title">{p.title}</td>
                                        <td className="td-difficulty">
                                            <span
                                                className={`difficulty-badge ${p.difficulty.toLowerCase()}`}
                                            >
                                                {p.difficulty}
                                            </span>
                                        </td>
                                        <td className="td-category">
                                            <span className="category-tag">{p.category}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty-state">
                            <p>No problems found matching your filters.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-links">
                        <a
                            className="footer-link"
                            href="https://kumarmohan.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            Portfolio
                        </a>
                        <span className="footer-divider" />
                        <a
                            className="footer-link"
                            href="https://github.com/mohan-kumar-0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                    <p className="footer-copyright">
                        &copy; 2026 <a href="https://kumarmohan.com" target="_blank" rel="noopener noreferrer">Kumar Mohan</a>. All rights reserved.
                    </p>
                    <p className="footer-tagline">Built with React, Vite, and Monaco Editor</p>
                </div>
            </footer>
        </div>
    );
}
