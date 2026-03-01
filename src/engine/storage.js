const STORAGE_KEY = 'codearena_progress';

/**
 * Get all solved problem slugs
 */
export function getSolvedProblems() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return data.solved || [];
    } catch {
        return [];
    }
}

/**
 * Mark a problem as solved
 */
export function markSolved(slug) {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const solved = new Set(data.solved || []);
        solved.add(slug);
        data.solved = [...solved];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Ignore storage errors
    }
}

/**
 * Check if a problem is solved
 */
export function isSolved(slug) {
    return getSolvedProblems().includes(slug);
}

/**
 * Save user code for a problem
 */
export function saveCode(slug, code, language = 'javascript') {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        if (!data.code) data.code = {};
        const key = `${slug}_${language}`;
        data.code[key] = code;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Ignore
    }
}

/**
 * Get saved code for a problem
 */
export function getSavedCode(slug, language = 'javascript') {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const key = `${slug}_${language}`;
        // Fallback to old key for JS if new key doesn't exist
        return data.code?.[key] || data.code?.[slug] || null;
    } catch {
        return null;
    }
}
