'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Shield, Loader2 } from 'lucide-react'

function OAuthSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const provider = searchParams.get('provider')
  const sessionId = searchParams.get('session')
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      setStatus('error')
      setErrorMessage(decodeURIComponent(error))
      // Still redirect back after showing error briefly
      setTimeout(() => router.replace('/onboarding'), 2000)
      return
    }

    if (!provider || !sessionId) {
      setStatus('error')
      setErrorMessage('Missing provider or session information')
      setTimeout(() => router.replace('/onboarding'), 2000)
      return
    }

    async function fetchData() {
      try {
        const response = await fetch(`/api/oauth/${provider}/data?session=${sessionId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch OAuth data')
        }
        const data = await response.json()
        sessionStorage.setItem(`oauth_${provider}_data`, JSON.stringify(data))
        setStatus('success')
        router.replace('/onboarding')
      } catch (err) {
        setStatus('error')
        setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
        setTimeout(() => router.replace('/onboarding'), 2000)
      }
    }

    fetchData()
  }, [provider, sessionId, error, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>

        {status === 'loading' && (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">
              Connecting your {provider} account...
            </p>
          </>
        )}

        {status === 'success' && (
          <p className="text-green-600 font-medium">
            Connected! Redirecting back...
          </p>
        )}

        {status === 'error' && (
          <>
            <p className="text-red-600 font-medium">Connection failed</p>
            <p className="text-sm text-gray-500 mt-1">{errorMessage}</p>
            <p className="text-sm text-gray-400 mt-2">Redirecting back...</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function OAuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <OAuthSuccessContent />
    </Suspense>
  )
}
