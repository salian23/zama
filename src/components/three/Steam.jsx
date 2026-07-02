import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSmokeTexture } from './leafTexture'

const COUNT = 18

export default function Steam({ position = [0, 0, 0], height = 2.6 }) {
  const meshRef = useRef()
  const texture = useMemo(() => createSmokeTexture(), [])

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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!meshRef.current) return
    data.forEach((p, i) => {
      const life = ((t * p.speed + p.offset) % 1)
      const y = life * height
      const fade = Math.sin(life * Math.PI)
      const x = Math.sin(t * 0.6 + p.seed) * p.sway * (0.4 + life)
      const z = Math.cos(t * 0.5 + p.seed) * p.sway * (0.4 + life)
      dummy.position.set(x, y, z)
      const s = p.scale * (0.6 + life * 0.9) * fade
      dummy.scale.set(s, s, s)
      dummy.rotation.z = t * 0.2 + p.seed
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt?.(i, new THREE.Color(1, 1, 1))
    })
    meshRef.current.instanceMatrix.needsUpdate = true
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
