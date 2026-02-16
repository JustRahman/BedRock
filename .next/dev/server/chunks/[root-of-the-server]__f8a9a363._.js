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
        scope: 'read_write',
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
"[project]/src/lib/validations/onboarding.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "basicInfoSchema",
    ()=>basicInfoSchema,
    "chargebackOptions",
    ()=>chargebackOptions,
    "codeHistorySchema",
    ()=>codeHistorySchema,
    "countries",
    ()=>countries,
    "countryRiskTiers",
    ()=>countryRiskTiers,
    "digitalPresenceSchema",
    ()=>digitalPresenceSchema,
    "financialSchema",
    ()=>financialSchema,
    "geographyOptions",
    ()=>geographyOptions,
    "getCountryPenalty",
    ()=>getCountryPenalty,
    "highRiskCountries",
    ()=>highRiskCountries,
    "identitySchema",
    ()=>identitySchema,
    "onboardingSchema",
    ()=>onboardingSchema,
    "professionalSchema",
    ()=>professionalSchema,
    "revenueOptions",
    ()=>revenueOptions,
    "trustSignalsSchema",
    ()=>trustSignalsSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/schemas.js [app-route] (ecmascript)");
;
const basicInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    fullName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().min(2, 'Name must be at least 2 characters'),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().email('Please enter a valid email address'),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().min(6, 'Please enter a valid phone number'),
    gender: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enum"]([
        'male',
        'female'
    ]).optional(),
    countryOfOrigin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().min(1, 'Please select your country of origin'),
    countryOfResidence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().min(1, 'Please select your country of residence'),
    dateOfBirth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional()
});
const identitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    hasPassport: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    hasLocalId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    hasAddressProof: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    hasLivenessCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    faceSkipped: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    passportNameMatch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    passportDobMatch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    passportGenderMatch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    passportNationalityMatch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    passportFile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]().optional(),
    localIdFile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]().optional(),
    addressProofFile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]().optional(),
    passportData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]().optional(),
    localIdData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]().optional(),
    addressProofData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]().optional()
});
const codeHistorySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    hasGithub: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    githubUsername: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    githubConnected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional()
});
const professionalSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    hasLinkedin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    linkedinUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().url('Please enter a valid URL').or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().length(0)).optional(),
    linkedinConnected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional()
});
const financialSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    hasStripeConnected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    monthlyRevenue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    customerGeography: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    chargebackRate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    hasBankStatements: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]()
});
const digitalPresenceSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().url('Please enter a valid URL').or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().length(0)).optional(),
    twitterHandle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    instagramHandle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    appStoreUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().url('Please enter a valid URL').or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().length(0)).optional(),
    websiteVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    twitterVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    instagramVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    appStoreVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional()
});
const trustSignalsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    hasReferral: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    referralCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    referralVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    referrerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    hasUniversityEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    universityEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().email().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().length(0)),
    universityEmailVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    hasAccelerator: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    acceleratorName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    acceleratorVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
    hasEmployerVerification: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"](),
    employerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional()
});
const onboardingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    basicInfo: basicInfoSchema,
    identity: identitySchema,
    codeHistory: codeHistorySchema,
    professional: professionalSchema,
    financial: financialSchema,
    digitalPresence: digitalPresenceSchema,
    trustSignals: trustSignalsSchema
});
const countryRiskTiers = {
    // Tier 1: No adjustment (0)
    CA: 0,
    GB: 0,
    DE: 0,
    FR: 0,
    AU: 0,
    SG: 0,
    IE: 0,
    NL: 0,
    SE: 0,
    DK: 0,
    NO: 0,
    FI: 0,
    AT: 0,
    BE: 0,
    CH: 0,
    NZ: 0,
    JP: 0,
    KR: 0,
    IT: 0,
    ES: 0,
    PT: 0,
    CZ: 0,
    PL: 0,
    US: 0,
    // Tier 2: -5 points
    IN: -5,
    BR: -5,
    MX: -5,
    PH: -5,
    ID: -5,
    TH: -5,
    MY: -5,
    AR: -5,
    CO: -5,
    CL: -5,
    PE: -5,
    EG: -5,
    ZA: -5,
    TR: -5,
    // Tier 3: -10 points
    PK: -10,
    NG: -10,
    KE: -10,
    VN: -10,
    GH: -10,
    TZ: -10,
    UG: -10,
    ET: -10,
    CM: -10,
    SN: -10,
    RW: -10,
    MM: -10,
    KH: -10,
    LA: -10,
    // Tier 4: -15 points
    TM: -15,
    UZ: -15,
    BD: -15,
    VE: -15,
    AF: -15,
    IQ: -15,
    LY: -15,
    SD: -15,
    SS: -15,
    YE: -15,
    SO: -15,
    ER: -15,
    CF: -15,
    TJ: -15,
    KG: -15
};
const highRiskCountries = [
    'CU',
    'IR',
    'KP',
    'SY',
    'RU',
    'BY'
];
function getCountryPenalty(countryCode) {
    if (highRiskCountries.includes(countryCode)) return -20;
    return countryRiskTiers[countryCode] ?? -5;
}
const countries = [
    {
        code: 'AF',
        name: 'Afghanistan'
    },
    {
        code: 'AL',
        name: 'Albania'
    },
    {
        code: 'DZ',
        name: 'Algeria'
    },
    {
        code: 'AS',
        name: 'American Samoa'
    },
    {
        code: 'AD',
        name: 'Andorra'
    },
    {
        code: 'AO',
        name: 'Angola'
    },
    {
        code: 'AI',
        name: 'Anguilla'
    },
    {
        code: 'AQ',
        name: 'Antarctica'
    },
    {
        code: 'AG',
        name: 'Antigua and Barbuda'
    },
    {
        code: 'AR',
        name: 'Argentina'
    },
    {
        code: 'AM',
        name: 'Armenia'
    },
    {
        code: 'AW',
        name: 'Aruba'
    },
    {
        code: 'AU',
        name: 'Australia'
    },
    {
        code: 'AT',
        name: 'Austria'
    },
    {
        code: 'AZ',
        name: 'Azerbaijan'
    },
    {
        code: 'BS',
        name: 'Bahamas'
    },
    {
        code: 'BH',
        name: 'Bahrain'
    },
    {
        code: 'BD',
        name: 'Bangladesh'
    },
    {
        code: 'BB',
        name: 'Barbados'
    },
    {
        code: 'BY',
        name: 'Belarus'
    },
    {
        code: 'BE',
        name: 'Belgium'
    },
    {
        code: 'BZ',
        name: 'Belize'
    },
    {
        code: 'BJ',
        name: 'Benin'
    },
    {
        code: 'BM',
        name: 'Bermuda'
    },
    {
        code: 'BT',
        name: 'Bhutan'
    },
    {
        code: 'BO',
        name: 'Bolivia'
    },
    {
        code: 'BA',
        name: 'Bosnia and Herzegovina'
    },
    {
        code: 'BW',
        name: 'Botswana'
    },
    {
        code: 'BR',
        name: 'Brazil'
    },
    {
        code: 'IO',
        name: 'British Indian Ocean Territory'
    },
    {
        code: 'BN',
        name: 'Brunei'
    },
    {
        code: 'BG',
        name: 'Bulgaria'
    },
    {
        code: 'BF',
        name: 'Burkina Faso'
    },
    {
        code: 'BI',
        name: 'Burundi'
    },
    {
        code: 'CV',
        name: 'Cabo Verde'
    },
    {
        code: 'KH',
        name: 'Cambodia'
    },
    {
        code: 'CM',
        name: 'Cameroon'
    },
    {
        code: 'CA',
        name: 'Canada'
    },
    {
        code: 'KY',
        name: 'Cayman Islands'
    },
    {
        code: 'CF',
        name: 'Central African Republic'
    },
    {
        code: 'TD',
        name: 'Chad'
    },
    {
        code: 'CL',
        name: 'Chile'
    },
    {
        code: 'CN',
        name: 'China'
    },
    {
        code: 'CX',
        name: 'Christmas Island'
    },
    {
        code: 'CC',
        name: 'Cocos (Keeling) Islands'
    },
    {
        code: 'CO',
        name: 'Colombia'
    },
    {
        code: 'KM',
        name: 'Comoros'
    },
    {
        code: 'CG',
        name: 'Congo'
    },
    {
        code: 'CD',
        name: 'Congo (Democratic Republic)'
    },
    {
        code: 'CK',
        name: 'Cook Islands'
    },
    {
        code: 'CR',
        name: 'Costa Rica'
    },
    {
        code: 'HR',
        name: 'Croatia'
    },
    {
        code: 'CU',
        name: 'Cuba'
    },
    {
        code: 'CW',
        name: 'Curacao'
    },
    {
        code: 'CY',
        name: 'Cyprus'
    },
    {
        code: 'CZ',
        name: 'Czech Republic'
    },
    {
        code: 'CI',
        name: "Cote d'Ivoire"
    },
    {
        code: 'DK',
        name: 'Denmark'
    },
    {
        code: 'DJ',
        name: 'Djibouti'
    },
    {
        code: 'DM',
        name: 'Dominica'
    },
    {
        code: 'DO',
        name: 'Dominican Republic'
    },
    {
        code: 'EC',
        name: 'Ecuador'
    },
    {
        code: 'EG',
        name: 'Egypt'
    },
    {
        code: 'SV',
        name: 'El Salvador'
    },
    {
        code: 'GQ',
        name: 'Equatorial Guinea'
    },
    {
        code: 'ER',
        name: 'Eritrea'
    },
    {
        code: 'EE',
        name: 'Estonia'
    },
    {
        code: 'SZ',
        name: 'Eswatini'
    },
    {
        code: 'ET',
        name: 'Ethiopia'
    },
    {
        code: 'FK',
        name: 'Falkland Islands'
    },
    {
        code: 'FO',
        name: 'Faroe Islands'
    },
    {
        code: 'FJ',
        name: 'Fiji'
    },
    {
        code: 'FI',
        name: 'Finland'
    },
    {
        code: 'FR',
        name: 'France'
    },
    {
        code: 'GF',
        name: 'French Guiana'
    },
    {
        code: 'PF',
        name: 'French Polynesia'
    },
    {
        code: 'GA',
        name: 'Gabon'
    },
    {
        code: 'GM',
        name: 'Gambia'
    },
    {
        code: 'GE',
        name: 'Georgia'
    },
    {
        code: 'DE',
        name: 'Germany'
    },
    {
        code: 'GH',
        name: 'Ghana'
    },
    {
        code: 'GI',
        name: 'Gibraltar'
    },
    {
        code: 'GR',
        name: 'Greece'
    },
    {
        code: 'GL',
        name: 'Greenland'
    },
    {
        code: 'GD',
        name: 'Grenada'
    },
    {
        code: 'GP',
        name: 'Guadeloupe'
    },
    {
        code: 'GU',
        name: 'Guam'
    },
    {
        code: 'GT',
        name: 'Guatemala'
    },
    {
        code: 'GG',
        name: 'Guernsey'
    },
    {
        code: 'GN',
        name: 'Guinea'
    },
    {
        code: 'GW',
        name: 'Guinea-Bissau'
    },
    {
        code: 'GY',
        name: 'Guyana'
    },
    {
        code: 'HT',
        name: 'Haiti'
    },
    {
        code: 'HN',
        name: 'Honduras'
    },
    {
        code: 'HK',
        name: 'Hong Kong'
    },
    {
        code: 'HU',
        name: 'Hungary'
    },
    {
        code: 'IS',
        name: 'Iceland'
    },
    {
        code: 'IN',
        name: 'India'
    },
    {
        code: 'ID',
        name: 'Indonesia'
    },
    {
        code: 'IR',
        name: 'Iran'
    },
    {
        code: 'IQ',
        name: 'Iraq'
    },
    {
        code: 'IE',
        name: 'Ireland'
    },
    {
        code: 'IM',
        name: 'Isle of Man'
    },
    {
        code: 'IL',
        name: 'Israel'
    },
    {
        code: 'IT',
        name: 'Italy'
    },
    {
        code: 'JM',
        name: 'Jamaica'
    },
    {
        code: 'JP',
        name: 'Japan'
    },
    {
        code: 'JE',
        name: 'Jersey'
    },
    {
        code: 'JO',
        name: 'Jordan'
    },
    {
        code: 'KZ',
        name: 'Kazakhstan'
    },
    {
        code: 'KE',
        name: 'Kenya'
    },
    {
        code: 'KI',
        name: 'Kiribati'
    },
    {
        code: 'KP',
        name: 'North Korea'
    },
    {
        code: 'KR',
        name: 'South Korea'
    },
    {
        code: 'KW',
        name: 'Kuwait'
    },
    {
        code: 'KG',
        name: 'Kyrgyzstan'
    },
    {
        code: 'LA',
        name: 'Laos'
    },
    {
        code: 'LV',
        name: 'Latvia'
    },
    {
        code: 'LB',
        name: 'Lebanon'
    },
    {
        code: 'LS',
        name: 'Lesotho'
    },
    {
        code: 'LR',
        name: 'Liberia'
    },
    {
        code: 'LY',
        name: 'Libya'
    },
    {
        code: 'LI',
        name: 'Liechtenstein'
    },
    {
        code: 'LT',
        name: 'Lithuania'
    },
    {
        code: 'LU',
        name: 'Luxembourg'
    },
    {
        code: 'MO',
        name: 'Macao'
    },
    {
        code: 'MG',
        name: 'Madagascar'
    },
    {
        code: 'MW',
        name: 'Malawi'
    },
    {
        code: 'MY',
        name: 'Malaysia'
    },
    {
        code: 'MV',
        name: 'Maldives'
    },
    {
        code: 'ML',
        name: 'Mali'
    },
    {
        code: 'MT',
        name: 'Malta'
    },
    {
        code: 'MH',
        name: 'Marshall Islands'
    },
    {
        code: 'MQ',
        name: 'Martinique'
    },
    {
        code: 'MR',
        name: 'Mauritania'
    },
    {
        code: 'MU',
        name: 'Mauritius'
    },
    {
        code: 'YT',
        name: 'Mayotte'
    },
    {
        code: 'MX',
        name: 'Mexico'
    },
    {
        code: 'FM',
        name: 'Micronesia'
    },
    {
        code: 'MD',
        name: 'Moldova'
    },
    {
        code: 'MC',
        name: 'Monaco'
    },
    {
        code: 'MN',
        name: 'Mongolia'
    },
    {
        code: 'ME',
        name: 'Montenegro'
    },
    {
        code: 'MS',
        name: 'Montserrat'
    },
    {
        code: 'MA',
        name: 'Morocco'
    },
    {
        code: 'MZ',
        name: 'Mozambique'
    },
    {
        code: 'MM',
        name: 'Myanmar'
    },
    {
        code: 'NA',
        name: 'Namibia'
    },
    {
        code: 'NR',
        name: 'Nauru'
    },
    {
        code: 'NP',
        name: 'Nepal'
    },
    {
        code: 'NL',
        name: 'Netherlands'
    },
    {
        code: 'NC',
        name: 'New Caledonia'
    },
    {
        code: 'NZ',
        name: 'New Zealand'
    },
    {
        code: 'NI',
        name: 'Nicaragua'
    },
    {
        code: 'NE',
        name: 'Niger'
    },
    {
        code: 'NG',
        name: 'Nigeria'
    },
    {
        code: 'NU',
        name: 'Niue'
    },
    {
        code: 'NF',
        name: 'Norfolk Island'
    },
    {
        code: 'MK',
        name: 'North Macedonia'
    },
    {
        code: 'MP',
        name: 'Northern Mariana Islands'
    },
    {
        code: 'NO',
        name: 'Norway'
    },
    {
        code: 'OM',
        name: 'Oman'
    },
    {
        code: 'PK',
        name: 'Pakistan'
    },
    {
        code: 'PW',
        name: 'Palau'
    },
    {
        code: 'PS',
        name: 'Palestine'
    },
    {
        code: 'PA',
        name: 'Panama'
    },
    {
        code: 'PG',
        name: 'Papua New Guinea'
    },
    {
        code: 'PY',
        name: 'Paraguay'
    },
    {
        code: 'PE',
        name: 'Peru'
    },
    {
        code: 'PH',
        name: 'Philippines'
    },
    {
        code: 'PN',
        name: 'Pitcairn'
    },
    {
        code: 'PL',
        name: 'Poland'
    },
    {
        code: 'PT',
        name: 'Portugal'
    },
    {
        code: 'PR',
        name: 'Puerto Rico'
    },
    {
        code: 'QA',
        name: 'Qatar'
    },
    {
        code: 'RO',
        name: 'Romania'
    },
    {
        code: 'RU',
        name: 'Russia'
    },
    {
        code: 'RW',
        name: 'Rwanda'
    },
    {
        code: 'RE',
        name: 'Reunion'
    },
    {
        code: 'BL',
        name: 'Saint Barthelemy'
    },
    {
        code: 'SH',
        name: 'Saint Helena'
    },
    {
        code: 'KN',
        name: 'Saint Kitts and Nevis'
    },
    {
        code: 'LC',
        name: 'Saint Lucia'
    },
    {
        code: 'MF',
        name: 'Saint Martin'
    },
    {
        code: 'PM',
        name: 'Saint Pierre and Miquelon'
    },
    {
        code: 'VC',
        name: 'Saint Vincent and the Grenadines'
    },
    {
        code: 'WS',
        name: 'Samoa'
    },
    {
        code: 'SM',
        name: 'San Marino'
    },
    {
        code: 'ST',
        name: 'Sao Tome and Principe'
    },
    {
        code: 'SA',
        name: 'Saudi Arabia'
    },
    {
        code: 'SN',
        name: 'Senegal'
    },
    {
        code: 'RS',
        name: 'Serbia'
    },
    {
        code: 'SC',
        name: 'Seychelles'
    },
    {
        code: 'SL',
        name: 'Sierra Leone'
    },
    {
        code: 'SG',
        name: 'Singapore'
    },
    {
        code: 'SX',
        name: 'Sint Maarten'
    },
    {
        code: 'SK',
        name: 'Slovakia'
    },
    {
        code: 'SI',
        name: 'Slovenia'
    },
    {
        code: 'SB',
        name: 'Solomon Islands'
    },
    {
        code: 'SO',
        name: 'Somalia'
    },
    {
        code: 'ZA',
        name: 'South Africa'
    },
    {
        code: 'GS',
        name: 'South Georgia'
    },
    {
        code: 'SS',
        name: 'South Sudan'
    },
    {
        code: 'ES',
        name: 'Spain'
    },
    {
        code: 'LK',
        name: 'Sri Lanka'
    },
    {
        code: 'SD',
        name: 'Sudan'
    },
    {
        code: 'SR',
        name: 'Suriname'
    },
    {
        code: 'SJ',
        name: 'Svalbard and Jan Mayen'
    },
    {
        code: 'SE',
        name: 'Sweden'
    },
    {
        code: 'CH',
        name: 'Switzerland'
    },
    {
        code: 'SY',
        name: 'Syria'
    },
    {
        code: 'TW',
        name: 'Taiwan'
    },
    {
        code: 'TJ',
        name: 'Tajikistan'
    },
    {
        code: 'TZ',
        name: 'Tanzania'
    },
    {
        code: 'TH',
        name: 'Thailand'
    },
    {
        code: 'TL',
        name: 'Timor-Leste'
    },
    {
        code: 'TG',
        name: 'Togo'
    },
    {
        code: 'TK',
        name: 'Tokelau'
    },
    {
        code: 'TO',
        name: 'Tonga'
    },
    {
        code: 'TT',
        name: 'Trinidad and Tobago'
    },
    {
        code: 'TN',
        name: 'Tunisia'
    },
    {
        code: 'TR',
        name: 'Turkey'
    },
    {
        code: 'TM',
        name: 'Turkmenistan'
    },
    {
        code: 'TC',
        name: 'Turks and Caicos Islands'
    },
    {
        code: 'TV',
        name: 'Tuvalu'
    },
    {
        code: 'UG',
        name: 'Uganda'
    },
    {
        code: 'UA',
        name: 'Ukraine'
    },
    {
        code: 'AE',
        name: 'United Arab Emirates'
    },
    {
        code: 'GB',
        name: 'United Kingdom'
    },
    {
        code: 'US',
        name: 'United States'
    },
    {
        code: 'UM',
        name: 'United States Minor Outlying Islands'
    },
    {
        code: 'UY',
        name: 'Uruguay'
    },
    {
        code: 'UZ',
        name: 'Uzbekistan'
    },
    {
        code: 'VU',
        name: 'Vanuatu'
    },
    {
        code: 'VA',
        name: 'Vatican City'
    },
    {
        code: 'VE',
        name: 'Venezuela'
    },
    {
        code: 'VN',
        name: 'Vietnam'
    },
    {
        code: 'VG',
        name: 'British Virgin Islands'
    },
    {
        code: 'VI',
        name: 'U.S. Virgin Islands'
    },
    {
        code: 'WF',
        name: 'Wallis and Futuna'
    },
    {
        code: 'EH',
        name: 'Western Sahara'
    },
    {
        code: 'YE',
        name: 'Yemen'
    },
    {
        code: 'ZM',
        name: 'Zambia'
    },
    {
        code: 'ZW',
        name: 'Zimbabwe'
    }
];
const revenueOptions = [
    {
        value: '0',
        label: '$0 (Pre-revenue)'
    },
    {
        value: '1-1000',
        label: '$1 - $1,000/month'
    },
    {
        value: '1000-5000',
        label: '$1,000 - $5,000/month'
    },
    {
        value: '5000-10000',
        label: '$5,000 - $10,000/month'
    },
    {
        value: '10000-50000',
        label: '$10,000 - $50,000/month'
    },
    {
        value: '50000+',
        label: '$50,000+/month'
    }
];
const geographyOptions = [
    {
        value: 'us_eu',
        label: 'Primarily US/EU'
    },
    {
        value: 'mixed',
        label: 'Mixed (US/EU + other)'
    },
    {
        value: 'emerging',
        label: 'Primarily emerging markets'
    }
];
const chargebackOptions = [
    {
        value: 'none',
        label: 'No chargebacks'
    },
    {
        value: 'low',
        label: 'Under 1%'
    },
    {
        value: 'medium',
        label: '1% - 3%'
    },
    {
        value: 'high',
        label: 'Over 3%'
    }
];
}),
"[project]/src/lib/trust-score-v2.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateTrustScoreV2",
    ()=>calculateTrustScoreV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$onboarding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations/onboarding.ts [app-route] (ecmascript)");
