import { createHmac } from 'crypto'

// Stateless challenge verification using HMAC.
// No in-memory state needed — the challenge message itself contains
// the timestamp and HMAC so the verify endpoint can validate it.

const CHALLENGE_TTL_MS = 5 * 60 * 1000 // 5 minutes

function getSecret(): string {
  return process.env.OAUTH_STATE_SECRET || 'dev-fallback-secret'
}

function hmac(data: string): string {
  return createHmac('sha256', getSecret()).update(data).digest('hex')
}

/**
 * Create a signed challenge message. The message includes:
 * - The wallet address
 * - A timestamp
 * - A nonce
 * - An HMAC signature
 * The client signs this message, and the verify endpoint can validate
 * the HMAC without needing to look anything up.
 */
export function createSignedChallenge(address: string): string {
  const timestamp = Date.now()
  const nonce = Math.random().toString(36).substring(2, 10)
  const payload = `${address.toLowerCase()}:${timestamp}:${nonce}`
  const sig = hmac(payload)

  // Human-readable message that the wallet will display
  return `BedRock Wallet Verification\n\nAddress: ${address}\nTimestamp: ${timestamp}\nNonce: ${nonce}\nSignature: ${sig}`
}

/**
 * Parse and validate a signed challenge message.
 * Returns the original message if valid and not expired, null otherwise.
 */
export function validateChallenge(message: string): { valid: boolean; address?: string } {
  try {
    const addressMatch = message.match(/Address: (.+)/)
    const timestampMatch = message.match(/Timestamp: (\d+)/)
    const nonceMatch = message.match(/Nonce: (.+)/)
    const sigMatch = message.match(/Signature: (.+)/)

    if (!addressMatch || !timestampMatch || !nonceMatch || !sigMatch) {
      return { valid: false }
    }

    const address = addressMatch[1].trim()
    const timestamp = parseInt(timestampMatch[1].trim())
    const nonce = nonceMatch[1].trim()
    const sig = sigMatch[1].trim()

    // Check expiry
    if (Date.now() - timestamp > CHALLENGE_TTL_MS) {
      return { valid: false }
    }

    // Verify HMAC
    const payload = `${address.toLowerCase()}:${timestamp}:${nonce}`
    const expectedSig = hmac(payload)

    if (sig !== expectedSig) {
      return { valid: false }
    }

    return { valid: true, address }
  } catch {
    return { valid: false }
  }
}
