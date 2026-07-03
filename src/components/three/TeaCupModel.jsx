import { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Loads the Higgsfield-generated teacup GLB and normalizes it so the scene
// doesn't have to care about the raw export's arbitrary scale/orientation:
// the mesh is recentered on its base, uniformly scaled to a target height,
// and stood upright (the export is Z-up; the scene is Y-up).
export default function TeaCupModel({
  targetSize = 2.6,
  position = [0, 0, 0],
  rotationY = 0,
  uprightRotX = 0,
}) {
  const { scene } = useGLTF('/models/teacup.glb')
  const ref = useRef()

  // Clone so hot-reloads / multiple mounts don't mutate the cached original.
  const model = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 1.2
          child.material.needsUpdate = true
        }
      }
    })

    // Stand upright: Higgsfield image_to_3d exports with the vertical axis
    // along Z, so rotate it onto Y before measuring.
    model.rotation.set(uprightRotX, 0, 0)
    model.updateWorldMatrix(true, true)

    const box = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    box.getSize(size)

    // Normalize by the largest dimension (the saucer diameter) so a wide,
    // short object fills the frame sensibly rather than exploding when
    // scaled by height alone.
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = targetSize / maxDim
    model.scale.setScalar(scale)

    // Recenter horizontally and sit the base on y=0.
    model.updateWorldMatrix(true, true)
    const box2 = new THREE.Box3().setFromObject(model)
    const c2 = new THREE.Vector3()
    box2.getCenter(c2)
    model.position.x -= c2.x
    model.position.z -= c2.z
    model.position.y -= box2.min.y
  }, [model, targetSize, uprightRotX])

  return (
    <group ref={ref} position={position} rotation={[0, rotationY, 0]}>
      <primitive object={model} />
    </group>
  )
}

useGLTF.preload('/models/teacup.glb')
