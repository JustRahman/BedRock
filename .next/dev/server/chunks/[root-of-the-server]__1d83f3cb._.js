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
"[project]/src/app/api/verify/document-extract/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
;
;
function getAnthropicClient() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
        apiKey: process.env.ANTHROPIC_API_KEY
    });
}
const PROMPTS = {
    passport: `You are analyzing a passport document image. Extract the following information and return ONLY valid JSON with no other text:

{
  "fullName": "full name as shown on passport or null",
  "firstName": "first/given name or null",
  "lastName": "surname/family name or null",
  "middleName": "middle name if present or null",
  "dateOfBirth": "date of birth in YYYY-MM-DD format or null",
  "gender": "M, F, or X as shown or null",
  "placeOfBirth": "place of birth or null",
  "nationality": "nationality or null",
  "passportNumber": "passport number or null",
  "expiryDate": "expiry date in YYYY-MM-DD format or null",
  "issuingCountry": "issuing country or null"
}

Return null for any field you cannot read clearly. Do not guess.`,
    local_id: `You are analyzing a government-issued ID document (driver's license, national ID card, etc.). Extract the following information and return ONLY valid JSON with no other text:

{
  "fullName": "full name as shown on ID or null",
  "firstName": "first/given name or null",
  "lastName": "surname/family name or null",
  "dateOfBirth": "date of birth in YYYY-MM-DD format or null",
  "idNumber": "ID/license number or null",
  "address": "full address if shown or null",
  "expiryDate": "expiry date in YYYY-MM-DD format or null",
  "issuingAuthority": "issuing authority/state or null"
}

Return null for any field you cannot read clearly. Do not guess.`,
    address_proof: `You are analyzing a proof of address document (utility bill, bank statement, official letter, etc.). Extract the following information and return ONLY valid JSON with no other text:

{
  "fullName": "name of the person/account holder or null",
  "address": "full street address as shown or null",
  "city": "city or null",
  "state": "state/province or null",
  "postalCode": "postal/zip code or null",
  "country": "country or null",
  "documentDate": "date on the document in YYYY-MM-DD format or null",
  "issuingCompany": "company/organization that issued the document or null"
}

Return null for any field you cannot read clearly. Do not guess.`
};
async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const documentType = formData.get('documentType');
        if (!file || !documentType) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'File and documentType are required'
            }, {
                status: 400
            });
        }
        if (file.type === 'application/pdf') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'PDF files are not supported. Please upload an image (JPG, PNG, or WebP).'
            }, {
                status: 400
            });
        }
        const validTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];
        if (!validTypes.includes(file.type)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unsupported file type. Please upload a JPG, PNG, or WebP image.'
            }, {
                status: 400
            });
        }
        const prompt = PROMPTS[documentType];
        if (!prompt) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Invalid document type: ${documentType}`
            }, {
                status: 400
            });
        }
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
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
                                media_type: file.type,
                                data: base64
                            }
                        },
                        {
                            type: 'text',
                            text: prompt
                        }
                    ]
                }
            ]
        });
        const textBlock = response.content.find((b)=>b.type === 'text');
        const rawText = textBlock && 'text' in textBlock ? textBlock.text : '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Could not extract data from the document. Please try a clearer image.'
            }, {
                status: 422
            });
        }
        const extracted = JSON.parse(jsonMatch[0]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            extracted,
            documentType
        });
    } catch (error) {
        console.error('Document extraction error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to analyze document. Please try again.'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1d83f3cb._.js.map