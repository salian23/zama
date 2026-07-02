import * as THREE from 'three'

// Procedurally draws a stylised tea-leaf silhouette onto a canvas and
// returns it as a transparent THREE.CanvasTexture (no external art assets).
export function createLeafTexture(color = '#7fa060', veinColor = '#243420') {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, size, size)
  ctx.translate(size / 2, size / 2)

  ctx.beginPath()
  ctx.moveTo(0, -size * 0.42)
  ctx.bezierCurveTo(size * 0.38, -size * 0.28, size * 0.34, size * 0.22, 0, size * 0.42)
  ctx.bezierCurveTo(-size * 0.34, size * 0.22, -size * 0.38, -size * 0.28, 0, -size * 0.42)
  ctx.closePath()

  const grad = ctx.createLinearGradient(0, -size * 0.42, 0, size * 0.42)
  grad.addColorStop(0, color)
  grad.addColorStop(1, veinColor)
  ctx.fillStyle = grad
  ctx.fill()

  ctx.strokeStyle = 'rgba(244, 236, 218, 0.35)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, -size * 0.38)
  ctx.lineTo(0, size * 0.38)
  ctx.stroke()

  for (let i = 1; i <= 4; i++) {
    const y = -size * 0.3 + i * size * 0.15
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size * 0.18, y - size * 0.08)
    ctx.moveTo(0, y)
    ctx.lineTo(-size * 0.18, y - size * 0.08)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Soft radial-gradient sprite used for steam / smoke puffs.
export function createSmokeTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )
  grad.addColorStop(0, 'rgba(244, 236, 218, 0.55)')
  grad.addColorStop(0.4, 'rgba(244, 236, 218, 0.25)')
  grad.addColorStop(1, 'rgba(244, 236, 218, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