;
// === Scoring functions ===
function scoreGitHub(data, usernameOnly) {
    if (!data) {
        return {
            score: 0,
            max: 30,
            details: {
                connected: false
            }
        };
    }
    // Account age: 0-10 pts (1.25pt/year, max 8+ years)
    const accountAge = Math.min(10, Math.floor(data.accountAgeYears * 1.25));
    // Public repos: 0-6 pts (1pt per 10 repos, max 60+)
    const repos = Math.min(6, Math.floor(data.publicRepos / 10));
    // Stars: 0-5 pts (1pt per 20 stars, max 100+)
    const stars = Math.min(5, Math.floor(data.totalStars / 20));
    // Followers: 0-5 pts (1pt per 20 followers, max 100+)
    const followers = Math.min(5, Math.floor(data.followers / 20));
    // Language diversity: 0-2 pts (1pt per 2 languages, max 4+)
    const languages = Math.min(2, Math.floor(data.topLanguages.length / 2));
    // Has contributions/activity: 2 pts (if they have repos, they have activity)
    const activity = data.publicRepos > 0 ? 2 : 0;
    let total = accountAge + repos + stars + followers + languages + activity;
    // Username-only cap at 20
    if (usernameOnly) {
        total = Math.min(20, total);
    }
    return {
        score: Math.min(30, total),
        max: 30,
        details: {
            connected: !usernameOnly,
            username: data.login,
            account_age_years: data.accountAgeYears,
            repos: data.publicRepos,
            stars: data.totalStars,
            followers: data.followers,
            languages: data.topLanguages.length,
            username_only: usernameOnly
        }
    };
}
function scoreStripe(data, hasBankStatements) {
    if (!data && !hasBankStatements) {
        return {
            score: 0,
            max: 35,
            details: {
                connected: false
            }
        };
    }
    if (!data) {
        // Bank statements only = 2 pts
        return {
            score: 2,
            max: 35,
            details: {
                connected: false,
                bank_statements: true
            }
        };
    }
    // Account age: 0-10 pts (1pt per 3 months, max 30mo+)
    const accountAge = Math.min(10, Math.floor(data.accountAgeMonths / 3));
    // Monthly revenue: 0-12 pts (scaled tiers)
    let revenue = 0;
    if (data.monthlyRevenue >= 50000) revenue = 12;
    else if (data.monthlyRevenue >= 10000) revenue = 11;
    else if (data.monthlyRevenue >= 5000) revenue = 9;
    else if (data.monthlyRevenue >= 1000) revenue = 7;
    else if (data.monthlyRevenue > 0) revenue = 4;
    // Low chargebacks: 0-5 pts
    let chargebacks = 0;
    if (data.chargebackRateCategory === 'none') chargebacks = 5;
    else if (data.chargebackRateCategory === 'low') chargebacks = 3;
    else if (data.chargebackRateCategory === 'medium') chargebacks = 1;
    // Transaction volume: 0-6 pts (1pt per 20 charges, max 100+)
    const volume = Math.min(6, Math.floor(data.totalCharges / 20));
    const total = accountAge + revenue + chargebacks + volume;
    return {
        score: Math.min(35, total),
        max: 35,
        details: {
            connected: true,
            monthly_revenue: data.monthlyRevenueFormatted,
            account_age_months: data.accountAgeMonths,
            chargeback_rate: `${data.chargebackRate}%`,
            total_charges: data.totalCharges
        }
    };
}
function scoreLinkedIn(data, urlOnly) {
    if (!data && !urlOnly) {
        return {
            score: 0,
            max: 15,
            details: {
                connected: false
            }
        };
    }
    // URL-only fallback = flat 5 pts
    if (!data && urlOnly) {
        return {
            score: 5,
            max: 15,
            details: {
                connected: false,
                url_only: true
            }
        };
    }
    // OAuth connected: 10 pts
    let total = 10;
    // Profile has picture: 3 pts
    if (data.picture) total += 3;
    // Email verified via LinkedIn: 2 pts
    if (data.verified && data.email) total += 2;
    return {
        score: Math.min(15, total),
        max: 15,
        details: {
            connected: true,
            has_picture: !!data.picture,
            email_verified: !!(data.verified && data.email)
        }
    };
}
function scoreDigitalPresence(input) {
    if (!input) {
        return {
            score: 0,
            max: 10,
            details: {}
        };
    }
    let total = 0;
    const details = {};
    if (input.websiteVerified) {
        total += 5;
        details.website = true;
    }
    if (input.twitterVerified) {
        total += 2;
        details.twitter = true;
    }
    if (input.instagramVerified) {
        total += 1;
        details.instagram = true;
    }
    if (input.appStoreVerified) {
        total += 2;
        details.app_store = true;
    }
    return {
        score: Math.min(10, total),
        max: 10,
        details
    };
}
function scoreNetwork(input) {
    if (!input) {
        return {
            score: 0,
            max: 10,
            details: {}
        };
    }
    let total = 0;
    const details = {};
    if (input.referralVerified) {
        total += 5;
        details.referral = true;
    }
    if (input.universityEmailVerified) {
        total += 2;
        details.university = true;
    }
    if (input.acceleratorVerified) {
        total += 2;
        details.accelerator = true;
    }
    if (input.hasEmployer) {
        total += 1;
        details.employer = true;
    }
    return {
        score: Math.min(10, total),
        max: 10,
        details
    };
}
function scoreIdentity(input) {
    if (!input) {
        return {
            score: 0,
            max: 20,
            details: {}
        };
    }
    let total = 0;
    const details = {};
    // Passport: +2 base + up to +6 for matching fields (total 8)
    if (input.hasPassport) {
        total += 2;
        details.passport = true;
        const nameMatch = input.passportNameMatch ?? true;
        const dobMatch = input.passportDobMatch ?? true;
        const genderMatch = input.passportGenderMatch ?? true;
        const nationalityMatch = input.passportNationalityMatch ?? true;
        if (nameMatch) {
            total += 2;
            details.name_match = true;
        } else {
            details.name_match = false;
        }
        if (dobMatch) {
            total += 2;
            details.dob_match = true;
        } else {
            details.dob_match = false;
        }
        if (genderMatch) {
            total += 1;
            details.gender_match = true;
        } else {
            details.gender_match = false;
        }
        if (nationalityMatch) {
            total += 1;
            details.nationality_match = true;
        } else {
            details.nationality_match = false;
        }
    } else {
        details.passport = false;
    }
    // Local government ID: +5
    if (input.hasLocalId) {
        total += 5;
        details.local_id = true;
    } else {
        details.local_id = false;
    }
    // Face verification: +4 matched, -2 if skipped
    if (input.hasLivenessCheck) {
        total += 4;
        details.face_verified = true;
    } else if (input.faceSkipped) {
        total -= 2;
        details.face_skipped = true;
    } else {
        details.face_verified = false;
    }
    // Address proof: +3
    if (input.hasAddressProof) {
        total += 3;
        details.address_verified = true;
    } else {
        details.address_verified = false;
    }
    return {
        score: Math.max(0, Math.min(20, total)),
        max: 20,
        details
    };
}
function calculateTrustScoreV2(input) {
    const github = scoreGitHub(input.github, !!input.githubUsernameOnly);
    const stripe = scoreStripe(input.stripe, !!input.hasBankStatements);
    const linkedin = scoreLinkedIn(input.linkedin, !!input.linkedinUrlOnly);
    const identity = scoreIdentity(input.identity);
    const digital_presence = scoreDigitalPresence(input.digitalPresence);
    const network = scoreNetwork(input.network);
    const signals_connected = [];
    if (github.score > 0) signals_connected.push('github');
    if (stripe.score > 0) signals_connected.push('stripe');
    if (linkedin.score > 0) signals_connected.push('linkedin');
    if (identity.score > 0) signals_connected.push('identity');
    if (digital_presence.score > 0) signals_connected.push('digital_presence');
    if (network.score > 0) signals_connected.push('network');
    // Max possible: 30+35+15+20+10+10 = 120, clamped to 100
    const rawScore = github.score + stripe.score + linkedin.score + identity.score + digital_presence.score + network.score;
    // Country adjustment
    const country = input.countryOfOrigin || input.countryOfResidence || '';
    let country_adjustment = 0;
    if (country) {
        country_adjustment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$onboarding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCountryPenalty"])(country);
        // GitHub+LinkedIn score > 35 eliminates penalty
        const githubLinkedinScore = github.score + linkedin.score;
        if (country_adjustment < 0) {
            if (githubLinkedinScore > 35) {
                country_adjustment = 0;
            } else if (githubLinkedinScore > 25) {
                country_adjustment = Math.round(country_adjustment / 2);
            }
        }
    }
    const score = Math.max(0, Math.min(100, rawScore + country_adjustment));
    // Risk level and recommendation
    let risk_level;
    let recommendation;
    // Thresholds raised because max raw is 120 (clamped to 100)
    if (score >= 90) {
        risk_level = 'low';
        recommendation = 'approve';
    } else if (score >= 60) {
        risk_level = 'medium';
        recommendation = 'review';
    } else if (score >= 35) {
        risk_level = 'high';
        recommendation = 'enhanced_review';
    } else {
        risk_level = 'critical';
        recommendation = 'deny';
    }
    // Improvement suggestions
    const improvements = [];
    if (github.score === 0) {
        improvements.push('Connect GitHub for up to +30 points');
    } else if (input.githubUsernameOnly) {
        improvements.push('Connect GitHub via OAuth for full score (currently capped at 20)');
    }
    if (stripe.score === 0) {
        improvements.push('Connect Stripe for up to +35 points');
    }
    if (linkedin.score === 0) {
        improvements.push('Connect LinkedIn for up to +15 points');
    } else if (input.linkedinUrlOnly) {
        improvements.push('Connect LinkedIn via OAuth for +10 more points');
    }
    if (identity.score === 0) {
        improvements.push('Upload your passport to earn up to +20 points');
    } else if (identity.score < 20) {
        const remaining = 20 - identity.score;
        improvements.push(`Complete identity verification for up to +${remaining} more points`);
    }
    if (digital_presence.score < 10) {
        const remaining = 10 - digital_presence.score;
        improvements.push(`Verify more digital presence for up to +${remaining} points`);
    }
    if (network.score < 10) {
        const remaining = 10 - network.score;
        improvements.push(`Add trust network signals for up to +${remaining} points`);
    }
    return {
        score,
        breakdown: {
            github,
            stripe,
            linkedin,
            identity,
            digital_presence,
            network
        },
        country_adjustment,
        risk_level,
        recommendation,
        signals_connected,
        improvements: improvements.slice(0, 5)
    };
}
}),
"[project]/src/app/api/v1/trust-score/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@octokit/rest/dist-src/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/stripe.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$linkedin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/oauth/linkedin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2d$v2$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trust-score-v2.ts [app-route] (ecmascript)");
;
;
;
;
;
// Simple in-memory rate limiter: 10 req/min per IP
const rateLimitMap = new Map();
function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, {
            count: 1,
            resetAt: now + 60_000
        });
        return true;
    }
    if (entry.count >= 10) {
        return false;
    }
    entry.count++;
    return true;
}
// Cleanup stale entries every 5 minutes
setInterval(()=>{
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap){
        if (now > entry.resetAt) {
            rateLimitMap.delete(ip);
        }
    }
}, 5 * 60_000);
async function fetchGitHubPublic(username) {
    const octokit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Octokit"]();
    const { data: user } = await octokit.users.getByUsername({
        username
    });
    const { data: repos } = await octokit.repos.listForUser({
        username,
        sort: 'pushed',
        per_page: 100
    });
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
        name: user.name ?? null,
        avatarUrl: user.avatar_url,
        createdAt,
        accountAgeYears,
        publicRepos: user.public_repos,
        followers: user.followers,
        totalStars,
        topLanguages
    };
}
async function POST(request) {
    // Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Rate limit exceeded. Max 10 requests per minute.'
        }, {
            status: 429,
            headers: {
                'Retry-After': '60',
                'X-BedRock-Notice': 'MVP endpoint. Production will use redirect-based OAuth flow.'
            }
        });
    }
    try {
        const body = await request.json();
        const { github_username, github_token, stripe_account_id, linkedin_token } = body;
        if (!github_username && !github_token && !stripe_account_id && !linkedin_token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Provide at least one of: github_username, github_token, stripe_account_id, linkedin_token'
            }, {
                status: 400
            });
        }
        const input = {};
        // GitHub: either token (OAuth) or username (public lookup)
        if (github_token) {
            const { fetchGitHubProfile } = await __turbopack_context__.A("[project]/src/lib/oauth/github.ts [app-route] (ecmascript, async loader)");
            input.github = await fetchGitHubProfile(github_token);
            input.githubUsernameOnly = false;
        } else if (github_username) {
            input.github = await fetchGitHubPublic(github_username);
            input.githubUsernameOnly = true;
        }
        // Stripe
        if (stripe_account_id) {
            input.stripe = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchStripeData"])(stripe_account_id);
        }
        // LinkedIn
        if (linkedin_token) {
            input.linkedin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$oauth$2f$linkedin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchLinkedInProfile"])(linkedin_token);
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2d$v2$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateTrustScoreV2"])(input);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result, {
            headers: {
                'X-BedRock-Notice': 'MVP endpoint. Production will use redirect-based OAuth flow.'
            }
        });
    } catch (err) {
        // Handle GitHub 404
        if (err instanceof Error && 'status' in err && err.status === 404) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'GitHub user not found'
            }, {
                status: 404
            });
        }
        console.error('Trust score API error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to calculate trust score'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f8a9a363._.js.map