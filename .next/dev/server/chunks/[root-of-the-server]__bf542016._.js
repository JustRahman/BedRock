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
"[project]/src/lib/trust-score.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateTrustScore",
    ()=>calculateTrustScore,
    "getScoreColor",
    ()=>getScoreColor,
    "getStatusColor",
    ()=>getStatusColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$onboarding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations/onboarding.ts [app-route] (ecmascript)");
;
function calculateTrustScore(input) {
    const breakdown = {
        digitalLineage: {
            total: 0,
            max: 40,
            codeHistory: {
                total: 0,
                max: 15,
                items: []
            },
            professionalGraph: {
                total: 0,
                max: 15,
                items: []
            },
            digitalPresence: {
                total: 0,
                max: 10,
                items: []
            }
        },
        business: {
            total: 0,
            max: 25,
            items: []
        },
        identity: {
            total: 0,
            max: 20,
            items: []
        },
        network: {
            total: 0,
            max: 15,
            items: []
        }
    };
    const improvements = [];
    // === DIGITAL LINEAGE (40 pts) ===
    // Code History (15 pts)
    if (input.codeHistory.hasGithub) {
        if (input.codeHistory.githubConnected) {
            breakdown.digitalLineage.codeHistory.items.push({
                name: 'GitHub Connected (OAuth)',
                points: 15,
                earned: true
            });
            breakdown.digitalLineage.codeHistory.total += 15;
        } else {
            breakdown.digitalLineage.codeHistory.items.push({
                name: 'GitHub Username Provided',
                points: 10,
                earned: true
            });
            breakdown.digitalLineage.codeHistory.total += 10;
            improvements.push('Connect GitHub via OAuth for +5 more points');
        }
    } else {
        breakdown.digitalLineage.codeHistory.items.push({
            name: 'GitHub Profile',
            points: 15,
            earned: false
        });
        improvements.push('Connect your GitHub profile to earn up to +15 points');
    }
    // Professional Graph (15 pts)
    if (input.professional.hasLinkedin) {
        if (input.professional.linkedinConnected) {
            breakdown.digitalLineage.professionalGraph.items.push({
                name: 'LinkedIn Connected (OAuth)',
                points: 15,
                earned: true
            });
            breakdown.digitalLineage.professionalGraph.total += 15;
        } else {
            breakdown.digitalLineage.professionalGraph.items.push({
                name: 'LinkedIn URL Provided',
                points: 10,
                earned: true
            });
            breakdown.digitalLineage.professionalGraph.total += 10;
            improvements.push('Connect LinkedIn via OAuth for +5 more points');
        }
    } else {
        breakdown.digitalLineage.professionalGraph.items.push({
            name: 'LinkedIn Profile',
            points: 15,
            earned: false
        });
        improvements.push('Connect your LinkedIn profile to earn up to +15 points');
    }
    // Digital Presence (10 pts)
    // Website: +3 provided, +5 verified (max 5 total for website)
    const hasWebsite = input.digitalPresence.website && input.digitalPresence.website.length > 0;
    if (hasWebsite && input.digitalPresence.websiteVerified) {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Website Verified',
            points: 5,
            earned: true
        });
        breakdown.digitalLineage.digitalPresence.total += 5;
    } else if (hasWebsite) {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Website URL',
            points: 3,
            earned: true
        });
        breakdown.digitalLineage.digitalPresence.total += 3;
        improvements.push('Verify your website to earn +2 more points');
    } else {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Website Verified',
            points: 5,
            earned: false
        });
        improvements.push('Add and verify your website URL to earn up to +5 points');
    }
    // Twitter: +1 provided, +2 valid format (max 2 total)
    const hasTwitter = input.digitalPresence.twitterHandle && input.digitalPresence.twitterHandle.length > 0;
    if (hasTwitter && input.digitalPresence.twitterVerified) {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Twitter/X Verified',
            points: 2,
            earned: true
        });
        breakdown.digitalLineage.digitalPresence.total += 2;
    } else if (hasTwitter) {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Twitter/X Handle',
            points: 1,
            earned: true
        });
        breakdown.digitalLineage.digitalPresence.total += 1;
    } else {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Twitter/X Handle',
            points: 2,
            earned: false
        });
    }
    // Instagram: +1 if valid
    const hasInstagram = input.digitalPresence.instagramHandle && input.digitalPresence.instagramHandle.length > 0;
    if (hasInstagram && input.digitalPresence.instagramVerified) {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Instagram Verified',
            points: 1,
            earned: true
        });
        breakdown.digitalLineage.digitalPresence.total += 1;
    } else {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'Instagram Handle',
            points: 1,
            earned: false
        });
    }
    // App Store: +2 if found
    const hasAppStore = input.digitalPresence.appStoreUrl && input.digitalPresence.appStoreUrl.length > 0;
    if (hasAppStore && input.digitalPresence.appStoreVerified) {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'App Store App',
            points: 2,
            earned: true
        });
        breakdown.digitalLineage.digitalPresence.total += 2;
    } else {
        breakdown.digitalLineage.digitalPresence.items.push({
            name: 'App Store App',
            points: 2,
            earned: false
        });
    }
    // Calculate Digital Lineage total
    breakdown.digitalLineage.total = breakdown.digitalLineage.codeHistory.total + breakdown.digitalLineage.professionalGraph.total + breakdown.digitalLineage.digitalPresence.total;
    // === BUSINESS SIGNALS (25 pts) ===
    // Revenue existence: +10
    const hasRevenue = input.financial.monthlyRevenue && input.financial.monthlyRevenue !== '0';
    if (hasRevenue) {
        breakdown.business.items.push({
            name: 'Has Revenue',
            points: 10,
            earned: true
        });
        breakdown.business.total += 10;
    } else {
        breakdown.business.items.push({
            name: 'Has Revenue',
            points: 10,
            earned: false
        });
        improvements.push('Show revenue to earn +10 points');
    }
    // Revenue > $1k/month: +5
    const highRevenueValues = [
        '1000-5000',
        '5000-10000',
        '10000-50000',
        '50000+'
    ];
    if (input.financial.monthlyRevenue && highRevenueValues.includes(input.financial.monthlyRevenue)) {
        breakdown.business.items.push({
            name: 'Revenue > $1,000/mo',
            points: 5,
            earned: true
        });
        breakdown.business.total += 5;
    } else {
        breakdown.business.items.push({
            name: 'Revenue > $1,000/mo',
            points: 5,
            earned: false
        });
    }
    // Customer geography (US/EU = +5)
    if (input.financial.customerGeography === 'us_eu') {
        breakdown.business.items.push({
            name: 'US/EU Customers',
            points: 5,
            earned: true
        });
        breakdown.business.total += 5;
    } else if (input.financial.customerGeography === 'mixed') {
        breakdown.business.items.push({
            name: 'Mixed Geography Customers',
            points: 3,
            earned: true
        });
        breakdown.business.total += 3;
    } else {
        breakdown.business.items.push({
            name: 'US/EU Customers',
            points: 5,
            earned: false
        });
    }
    // Low chargeback rate: +3
    if (input.financial.chargebackRate === 'none' || input.financial.chargebackRate === 'low') {
        breakdown.business.items.push({
            name: 'Low Chargeback Rate',
            points: 3,
            earned: true
        });
        breakdown.business.total += 3;
    } else {
        breakdown.business.items.push({
            name: 'Low Chargeback Rate',
            points: 3,
            earned: false
        });
    }
    // Bank statements / Stripe: +2
    if (input.financial.hasStripeConnected || input.financial.hasBankStatements) {
        breakdown.business.items.push({
            name: 'Financial Documentation',
            points: 2,
            earned: true
        });
        breakdown.business.total += 2;
    } else {
        breakdown.business.items.push({
            name: 'Financial Documentation',
            points: 2,
            earned: false
        });
        improvements.push('Connect Stripe or upload bank statements to earn +2 points');
    }
    // === IDENTITY VERIFICATION (20 pts) ===
    // Passport: +2 base + up to +6 for matching fields (total 8)
    if (input.identity.hasPassport) {
        breakdown.identity.items.push({
            name: 'Passport Uploaded',
            points: 2,
            earned: true
        });
        breakdown.identity.total += 2;
        const nameMatch = input.identity.passportNameMatch ?? true;
        const dobMatch = input.identity.passportDobMatch ?? true;
        const genderMatch = input.identity.passportGenderMatch ?? true;
        const nationalityMatch = input.identity.passportNationalityMatch ?? true;
        if (nameMatch) {
            breakdown.identity.items.push({
                name: 'Name Matches Passport',
                points: 2,
                earned: true
            });
            breakdown.identity.total += 2;
        } else {
            breakdown.identity.items.push({
                name: 'Name Matches Passport',
                points: 2,
                earned: false
            });
            improvements.push('Your name doesn\u2019t match your passport \u2014 update your profile or re-upload');
        }
        if (dobMatch) {
            breakdown.identity.items.push({
                name: 'DOB Matches Passport',
                points: 2,
                earned: true
            });
            breakdown.identity.total += 2;
        } else {
            breakdown.identity.items.push({
                name: 'DOB Matches Passport',
                points: 2,
                earned: false
            });
            improvements.push('Your date of birth doesn\u2019t match your passport');
        }
        if (genderMatch) {
            breakdown.identity.items.push({
                name: 'Gender Matches',
                points: 1,
                earned: true
            });
            breakdown.identity.total += 1;
        } else {
            breakdown.identity.items.push({
                name: 'Gender Matches',
                points: 1,
                earned: false
            });
        }
        if (nationalityMatch) {
            breakdown.identity.items.push({
                name: 'Nationality Matches',
                points: 1,
                earned: true
            });
            breakdown.identity.total += 1;
        } else {
            breakdown.identity.items.push({
                name: 'Nationality Matches',
                points: 1,
                earned: false
            });
        }
    } else {
        breakdown.identity.items.push({
            name: 'Passport Uploaded',
            points: 8,
            earned: false
        });
        improvements.push('Upload your passport to earn up to +8 points');
    }
    // Local ID: +5
    if (input.identity.hasLocalId) {
        breakdown.identity.items.push({
            name: 'Local Government ID',
            points: 5,
            earned: true
        });
        breakdown.identity.total += 5;
    } else {
        breakdown.identity.items.push({
            name: 'Local Government ID',
            points: 5,
            earned: false
        });
        improvements.push('Upload a local ID to earn +5 points');
    }
    // Liveness check: +4 matched, -2 if skipped
    if (input.identity.hasLivenessCheck) {
        breakdown.identity.items.push({
            name: 'Face Verification',
            points: 4,
            earned: true
        });
        breakdown.identity.total += 4;
    } else if (input.identity.faceSkipped) {
        breakdown.identity.items.push({
            name: 'Face Verification Skipped',
            points: -2,
            earned: true
        });
        breakdown.identity.total -= 2;
        improvements.push('Complete face verification to earn +4 points instead of -2 penalty');
    } else {
        breakdown.identity.items.push({
            name: 'Face Verification',
            points: 4,
            earned: false
        });
    }
    // Address proof: +3
    if (input.identity.hasAddressProof) {
        breakdown.identity.items.push({
            name: 'Address Verified',
            points: 3,
            earned: true
        });
        breakdown.identity.total += 3;
    } else {
        breakdown.identity.items.push({
            name: 'Address Verified',
            points: 3,
            earned: false
        });
    }
    // === TRUST NETWORK (15 pts) ===
    // Referral: verified +10, unverified +3
    if (input.trustSignals.hasReferral) {
        if (input.trustSignals.referralVerified) {
            breakdown.network.items.push({
                name: 'Verified Founder Referral',
                points: 10,
                earned: true
            });
            breakdown.network.total += 10;
        } else {
            breakdown.network.items.push({
                name: 'Referral (unverified)',
                points: 3,
                earned: true
            });
            breakdown.network.total += 3;
            improvements.push('Verify your referral code to earn +7 more points');
        }
    } else {
        breakdown.network.items.push({
            name: 'Verified Founder Referral',
            points: 10,
            earned: false
        });
        improvements.push('Get a referral from a verified BedRock founder to earn +10 points');
    }
    // University email: verified +3, unverified +1
    if (input.trustSignals.hasUniversityEmail) {
        if (input.trustSignals.universityEmailVerified) {
            breakdown.network.items.push({
                name: 'University Email (verified)',
                points: 3,
                earned: true
            });
            breakdown.network.total += 3;
        } else {
            breakdown.network.items.push({
                name: 'University Email (unverified)',
                points: 1,
                earned: true
            });
            breakdown.network.total += 1;
            improvements.push('Verify your university email to earn +2 more points');
        }
    } else {
        breakdown.network.items.push({
            name: 'University Email',
            points: 3,
            earned: false
        });
    }
    // Accelerator: verified +5, unverified +2
    if (input.trustSignals.hasAccelerator) {
        if (input.trustSignals.acceleratorVerified) {
            breakdown.network.items.push({
                name: 'Accelerator (verified)',
                points: 5,
                earned: true
            });
            breakdown.network.total += 5;
        } else {
            breakdown.network.items.push({
                name: 'Accelerator (unverified)',
                points: 2,
                earned: true
            });
            breakdown.network.total += 2;
        }
    } else {
        breakdown.network.items.push({
            name: 'Accelerator Affiliation',
            points: 5,
            earned: false
        });
    }
    // Employer: self-reported +2
    if (input.trustSignals.hasEmployerVerification) {
        breakdown.network.items.push({
            name: 'Employer (self-reported)',
            points: 2,
            earned: true
        });
        breakdown.network.total += 2;
    } else {
        breakdown.network.items.push({
            name: 'Employer Verification',
            points: 2,
            earned: false
        });
    }
    // === CALCULATE TOTALS ===
    const digitalLineageScore = Math.min(breakdown.digitalLineage.total, 40);
    const businessScore = Math.min(breakdown.business.total, 25);
    const identityScore = Math.min(breakdown.identity.total, 20);
    const networkScore = Math.min(breakdown.network.total, 15);
    let rawScore = digitalLineageScore + businessScore + identityScore + networkScore;
    // === COUNTRY RISK ADJUSTMENT ===
    const country = input.basicInfo.countryOfOrigin || input.basicInfo.countryOfResidence;
    let countryAdjustment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$onboarding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCountryPenalty"])(country);
    // Digital Lineage override: >30 = 50% reduction, >35 = eliminated
    if (countryAdjustment < 0) {
        if (digitalLineageScore > 35) {
            countryAdjustment = 0;
        } else if (digitalLineageScore > 30) {
            countryAdjustment = Math.round(countryAdjustment / 2);
        }
    }
    const totalScore = Math.max(0, Math.min(100, rawScore + countryAdjustment));
    // === DETERMINE STATUS ===
    let status;
    let statusLabel;
    let statusDescription;
    if (totalScore >= 85) {
        status = 'elite';
        statusLabel = 'Elite';
        statusDescription = 'Congratulations! You qualify for auto-approval with premium support and fastest processing.';
    } else if (totalScore >= 70) {
        status = 'approved';
        statusLabel = 'Approved';
        statusDescription = 'Great news! You meet our standard approval criteria. Full access to all services.';
    } else if (totalScore >= 50) {
        status = 'review_needed';
        statusLabel = 'Review Needed';
        statusDescription = 'Your application requires manual review. We may schedule a brief video call to verify your information.';
    } else if (totalScore >= 30) {
        status = 'conditional';
        statusLabel = 'Almost There';
        statusDescription = 'You\u2019re making progress! A few more verification steps will strengthen your application significantly.';
    } else {
        status = 'not_eligible';
        statusLabel = 'Getting Started';
        statusDescription = 'Your trust profile needs more verification signals. Complete the steps below to strengthen your application \u2014 we\u2019re here to help you get approved.';
    }
    const topImprovements = improvements.slice(0, 5);
    return {
        totalScore,
        digitalLineageScore,
        businessScore,
        identityScore,
        networkScore,
        countryAdjustment,
        status,
        statusLabel,
        statusDescription,
        breakdown,
        improvements: topImprovements
    };
}
function getStatusColor(status) {
    switch(status){
        case 'elite':
            return 'text-green-600 bg-green-50 border-green-200';
        case 'approved':
            return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'review_needed':
            return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'conditional':
            return 'text-orange-600 bg-orange-50 border-orange-200';
        case 'not_eligible':
            return 'text-red-600 bg-red-50 border-red-200';
        default:
            return 'text-gray-600 bg-gray-50 border-gray-200';
    }
}
function getScoreColor(score) {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    if (score >= 30) return 'text-orange-600';
    return 'text-red-600';
}
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
function calculateTrustScoreV2(input) {
    const github = scoreGitHub(input.github, !!input.githubUsernameOnly);
    const stripe = scoreStripe(input.stripe, !!input.hasBankStatements);
    const linkedin = scoreLinkedIn(input.linkedin, !!input.linkedinUrlOnly);
    const digital_presence = scoreDigitalPresence(input.digitalPresence);
    const network = scoreNetwork(input.network);
    const signals_connected = [];
    if (github.score > 0) signals_connected.push('github');
    if (stripe.score > 0) signals_connected.push('stripe');
    if (linkedin.score > 0) signals_connected.push('linkedin');
    if (digital_presence.score > 0) signals_connected.push('digital_presence');
    if (network.score > 0) signals_connected.push('network');
    const rawScore = github.score + stripe.score + linkedin.score + digital_presence.score + network.score;
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
    if (score >= 75) {
        risk_level = 'low';
        recommendation = 'approve';
    } else if (score >= 50) {
        risk_level = 'medium';
        recommendation = 'review';
    } else if (score >= 25) {
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
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/lib/email.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEmail",
    ()=>sendEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
function getResend() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
}
const FROM_ADDRESS = 'BedRock <noreply@bedrockhq.co>';
async function sendEmail(to, subject, html) {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to,
        subject,
        html
    });
    if (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
    return data;
}
}),
"[project]/src/lib/email-templates.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "complianceReminderEmail",
    ()=>complianceReminderEmail,
    "paymentConfirmationEmail",
    ()=>paymentConfirmationEmail,
    "trustScoreEmail",
    ()=>trustScoreEmail,
    "universityVerificationEmail",
    ()=>universityVerificationEmail,
    "welcomeEmail",
    ()=>welcomeEmail
]);
function baseTemplate(content) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:24px;font-weight:bold;color:#1e40af;">BedRock</span>
    </div>
    <div style="background:#ffffff;border-radius:8px;padding:32px;border:1px solid #e5e7eb;">
      ${content}
    </div>
    <div style="text-align:center;margin-top:32px;color:#9ca3af;font-size:12px;">
      <p>&copy; ${new Date().getFullYear()} BedRock. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}
