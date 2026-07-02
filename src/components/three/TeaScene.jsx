import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TeaCup from './TeaCup'
import Steam from './Steam'
import Leaves from './Leaves'
import CameraRig from './CameraRig'
import Loader from './Loader'

gsap.registerPlugin(ScrollTrigger)

export default function TeaScene({ sectionRef, className = '' }) {
  const scrollProgress = useRef(0)

  useEffect(() => {
    if (!sectionRef?.current) return undefined
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })
    return () => trigger.kill()
  }, [sectionRef])

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 3.3, 7.6], fov: 30 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#07080a']} />
        <fogExp2 attach="fog" args={['#07080a', 0.068]} />

        <ambientLight intensity={0.4} color="#8aa876" />
        <directionalLight
          position={[3.2, 5, 2.4]}
          intensity={1.8}
          color="#f4d9a0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3.5, 2.2, -2]} intensity={1.3} color="#5c7d43" />
        <pointLight position={[0, 0.6, 3]} intensity={0.7} color="#e3ba69" />
        <pointLight position={[0, 2.6, 1.5]} intensity={0.5} color="#f4ecda" />

        <Suspense fallback={<Loader />}>
          <Environment resolution={256}>
            <Lightformer
              form="rect"
              intensity={2.2}
              color="#f4d9a0"
              position={[3, 4, 3]}
              scale={[5, 5, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.4}
              color="#456233"
              position={[-4, 2, -3]}
              scale={[5, 5, 1]}
            />
            <Lightformer
              form="ring"
              intensity={0.8}
              color="#d4a24a"
              position={[0, -1.5, 4]}
              scale={[3, 3, 1]}
            />
          </Environment>
          <CameraRig scrollProgress={scrollProgress} lookAt={[0, 0.85, 0]}>
            <group scale={0.85} position={[0, -0.35, 0]}>
              <TeaCup position={[0, 0, 0]} />
              <Steam position={[0, 1.43, 0]} height={2.4} />
              <Leaves radius={2.9} center={[0, 1.4, 0]} />
            </group>
          </CameraRig>
          <ContactShadows
            position={[0, -0.35, 0]}
            opacity={0.55}
            scale={7}
            blur={2.4}
            far={3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
