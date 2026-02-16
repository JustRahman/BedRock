(()=>{var a={};a.id=5623,a.ids=[5623],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4573:a=>{"use strict";a.exports=require("node:buffer")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27910:a=>{"use strict";a.exports=require("stream")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:a=>{"use strict";a.exports=require("path")},41204:a=>{"use strict";a.exports=require("string_decoder")},44023:(a,b,c)=>{"use strict";function d(a){return`<!DOCTYPE html>
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
      ${a}
    </div>
    <div style="text-align:center;margin-top:32px;color:#9ca3af;font-size:12px;">
      <p>&copy; ${new Date().getFullYear()} BedRock. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`}function e(a){return d(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Welcome to BedRock, ${a}!</h1>
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
      <a href="http://localhost:3000/dashboard"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        Go to Dashboard
      </a>
    </div>
  `)}function f(a,b,c){let e=b.charAt(0).toUpperCase()+b.slice(1);return d(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Payment Confirmed</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${a}, your payment has been processed successfully.
    </p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:16px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-weight:600;color:#166534;">Payment Details</p>
      <p style="margin:0;color:#4b5563;">Plan: <strong>${e}</strong></p>
      <p style="margin:0;color:#4b5563;">Amount: <strong>$${c.toFixed(2)}</strong></p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Your account is now active. You can begin the LLC formation process from your dashboard.
    </p>
    <div style="text-align:center;">
      <a href="http://localhost:3000/dashboard/formation"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        Start LLC Formation
      </a>
    </div>
  `)}function g(a){return d(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Verify Your University Email</h1>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Use the code below to verify your university email address on BedRock.
    </p>
    <div style="text-align:center;margin:0 0 24px;">
      <div style="display:inline-block;background:#f0fdf4;border:2px solid #bbf7d0;border-radius:12px;padding:24px 48px;">
        <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#166534;font-family:monospace;">${a}</span>
      </div>
    </div>
    <p style="margin:0;color:#9ca3af;font-size:13px;text-align:center;">
      This code expires in 10 minutes. Do not share it with anyone.
    </p>
  `)}function h(a,b,c){let e={elite:{bg:"#f0fdf4",border:"#bbf7d0",text:"#166534"},approved:{bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af"},review_needed:{bg:"#fffbeb",border:"#fde68a",text:"#92400e"},conditional:{bg:"#fff7ed",border:"#fed7aa",text:"#9a3412"},not_eligible:{bg:"#fef2f2",border:"#fecaca",text:"#991b1b"}},f=e[c]||e.review_needed,g=c.split("_").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ");return d(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Your Trust Score is Ready</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${a}, your trust score has been calculated.
    </p>
    <div style="text-align:center;margin:0 0 24px;">
      <div style="display:inline-block;width:100px;height:100px;line-height:100px;border-radius:50%;background:${f.bg};border:3px solid ${f.border};font-size:32px;font-weight:bold;color:${f.text};">
        ${b}
      </div>
      <p style="margin:8px 0 0;font-weight:600;color:${f.text};">${g}</p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Log in to your dashboard to see the full breakdown and next steps.
    </p>
    <div style="text-align:center;">
      <a href="http://localhost:3000/dashboard"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        View Dashboard
      </a>
    </div>
  `)}c.d(b,{Ly:()=>h,go:()=>g,pg:()=>e,yK:()=>f})},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55511:a=>{"use strict";a.exports=require("crypto")},57075:a=>{"use strict";a.exports=require("node:stream")},60165:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>F,patchFetch:()=>E,routeModule:()=>A,serverHooks:()=>D,workAsyncStorage:()=>B,workUnitAsyncStorage:()=>C});var d={};c.r(d),c.d(d,{POST:()=>z});var e=c(19225),f=c(84006),g=c(8317),h=c(99373),i=c(34775),j=c(24235),k=c(261),l=c(54365),m=c(90771),n=c(73461),o=c(67798),p=c(92280),q=c(62018),r=c(45696),s=c(47929),t=c(86439),u=c(37527),v=c(45592),w=c(79933),x=c(68681),y=c(44023);async function z(a){try{let b=await (0,w.U)(),{data:{user:c},error:d}=await b.auth.getUser();if(d||!c)return v.NextResponse.json({error:"Unauthorized"},{status:401});let{name:e,email:f}=await a.json();if(!e||!f)return v.NextResponse.json({error:"Missing name or email"},{status:400});return await (0,x.Z)(f,"Welcome to BedRock!",(0,y.pg)(e)),v.NextResponse.json({success:!0})}catch(a){return console.error("Failed to send welcome email:",a),v.NextResponse.json({error:"Failed to send email"},{status:500})}}let A=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/email/welcome/route",pathname:"/api/email/welcome",filename:"route",bundlePath:"app/api/email/welcome/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"/Users/rahmanbazarov/Data/programming/BedRock/src/app/api/email/welcome/route.ts",nextConfigOutput:"standalone",userland:d}),{workAsyncStorage:B,workUnitAsyncStorage:C,serverHooks:D}=A;function E(){return(0,g.patchFetch)({workAsyncStorage:B,workUnitAsyncStorage:C})}async function F(a,b,c){A.isDev&&(0,h.addRequestMeta)(a,"devRequestTimingInternalsEnd",process.hrtime.bigint());let d="/api/email/welcome/route";"/index"===d&&(d="/");let e=await A.prepare(a,b,{srcPage:d,multiZoneDraftMode:!1});if(!e)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:g,params:v,nextConfig:w,parsedUrl:x,isDraftMode:y,prerenderManifest:z,routerServerContext:B,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,resolvedPathname:E,clientReferenceManifest:F,serverActionsManifest:G}=e,H=(0,k.normalizeAppPath)(d),I=!!(z.dynamicRoutes[H]||z.routes[E]),J=async()=>((null==B?void 0:B.render404)?await B.render404(a,b,x,!1):b.end("This page could not be found"),null);if(I&&!y){let a=!!z.routes[E],b=z.dynamicRoutes[H];if(b&&!1===b.fallback&&!a){if(w.experimental.adapterPath)return await J();throw new t.NoFallbackError}}let K=null;!I||A.isDev||y||(K="/index"===(K=E)?"/":K);let L=!0===A.isDev||!I,M=I&&!L;G&&F&&(0,j.setManifestsSingleton)({page:d,clientReferenceManifest:F,serverActionsManifest:G});let N=a.method||"GET",O=(0,i.getTracer)(),P=O.getActiveScopeSpan(),Q={params:v,prerenderManifest:z,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:L,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d,e)=>A.onRequestError(a,b,d,e,B)},sharedContext:{buildId:g}},R=new l.NodeNextRequest(a),S=new l.NodeNextResponse(b),T=m.NextRequestAdapter.fromNodeNextRequest(R,(0,m.signalFromNodeResponse)(b));try{let e=async a=>A.handle(T,Q).finally(()=>{if(!a)return;a.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let c=O.getRootSpanAttributes();if(!c)return;if(c.get("next.span_type")!==n.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${c.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=c.get("next.route");if(e){let b=`${N} ${e}`;a.setAttributes({"next.route":e,"http.route":e,"next.span_name":b}),a.updateName(b)}else a.updateName(`${N} ${d}`)}),g=!!(0,h.getRequestMeta)(a,"minimalMode"),j=async h=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!g&&C&&D&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let d=await e(h);a.fetchMetrics=Q.renderOpts.fetchMetrics;let i=Q.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=Q.renderOpts.collectedTags;if(!I)return await (0,p.I)(R,S,d,Q.renderOpts.pendingWaitUntil),null;{let a=await d.blob(),b=(0,q.toNodeOutgoingHttpHeaders)(d.headers);j&&(b[s.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==Q.renderOpts.collectedRevalidate&&!(Q.renderOpts.collectedRevalidate>=s.INFINITE_CACHE)&&Q.renderOpts.collectedRevalidate,e=void 0===Q.renderOpts.collectedExpire||Q.renderOpts.collectedExpire>=s.INFINITE_CACHE?void 0:Q.renderOpts.collectedExpire;return{value:{kind:u.CachedRouteKind.APP_ROUTE,status:d.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:e}}}}catch(b){throw(null==f?void 0:f.isStale)&&await A.onRequestError(a,b,{routerKind:"App Router",routePath:d,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,B),b}},l=await A.handleResponse({req:a,nextConfig:w,cacheKey:K,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:z,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,responseGenerator:k,waitUntil:c.waitUntil,isMinimalMode:g});if(!I)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==u.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});g||b.setHeader("x-nextjs-cache",C?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,q.fromNodeOutgoingHttpHeaders)(l.value.headers);return g&&I||m.delete(s.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,r.getCacheControlHeader)(l.cacheControl)),await (0,p.I)(R,S,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};P?await j(P):await O.withPropagatedContext(a.headers,()=>O.trace(n.BaseServerSpan.handleRequest,{spanName:`${N} ${d}`,kind:i.SpanKind.SERVER,attributes:{"http.method":N,"http.target":a.url}},j))}catch(b){if(b instanceof t.NoFallbackError||await A.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,B),I)throw b;return await (0,p.I)(R,S,new Response(null,{status:500})),null}}},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},68681:(a,b,c)=>{"use strict";c.d(b,{Z:()=>e});var d=c(59307);async function e(a,b,c){let e=new d.u(process.env.RESEND_API_KEY),{data:f,error:g}=await e.emails.send({from:"BedRock <noreply@bedrockhq.co>",to:a,subject:b,html:c});if(g)throw console.error("Failed to send email:",g),g;return f}},77598:a=>{"use strict";a.exports=require("node:crypto")},78335:()=>{},79428:a=>{"use strict";a.exports=require("buffer")},79933:(a,b,c)=>{"use strict";c.d(b,{U:()=>g,r:()=>h});var d=c(74968),e=c(94218),f=c(65573);async function g(){let a=await (0,f.UL)();return(0,d.createServerClient)("https://raqqortimspvahtnujqa.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcXFvcnRpbXNwdmFodG51anFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzk1MjksImV4cCI6MjA4NTgxNTUyOX0.uP2tUmSrGY5AhT6NJnX57w3QEPSOwXStAEaO4aztcu8",{cookies:{getAll:()=>a.getAll(),setAll(b){try{b.forEach(({name:b,value:c,options:d})=>a.set(b,c,d))}catch{}}}})}function h(){return(0,e.UU)("https://raqqortimspvahtnujqa.supabase.co",process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{autoRefreshToken:!1,persistSession:!1}})}},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},89768:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),Object.defineProperty(b,"createDedupedByCallsiteServerErrorLoggerDev",{enumerable:!0,get:function(){return i}});let d=function(a,b){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=e(void 0);if(c&&c.has(a))return c.get(a);var d={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(d,g,h):d[g]=a[g]}return d.default=a,c&&c.set(a,d),d}(c(91986));function e(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(e=function(a){return a?c:b})(a)}let f={current:null},g="function"==typeof d.cache?d.cache:a=>a,h=console.warn;function i(a){return function(...b){h(a(...b))}}g(a=>{try{h(f.current)}finally{f.current=null}})},96487:()=>{}};var b=require("../../../../webpack-runtime.js");b.C(a);var c=b.X(0,[3445,5573,1813,4968,9307],()=>b(b.s=60165));module.exports=c})();