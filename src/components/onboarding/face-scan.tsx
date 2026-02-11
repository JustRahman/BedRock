'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Camera, CheckCircle, AlertTriangle, Loader2, RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { loadFaceModels, getFaceApi } from '@/lib/face-api-loader'
import { storePendingUpload } from '@/lib/pending-uploads'

type ScanState =
  | 'loading_models'
  | 'ready'
  | 'countdown'
  | 'comparing'
  | 'match'
  | 'no_match'
  | 'error'

export interface FaceMatchResult {
  matched: boolean
  distance?: number
}

interface FaceScanProps {
  passportFile: File
  onMatchResult: (result: FaceMatchResult) => void
}

const MATCH_THRESHOLD = 0.6

export function FaceScan({ passportFile, onMatchResult }: FaceScanProps) {
  const [state, setState] = useState<ScanState>('loading_models')
  const [errorMsg, setErrorMsg] = useState('')
  const [countdown, setCountdown] = useState(3)
  const [distance, setDistance] = useState<number | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const passportDescriptorRef = useRef<Float32Array | null>(null)
  const onMatchResultRef = useRef(onMatchResult)
  onMatchResultRef.current = onMatchResult

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  // Initialize: load models + extract passport face descriptor
  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        await loadFaceModels()
        if (cancelled) return

        // Extract face descriptor from passport image
        const img = await createImageBitmap(passportFile)
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)

        const fa = getFaceApi()
        const detection = await fa
          .detectSingleFace(canvas)
          .withFaceLandmarks()
          .withFaceDescriptor()

        if (cancelled) return

        if (!detection) {
          setState('error')
          setErrorMsg('No face detected in passport photo. Please upload a clearer image.')
          return
        }

        passportDescriptorRef.current = detection.descriptor
        setState('ready')
      } catch (err) {
        if (cancelled) return
        setState('error')
        setErrorMsg(err instanceof Error ? err.message : 'Failed to load face recognition models')
      }
    }

    init()
    return () => { cancelled = true }
  }, [passportFile])

  // Start webcam when ready
  useEffect(() => {
    if (state !== 'ready' && state !== 'countdown') return

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch {
        setState('error')
        setErrorMsg('Camera access denied. Please allow camera permissions or skip this step.')
      }
    }

    if (!streamRef.current) {
      startCamera()
    }
  }, [state])

  // Stop camera on unmount
  useEffect(() => {
    return () => { stopCamera() }
  }, [stopCamera])

  // Stop camera when reaching final states
  useEffect(() => {
    if (state === 'match' || state === 'error') {
      stopCamera()
    }
  }, [state, stopCamera])

  // Use ref for captureAndCompare to avoid stale closure in countdown interval
  const captureAndCompareRef = useRef<() => Promise<void>>(undefined)
  captureAndCompareRef.current = async () => {
    setState('comparing')

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (!video || !canvas) throw new Error('Camera not ready')

      // Wait for video to have valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        await new Promise<void>((resolve) => {
          const check = () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              resolve()
            } else {
              requestAnimationFrame(check)
            }
          }
          check()
        })
      }

      // Capture current frame
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(video, 0, 0)

      const fa = getFaceApi()
      const detection = await fa
        .detectSingleFace(canvas)
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (!detection) {
        setState('no_match')
        setErrorMsg('No face detected in selfie. Please try again with better lighting.')
        return
      }

      if (!passportDescriptorRef.current) {
        setState('error')
        setErrorMsg('Passport face data not available. Please re-upload your passport.')
        return
      }

      const dist = fa.euclideanDistance(
        passportDescriptorRef.current,
        detection.descriptor
      )

      setDistance(dist)

      if (dist < MATCH_THRESHOLD) {
        setState('match')
        // Save selfie image to pending uploads for later storage
        try {
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', 0.85)
          )
          if (blob) {
            const selfieFile = new File([blob], 'face-verification-selfie.jpg', { type: 'image/jpeg' })
            await storePendingUpload('selfie', selfieFile)
          }
        } catch {
          // Non-critical — selfie saving is optional
        }
        onMatchResultRef.current({ matched: true, distance: dist })
      } else {
        setState('no_match')
        setErrorMsg('Faces do not match. Please try again or skip this step.')
      }
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Face comparison failed')
    }
  }

  const startCountdown = useCallback(() => {
    setState('countdown')
    setCountdown(3)

    let count = 3
    const interval = setInterval(() => {
      count--
      setCountdown(count)
      if (count <= 0) {
        clearInterval(interval)
        captureAndCompareRef.current?.()
      }
    }, 1000)
  }, [])

  const retry = () => {
    stopCamera()
    setErrorMsg('')
    setDistance(null)
    setState('ready')
  }

  const skip = () => {
    stopCamera()
    onMatchResultRef.current({ matched: false })
  }

  return (
    <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-zinc-200">Face Verification</span>
        </div>
        {state !== 'match' && (
          <button
            type="button"
            onClick={skip}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
          >
            <X className="h-3 w-3" />
            Skip
          </button>
        )}
      </div>

      {state === 'loading_models' && (
        <div className="flex items-center gap-2 rounded-md border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-blue-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading face recognition models...
        </div>
      )}

      {(state === 'ready' || state === 'countdown' || state === 'comparing') && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-400">
            Position your face in the camera and take a selfie to verify it matches your passport photo.
          </p>
          <div className="relative overflow-hidden rounded-md bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full"
              style={{ transform: 'scaleX(-1)' }}
            />
            {state === 'countdown' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="text-6xl font-bold text-white">{countdown}</span>
              </div>
            )}
            {state === 'comparing' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-white" />
                  <p className="mt-2 text-sm text-white/70">Comparing faces...</p>
                </div>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          {state === 'ready' && (
            <Button
              type="button"
              onClick={startCountdown}
              variant="ghost"
              className="w-full gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200"
            >
              <Camera className="h-4 w-4" />
              Take Selfie
            </Button>
          )}
        </div>
      )}

      {state === 'match' && (
        <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            Face match confirmed
          </div>
          {distance !== null && (
            <p className="mt-1 text-xs text-zinc-500">
              Similarity: {Math.round((1 - distance) * 100)}% (distance: {distance.toFixed(3)})
            </p>
          )}
        </div>
      )}

      {state === 'no_match' && (
        <div className="space-y-3">
          <div className="rounded-md border border-orange-500/20 bg-orange-500/5 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-orange-300">
              <AlertTriangle className="h-4 w-4" />
              {errorMsg}
            </div>
            {distance !== null && (
              <p className="mt-1 text-xs text-zinc-500">
                Similarity: {Math.round((1 - distance) * 100)}% (distance: {distance.toFixed(3)}, threshold: {MATCH_THRESHOLD})
              </p>
            )}
          </div>
          <Button
            type="button"
            onClick={retry}
            variant="ghost"
            className="w-full gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      )}

      {state === 'error' && (
        <div className="rounded-md border border-orange-500/20 bg-orange-500/5 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-orange-300">
            <AlertTriangle className="h-4 w-4" />
            {errorMsg}
          </div>
          <button
            type="button"
            onClick={skip}
            className="mt-2 text-xs text-orange-400 underline hover:text-orange-300"
          >
            Skip face verification
          </button>
        </div>
      )}
    </div>
  )
}
