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
export function saveCode(slug, code) {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        if (!data.code) data.code = {};
        data.code[slug] = code;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Ignore
    }
}

/**
 * Get saved code for a problem
 */
export function getSavedCode(slug) {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return data.code?.[slug] || null;
    } catch {
        return null;
    }
}
