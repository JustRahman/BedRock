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
const digitalPresenceSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().url('Please enter a valid URL').or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().length(0)).optional(),
    appStoreUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().url('Please enter a valid URL').or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().length(0)).optional(),
    websiteVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
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
"[project]/src/lib/trust-score-v2.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateTrustScoreV2",
    ()=>calculateTrustScoreV2,
    "getStatusFromScore",
    ()=>getStatusFromScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$onboarding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations/onboarding.ts [app-route] (ecmascript)");
;
function getStatusFromScore(score) {
    if (score >= 85) {
        return {
            status: 'elite',
            risk_level: 'low',
            recommendation: 'approve'
        };
    } else if (score >= 65) {
        return {
            status: 'approved',
            risk_level: 'low',
            recommendation: 'approve'
        };
    } else if (score >= 45) {
        return {
            status: 'review_needed',
            risk_level: 'medium',
            recommendation: 'review'
        };
    } else if (score >= 25) {
        return {
            status: 'conditional',
            risk_level: 'high',
            recommendation: 'enhanced_review'
        };
    } else {
        return {
            status: 'not_eligible',
            risk_level: 'critical',
            recommendation: 'deny'
        };
    }
}
// === Scoring functions ===
// Weights: GitHub 25, Economic Activity 25, LinkedIn 10, Identity 20, Digital Presence 10, Network 10 = 100
function scoreGitHub(data, usernameOnly) {
    if (!data) {
        return {
            score: 0,
            max: 25,
            details: {
                connected: false
            }
        };
    }
    // Account age: 0-5 pts (1pt/year, cap 5)
    const accountAge = Math.min(5, Math.floor(data.accountAgeYears));
    // Commit activity (last 12 months): 0-8 pts (1pt per 50 commits)
    const commits = Math.min(8, Math.floor((data.commitsLastYear ?? 0) / 50));
    // Public repos: 0-4 pts (1pt per 5 repos)
    const repos = Math.min(4, Math.floor(data.publicRepos / 5));
    // Language diversity: 0-3 pts (1pt per language)
    const languages = Math.min(3, data.topLanguages.length);
    // Stars + Followers combined social proof: 0-3 pts (1pt per 10 combined)
    const socialProof = Math.min(3, Math.floor((data.totalStars + data.followers) / 10));
    // Recent activity: 2 pts if any commits in last 30 days
    const recentActivity = (data.commitsLast30Days ?? 0) > 0 ? 2 : 0;
    let total = accountAge + commits + repos + languages + socialProof + recentActivity;
    // Username-only cap at 15
    if (usernameOnly) {
        total = Math.min(15, total);
    }
    return {
        score: Math.min(25, total),
        max: 25,
        details: {
            connected: !usernameOnly,
            username: data.login,
            account_age_years: data.accountAgeYears,
            commits_last_year: data.commitsLastYear ?? 0,
            commits_last_30_days: data.commitsLast30Days ?? 0,
            repos: data.publicRepos,
            languages: data.topLanguages.length,
            stars_and_followers: data.totalStars + data.followers,
            username_only: usernameOnly
        }
    };
}
function scoreStripeReweighted(data) {
    if (!data) {
        return {
            score: 0,
            details: {
                stripe_connected: false
            }
        };
    }
    // Account age: 0-4 pts (1pt per 3 months)
    const accountAge = Math.min(4, Math.floor(data.accountAgeMonths / 3));
    // Monthly revenue: 0-5 pts (tiered)
    let revenue = 0;
    if (data.monthlyRevenue >= 50000) revenue = 5;
    else if (data.monthlyRevenue >= 10000) revenue = 4;
    else if (data.monthlyRevenue >= 5000) revenue = 3;
    else if (data.monthlyRevenue >= 1000) revenue = 2;
    else if (data.monthlyRevenue > 0) revenue = 1;
    // Low chargebacks: 0-3 pts
    let chargebacks = 0;
    if (data.chargebackRateCategory === 'none') chargebacks = 3;
    else if (data.chargebackRateCategory === 'low') chargebacks = 2;
    else if (data.chargebackRateCategory === 'medium') chargebacks = 1;
    // Transaction volume: 0-3 pts (1pt per 25 charges)
    const volume = Math.min(3, Math.floor(data.totalCharges / 25));
    const total = accountAge + revenue + chargebacks + volume;
    return {
        score: Math.min(15, total),
        details: {
            stripe_connected: true,
            monthly_revenue: data.monthlyRevenueFormatted,
            account_age_months: data.accountAgeMonths,
            chargeback_rate: `${data.chargebackRate}%`,
            total_charges: data.totalCharges
        }
    };
}
function scoreEconomicActivity(input, legacyStripe) {
    const details = {};
    // Signal 1: Crypto wallet (max 15)
    let cryptoScore = 0;
    if (input?.crypto) {
        cryptoScore = Math.min(15, input.crypto.total);
        details.crypto_verified = true;
        details.crypto_wallet_age = input.crypto.walletAge;
        details.crypto_tx_count = input.crypto.txCount;
        details.crypto_holdings = input.crypto.holdings;
        details.crypto_activity_spread = input.crypto.activitySpread;
        details.crypto_subtotal = cryptoScore;
    } else {
        details.crypto_verified = false;
    }
    // Signal 2: Payment verified by admin (5 or 0)
    const paymentScore = input?.paymentVerified ? 5 : 0;
    details.payment_verified = !!input?.paymentVerified;
    details.payment_subtotal = paymentScore;
    // Signal 3: Stripe connected (max 15, reweighted)
    const stripeData = input?.stripe ?? legacyStripe;
    const stripeResult = scoreStripeReweighted(stripeData);
    const stripeScore = stripeResult.score;
    Object.assign(details, stripeResult.details);
    details.stripe_subtotal = stripeScore;
    // Cap at 25
    const total = Math.min(25, cryptoScore + paymentScore + stripeScore);
    return {
        score: total,
        max: 25,
        details
    };
}
function scoreLinkedIn(data, urlOnly) {
    if (!data && !urlOnly) {
        return {
            score: 0,
            max: 10,
            details: {
                connected: false
            }
        };
    }
    // URL-only fallback = flat 3 pts
    if (!data && urlOnly) {
        return {
            score: 3,
            max: 10,
            details: {
                connected: false,
                url_only: true
            }
        };
    }
    // OAuth connected: 7 pts
    let total = 7;
    // Profile has picture: 2 pts
    if (data.picture) total += 2;
    // Email verified via LinkedIn: 1 pt
    if (data.verified && data.email) total += 1;
    return {
        score: Math.min(10, total),
        max: 10,
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
    // Website verified (DNS/content check): 6 pts
    if (input.websiteVerified) {
        total += 6;
        details.website = true;
    }
    // App Store listing (public listing, name match): 4 pts
    if (input.appStoreVerified) {
        total += 4;
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
function scoreIdentity(input) {
    if (!input) {
        return {
            score: 0,
            max: 20,
            details: {}
        };
    }
    let total = 0;
    const details = {};
    // Passport: +2 base + up to +6 for matching fields (total 8)
    if (input.hasPassport) {
        total += 2;
        details.passport = true;
        const nameMatch = input.passportNameMatch ?? false;
        const dobMatch = input.passportDobMatch ?? false;
        const genderMatch = input.passportGenderMatch ?? false;
        const nationalityMatch = input.passportNationalityMatch ?? false;
        if (nameMatch) {
            total += 2;
            details.name_match = true;
        } else {
            details.name_match = false;
        }
        if (dobMatch) {
            total += 2;
            details.dob_match = true;
        } else {
            details.dob_match = false;
        }
        if (genderMatch) {
            total += 1;
            details.gender_match = true;
        } else {
            details.gender_match = false;
        }
        if (nationalityMatch) {
            total += 1;
            details.nationality_match = true;
        } else {
            details.nationality_match = false;
        }
    } else {
        details.passport = false;
    }
    // Local government ID: +5
    if (input.hasLocalId) {
        total += 5;
        details.local_id = true;
    } else {
        details.local_id = false;
    }
    // Face verification: +4 matched, -2 if skipped
    if (input.hasLivenessCheck) {
        total += 4;
        details.face_verified = true;
    } else if (input.faceSkipped) {
        total -= 2;
        details.face_skipped = true;
    } else {
        details.face_verified = false;
    }
    // Address proof: +3
    if (input.hasAddressProof) {
        total += 3;
        details.address_verified = true;
    } else {
        details.address_verified = false;
    }
    return {
        score: Math.max(0, Math.min(20, total)),
        max: 20,
        details
    };
}
function calculateTrustScoreV2(input) {
    const github = scoreGitHub(input.github, !!input.githubUsernameOnly);
    // Backward compat: if old `stripe` field is set but no economicActivity, map it
    const eaInput = input.economicActivity ?? (input.stripe ? {
        stripe: input.stripe
    } : undefined);
    const economic_activity = scoreEconomicActivity(eaInput, input.stripe);
    const linkedin = scoreLinkedIn(input.linkedin, !!input.linkedinUrlOnly);
    const identity = scoreIdentity(input.identity);
    const digital_presence = scoreDigitalPresence(input.digitalPresence);
    const network = scoreNetwork(input.network);
    const signals_connected = [];
    if (github.score > 0) signals_connected.push('github');
    if (economic_activity.score > 0) signals_connected.push('economic_activity');
    if (linkedin.score > 0) signals_connected.push('linkedin');
    if (identity.score > 0) signals_connected.push('identity');
    if (digital_presence.score > 0) signals_connected.push('digital_presence');
    if (network.score > 0) signals_connected.push('network');
    // Max possible: 25+25+10+20+10+10 = 100
    const rawScore = github.score + economic_activity.score + linkedin.score + identity.score + digital_presence.score + network.score;
    // Country adjustment — use rawScore to determine penalty reduction
    const country = input.countryOfOrigin || input.countryOfResidence || '';
    let country_adjustment = 0;
    if (country) {
        country_adjustment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$onboarding$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCountryPenalty"])(country);
        if (country_adjustment < 0) {
            if (rawScore >= 75) {
                country_adjustment = 0;
            } else if (rawScore >= 55) {
                country_adjustment = Math.round(country_adjustment / 2);
            }
        }
    }
    const score = Math.max(0, Math.min(100, rawScore + country_adjustment));
    // Status, risk level, and recommendation from single source of truth
    const { status, risk_level, recommendation } = getStatusFromScore(score);
    // Improvement suggestions
    const improvements = [];
    if (github.score === 0) {
        improvements.push('Connect GitHub for up to +25 points');
    } else if (input.githubUsernameOnly) {
        improvements.push('Connect GitHub via OAuth for full score (currently capped at 15)');
    }
    if (economic_activity.score < 25) {
        const remaining = 25 - economic_activity.score;
        if (economic_activity.score === 0) {
            improvements.push('Verify a crypto wallet or connect Stripe for up to +25 points');
        } else {
            improvements.push(`Add more economic signals for up to +${remaining} more points`);
        }
    }
    if (linkedin.score === 0) {
        improvements.push('Connect LinkedIn for up to +10 points');
    } else if (input.linkedinUrlOnly) {
        improvements.push('Connect LinkedIn via OAuth for +7 more points');
    }
    if (identity.score === 0) {
        improvements.push('Upload your passport to earn up to +20 points');
    } else if (identity.score < 20) {
        const remaining = 20 - identity.score;
        improvements.push(`Complete identity verification for up to +${remaining} more points`);
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
            economic_activity,
            linkedin,
            identity,
            digital_presence,
            network
        },
        country_adjustment,
        status,
        risk_level,
        recommendation,
        signals_connected,
        improvements: improvements.slice(0, 5)
    };
}
}),
"[project]/src/lib/recalculate-trust-score.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recalculateTrustScore",
    ()=>recalculateTrustScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2d$v2$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trust-score-v2.ts [app-route] (ecmascript)");
