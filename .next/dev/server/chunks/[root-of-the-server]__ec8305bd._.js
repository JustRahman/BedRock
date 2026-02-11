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
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "createServiceClient",
    ()=>createServiceClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://raqqortimspvahtnujqa.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcXFvcnRpbXNwdmFodG51anFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzk1MjksImV4cCI6MjA4NTgxNTUyOX0.uP2tUmSrGY5AhT6NJnX57w3QEPSOwXStAEaO4aztcu8"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
function createServiceClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://raqqortimspvahtnujqa.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[project]/src/lib/document-verification.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "verifyDocument",
    ()=>verifyDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
;
function getAnthropicClient() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
        apiKey: process.env.ANTHROPIC_API_KEY
    });
}
const COUNTRY_ALIASES = {
    'united states': [
        'us',
        'usa',
        'united states of america',
        'u.s.',
        'u.s.a.'
    ],
    'united kingdom': [
        'uk',
        'gb',
        'great britain',
        'britain',
        'england'
    ],
    'south korea': [
        'korea',
        'republic of korea',
        'kr'
    ],
    'north korea': [
        'dprk',
        'democratic peoples republic of korea'
    ],
    'russia': [
        'russian federation',
        'ru'
    ],
    'china': [
        'peoples republic of china',
        'cn',
        'prc'
    ],
    'taiwan': [
        'republic of china',
        'tw',
        'chinese taipei'
    ],
    'uae': [
        'united arab emirates',
        'ae'
    ]
};
function normalizeCountry(country) {
    const lower = country.toLowerCase().trim();
    // Resolve ISO 2/3-letter codes (e.g. "TM" → "turkmenistan", "US" → "united states")
    if (lower.length <= 3) {
        try {
            const displayName = new Intl.DisplayNames([
                'en'
            ], {
                type: 'region'
            }).of(country.toUpperCase());
            if (displayName) {
                const resolved = displayName.toLowerCase();
                // Check if resolved name has a canonical alias
                for (const [canonical, aliases] of Object.entries(COUNTRY_ALIASES)){
                    if (resolved === canonical || aliases.includes(resolved)) {
                        return canonical;
                    }
                }
                return resolved;
            }
        } catch  {}
    }
    for (const [canonical, aliases] of Object.entries(COUNTRY_ALIASES)){
        if (lower === canonical || aliases.includes(lower)) {
            return canonical;
        }
    }
    return lower;
}
function compareName(extracted, expected) {
    if (!extracted) return 'unavailable';
    const normalize = (s)=>s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean).sort();
    const extractedParts = normalize(extracted);
    const expectedParts = normalize(expected);
    if (extractedParts.join(' ') === expectedParts.join(' ')) return 'exact';
    // Check if all parts of one name appear in the other (handles middle names, ordering)
    const extractedSet = new Set(extractedParts);
    const expectedSet = new Set(expectedParts);
    const allExpectedInExtracted = expectedParts.every((p)=>extractedSet.has(p));
    const allExtractedInExpected = extractedParts.every((p)=>expectedSet.has(p));
    if (allExpectedInExtracted || allExtractedInExpected) return 'partial';
    // Check if at least first and last name match
    const overlap = expectedParts.filter((p)=>extractedSet.has(p));
    if (overlap.length >= 2) return 'partial';
    return 'mismatch';
}
function compareDateOfBirth(extracted, expected) {
    if (!extracted) return 'unavailable';
    if (!expected) return 'unavailable';
    // Normalize dates to YYYY-MM-DD for comparison
    const normalize = (d)=>{
        const date = new Date(d);
        if (isNaN(date.getTime())) return d.trim();
        return date.toISOString().split('T')[0];
    };
    return normalize(extracted) === normalize(expected) ? 'exact' : 'mismatch';
}
function compareCountry(extracted, expected) {
    if (!extracted) return 'unavailable';
    return normalizeCountry(extracted) === normalizeCountry(expected) ? 'exact' : 'mismatch';
}
function determineStatus(matchResults, confidence) {
    const { name, dateOfBirth, country } = matchResults;
    // Auto-verify: name exact/partial + DOB exact/unavailable + country exact/unavailable + confidence >= 70
    if ((name === 'exact' || name === 'partial') && (dateOfBirth === 'exact' || dateOfBirth === 'unavailable') && (country === 'exact' || country === 'unavailable') && confidence >= 70) {
        return 'verified';
    }
    // Auto-fail: both name AND DOB are mismatch
    if (name === 'mismatch' && dateOfBirth === 'mismatch') {
        return 'failed';
    }
    // Everything else: flag for review
    return 'review_needed';
}
async function verifyDocument({ fileBase64, mimeType, documentType, founderProfile }) {
    // PDFs can't be sent as images to Claude Vision
    if (mimeType === 'application/pdf') {
        return {
            status: 'review_needed',
            extractedData: {
                fullName: null,
                dateOfBirth: null,
                documentNumber: null,
                expiryDate: null,
                nationality: null,
                documentTypeConfirmed: null,
                confidence: 0
            },
            matchResults: {
                name: 'unavailable',
                dateOfBirth: 'unavailable',
                country: 'unavailable'
            },
            confidence: 0,
            reasoning: 'PDF documents cannot be automatically verified via image analysis. Manual review required.'
        };
    }
    const anthropic = getAnthropicClient();
    const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'image',
                        source: {
                            type: 'base64',
                            media_type: mimeType,
                            data: fileBase64
                        }
                    },
                    {
                        type: 'text',
                        text: `You are analyzing an identity document (expected type: ${documentType}). Extract the following information from this document image and return ONLY valid JSON with no other text:

{
  "fullName": "the full name on the document or null if not readable",
  "dateOfBirth": "date of birth in YYYY-MM-DD format or null if not present",
  "documentNumber": "the document/passport number or null",
  "expiryDate": "expiry date in YYYY-MM-DD format or null",
  "nationality": "nationality/country listed on document or null",
  "documentTypeConfirmed": "what type of document this actually is (passport, national_id, drivers_license, address_proof, other)",
  "confidence": 85
}

The confidence field should be 0-100 indicating how confident you are in the extracted data quality. Consider image clarity, whether fields are readable, and if the document appears genuine.`
                    }
                ]
            }
        ]
    });
    const textBlock = response.content.find((b)=>b.type === 'text');
    const rawText = textBlock && 'text' in textBlock ? textBlock.text : '';
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        return {
            status: 'review_needed',
            extractedData: {
                fullName: null,
                dateOfBirth: null,
                documentNumber: null,
                expiryDate: null,
                nationality: null,
                documentTypeConfirmed: null,
                confidence: 0
            },
            matchResults: {
                name: 'unavailable',
                dateOfBirth: 'unavailable',
                country: 'unavailable'
            },
            confidence: 0,
            reasoning: 'Could not parse AI response. Manual review required.'
        };
    }
    const extracted = JSON.parse(jsonMatch[0]);
    const matchResults = {
        name: compareName(extracted.fullName, founderProfile.full_name),
        dateOfBirth: compareDateOfBirth(extracted.dateOfBirth, founderProfile.date_of_birth),
        country: compareCountry(extracted.nationality, founderProfile.country_of_origin)
    };
    const confidence = extracted.confidence ?? 0;
    const status = determineStatus(matchResults, confidence);
    const reasons = [];
    reasons.push(`Name: ${matchResults.name} (extracted: "${extracted.fullName}", expected: "${founderProfile.full_name}")`);
    reasons.push(`DOB: ${matchResults.dateOfBirth} (extracted: "${extracted.dateOfBirth}", expected: "${founderProfile.date_of_birth}")`);
    reasons.push(`Country: ${matchResults.country} (extracted: "${extracted.nationality}", expected: "${founderProfile.country_of_origin}")`);
    reasons.push(`Confidence: ${confidence}/100`);
    return {
        status,
        extractedData: extracted,
        matchResults,
        confidence,
        reasoning: reasons.join('. ')
    };
}
}),
"[project]/src/app/api/documents/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$document$2d$verification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/document-verification.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const authClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
        // Get current user
        const { data: { user }, error: userError } = await authClient.auth.getUser();
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        // Get founder
        const { data: founderData } = await supabase.from('founders').select('id, role').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Founder not found'
            }, {
                status: 404
            });
        }
        const { searchParams } = new URL(request.url);
        const founderId = searchParams.get('founderId');
        // Admin can view any founder's documents
        if (founder.role === 'admin' && founderId) {
            const { data: documents, error } = await supabase.from('documents').select('*').eq('founder_id', founderId).order('created_at', {
                ascending: false
            });
            if (error) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: error.message
                }, {
                    status: 500
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                documents
            });
        }
        // Regular user sees their own documents
        const { data: documents, error } = await supabase.from('documents').select('*').eq('founder_id', founder.id).order('created_at', {
            ascending: false
        });
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            documents
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const authClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
        // Get current user
        const { data: { user }, error: userError } = await authClient.auth.getUser();
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        // Get founder with profile fields for verification
        const { data: founderData } = await supabase.from('founders').select('id, full_name, date_of_birth, country_of_origin').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Founder not found'
            }, {
                status: 404
            });
        }
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type');
        if (!file || !type) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'File and type are required'
            }, {
                status: 400
            });
        }
        // Read file buffer once (File stream can only be consumed once)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Upload file to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${founder.id}/${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('documents').upload(fileName, buffer, {
            contentType: file.type
        });
        if (uploadError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: uploadError.message
            }, {
                status: 500
            });
        }
        // Create document record with type assertion
        const insertData = {
            founder_id: founder.id,
            type: type,
            file_name: file.name,
            file_path: uploadData.path,
            file_size: file.size,
            mime_type: file.type
        };
        const { data: document, error } = await supabase.from('documents').insert(insertData).select().single();
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        // Auto-verify identity documents with Claude Vision
        let verification = null;
        const verifiableTypes = [
            'passport',
            'local_id',
            'address_proof'
        ];
        if (verifiableTypes.includes(type) && founder.full_name && founder.country_of_origin) {
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$document$2d$verification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyDocument"])({
                    fileBase64: buffer.toString('base64'),
                    mimeType: file.type,
                    documentType: type,
                    founderProfile: {
                        full_name: founder.full_name,
                        date_of_birth: founder.date_of_birth ?? null,
                        country_of_origin: founder.country_of_origin
                    }
                });
                verification = result;
                // Update document record if verified
                if (result.status === 'verified') {
                    await supabase.from('documents').update({
                        verified: true,
                        verified_at: new Date().toISOString(),
                        verified_by: 'ai_verification'
                    }).eq('id', document.id);
                }
                // Upsert founder_verifications record
                const verificationData = {
                    founder_id: founder.id,
                    verification_type: `document_${type}`,
                    status: result.status === 'review_needed' ? 'pending' : result.status,
                    verified_at: result.status === 'verified' ? new Date().toISOString() : null,
                    metadata: {
                        document_id: document.id,
                        extracted_data: result.extractedData,
                        match_results: result.matchResults,
                        confidence: result.confidence,
                        reasoning: result.reasoning
                    }
                };
                await supabase.from('founder_verifications').upsert(verificationData, {
                    onConflict: 'founder_id,verification_type'
                });
            } catch (verificationError) {
                console.error('Document verification failed:', verificationError);
            // Verification failure never blocks the upload
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            document,
            verification
        }, {
            status: 201
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const authClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
        // Get current user
        const { data: { user }, error: userError } = await authClient.auth.getUser();
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        // Get founder
        const { data: founderData } = await supabase.from('founders').select('id').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Founder not found'
            }, {
                status: 404
            });
        }
        const { searchParams } = new URL(request.url);
        const documentId = searchParams.get('id');
        if (!documentId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Document ID required'
            }, {
                status: 400
            });
        }
        // Get document to find file path
        const { data: documentData } = await supabase.from('documents').select('file_path').eq('id', documentId).eq('founder_id', founder.id).single();
        const document = documentData;
        if (!document) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Document not found'
            }, {
                status: 404
            });
        }
        // Delete from storage
        await supabase.storage.from('documents').remove([
            document.file_path
        ]);
        // Delete record
        const { error } = await supabase.from('documents').delete().eq('id', documentId).eq('founder_id', founder.id);
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function PATCH(request) {
    try {
        const authClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
        // Get current user
        const { data: { user }, error: userError } = await authClient.auth.getUser();
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        // Check if admin
        const { data: founderData } = await supabase.from('founders').select('id, role').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder || founder.role !== 'admin') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 403
            });
        }
        const body = await request.json();
        const updateData = {
            verified: body.verified,
            verified_at: body.verified ? new Date().toISOString() : null,
            verified_by: body.verified ? founder.id : null
        };
        const { data: document, error } = await supabase.from('documents').update(updateData).eq('id', body.documentId).select().single();
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            document
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ec8305bd._.js.map