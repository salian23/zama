import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSmokeTexture } from './leafTexture'

const COUNT = 18

export default function Steam({ position = [0, 0, 0], height = 2.6, progressRef }) {
  const meshRef = useRef()
  const texture = useMemo(() => createSmokeTexture(), [])
  const sway = useRef(0)

  const data = useMemo(() => {
    return new Array(COUNT).fill(0).map(() => ({
      seed: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.25,
      offset: Math.random(),
      sway: 0.1 + Math.random() * 0.14,
      scale: 0.16 + Math.random() * 0.18,
    }))
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    if (!meshRef.current) return

    // Scroll-to-brew: steam thickens, rises higher and grows more opaque as
    // the hero is scrolled. Cursor gently bends the rising column sideways.
    const brew = Math.max(0, Math.min(1, progressRef?.current ?? 0))
    const rise = 0.85 + brew * 0.5
    const grow = 0.7 + brew * 0.9
    sway.current += (pointer.x - sway.current) * 0.05

    data.forEach((p, i) => {
      const life = (t * p.speed + p.offset) % 1
      const y = life * height * rise
      const fade = Math.sin(life * Math.PI)
      const bend = sway.current * life * 0.9
      const x = Math.sin(t * 0.6 + p.seed) * p.sway * (0.4 + life) + bend
      const z = Math.cos(t * 0.5 + p.seed) * p.sway * (0.4 + life)
      dummy.position.set(x, y, z)
      const s = p.scale * (0.6 + life * 0.9) * fade * grow
      dummy.scale.set(s, s, s)
      dummy.rotation.z = t * 0.2 + p.seed
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.material) {
      meshRef.current.material.opacity = 0.26 + brew * 0.4
    }
  })

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          opacity={0.32}
          blending={THREE.NormalBlending}
        />
      </instancedMesh>
    </group>
  )
}
