(()=>{var a={};a.id=7637,a.ids=[7637],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4573:a=>{"use strict";a.exports=require("node:buffer")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},13380:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>G,patchFetch:()=>F,routeModule:()=>B,serverHooks:()=>E,workAsyncStorage:()=>C,workUnitAsyncStorage:()=>D});var d={};c.r(d),c.d(d,{POST:()=>A});var e=c(19225),f=c(84006),g=c(8317),h=c(99373),i=c(34775),j=c(24235),k=c(261),l=c(54365),m=c(90771),n=c(73461),o=c(67798),p=c(92280),q=c(62018),r=c(45696),s=c(47929),t=c(86439),u=c(37527),v=c(45592),w=c(77216),x=c(79933),y=c(68681),z=c(44023);async function A(a){let b,c=await a.text(),d=a.headers.get("stripe-signature");if(!d)return v.NextResponse.json({error:"Missing signature"},{status:400});let e=new w.A(process.env.STRIPE_SECRET_KEY,{apiVersion:"2026-01-28.clover"});try{b=e.webhooks.constructEvent(c,d,process.env.STRIPE_WEBHOOK_SECRET)}catch(a){return console.error("Webhook signature verification failed:",a),v.NextResponse.json({error:"Invalid signature"},{status:400})}if("checkout.session.completed"===b.type){let a=b.data.object,c=a.metadata?.founder_id,d=a.metadata?.tier;if(!c||!d)return console.error("Missing metadata in checkout session"),v.NextResponse.json({error:"Missing metadata"},{status:400});let e=await (0,x.r)();await e.from("payments").insert({founder_id:c,amount:a.amount_total/100,currency:a.currency||"usd",status:"completed",stripe_payment_id:a.payment_intent,description:`${d.charAt(0).toUpperCase()+d.slice(1)} plan setup fee`}),await e.from("founders").update({tier:d,status:"active"}).eq("id",c);let{data:f}=await e.from("founders").select("email, full_name").eq("id",c).single();if(f){let b=a.amount_total/100;try{await (0,y.Z)(f.email,"Payment Confirmed - BedRock",(0,z.yK)(f.full_name,d,b))}catch(a){console.error("Failed to send payment confirmation email:",a)}}}return v.NextResponse.json({received:!0})}let B=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/payments/webhook/route",pathname:"/api/payments/webhook",filename:"route",bundlePath:"app/api/payments/webhook/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"/Users/rahmanbazarov/Data/programming/BedRock/src/app/api/payments/webhook/route.ts",nextConfigOutput:"standalone",userland:d}),{workAsyncStorage:C,workUnitAsyncStorage:D,serverHooks:E}=B;function F(){return(0,g.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:D})}async function G(a,b,c){B.isDev&&(0,h.addRequestMeta)(a,"devRequestTimingInternalsEnd",process.hrtime.bigint());let d="/api/payments/webhook/route";"/index"===d&&(d="/");let e=await B.prepare(a,b,{srcPage:d,multiZoneDraftMode:!1});if(!e)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:g,params:v,nextConfig:w,parsedUrl:x,isDraftMode:y,prerenderManifest:z,routerServerContext:A,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,resolvedPathname:E,clientReferenceManifest:F,serverActionsManifest:G}=e,H=(0,k.normalizeAppPath)(d),I=!!(z.dynamicRoutes[H]||z.routes[E]),J=async()=>((null==A?void 0:A.render404)?await A.render404(a,b,x,!1):b.end("This page could not be found"),null);if(I&&!y){let a=!!z.routes[E],b=z.dynamicRoutes[H];if(b&&!1===b.fallback&&!a){if(w.experimental.adapterPath)return await J();throw new t.NoFallbackError}}let K=null;!I||B.isDev||y||(K="/index"===(K=E)?"/":K);let L=!0===B.isDev||!I,M=I&&!L;G&&F&&(0,j.setManifestsSingleton)({page:d,clientReferenceManifest:F,serverActionsManifest:G});let N=a.method||"GET",O=(0,i.getTracer)(),P=O.getActiveScopeSpan(),Q={params:v,prerenderManifest:z,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:L,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d,e)=>B.onRequestError(a,b,d,e,A)},sharedContext:{buildId:g}},R=new l.NodeNextRequest(a),S=new l.NodeNextResponse(b),T=m.NextRequestAdapter.fromNodeNextRequest(R,(0,m.signalFromNodeResponse)(b));try{let e=async a=>B.handle(T,Q).finally(()=>{if(!a)return;a.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let c=O.getRootSpanAttributes();if(!c)return;if(c.get("next.span_type")!==n.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${c.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=c.get("next.route");if(e){let b=`${N} ${e}`;a.setAttributes({"next.route":e,"http.route":e,"next.span_name":b}),a.updateName(b)}else a.updateName(`${N} ${d}`)}),g=!!(0,h.getRequestMeta)(a,"minimalMode"),j=async h=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!g&&C&&D&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let d=await e(h);a.fetchMetrics=Q.renderOpts.fetchMetrics;let i=Q.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=Q.renderOpts.collectedTags;if(!I)return await (0,p.I)(R,S,d,Q.renderOpts.pendingWaitUntil),null;{let a=await d.blob(),b=(0,q.toNodeOutgoingHttpHeaders)(d.headers);j&&(b[s.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==Q.renderOpts.collectedRevalidate&&!(Q.renderOpts.collectedRevalidate>=s.INFINITE_CACHE)&&Q.renderOpts.collectedRevalidate,e=void 0===Q.renderOpts.collectedExpire||Q.renderOpts.collectedExpire>=s.INFINITE_CACHE?void 0:Q.renderOpts.collectedExpire;return{value:{kind:u.CachedRouteKind.APP_ROUTE,status:d.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:e}}}}catch(b){throw(null==f?void 0:f.isStale)&&await B.onRequestError(a,b,{routerKind:"App Router",routePath:d,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,A),b}},l=await B.handleResponse({req:a,nextConfig:w,cacheKey:K,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:z,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,responseGenerator:k,waitUntil:c.waitUntil,isMinimalMode:g});if(!I)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==u.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});g||b.setHeader("x-nextjs-cache",C?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,q.fromNodeOutgoingHttpHeaders)(l.value.headers);return g&&I||m.delete(s.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,r.getCacheControlHeader)(l.cacheControl)),await (0,p.I)(R,S,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};P?await j(P):await O.withPropagatedContext(a.headers,()=>O.trace(n.BaseServerSpan.handleRequest,{spanName:`${N} ${d}`,kind:i.SpanKind.SERVER,attributes:{"http.method":N,"http.target":a.url}},j))}catch(b){if(b instanceof t.NoFallbackError||await B.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,A),I)throw b;return await (0,p.I)(R,S,new Response(null,{status:500})),null}}},27910:a=>{"use strict";a.exports=require("stream")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:a=>{"use strict";a.exports=require("path")},41204:a=>{"use strict";a.exports=require("string_decoder")},44023:(a,b,c)=>{"use strict";function d(a){return`<!DOCTYPE html>
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
      <a href="https://trustlayer.app/dashboard"
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
      <a href="https://trustlayer.app/dashboard/formation"
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
      <a href="https://trustlayer.app/dashboard"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        View Dashboard
      </a>
    </div>
  `)}c.d(b,{Ly:()=>h,go:()=>g,pg:()=>e,yK:()=>f})},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55511:a=>{"use strict";a.exports=require("crypto")},55591:a=>{"use strict";a.exports=require("https")},57075:a=>{"use strict";a.exports=require("node:stream")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},68681:(a,b,c)=>{"use strict";c.d(b,{Z:()=>e});var d=c(59307);async function e(a,b,c){let e=new d.u(process.env.RESEND_API_KEY),{data:f,error:g}=await e.emails.send({from:"BedRock <noreply@bedrockhq.co>",to:a,subject:b,html:c});if(g)throw console.error("Failed to send email:",g),g;return f}},77598:a=>{"use strict";a.exports=require("node:crypto")},78335:()=>{},79428:a=>{"use strict";a.exports=require("buffer")},79646:a=>{"use strict";a.exports=require("child_process")},79933:(a,b,c)=>{"use strict";c.d(b,{U:()=>f,r:()=>g});var d=c(49980),e=c(65573);async function f(){let a=await (0,e.UL)();return(0,d.createServerClient)("https://your-prod-project.supabase.co","your_prod_supabase_anon_key",{cookies:{getAll:()=>a.getAll(),setAll(b){try{b.forEach(({name:b,value:c,options:d})=>a.set(b,c,d))}catch{}}}})}async function g(){let a=await (0,e.UL)();return(0,d.createServerClient)("https://your-prod-project.supabase.co",process.env.SUPABASE_SERVICE_ROLE_KEY,{cookies:{getAll:()=>a.getAll(),setAll(b){try{b.forEach(({name:b,value:c,options:d})=>a.set(b,c,d))}catch{}}}})}},81630:a=>{"use strict";a.exports=require("http")},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},94735:a=>{"use strict";a.exports=require("events")},96487:()=>{}};var b=require("../../../../webpack-runtime.js");b.C(a);var c=b.X(0,[3445,1813,5573,9980,9307,97],()=>b(b.s=13380));module.exports=c})();