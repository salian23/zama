import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { createLeafTexture } from './leafTexture'

const LEAF_COUNT = 9

export default function Leaves({ radius = 2.6, center = [0, 1, 0] }) {
  const groupRef = useRef()
  const texture = useMemo(() => createLeafTexture('#a2bf85', '#243420'), [])
  const texture2 = useMemo(() => createLeafTexture('#d4a24a', '#5c7d43'), [])

  const leaves = useMemo(() => {
    return new Array(LEAF_COUNT).fill(0).map((_, i) => ({
      angle: (i / LEAF_COUNT) * Math.PI * 2,
      radiusOffset: 0.85 + Math.random() * 0.5,
      heightOffset: (Math.random() - 0.5) * 2.2,
      speed: 0.05 + Math.random() * 0.06,
      scale: 0.22 + Math.random() * 0.16,
      gold: i % 3 === 0,
      tiltSpeed: 0.5 + Math.random(),
    }))
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const l = leaves[i]
      const angle = l.angle + t * l.speed
      const r = radius * l.radiusOffset
      child.position.set(
        center[0] + Math.cos(angle) * r,
        center[1] + l.heightOffset + Math.sin(t * l.tiltSpeed + i) * 0.15,
        center[2] + Math.sin(angle) * r
      )
      child.rotation.z = t * l.tiltSpeed * 0.3 + i
      child.rotation.y = angle
    })
  })

  return (
    <group ref={groupRef}>
      {leaves.map((l, i) => (
        <Float key={i} speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh scale={l.scale}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={l.gold ? texture2 : texture}
              transparent
              alphaTest={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
