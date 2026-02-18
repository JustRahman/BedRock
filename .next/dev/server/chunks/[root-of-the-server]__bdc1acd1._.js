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
"[project]/src/lib/crypto/challenge-cache.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSignedChallenge",
    ()=>createSignedChallenge,
    "validateChallenge",
    ()=>validateChallenge
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
// Stateless challenge verification using HMAC.
// No in-memory state needed — the challenge message itself contains
// the timestamp and HMAC so the verify endpoint can validate it.
const CHALLENGE_TTL_MS = 5 * 60 * 1000 // 5 minutes
;
function getSecret() {
    return process.env.OAUTH_STATE_SECRET || 'dev-fallback-secret';
}
function hmac(data) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])('sha256', getSecret()).update(data).digest('hex');
}
function createSignedChallenge(address) {
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(2, 10);
    const payload = `${address.toLowerCase()}:${timestamp}:${nonce}`;
    const sig = hmac(payload);
    // Human-readable message that the wallet will display
    return `BedRock Wallet Verification\n\nAddress: ${address}\nTimestamp: ${timestamp}\nNonce: ${nonce}\nSignature: ${sig}`;
}
function validateChallenge(message) {
    try {
        const addressMatch = message.match(/Address: (.+)/);
        const timestampMatch = message.match(/Timestamp: (\d+)/);
        const nonceMatch = message.match(/Nonce: (.+)/);
        const sigMatch = message.match(/Signature: (.+)/);
        if (!addressMatch || !timestampMatch || !nonceMatch || !sigMatch) {
            return {
                valid: false
            };
        }
        const address = addressMatch[1].trim();
        const timestamp = parseInt(timestampMatch[1].trim());
        const nonce = nonceMatch[1].trim();
        const sig = sigMatch[1].trim();
        // Check expiry
        if (Date.now() - timestamp > CHALLENGE_TTL_MS) {
            return {
                valid: false
            };
        }
        // Verify HMAC
        const payload = `${address.toLowerCase()}:${timestamp}:${nonce}`;
        const expectedSig = hmac(payload);
        if (sig !== expectedSig) {
            return {
                valid: false
            };
        }
        return {
            valid: true,
            address
        };
    } catch  {
        return {
            valid: false
        };
    }
}
}),
"[project]/src/lib/rate-limit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkRateLimit",
    ()=>checkRateLimit,
    "getClientIp",
    ()=>getClientIp
]);
const rateLimitMap = new Map();
// Cleanup stale entries every 5 minutes
setInterval(()=>{
    const now = Date.now();
    for (const [key, entry] of rateLimitMap){
        if (now > entry.resetAt) {
            rateLimitMap.delete(key);
        }
    }
}, 5 * 60_000);
function checkRateLimit(key, maxRequests = 10, windowMs = 60_000) {
    const now = Date.now();
    const entry = rateLimitMap.get(key);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(key, {
            count: 1,
            resetAt: now + windowMs
        });
        return {
            allowed: true,
            remaining: maxRequests - 1,
            resetIn: windowMs
        };
    }
    if (entry.count >= maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetAt - now
        };
    }
    entry.count++;
    return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetIn: entry.resetAt - now
    };
}
function getClientIp(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
}
}),
"[project]/src/app/api/crypto/challenge/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$challenge$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crypto/challenge-cache.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    const ip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIp"])(request);
    const { allowed, resetIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(`crypto-challenge:${ip}`, 20, 60_000);
    if (!allowed) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many requests'
        }, {
            status: 429,
            headers: {
                'Retry-After': String(Math.ceil(resetIn / 1000))
            }
        });
    }
    try {
        const { address } = await request.json();
        if (!address || typeof address !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Address is required'
            }, {
                status: 400
            });
        }
        const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$challenge$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSignedChallenge"])(address);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to generate challenge'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bdc1acd1._.js.map