;
;
async function recalculateTrustScore(founder) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const { data: verifications } = await supabase.from('founder_verifications').select('verification_type, status, metadata').eq('founder_id', founder.id);
    const verifs = verifications || [];
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
            if (!v2Input.economicActivity) v2Input.economicActivity = {};
            v2Input.economicActivity.stripe = meta;
        } else if (v.verification_type === 'crypto_wallet' && meta) {
            if (!v2Input.economicActivity) v2Input.economicActivity = {};
            const profileData = meta;
            v2Input.economicActivity.crypto = profileData.score;
        } else if (v.verification_type === 'payment_verified') {
            if (!v2Input.economicActivity) v2Input.economicActivity = {};
            v2Input.economicActivity.paymentVerified = true;
        } else if (v.verification_type === 'linkedin' && meta) {
            v2Input.linkedin = meta;
            v2Input.linkedinUrlOnly = false;
        } else if (v.verification_type === 'linkedin_url') {
            v2Input.linkedinUrlOnly = true;
        } else if (v.verification_type === 'passport' && meta) {
            if (!v2Input.identity) v2Input.identity = {};
            v2Input.identity.hasPassport = true;
            v2Input.identity.passportNameMatch = meta.passportNameMatch;
            v2Input.identity.passportDobMatch = meta.passportDobMatch;
            v2Input.identity.passportGenderMatch = meta.passportGenderMatch;
            v2Input.identity.passportNationalityMatch = meta.passportNationalityMatch;
        } else if (v.verification_type === 'local_id') {
            if (!v2Input.identity) v2Input.identity = {};
            v2Input.identity.hasLocalId = true;
        } else if (v.verification_type === 'face_scan') {
            if (!v2Input.identity) v2Input.identity = {};
            v2Input.identity.hasLivenessCheck = true;
        } else if (v.verification_type === 'address_proof') {
            if (!v2Input.identity) v2Input.identity = {};
            v2Input.identity.hasAddressProof = true;
        } else if (v.verification_type === 'digital_presence' && meta) {
            const dp = meta;
            v2Input.digitalPresence = {
                websiteVerified: !!dp.websiteVerified,
                appStoreVerified: !!dp.appStoreVerified
            };
        } else if (v.verification_type === 'referral' && meta) {
            if (!v2Input.network) v2Input.network = {
                referralVerified: false,
                universityEmailVerified: false,
                acceleratorVerified: false,
                hasEmployer: false
            };
            v2Input.network.referralVerified = !!meta.referralVerified;
        } else if (v.verification_type === 'university_email' && meta) {
            if (!v2Input.network) v2Input.network = {
                referralVerified: false,
                universityEmailVerified: false,
                acceleratorVerified: false,
                hasEmployer: false
            };
            v2Input.network.universityEmailVerified = !!meta.verified;
        } else if (v.verification_type === 'accelerator' && meta) {
            if (!v2Input.network) v2Input.network = {
                referralVerified: false,
                universityEmailVerified: false,
                acceleratorVerified: false,
                hasEmployer: false
            };
            v2Input.network.acceleratorVerified = !!meta.verified;
        } else if (v.verification_type === 'employer_verification') {
            if (!v2Input.network) v2Input.network = {
                referralVerified: false,
                universityEmailVerified: false,
                acceleratorVerified: false,
                hasEmployer: false
            };
            v2Input.network.hasEmployer = true;
        }
    }
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2d$v2$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateTrustScoreV2"])(v2Input);
    const { status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trust$2d$score$2d$v2$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getStatusFromScore"])(result.score);
    const { error } = await supabase.from('trust_scores').upsert({
        founder_id: founder.id,
        total_score: result.score,
        identity_score: result.breakdown.identity.score,
        business_score: result.breakdown.economic_activity.score,
        financial_score: result.breakdown.economic_activity.score,
        social_score: result.breakdown.linkedin.score,
        digital_lineage_score: result.breakdown.github.score + result.breakdown.digital_presence.score,
        network_score: result.breakdown.network.score,
        country_adjustment: result.country_adjustment,
        status,
        score_breakdown: result.breakdown,
        calculated_at: new Date().toISOString()
    }, {
        onConflict: 'founder_id'
    });
    if (error) {
        console.error('[recalculate] Trust score upsert failed:', error.message);
    }
    return {
        result,
        status,
        error
    };
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$recalculate$2d$trust$2d$score$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/recalculate-trust-score.ts [app-route] (ecmascript)");
;
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
        const { data: founderData } = await supabase.from('founders').select('id, country_of_origin, country_of_residence').eq('user_id', user.id).single();
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
        // Recalculate trust score directly (no HTTP self-fetch)
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$recalculate$2d$trust$2d$score$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recalculateTrustScore"])(founder);
        } catch (e) {
            console.error('[verify] Trust score recalculation failed:', e);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1c808cb5._.js.map