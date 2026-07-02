import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Subtle parallax: camera drifts toward the pointer, and the whole scene
// group can be rotated externally (scrollProgress ref, 0..1) for a
// cinematic scroll-driven reveal.
export default function CameraRig({ children, scrollProgress, lookAt = [0, 1.1, 0] }) {
  const groupRef = useRef()
  const { camera, pointer } = useThree()
  const target = new THREE.Vector3()
  const baseY = useRef(camera.position.y)

  useFrame((state, delta) => {
    const px = pointer.x * 0.6
    const py = pointer.y * 0.3
    camera.position.x += (px - camera.position.x) * Math.min(delta * 2, 1)
    camera.position.y += (baseY.current - py - camera.position.y) * Math.min(delta * 2, 1)
    camera.lookAt(target.set(...lookAt))

    if (groupRef.current) {
      const progress = scrollProgress?.current ?? 0
      groupRef.current.rotation.y = progress * Math.PI * 0.9
      groupRef.current.position.y = -progress * 0.6
      groupRef.current.scale.setScalar(1 - progress * 0.12)
    }
  })

  return <group ref={groupRef}>{children}</group>
}
