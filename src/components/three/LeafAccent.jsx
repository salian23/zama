import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import Leaves from './Leaves'
import Loader from './Loader'

// A lightweight 3D accent (no cup/steam) used on secondary page headers so
// every page carries the same cinematic 3D language without the cost of
// the full home-hero scene.
export default function LeafAccent({ className = '' }) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.6, 5.2], fov: 42 }}>
        <color attach="background" args={['#07080a']} />
        <fogExp2 attach="fog" args={['#07080a', 0.09]} />
        <ambientLight intensity={0.35} color="#8aa876" />
        <directionalLight position={[3, 4, 2]} intensity={1.2} color="#f4d9a0" />
        <pointLight position={[-3, 1, -2]} intensity={0.8} color="#456233" />
        <Suspense fallback={<Loader />}>
          <Environment resolution={256}>
            <Lightformer
              form="rect"
              intensity={2}
              color="#f4d9a0"
              position={[3, 3, 3]}
              scale={[4, 4, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.2}
              color="#456233"
              position={[-3, 1.5, -2]}
              scale={[4, 4, 1]}
            />
          </Environment>
          <Leaves radius={2.1} center={[0, 0.4, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
