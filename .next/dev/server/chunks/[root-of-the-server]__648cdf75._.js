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
    return ("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000';
}
}),
"[project]/src/lib/oauth/linkedin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exchangeLinkedInCode",
    ()=>exchangeLinkedInCode,
    "fetchLinkedInProfile",
    ()=>fetchLinkedInProfile,
    "getLinkedInAuthUrl",
    ()=>getLinkedInAuthUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/utils.ts [app-route] (ecmascript)");
;
function getLinkedInAuthUrl(state) {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) throw new Error('LINKEDIN_CLIENT_ID is not set');
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: 'openid profile email',
        state,
        redirect_uri: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAppUrl"])()}/api/oauth/linkedin/callback`
    });
    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}
async function exchangeLinkedInCode(code) {
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAppUrl"])()}/api/oauth/linkedin/callback`
    });
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(`LinkedIn OAuth error: ${data.error_description || data.error}`);
    }
    return data.access_token;
}
async function fetchLinkedInProfile(token) {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.status}`);
    }
    const data = await response.json();
    return {
        name: data.name || `${data.given_name || ''} ${data.family_name || ''}`.trim(),
        email: data.email || '',
        picture: data.picture || null,
        sub: data.sub,
        verified: true
    };
}
}),
"[project]/src/app/api/oauth/linkedin/connect/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$linkedin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/linkedin.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'LinkedIn OAuth not configured'
            }, {
                status: 503
            });
        }
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateStateToken"])('linkedin', 4);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setStateCookie"])(state);
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$linkedin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLinkedInAuthUrl"])(state);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    } catch (error) {
        console.error('LinkedIn connect error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(`${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/onboarding/oauth-success?provider=linkedin&error=${encodeURIComponent('Failed to initiate LinkedIn OAuth')}`);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__648cdf75._.js.map