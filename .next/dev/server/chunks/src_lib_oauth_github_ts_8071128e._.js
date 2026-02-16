module.exports = [
"[project]/src/lib/oauth/github.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exchangeGitHubCode",
    ()=>exchangeGitHubCode,
    "fetchGitHubProfile",
    ()=>fetchGitHubProfile,
    "getGitHubAuthUrl",
    ()=>getGitHubAuthUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@octokit/rest/dist-src/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/utils.ts [app-route] (ecmascript)");
;
;
function getGitHubAuthUrl(state) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) throw new Error('GITHUB_CLIENT_ID is not set');
    const params = new URLSearchParams({
        client_id: clientId,
        scope: 'read:user',
        state,
        redirect_uri: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAppUrl"])()}/api/oauth/github/callback`
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
}
async function exchangeGitHubCode(code) {
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        })
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`);
    }
    return data.access_token;
}
async function fetchGitHubProfile(token) {
    const octokit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Octokit"]({
        auth: token
    });
    const { data: user } = await octokit.users.getAuthenticated();
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
        sort: 'pushed',
        per_page: 100
    });
    // Aggregate languages
    const langCounts = {};
    let totalStars = 0;
    for (const repo of repos){
        if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
        totalStars += repo.stargazers_count ?? 0;
    }
    const topLanguages = Object.entries(langCounts).sort((a, b)=>b[1] - a[1]).slice(0, 5).map(([lang])=>lang);
    const createdAt = user.created_at;
    const accountAgeYears = Math.floor((Date.now() - new Date(createdAt).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    return {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        createdAt,
        accountAgeYears,
        publicRepos: user.public_repos,
        followers: user.followers,
        totalStars,
        topLanguages
    };
}
}),
];

//# sourceMappingURL=src_lib_oauth_github_ts_8071128e._.js.map