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
"[project]/src/app/api/founders/ensure/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const authClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
        const { data: { user }, error: userError } = await authClient.auth.getUser();
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const body = await request.json().catch(()=>({}));
        // Check if founder already exists
        const { data: existingFounder } = await supabase.from('founders').select('id').eq('user_id', user.id).single();
        let founderId;
        if (existingFounder) {
            founderId = existingFounder.id;
            // Update founder with any new onboarding data
            if (body.onboardingData?.basicInfo) {
                const bi = body.onboardingData.basicInfo;
                const updates = {};
                if (bi.phone) updates.phone = bi.phone;
                if (bi.dateOfBirth) updates.date_of_birth = bi.dateOfBirth;
                if (bi.countryOfOrigin) updates.country_of_origin = bi.countryOfOrigin;
                if (bi.countryOfResidence) updates.country_of_residence = bi.countryOfResidence;
                if (Object.keys(updates).length > 0) {
                    updates.onboarding_completed = true;
                    await supabase.from('founders').update(updates).eq('id', founderId);
                }
            }
        } else {
            // Create founder record
            const meta = user.user_metadata || {};
            const bi = body.onboardingData?.basicInfo || {};
            const { data: founder, error: founderError } = await supabase.from('founders').insert({
                user_id: user.id,
                email: user.email || '',
                full_name: meta.full_name || bi.fullName || user.email?.split('@')[0] || 'User',
                phone: bi.phone || null,
                date_of_birth: bi.dateOfBirth || null,
                country_of_origin: bi.countryOfOrigin || '',
                country_of_residence: bi.countryOfResidence || '',
                onboarding_completed: !!body.trustScore
            }).select('id').single();
            if (founderError) {
                console.error('[ensure] Founder creation failed:', founderError.message);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: founderError.message
                }, {
                    status: 500
                });
            }
            founderId = founder.id;
        }
        // Save trust score if provided
        if (body.trustScore) {
            const { data: existingScore } = await supabase.from('trust_scores').select('id').eq('founder_id', founderId).single();
            if (!existingScore) {
                const { error: tsError } = await supabase.from('trust_scores').insert({
                    founder_id: founderId,
                    total_score: body.trustScore.totalScore || 0,
                    identity_score: body.trustScore.identityScore || 0,
                    business_score: body.trustScore.businessScore || 0,
                    financial_score: body.trustScore.businessScore || 0,
                    social_score: body.trustScore.networkScore || 0,
                    country_adjustment: body.trustScore.countryAdjustment || 0,
                    status: body.trustScore.status || 'review_needed',
                    score_breakdown: body.trustScore.breakdown || {}
                });
                if (tsError) {
                    console.error('[ensure] Trust score insert failed:', tsError.message);
                }
            } else {
                // Update existing score
                await supabase.from('trust_scores').update({
                    total_score: body.trustScore.totalScore || 0,
                    identity_score: body.trustScore.identityScore || 0,
                    business_score: body.trustScore.businessScore || 0,
                    financial_score: body.trustScore.businessScore || 0,
                    social_score: body.trustScore.networkScore || 0,
                    country_adjustment: body.trustScore.countryAdjustment || 0,
                    status: body.trustScore.status || 'review_needed',
                    score_breakdown: body.trustScore.breakdown || {}
                }).eq('founder_id', founderId);
            }
        }
        // Save all verification data from onboarding
        if (body.onboardingData) {
            const verifications = [];
            const od = body.onboardingData;
            // Identity verifications
            if (od.identity) {
                if (od.identity.hasPassport) {
                    verifications.push({
                        type: 'passport',
                        data: {
                            hasPassport: true,
                            passportNameMatch: od.identity.passportNameMatch,
                            passportDobMatch: od.identity.passportDobMatch,
                            passportGenderMatch: od.identity.passportGenderMatch,
                            passportNationalityMatch: od.identity.passportNationalityMatch,
                            extractedData: od.identity.passportData
                        }
                    });
                }
                if (od.identity.hasLocalId) {
                    verifications.push({
                        type: 'local_id',
                        data: {
                            hasLocalId: true,
                            extractedData: od.identity.localIdData
                        }
                    });
                }
                if (od.identity.hasAddressProof) {
                    verifications.push({
                        type: 'address_proof',
                        data: {
                            hasAddressProof: true,
                            extractedData: od.identity.addressProofData
                        }
                    });
                }
                if (od.identity.hasLivenessCheck) {
                    verifications.push({
                        type: 'face_scan',
                        data: {
                            matched: true
                        }
                    });
                }
            }
            // GitHub OAuth
            if (od.codeHistory?.githubConnected) {
                const ghData = body.oauthData?.github || od.codeHistory;
                verifications.push({
                    type: 'github_oauth',
                    data: ghData
                });
            }
            // LinkedIn OAuth
            if (od.professional?.linkedinConnected) {
                const liData = body.oauthData?.linkedin || od.professional;
                verifications.push({
                    type: 'linkedin_oauth',
                    data: liData
                });
            }
            // Stripe OAuth
            if (od.financial?.hasStripeConnected) {
                const stripeData = body.oauthData?.stripe || od.financial;
                verifications.push({
                    type: 'stripe_oauth',
                    data: stripeData
                });
            }
            // Financial details
            if (od.financial?.monthlyRevenue || od.financial?.customerGeography) {
                verifications.push({
                    type: 'financial_info',
                    data: {
                        monthlyRevenue: od.financial.monthlyRevenue,
                        customerGeography: od.financial.customerGeography,
                        chargebackRate: od.financial.chargebackRate,
                        hasBankStatements: od.financial.hasBankStatements
                    }
                });
            }
            // Digital presence
            if (od.digitalPresence) {
                const dp = od.digitalPresence;
                if (dp.website || dp.twitterHandle || dp.instagramHandle || dp.appStoreUrl) {
                    verifications.push({
                        type: 'digital_presence',
                        data: {
                            website: dp.website,
                            websiteVerified: dp.websiteVerified,
                            twitterHandle: dp.twitterHandle,
                            twitterVerified: dp.twitterVerified,
                            instagramHandle: dp.instagramHandle,
                            instagramVerified: dp.instagramVerified,
                            appStoreUrl: dp.appStoreUrl,
                            appStoreVerified: dp.appStoreVerified
                        }
                    });
                }
            }
            // Trust signals
            if (od.trustSignals) {
                const ts = od.trustSignals;
                if (ts.hasReferral || ts.referralVerified) {
                    verifications.push({
                        type: 'referral',
                        data: {
                            hasReferral: ts.hasReferral,
                            referralVerified: ts.referralVerified,
                            referralCode: ts.referralCode
                        }
                    });
                }
                if (ts.hasUniversityEmail || ts.universityEmailVerified) {
                    verifications.push({
                        type: 'university_email',
                        data: {
                            hasUniversityEmail: ts.hasUniversityEmail,
                            verified: ts.universityEmailVerified,
                            email: ts.universityEmail
                        }
                    });
                }
                if (ts.hasAccelerator || ts.acceleratorVerified) {
                    verifications.push({
                        type: 'accelerator',
                        data: {
                            hasAccelerator: ts.hasAccelerator,
                            verified: ts.acceleratorVerified,
                            name: ts.acceleratorName
                        }
                    });
                }
                if (ts.hasEmployerVerification) {
                    verifications.push({
                        type: 'employer_verification',
                        data: {
                            hasEmployerVerification: true
                        }
                    });
                }
            }
            // Upsert all verifications
            for (const v of verifications){
                const status = v.type === 'github_oauth' && od.codeHistory?.githubConnected ? 'verified' : v.type === 'linkedin_oauth' && od.professional?.linkedinConnected ? 'verified' : v.type === 'stripe_oauth' && od.financial?.hasStripeConnected ? 'verified' : v.type === 'face_scan' ? 'verified' : v.type === 'referral' && od.trustSignals?.referralVerified ? 'verified' : v.type === 'university_email' && od.trustSignals?.universityEmailVerified ? 'verified' : v.type === 'accelerator' && od.trustSignals?.acceleratorVerified ? 'verified' : 'pending';
                try {
                    await supabase.from('founder_verifications').upsert({
                        founder_id: founderId,
                        verification_type: v.type,
                        status,
                        verified_at: status === 'verified' ? new Date().toISOString() : null,
                        metadata: v.data
                    }, {
                        onConflict: 'founder_id,verification_type'
                    });
                } catch  {
                // Non-critical — continue saving other verifications
                }
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            founder: {
                id: founderId
            },
            created: !existingFounder
        });
    } catch (err) {
        console.error('[ensure] Unexpected error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7ff891b4._.js.map