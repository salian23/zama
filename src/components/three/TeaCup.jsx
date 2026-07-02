import { useMemo } from 'react'
import * as THREE from 'three'

// Builds a ceramic teacup profile (outer wall up, rim, inner wall back down,
// closed base) so THREE.LatheGeometry produces a proper hollow cup.
function useCupGeometry() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.42, 0.0),
      new THREE.Vector2(0.48, 0.06),
      new THREE.Vector2(0.44, 0.14),
      new THREE.Vector2(0.5, 0.32),
      new THREE.Vector2(0.58, 0.6),
      new THREE.Vector2(0.68, 0.92),
      new THREE.Vector2(0.76, 1.18),
      new THREE.Vector2(0.8, 1.36),
      new THREE.Vector2(0.82, 1.46),
      new THREE.Vector2(0.78, 1.48),
      new THREE.Vector2(0.72, 1.4),
      new THREE.Vector2(0.66, 1.14),
      new THREE.Vector2(0.6, 0.86),
      new THREE.Vector2(0.54, 0.56),
      new THREE.Vector2(0.5, 0.3),
      new THREE.Vector2(0.46, 0.16),
      new THREE.Vector2(0.0, 0.14),
    ]
    return new THREE.LatheGeometry(pts, 64)
  }, [])
}

function useSaucerGeometry() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(1.0, 0.0),
      new THREE.Vector2(1.08, 0.03),
      new THREE.Vector2(1.0, 0.07),
      new THREE.Vector2(0.86, 0.08),
      new THREE.Vector2(0.5, 0.09),
      new THREE.Vector2(0.5, 0.06),
      new THREE.Vector2(0.86, 0.05),
      new THREE.Vector2(0.94, 0.02),
      new THREE.Vector2(0.0, 0.015),
    ]
    return new THREE.LatheGeometry(pts, 64)
  }, [])
}

function useLiquidGeometry() {
  return useMemo(() => new THREE.CircleGeometry(0.62, 48), [])
}

export default function TeaCup({ position = [0, 0, 0] }) {
  const cupGeo = useCupGeometry()
  const saucerGeo = useSaucerGeometry()
  const liquidGeo = useLiquidGeometry()

  return (
    <group position={position}>
      {/* saucer */}
      <mesh geometry={saucerGeo} position={[0, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#f4ecda"
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* cup body */}
      <mesh geometry={cupGeo} position={[0, 0.09, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#22331e"
          roughness={0.28}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.8}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* gold rim accent */}
      <mesh position={[0, 0.09 + 1.46, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.79, 0.014, 12, 64]} />
        <meshStandardMaterial color="#d4a24a" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* handle */}
      <mesh
        position={[0.82, 0.09 + 0.85, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <torusGeometry args={[0.32, 0.055, 16, 48, Math.PI * 1.5]} />
        <meshPhysicalMaterial
          color="#22331e"
          roughness={0.28}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* tea liquid surface */}
      <mesh
        geometry={liquidGeo}
        position={[0, 0.09 + 1.34, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#6a2f10"
          roughness={0.15}
          metalness={0}
          transmission={0.45}
          thickness={0.6}
          ior={1.33}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </group>
  )
}
