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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/src/lib/crypto/verify-signature.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateChallengeMessage",
    ()=>generateChallengeMessage,
    "isEvmChain",
    ()=>isEvmChain,
    "verifyWalletSignature",
    ()=>verifyWalletSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tweetnacl/nacl-fast.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
;
;
;
function generateChallengeMessage(address) {
    const nonce = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    return `BedRock Wallet Verification\n\nAddress: ${address}\nNonce: ${nonce}\nTimestamp: ${timestamp}\n\nSign this message to verify wallet ownership.`;
}
function verifyWalletSignature(req) {
    try {
        if (req.chain === 'solana') {
            return verifySolana(req);
        } else if (req.chain === 'tron') {
            return verifyTron(req);
        } else {
            return verifyEvm(req);
        }
    } catch  {
        return {
            valid: false
        };
    }
}
function verifyEvm(req) {
    const recovered = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].verifyMessage(req.message, req.signature);
    const valid = recovered.toLowerCase() === req.address.toLowerCase();
    return {
        valid,
        recoveredAddress: recovered
    };
}
function verifySolana(req) {
    const messageBytes = new TextEncoder().encode(req.message);
    const signatureBytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].decode(req.signature);
    const publicKeyBytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].decode(req.address);
    const valid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
    return {
        valid,
        recoveredAddress: req.address
    };
}
function verifyTron(req) {
    // Tron uses the same ECDSA as Ethereum, but with a different address format
    // TronLink signs with personal_sign compatible format
    const recovered = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].verifyMessage(req.message, req.signature);
    // Convert Ethereum address to Tron format for comparison
    // Tron addresses start with 'T' and use base58check with 0x41 prefix
    // For verification, we compare the hex portion
    const evmHex = recovered.toLowerCase().replace('0x', '');
    const tronHex = tronAddressToHex(req.address).toLowerCase();
    const valid = evmHex === tronHex;
    return {
        valid,
        recoveredAddress: req.address
    };
}
function tronAddressToHex(tronAddress) {
    if (tronAddress.startsWith('0x') || tronAddress.startsWith('0X')) {
        return tronAddress.replace('0x', '').replace('0X', '');
    }
    // Base58 decode Tron address -> strip 0x41 prefix and 4-byte checksum
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].decode(tronAddress);
        // Tron address: 1 byte prefix (0x41) + 20 bytes address + 4 bytes checksum
        const addressBytes = decoded.slice(1, 21);
        return Buffer.from(addressBytes).toString('hex');
    } catch  {
        return '';
    }
}
function isEvmChain(chain) {
    return chain === 'ethereum' || chain === 'base' || chain === 'polygon';
}
}),
"[project]/src/lib/crypto/on-chain-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchOnChainData",
    ()=>fetchOnChainData
]);
// Etherscan API V2 — single endpoint, chain ID differentiates networks
const ETHERSCAN_V2_URL = 'https://api.etherscan.io/v2/api';
const EVM_CHAIN_IDS = {
    ethereum: 1,
    base: 8453,
    polygon: 137
};
// Stablecoin contract addresses (USDT, USDC, DAI) per EVM chain
const STABLECOINS = {
    ethereum: [
        {
            address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            decimals: 6
        },
        {
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            decimals: 6
        },
        {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            decimals: 18
        }
    ],
    base: [
        {
            address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            decimals: 6
        }
    ],
    polygon: [
        {
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            decimals: 6
        },
        {
            address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
            decimals: 6
        },
        {
            address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            decimals: 18
        }
    ]
};
async function fetchOnChainData(chain, address) {
    if (chain === 'solana') {
        return fetchSolanaData(address);
    }
    if (chain === 'tron') {
        return fetchTronData(address);
    }
    return fetchEvmData(chain, address);
}
async function fetchEvmData(chain, address) {
    const chainId = EVM_CHAIN_IDS[chain];
    if (!chainId) {
        return emptyData(chain, address);
    }
    const apiKey = process.env.ETHERSCAN_API_KEY || '';
    try {
        // Etherscan V2: include chainid parameter
        const txUrl = `${ETHERSCAN_V2_URL}?chainid=${chainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${apiKey}`;
        const txRes = await fetch(txUrl, {
            next: {
                revalidate: 3600
            }
        });
        const txData = await txRes.json();
        let firstTxTimestamp = null;
        let lastTxTimestamp = null;
        let txCount = 0;
        if (txData.status === '1' && Array.isArray(txData.result)) {
            txCount = txData.result.length;
            if (txData.result.length > 0) {
                firstTxTimestamp = parseInt(txData.result[0].timeStamp) * 1000;
                lastTxTimestamp = parseInt(txData.result[txData.result.length - 1].timeStamp) * 1000;
            }
        }
        // Fetch stablecoin balances
        let stablecoinBalanceUsd = 0;
        const stablecoins = STABLECOINS[chain] || [];
        for (const coin of stablecoins){
            try {
                const balUrl = `${ETHERSCAN_V2_URL}?chainid=${chainId}&module=account&action=tokenbalance&contractaddress=${coin.address}&address=${address}&tag=latest&apikey=${apiKey}`;
                const balRes = await fetch(balUrl, {
                    next: {
                        revalidate: 3600
                    }
                });
                const balData = await balRes.json();
                if (balData.status === '1' && balData.result) {
                    const raw = BigInt(balData.result);
                    const divisor = BigInt(10 ** coin.decimals);
                    stablecoinBalanceUsd += Number(raw / divisor);
                }
            } catch  {
            // Skip individual token errors
            }
        }
        return {
            chain,
            address,
            firstTxTimestamp,
            lastTxTimestamp,
            txCount,
            stablecoinBalanceUsd
        };
    } catch  {
        return emptyData(chain, address);
    }
}
async function fetchSolanaData(address) {
    const RPC_URL = 'https://api.mainnet-beta.solana.com';
    try {
        // Fetch transaction signatures via native Solana RPC (free, no API key)
        const txRes = await fetch(RPC_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSignaturesForAddress',
                params: [
                    address,
                    {
                        limit: 100
                    }
                ]
            })
        });
        const txData = await txRes.json();
        let firstTxTimestamp = null;
        let lastTxTimestamp = null;
        let txCount = 0;
        if (Array.isArray(txData.result)) {
            txCount = txData.result.length;
            if (txData.result.length > 0) {
                // Sorted newest-first by default
                lastTxTimestamp = txData.result[0].blockTime * 1000;
                firstTxTimestamp = txData.result[txData.result.length - 1].blockTime * 1000;
            }
        }
        // Fetch token balances via native Solana RPC
        let stablecoinBalanceUsd = 0;
        try {
            const tokenRes = await fetch(RPC_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 2,
                    method: 'getTokenAccountsByOwner',
                    params: [
                        address,
                        {
                            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
                        },
                        {
                            encoding: 'jsonParsed'
                        }
                    ]
                })
            });
            const tokenData = await tokenRes.json();
            // Solana stablecoin mints
            const stableMints = new Set([
                'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
                'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
            ]);
            if (Array.isArray(tokenData.result?.value)) {
                for (const account of tokenData.result.value){
                    const info = account.account?.data?.parsed?.info;
                    if (info && stableMints.has(info.mint)) {
                        stablecoinBalanceUsd += info.tokenAmount?.uiAmount || 0;
                    }
                }
            }
        } catch  {
        // Skip token fetch errors
        }
        console.log(`[Solana] ${address}: ${txCount} txs, first=${firstTxTimestamp}, last=${lastTxTimestamp}, stables=$${stablecoinBalanceUsd}`);
        return {
            chain: 'solana',
            address,
            firstTxTimestamp,
            lastTxTimestamp,
            txCount,
            stablecoinBalanceUsd
        };
    } catch (err) {
        console.log(`[Solana] Error:`, err);
        return emptyData('solana', address);
    }
}
async function fetchTronData(address) {
    const apiKey = process.env.TRONSCAN_API_KEY || '';
    try {
        const headers = {
            accept: 'application/json'
        };
        if (apiKey) headers['TRON-PRO-API-KEY'] = apiKey;
        // Fetch account info
        const accountUrl = `https://apilist.tronscanapi.com/api/accountv2?address=${address}`;
        const accountRes = await fetch(accountUrl, {
            headers,
            next: {
                revalidate: 3600
            }
        });
        const accountData = await accountRes.json();
        const firstTxTimestamp = accountData.date_created ? accountData.date_created : null;
        const txCount = accountData.totalTransactionCount || 0;
        // Fetch recent transactions for last tx timestamp
        let lastTxTimestamp = null;
        try {
            const txUrl = `https://apilist.tronscanapi.com/api/transaction?sort=-timestamp&count=true&limit=1&address=${address}`;
            const txRes = await fetch(txUrl, {
                headers,
                next: {
                    revalidate: 3600
                }
            });
            const txData = await txRes.json();
            if (txData.data && txData.data.length > 0) {
                lastTxTimestamp = txData.data[0].timestamp;
            }
        } catch  {
        // Skip
        }
        // Check USDT balance on Tron (TRC-20)
        let stablecoinBalanceUsd = 0;
        try {
            const tokenUrl = `https://apilist.tronscanapi.com/api/account/tokens?address=${address}&token=trc20`;
            const tokenRes = await fetch(tokenUrl, {
                headers,
                next: {
                    revalidate: 3600
                }
            });
            const tokenData = await tokenRes.json();
            const stableIds = new Set([
                'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
                'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8'
            ]);
            if (Array.isArray(tokenData.data)) {
                for (const token of tokenData.data){
                    if (stableIds.has(token.tokenId)) {
                        const amount = Number(token.balance) / 10 ** (token.tokenDecimal || 6);
                        stablecoinBalanceUsd += amount;
                    }
                }
            }
        } catch  {
        // Skip
        }
        return {
            chain: 'tron',
            address,
            firstTxTimestamp,
            lastTxTimestamp,
            txCount,
            stablecoinBalanceUsd
        };
    } catch  {
        return emptyData('tron', address);
    }
}
function emptyData(chain, address) {
    return {
        chain,
        address,
        firstTxTimestamp: null,
        lastTxTimestamp: null,
        txCount: 0,
        stablecoinBalanceUsd: 0
    };
}
}),
"[project]/src/lib/crypto/score-wallet.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreWallet",
    ()=>scoreWallet
]);
const MAX_CRYPTO_SCORE = 15;
function scoreWallet(data) {
    const walletAge = scoreWalletAge(data.firstTxTimestamp);
    const txCount = scoreTxCount(data.txCount);
    const holdings = scoreHoldings(data.stablecoinBalanceUsd);
    const activitySpread = scoreActivitySpread(data.firstTxTimestamp, data.lastTxTimestamp);
    const total = Math.min(MAX_CRYPTO_SCORE, walletAge + txCount + holdings + activitySpread);
    return {
        walletAge,
        txCount,
        holdings,
        activitySpread,
        total
    };
}
function scoreWalletAge(firstTxTimestamp) {
    if (!firstTxTimestamp) return 0;
    const ageMs = Date.now() - firstTxTimestamp;
    const ageYears = ageMs / (365.25 * 24 * 60 * 60 * 1000);
    if (ageYears >= 2) return 4;
    if (ageYears >= 1) return 2;
    return 0;
}
function scoreTxCount(count) {
    if (count >= 50) return 4;
    if (count >= 10) return 2;
    return 0;
}
function scoreHoldings(usdBalance) {
    if (usdBalance >= 500) return 4;
    if (usdBalance >= 100) return 2;
    return 0;
}
function scoreActivitySpread(firstTxTimestamp, lastTxTimestamp) {
    if (!firstTxTimestamp || !lastTxTimestamp) return 0;
    const spreadMs = lastTxTimestamp - firstTxTimestamp;
    const spreadMonths = spreadMs / (30 * 24 * 60 * 60 * 1000);
    if (spreadMonths >= 6) return 3;
    if (spreadMonths >= 3) return 1;
    return 0;
}
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
"[project]/src/app/api/crypto/verify/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$verify$2d$signature$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crypto/verify-signature.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$on$2d$chain$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crypto/on-chain-data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$score$2d$wallet$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crypto/score-wallet.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$challenge$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crypto/challenge-cache.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function POST(request) {
    const ip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIp"])(request);
    const { allowed, resetIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(`crypto-verify:${ip}`, 5, 60_000);
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
        const { chain, address, signature, message } = body;
        if (!chain || !address || !signature || !message) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'chain, address, signature, and message are required'
            }, {
                status: 400
            });
        }
        // Validate the challenge message HMAC and expiry (stateless — no server lookup needed)
        const challengeCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$challenge$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateChallenge"])(message);
        if (!challengeCheck.valid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Challenge expired or invalid. Request a new one.'
            }, {
                status: 400
            });
        }
        // Verify wallet signature against the challenge message
        const verification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$verify$2d$signature$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyWalletSignature"])({
            chain,
            address,
            signature,
            message
        });
        if (!verification.valid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid signature'
            }, {
                status: 400
            });
        }
        // Fetch on-chain data
        const onChainData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$on$2d$chain$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchOnChainData"])(chain, address);
        console.log('\n=== WALLET VERIFICATION ===');
        console.log(`Chain: ${chain}`);
        console.log(`Address: ${address}`);
        console.log('--- On-Chain Data ---');
        console.log(`  First tx: ${onChainData.firstTxTimestamp ? new Date(onChainData.firstTxTimestamp).toISOString() : 'none'}`);
        console.log(`  Last tx:  ${onChainData.lastTxTimestamp ? new Date(onChainData.lastTxTimestamp).toISOString() : 'none'}`);
        console.log(`  Tx count: ${onChainData.txCount}`);
        console.log(`  Stablecoin balance: $${onChainData.stablecoinBalanceUsd}`);
        if (onChainData.firstTxTimestamp) {
            const ageYears = (Date.now() - onChainData.firstTxTimestamp) / (365.25 * 24 * 60 * 60 * 1000);
            console.log(`  Wallet age: ${ageYears.toFixed(2)} years`);
        }
        if (onChainData.firstTxTimestamp && onChainData.lastTxTimestamp) {
            const spreadMonths = (onChainData.lastTxTimestamp - onChainData.firstTxTimestamp) / (30 * 24 * 60 * 60 * 1000);
            console.log(`  Activity spread: ${spreadMonths.toFixed(1)} months`);
        }
        // Score the wallet
        const walletScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crypto$2f$score$2d$wallet$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scoreWallet"])(onChainData);
        console.log('--- Score Breakdown ---');
        console.log(`  Wallet age:       ${walletScore.walletAge}/4`);
        console.log(`  Tx count:         ${walletScore.txCount}/4`);
        console.log(`  Holdings:         ${walletScore.holdings}/4`);
        console.log(`  Activity spread:  ${walletScore.activitySpread}/3`);
        console.log(`  TOTAL:            ${walletScore.total}/15`);
        console.log('========================\n');
        const profileData = {
            chain,
            address,
            onChainData,
            score: walletScore,
            verifiedAt: new Date().toISOString()
        };
        // Save to founder_verifications
        await supabase.from('founder_verifications').upsert({
            founder_id: founder.id,
            verification_type: 'crypto_wallet',
            status: 'verified',
            verified_at: new Date().toISOString(),
            metadata: profileData
        }, {
            onConflict: 'founder_id,verification_type'
        });
        // Recalculate trust score
        try {
            await fetch(new URL('/api/trust-score/calculate', request.url).toString(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    cookie: request.headers.get('cookie') || ''
                },
                body: JSON.stringify({})
            });
        } catch  {
        // Non-critical — score will be recalculated on next page load
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            verified: true,
            chain,
            address,
            score: walletScore,
            onChainData
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Verification failed'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__07288306._.js.map