function welcomeEmail(name) {
    return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Welcome to BedRock, ${name}!</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Your account has been created. You're now on your way to getting a US business bank account.
    </p>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Here's what to do next:
    </p>
    <ol style="margin:0 0 24px;padding-left:20px;color:#4b5563;line-height:1.8;">
      <li>Choose a plan that fits your needs</li>
      <li>Start the LLC formation process</li>
      <li>Apply for your US bank account</li>
    </ol>
    <div style="text-align:center;">
      <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/dashboard"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        Go to Dashboard
      </a>
    </div>
  `);
}
function paymentConfirmationEmail(name, tier, amount) {
    const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
    return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Payment Confirmed</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${name}, your payment has been processed successfully.
    </p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:16px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-weight:600;color:#166534;">Payment Details</p>
      <p style="margin:0;color:#4b5563;">Plan: <strong>${tierName}</strong></p>
      <p style="margin:0;color:#4b5563;">Amount: <strong>$${amount.toFixed(2)}</strong></p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Your account is now active. You can begin the LLC formation process from your dashboard.
    </p>
    <div style="text-align:center;">
      <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/dashboard/formation"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        Start LLC Formation
      </a>
    </div>
  `);
}
function complianceReminderEmail(name, deadline) {
    return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Compliance Reminder</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${name}, you have an upcoming compliance deadline:
    </p>
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:16px;margin:0 0 24px;">
      <p style="margin:0;font-weight:600;color:#92400e;">${deadline}</p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Please review your compliance dashboard and take action before the deadline.
    </p>
    <div style="text-align:center;">
      <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/dashboard/compliance"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        View Compliance Dashboard
      </a>
    </div>
  `);
}
function universityVerificationEmail(code) {
    return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Verify Your University Email</h1>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Use the code below to verify your university email address on BedRock.
    </p>
    <div style="text-align:center;margin:0 0 24px;">
      <div style="display:inline-block;background:#f0fdf4;border:2px solid #bbf7d0;border-radius:12px;padding:24px 48px;">
        <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#166534;font-family:monospace;">${code}</span>
      </div>
    </div>
    <p style="margin:0;color:#9ca3af;font-size:13px;text-align:center;">
      This code expires in 10 minutes. Do not share it with anyone.
    </p>
  `);
}
function trustScoreEmail(name, score, status) {
    const statusColors = {
        elite: {
            bg: '#f0fdf4',
            border: '#bbf7d0',
            text: '#166534'
        },
        approved: {
            bg: '#eff6ff',
            border: '#bfdbfe',
            text: '#1e40af'
        },
        review_needed: {
            bg: '#fffbeb',
            border: '#fde68a',
            text: '#92400e'
        },
        conditional: {
            bg: '#fff7ed',
            border: '#fed7aa',
            text: '#9a3412'
        },
        not_eligible: {
            bg: '#fef2f2',
            border: '#fecaca',
            text: '#991b1b'
        }
    };
    const colors = statusColors[status] || statusColors.review_needed;
    const statusLabel = status.split('_').map((w)=>w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Your Trust Score is Ready</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${name}, your trust score has been calculated.
    </p>
    <div style="text-align:center;margin:0 0 24px;">
      <div style="display:inline-block;width:100px;height:100px;line-height:100px;border-radius:50%;background:${colors.bg};border:3px solid ${colors.border};font-size:32px;font-weight:bold;color:${colors.text};">
        ${score}
      </div>
      <p style="margin:8px 0 0;font-weight:600;color:${colors.text};">${statusLabel}</p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Log in to your dashboard to see the full breakdown and next steps.
    </p>
    <div style="text-align:center;">
      <a href="${("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000'}/dashboard"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        View Dashboard
      </a>
    </div>
  `);
}
}),
"[project]/src/app/api/trust-score/calculate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trust-score.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2d$v2$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trust-score-v2.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-templates.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        // Validate input — require all 7 sections
        if (!body.basicInfo || !body.identity || !body.codeHistory || !body.professional || !body.financial || !body.digitalPresence || !body.trustSignals) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing required fields'
            }, {
                status: 400
            });
        }
        // Map form data to trust score input format
        const input = {
            basicInfo: {
                countryOfOrigin: body.basicInfo.countryOfOrigin || '',
                countryOfResidence: body.basicInfo.countryOfResidence || ''
            },
            identity: {
                hasPassport: body.identity.hasPassport || false,
                hasLocalId: body.identity.hasLocalId || false,
                hasAddressProof: body.identity.hasAddressProof || false,
                hasLivenessCheck: body.identity.hasLivenessCheck || false,
                faceSkipped: body.identity.faceSkipped || false,
                passportNameMatch: body.identity.passportNameMatch,
                passportDobMatch: body.identity.passportDobMatch,
                passportGenderMatch: body.identity.passportGenderMatch,
                passportNationalityMatch: body.identity.passportNationalityMatch
            },
            codeHistory: {
                hasGithub: body.codeHistory.hasGithub || false,
                githubConnected: body.codeHistory.githubConnected || false
            },
            professional: {
                hasLinkedin: body.professional.hasLinkedin || false,
                linkedinConnected: body.professional.linkedinConnected || false
            },
            financial: {
                hasStripeConnected: body.financial.hasStripeConnected || false,
                monthlyRevenue: body.financial.monthlyRevenue || '0',
                customerGeography: body.financial.customerGeography || '',
                chargebackRate: body.financial.chargebackRate || '',
                hasBankStatements: body.financial.hasBankStatements || false
            },
            digitalPresence: {
                website: body.digitalPresence.website || '',
                websiteVerified: body.digitalPresence.websiteVerified || false,
                twitterHandle: body.digitalPresence.twitterHandle || '',
                twitterVerified: body.digitalPresence.twitterVerified || false,
                instagramHandle: body.digitalPresence.instagramHandle || '',
                instagramVerified: body.digitalPresence.instagramVerified || false,
                appStoreUrl: body.digitalPresence.appStoreUrl || '',
                appStoreVerified: body.digitalPresence.appStoreVerified || false
            },
            trustSignals: {
                hasReferral: body.trustSignals.hasReferral || false,
                referralVerified: body.trustSignals.referralVerified || false,
                hasUniversityEmail: body.trustSignals.hasUniversityEmail || false,
                universityEmailVerified: body.trustSignals.universityEmailVerified || false,
                hasAccelerator: body.trustSignals.hasAccelerator || false,
                acceleratorVerified: body.trustSignals.acceleratorVerified || false,
                hasEmployerVerification: body.trustSignals.hasEmployerVerification || false
            }
        };
        // Calculate trust score
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateTrustScore"])(input);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to calculate trust score'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
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
        const { data: founderData } = await supabase.from('founders').select('id, email, full_name, country_of_origin, country_of_residence').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Founder not found'
            }, {
                status: 404
            });
        }
        // Read OAuth verifications from founder_verifications
        const { data: verifications } = await supabase.from('founder_verifications').select('verification_type, status, metadata').eq('founder_id', founder.id);
        const verifs = verifications || [];
        // Build v2 input from verification metadata
        const v2Input = {
            countryOfOrigin: founder.country_of_origin,
            countryOfResidence: founder.country_of_residence
        };
        for (const v of verifs){
            if (v.status !== 'verified' && v.status !== 'pending') continue;
            const meta = v.metadata;
            if (v.verification_type === 'github' && meta) {
                v2Input.github = meta;
                v2Input.githubUsernameOnly = false;
            } else if (v.verification_type === 'github_username' && meta) {
                v2Input.github = meta;
                v2Input.githubUsernameOnly = true;
            } else if (v.verification_type === 'stripe' && meta) {
                v2Input.stripe = meta;
            } else if (v.verification_type === 'linkedin' && meta) {
                v2Input.linkedin = meta;
                v2Input.linkedinUrlOnly = false;
            } else if (v.verification_type === 'linkedin_url') {
                v2Input.linkedinUrlOnly = true;
            }
        }
        // Also read the request body for non-OAuth signals
        const body = await request.json();
        if (body.digitalPresence) {
            v2Input.digitalPresence = {
                websiteVerified: body.digitalPresence.websiteVerified || false,
                twitterVerified: body.digitalPresence.twitterVerified || false,
                instagramVerified: body.digitalPresence.instagramVerified || false,
                appStoreVerified: body.digitalPresence.appStoreVerified || false
            };
        }
        if (body.trustSignals) {
            v2Input.network = {
                referralVerified: body.trustSignals.referralVerified || false,
                universityEmailVerified: body.trustSignals.universityEmailVerified || false,
                acceleratorVerified: body.trustSignals.acceleratorVerified || false,
                hasEmployer: body.trustSignals.hasEmployerVerification || false
            };
        }
        v2Input.hasBankStatements = body.financial?.hasBankStatements || false;
        // Calculate v2 score
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2d$v2$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateTrustScoreV2"])(v2Input);
        // Map risk_level to legacy status for DB
        const statusMap = {
            low: 'approved',
            medium: 'review_needed',
            high: 'conditional',
            critical: 'not_eligible'
        };
        const status = result.score >= 85 ? 'elite' : statusMap[result.risk_level] || 'review_needed';
        // Upsert trust score with correct DB column mapping
        const upsertData = {
            founder_id: founder.id,
            total_score: result.score,
            identity_score: 0,
            business_score: result.breakdown.stripe.score,
            financial_score: result.breakdown.stripe.score,
            social_score: result.breakdown.linkedin.score,
            digital_lineage_score: result.breakdown.github.score + result.breakdown.digital_presence.score,
            network_score: result.breakdown.network.score,
            country_adjustment: result.country_adjustment,
            status,
            score_breakdown: result.breakdown,
            calculated_at: new Date().toISOString()
        };
        const { data: trustScore, error } = await supabase.from('trust_scores').upsert(upsertData, {
            onConflict: 'founder_id'
        }).select().single();
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        // Send trust score email (non-blocking)
        if (founder?.email && founder?.full_name) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(founder.email, 'Your Trust Score is Ready - BedRock', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trustScoreEmail"])(founder.full_name, result.score, status));
            } catch  {
            // Non-critical
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            trustScore,
            v2: result
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

//# sourceMappingURL=%5Broot-of-the-server%5D__bf542016._.js.map