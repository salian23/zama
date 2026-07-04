import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Fine golden particles drifting slowly through the scene — like dust caught
// in a shaft of warm light. Cheap (a single Points object) and additive so
// they glow softly against the dark background.
export default function DustMotes({ count = 140, radius = 6 }) {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * radius * 2
      positions[i * 3 + 1] = Math.random() * radius
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 2
      speeds[i] = 0.05 + Math.random() * 0.12
    }
    return { positions, speeds }
  }, [count, radius])

  const sprite = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(244, 216, 150, 0.9)')
    g.addColorStop(0.4, 'rgba(212, 162, 74, 0.35)')
    g.addColorStop(1, 'rgba(212, 162, 74, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      // slow upward drift with a gentle horizontal sway
      arr[i * 3 + 1] += speeds[i] * 0.016
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.0016
      if (arr[i * 3 + 1] > radius) arr[i * 3 + 1] = -radius * 0.2
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = t * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.09}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.7}
      />
    </points>
  )
}
