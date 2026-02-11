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
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/src/lib/oauth/stripe.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exchangeStripeCode",
    ()=>exchangeStripeCode,
    "fetchStripeData",
    ()=>fetchStripeData,
    "getStripeConnectUrl",
    ()=>getStripeConnectUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/utils.ts [app-route] (ecmascript)");
;
;
function getStripeClient() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](key);
}
function getStripeConnectUrl(state) {
    const clientId = process.env.STRIPE_CONNECT_CLIENT_ID;
    if (!clientId) throw new Error('STRIPE_CONNECT_CLIENT_ID is not set');
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: 'read_only',
        state,
        redirect_uri: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAppUrl"])()}/api/oauth/stripe/callback`
    });
    return `https://connect.stripe.com/oauth/authorize?${params.toString()}`;
}
async function exchangeStripeCode(code) {
    const stripe = getStripeClient();
    const response = await stripe.oauth.token({
        grant_type: 'authorization_code',
        code
    });
    if (!response.stripe_user_id) {
        throw new Error('Stripe OAuth: no stripe_user_id returned');
    }
    return response.stripe_user_id;
}
function categorizeRevenue(monthly) {
    if (monthly === 0) return '0';
    if (monthly <= 1000) return '1-1000';
    if (monthly <= 5000) return '1000-5000';
    if (monthly <= 10000) return '5000-10000';
    if (monthly <= 50000) return '10000-50000';
    return '50000+';
}
function categorizeChargebackRate(rate) {
    if (rate === 0) return 'none';
    if (rate < 1) return 'low';
    if (rate <= 3) return 'medium';
    return 'high';
}
async function fetchStripeData(stripeUserId) {
    const stripe = getStripeClient();
    const [account, charges, disputes] = await Promise.all([
        stripe.accounts.retrieve(stripeUserId),
        stripe.charges.list({
            limit: 100
        }, {
            stripeAccount: stripeUserId
        }),
        stripe.disputes.list({
            limit: 100
        }, {
            stripeAccount: stripeUserId
        })
    ]);
    // Calculate monthly revenue from charges in the last 30 days
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
    const recentCharges = charges.data.filter((c)=>c.created >= thirtyDaysAgo && c.status === 'succeeded');
    const monthlyRevenue = recentCharges.reduce((sum, c)=>sum + c.amount, 0) / 100;
    // Account age
    const accountCreatedTs = account.created ?? Math.floor(Date.now() / 1000);
    const accountCreated = new Date(accountCreatedTs * 1000).toISOString();
    const accountAgeMonths = Math.floor((Date.now() - accountCreatedTs * 1000) / (30.44 * 24 * 60 * 60 * 1000));
    // Chargeback rate
    const totalCharges = charges.data.length;
    const totalDisputes = disputes.data.length;
    const chargebackRate = totalCharges > 0 ? totalDisputes / totalCharges * 100 : 0;
    return {
        monthlyRevenue,
        monthlyRevenueFormatted: `$${monthlyRevenue.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`,
        revenueRange: categorizeRevenue(monthlyRevenue),
        accountAgeMonths,
        accountCreated,
        chargebackRate: Math.round(chargebackRate * 100) / 100,
        chargebackRateCategory: categorizeChargebackRate(chargebackRate),
        totalCharges,
        totalDisputes
    };
}
}),
"[project]/src/app/api/oauth/stripe/connect/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/stripe.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_CONNECT_CLIENT_ID) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Stripe Connect not configured'
            }, {
                status: 503
            });
        }
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateStateToken"])('stripe', 5);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setStateCookie"])(state);
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getStripeConnectUrl"])(state);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    } catch (error) {
        console.error('Stripe connect error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(`${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/onboarding/oauth-success?provider=stripe&error=${encodeURIComponent('Failed to initiate Stripe Connect')}`);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b6965311._.js.map