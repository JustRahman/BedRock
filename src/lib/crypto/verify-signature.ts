import { ethers } from 'ethers'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import type { ChainId, WalletVerificationRequest } from './types'

export function generateChallengeMessage(address: string): string {
  const nonce = Math.random().toString(36).substring(2, 15)
  const timestamp = Date.now()
  return `BedRock Wallet Verification\n\nAddress: ${address}\nNonce: ${nonce}\nTimestamp: ${timestamp}\n\nSign this message to verify wallet ownership.`
}

export function verifyWalletSignature(req: WalletVerificationRequest): { valid: boolean; recoveredAddress?: string } {
  try {
    if (req.chain === 'solana') {
      return verifySolana(req)
    } else if (req.chain === 'tron') {
      return verifyTron(req)
    } else {
      return verifyEvm(req)
    }
  } catch {
    return { valid: false }
  }
}

function verifyEvm(req: WalletVerificationRequest): { valid: boolean; recoveredAddress?: string } {
  const recovered = ethers.verifyMessage(req.message, req.signature)
  const valid = recovered.toLowerCase() === req.address.toLowerCase()
  return { valid, recoveredAddress: recovered }
}

function verifySolana(req: WalletVerificationRequest): { valid: boolean; recoveredAddress?: string } {
  const messageBytes = new TextEncoder().encode(req.message)
  const signatureBytes = bs58.decode(req.signature)
  const publicKeyBytes = bs58.decode(req.address)

  const valid = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes)
  return { valid, recoveredAddress: req.address }
}

function verifyTron(req: WalletVerificationRequest): { valid: boolean; recoveredAddress?: string } {
  // Tron uses the same ECDSA as Ethereum, but with a different address format
  // TronLink signs with personal_sign compatible format
  const recovered = ethers.verifyMessage(req.message, req.signature)

  // Convert Ethereum address to Tron format for comparison
  // Tron addresses start with 'T' and use base58check with 0x41 prefix
  // For verification, we compare the hex portion
  const evmHex = recovered.toLowerCase().replace('0x', '')
  const tronHex = tronAddressToHex(req.address).toLowerCase()

  const valid = evmHex === tronHex
  return { valid, recoveredAddress: req.address }
}

function tronAddressToHex(tronAddress: string): string {
  if (tronAddress.startsWith('0x') || tronAddress.startsWith('0X')) {
    return tronAddress.replace('0x', '').replace('0X', '')
  }
  // Base58 decode Tron address -> strip 0x41 prefix and 4-byte checksum
  try {
    const decoded = bs58.decode(tronAddress)
    // Tron address: 1 byte prefix (0x41) + 20 bytes address + 4 bytes checksum
    const addressBytes = decoded.slice(1, 21)
    return Buffer.from(addressBytes).toString('hex')
  } catch {
    return ''
  }
}

export function isEvmChain(chain: ChainId): boolean {
  return chain === 'ethereum' || chain === 'base' || chain === 'polygon'
}
