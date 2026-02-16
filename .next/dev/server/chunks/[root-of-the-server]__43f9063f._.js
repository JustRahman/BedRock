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
"[project]/src/app/api/companies/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
const US_STATE_NAMES = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
};
async function GET() {
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
        const { data: founderData } = await supabase.from('founders').select('id').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Founder not found'
            }, {
                status: 404
            });
        }
        const { data: company, error } = await supabase.from('companies').select('*').eq('founder_id', founder.id).single();
        if (error && error.code !== 'PGRST116') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        // Fetch company updates timeline if company exists
        let updates = null;
        if (company) {
            const companyRecord = company;
            const { data: updatesData } = await supabase.from('company_updates').select('*').eq('company_id', companyRecord.id).order('created_at', {
                ascending: true
            });
            updates = updatesData;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            company: company || null,
            updates: updates || []
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
        const { data: { user }, error: userError } = await authClient.auth.getUser();
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const { data: founderData } = await supabase.from('founders').select('id').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Founder not found'
            }, {
                status: 404
            });
        }
        const body = await request.json();
        const isAlreadyFormed = body.alreadyFormed === true;
        const insertData = {
            founder_id: founder.id,
            name: body.name,
            legal_name: body.legalName || body.name,
            state: body.state,
            description: body.description || null,
            formation_status: isAlreadyFormed ? 'formed' : 'pending'
        };
        if (isAlreadyFormed) {
            if (body.ein) insertData.ein = body.ein;
            insertData.formation_date = body.formationDate || new Date().toISOString().split('T')[0];
        }
        const { data: company, error } = await supabase.from('companies').insert(insertData).select().single();
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        const companyId = company.id;
        const now = new Date();
        if (isAlreadyFormed) {
            // Already-formed LLC: create recurring compliance deadlines
            const state = body.state || 'DE';
            const stateName = US_STATE_NAMES[state] || state;
            let annualReportDue;
            if (state === 'WY') {
                annualReportDue = new Date(now.getFullYear() + 1, now.getMonth(), 1);
            } else {
                annualReportDue = new Date(now.getFullYear() + 1, 2, 1);
            }
            const raRenewalDue = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
            let taxDue;
            let taxTitle;
            let taxDescription;
            if (state === 'DE') {
                taxDue = new Date(now.getFullYear() + 1, 5, 1);
                taxTitle = 'Delaware Franchise Tax';
                taxDescription = 'Annual Delaware franchise tax filing due June 1.';
            } else {
                taxDue = new Date(now.getFullYear() + 1, 3, 15);
                taxTitle = 'Federal Tax Filing';
                taxDescription = 'Federal tax return filing due April 15.';
            }
            const boiDue = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
            await supabase.from('compliance_deadlines').insert([
                {
                    founder_id: founder.id,
                    company_id: companyId,
                    title: 'FinCEN BOI Report',
                    description: 'Beneficial Ownership Information report — verify if already filed.',
                    due_date: boiDue.toISOString().split('T')[0],
                    is_recurring: false,
                    recurring_type: 'boi_report'
                },
                {
                    founder_id: founder.id,
                    company_id: companyId,
                    title: `${stateName} LLC Annual Report`,
                    description: `Annual report filing for ${stateName} LLC.`,
                    due_date: annualReportDue.toISOString().split('T')[0],
                    is_recurring: true,
                    recurring_type: 'llc_annual_report'
                },
                {
                    founder_id: founder.id,
                    company_id: companyId,
                    title: 'Registered Agent Renewal',
                    description: 'Annual registered agent service renewal.',
                    due_date: raRenewalDue.toISOString().split('T')[0],
                    is_recurring: true,
                    recurring_type: 'ra_renewal'
                },
                {
                    founder_id: founder.id,
                    company_id: companyId,
                    title: taxTitle,
                    description: taxDescription,
                    due_date: taxDue.toISOString().split('T')[0],
                    is_recurring: true,
                    recurring_type: 'tax_filing'
                }
            ]);
        } else {
            // New formation: create pending deadlines
            const boiDue = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
            const annualReportDue = new Date(now.getFullYear() + 1, 2, 1);
            await supabase.from('compliance_deadlines').insert([
                {
                    founder_id: founder.id,
                    company_id: companyId,
                    title: 'FinCEN BOI Report',
                    description: 'Beneficial Ownership Information report due within 90 days of formation.',
                    due_date: boiDue.toISOString().split('T')[0],
                    is_recurring: false,
                    recurring_type: 'boi_report'
                },
                {
                    founder_id: founder.id,
                    company_id: companyId,
                    title: `${body.state === 'DE' ? 'Delaware' : 'Wyoming'} Annual Report`,
                    description: `Annual report and franchise tax filing for ${body.state === 'DE' ? 'Delaware' : 'Wyoming'}.`,
                    due_date: annualReportDue.toISOString().split('T')[0],
                    is_recurring: false,
                    recurring_type: null
                }
            ]);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            company
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
async function PATCH(request) {
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
        const { data: founderData } = await supabase.from('founders').select('id, role').eq('user_id', user.id).single();
        const founder = founderData;
        if (!founder) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Founder not found'
            }, {
                status: 404
            });
        }
        const body = await request.json();
        const updateData = {};
        if (body.formationStatus !== undefined) updateData.formation_status = body.formationStatus;
        if (body.ein !== undefined) updateData.ein = body.ein;
        if (body.formationDate !== undefined) updateData.formation_date = body.formationDate;
        if (body.name !== undefined) updateData.name = body.name;
        if (body.legalName !== undefined) updateData.legal_name = body.legalName;
        if (body.registeredAgentName !== undefined) updateData.registered_agent_name = body.registeredAgentName;
        if (body.registeredAgentNotes !== undefined) updateData.registered_agent_notes = body.registeredAgentNotes;
        // Determine which company to update
        const isAdmin = founder.role === 'admin' && body.companyId;
        let queryBuilder = supabase.from('companies').update(updateData);
        queryBuilder = isAdmin ? queryBuilder.eq('id', body.companyId) : queryBuilder.eq('founder_id', founder.id);
        const { data: company, error } = await queryBuilder.select().single();
        if (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 500
            });
        }
        // Log status change to company_updates if status was changed
        if (body.formationStatus && company) {
            const companyRecord = company;
            await supabase.from('company_updates').insert({
                company_id: companyRecord.id,
                status: body.formationStatus,
                note: body.note || null,
                created_by: founder.id
            });
        }
        // Auto-create recurring deadlines when status changes to 'formed'
        if (body.formationStatus === 'formed' && company) {
            const companyRecord = company;
            // Check if recurring deadlines already exist for this company
            const { data: existingRecurring } = await supabase.from('compliance_deadlines').select('id').eq('company_id', companyRecord.id).eq('is_recurring', true);
            if (!existingRecurring || existingRecurring.length === 0) {
                const now = new Date();
                const state = companyRecord.state || 'DE';
                // LLC Annual Report due date
                let annualReportDue;
                if (state === 'WY') {
                    // Wyoming: anniversary month of next year
                    annualReportDue = new Date(now.getFullYear() + 1, now.getMonth(), 1);
                } else {
                    // Delaware: March 1 next year
                    annualReportDue = new Date(now.getFullYear() + 1, 2, 1);
                }
                // RA Renewal: 1 year from formation
                const raRenewalDue = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
                // Tax Filing due date
                let taxDue;
                let taxTitle;
                let taxDescription;
                if (state === 'DE') {
                    taxDue = new Date(now.getFullYear() + 1, 5, 1); // June 1
                    taxTitle = 'Delaware Franchise Tax';
                    taxDescription = 'Annual Delaware franchise tax filing due June 1.';
                } else {
                    taxDue = new Date(now.getFullYear() + 1, 3, 15); // April 15
                    taxTitle = 'Federal Tax Filing';
                    taxDescription = 'Federal tax return filing due April 15.';
                }
                const stateName = state === 'DE' ? 'Delaware' : state === 'WY' ? 'Wyoming' : state;
                // Remove the non-recurring annual report that was created at company creation
                await supabase.from('compliance_deadlines').delete().eq('company_id', companyRecord.id).eq('is_recurring', false).like('title', `%Annual Report%`);
                // Create recurring deadlines
                await supabase.from('compliance_deadlines').insert([
                    {
                        founder_id: companyRecord.founder_id,
                        company_id: companyRecord.id,
                        title: `${stateName} LLC Annual Report`,
                        description: `Annual report filing for ${stateName} LLC.`,
                        due_date: annualReportDue.toISOString().split('T')[0],
                        is_recurring: true,
                        recurring_type: 'llc_annual_report'
                    },
                    {
                        founder_id: companyRecord.founder_id,
                        company_id: companyRecord.id,
                        title: 'Registered Agent Renewal',
                        description: 'Annual registered agent service renewal.',
                        due_date: raRenewalDue.toISOString().split('T')[0],
                        is_recurring: true,
                        recurring_type: 'ra_renewal'
                    },
                    {
                        founder_id: companyRecord.founder_id,
                        company_id: companyRecord.id,
                        title: taxTitle,
                        description: taxDescription,
                        due_date: taxDue.toISOString().split('T')[0],
                        is_recurring: true,
                        recurring_type: 'tax_filing'
                    }
                ]);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            company
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

//# sourceMappingURL=%5Broot-of-the-server%5D__43f9063f._.js.map