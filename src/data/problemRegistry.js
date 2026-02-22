// Problem registry - dynamically imports all problem modules
// To add a new problem, create a folder in /problems/<slug>/ with problem.js and testcases.js

const problemModules = import.meta.glob('/src/problems/*/problem.js', { eager: true });
const testcaseModules = import.meta.glob('/src/problems/*/testcases.js', { eager: true });

function buildProblemList() {
    const problems = [];

    for (const path in problemModules) {
        // Extract slug from path: /src/problems/<slug>/problem.js
        const slug = path.split('/')[3];
        const problem = problemModules[path].default;

        // Find matching testcases
        const tcPath = `/src/problems/${slug}/testcases.js`;
        const testcases = testcaseModules[tcPath]?.default || [];

        problems.push({
            ...problem,
            slug,
            testcases,
        });
    }

    // Sort by id
    problems.sort((a, b) => a.id - b.id);
    return problems;
}

export const problems = buildProblemList();

export function getProblemBySlug(slug) {
    return problems.find((p) => p.slug === slug) || null;
}
