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
"[project]/src/app/api/email/welcome/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-templates.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const { name, email } = await request.json();
        if (!name || !email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing name or email'
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, 'Welcome to BedRock!', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["welcomeEmail"])(name));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to send email'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12e78d1b._.js.map