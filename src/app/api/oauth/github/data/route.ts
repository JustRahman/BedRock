import { NextRequest, NextResponse } from 'next/server'
import { cacheGet, cacheDelete } from '@/lib/oauth/utils'

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session parameter' }, { status: 400 })
  }

  const data = cacheGet(sessionId)
  if (!data) {
    return NextResponse.json({ error: 'Session not found or expired' }, { status: 404 })
  }

  // One-time use: delete after retrieval
  cacheDelete(sessionId)

  return NextResponse.json(data)
}
