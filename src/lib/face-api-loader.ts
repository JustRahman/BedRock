const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let faceapiModule: any = null
let loadPromise: Promise<void> | null = null

export async function loadFaceModels(): Promise<void> {
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    const mod = await import('@vladmandic/face-api')
    faceapiModule = mod
    await mod.nets.ssdMobilenetv1.loadFromUri(CDN_BASE)
    await mod.nets.faceLandmark68Net.loadFromUri(CDN_BASE)
    await mod.nets.faceRecognitionNet.loadFromUri(CDN_BASE)
  })()

  return loadPromise
}

export function getFaceApi() {
  if (!faceapiModule) throw new Error('Face API not loaded. Call loadFaceModels() first.')
  return faceapiModule
}
