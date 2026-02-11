module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/oauth/utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cacheDelete",
    ()=>cacheDelete,
    "cacheGet",
    ()=>cacheGet,
    "cacheSet",
    ()=>cacheSet,
    "generateSessionId",
    ()=>generateSessionId,
    "generateStateToken",
    ()=>generateStateToken,
    "getAppUrl",
    ()=>getAppUrl,
    "setStateCookie",
    ()=>setStateCookie,
    "verifyStateToken",
    ()=>verifyStateToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
const STATE_COOKIE_NAME = 'oauth_state';
const STATE_EXPIRY_MS = 15 * 60 * 1000 // 15 minutes
;
function getSecret() {
    const secret = process.env.OAUTH_STATE_SECRET;
    if (!secret) throw new Error('OAUTH_STATE_SECRET is not set');
    return secret;
}
function sign(payload) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])('sha256', getSecret()).update(payload).digest('hex');
}
function generateStateToken(provider, returnStep) {
    const nonce = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16).toString('hex');
    const timestamp = Date.now().toString();
    const payload = `${provider}:${returnStep}:${timestamp}:${nonce}`;
    const signature = sign(payload);
    return `${payload}:${signature}`;
}
async function setStateCookie(state) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(STATE_COOKIE_NAME, state, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 900,
        path: '/'
    });
}
async function verifyStateToken(state) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const cookieValue = cookieStore.get(STATE_COOKIE_NAME)?.value;
    if (!cookieValue || cookieValue !== state) return null;
    const parts = state.split(':');
    if (parts.length !== 5) return null;
    const [provider, returnStep, timestamp, nonce, signature] = parts;
    const payload = `${provider}:${returnStep}:${timestamp}:${nonce}`;
    const expectedSignature = sign(payload);
    if (signature !== expectedSignature) return null;
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > STATE_EXPIRY_MS) return null;
    // Clear the cookie after verification
    cookieStore.delete(STATE_COOKIE_NAME);
    return {
        provider,
        returnStep: parseInt(returnStep, 10)
    };
}
// Simple in-memory cache with TTL for storing OAuth data between callback and retrieval
const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes
;
function cacheSet(key, data) {
    cache.set(key, {
        data,
        expiresAt: Date.now() + CACHE_TTL_MS
    });
}
function cacheGet(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
        cache.delete(key);
        return null;
    }
    return entry.data;
}
function cacheDelete(key) {
    cache.delete(key);
}
function generateSessionId() {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(32).toString('hex');
}
function getAppUrl() {
    // APP_URL is a runtime env var (read from .env.production by Docker at start)
    // NEXT_PUBLIC_APP_URL is baked at build time — wrong when building locally
    return process.env.APP_URL || ("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000';
}
}),
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
"[project]/src/app/api/oauth/github/connect/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "HEAD",
    ()=>HEAD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$github$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/github.ts [app-route] (ecmascript)");
;
;
;
async function HEAD() {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 503
        });
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 200
    });
}
async function GET(request) {
    try {
        if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'GitHub OAuth not configured'
            }, {
                status: 503
            });
        }
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateStateToken"])('github', 3);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setStateCookie"])(state);
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$github$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGitHubAuthUrl"])(state);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    } catch (error) {
        console.error('GitHub connect error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(`${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/onboarding/oauth-success?provider=github&error=${encodeURIComponent('Failed to initiate GitHub OAuth')}`);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d882f0ff._.js.map