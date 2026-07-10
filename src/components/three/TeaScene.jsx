import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  Noise,
} from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TeaCupModel from './TeaCupModel'
import Steam from './Steam'
import Leaves from './Leaves'
import DustMotes from './DustMotes'
import CameraRig from './CameraRig'
import Loader from './Loader'
import { getTimeOfDay } from '../../lib/timeOfDay'

gsap.registerPlugin(ScrollTrigger)

// Keeps the cup framed across aspect ratios. On a narrow portrait phone the
// perspective camera's horizontal field of view collapses, which blows the
// cup up and shoves it into the headline — so pull the camera back (and
// widen fov a touch) as the viewport gets more portrait.
function ResponsiveCamera() {
  const { camera, size } = useThree()
  const introduced = useRef(false)
  useEffect(() => {
    const aspect = size.width / size.height
    let targetZ = 7.6
    let fov = 30
    if (aspect < 0.7) {
      targetZ = 12.5
      fov = 36
    } else if (aspect < 1.05) {
      targetZ = 9.8
      fov = 33
    }
    camera.fov = fov
    camera.updateProjectionMatrix()

    if (!introduced.current) {
      // Cinematic reveal: camera dollies back from a tight framing to rest.
      introduced.current = true
      camera.position.z = targetZ * 0.62
      gsap.to(camera.position, {
        z: targetZ,
        duration: 2.6,
        ease: 'power3.out',
      })
    } else {
      camera.position.z = targetZ
    }
  }, [camera, size])
  return null
}

// A soft warm halo painted behind the cup so it sits on a lit "stage" rather
// than floating in flat black — a canvas radial gradient on an additive plane.
function GlowBackdrop({ position = [0, 0.4, -2], scale = 9 }) {
  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 512
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
    g.addColorStop(0, 'rgba(212,162,74,0.42)')
    g.addColorStop(0.4, 'rgba(126,84,38,0.2)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 512, 512)
    return new THREE.CanvasTexture(c)
  }, [])
  return (
    <mesh position={position} scale={[scale, scale, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  )
}

export default function TeaScene({ sectionRef, className = '' }) {
  const scrollProgress = useRef(0)
  const [portrait, setPortrait] = useState(false)
  const tod = useMemo(() => getTimeOfDay(), [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setPortrait(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

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
        <ResponsiveCamera />
        <color attach="background" args={['#07080a']} />
        <fogExp2 attach="fog" args={['#07080a', tod.fog]} />

        <GlowBackdrop position={[0, portrait ? -1.5 : -0.5, -2]} scale={portrait ? 6.5 : 8} />

        <ambientLight intensity={tod.ambient.intensity} color={tod.ambient.color} />
        <directionalLight
          position={[3.2, 5, 2.4]}
          intensity={tod.key.intensity}
          color={tod.key.color}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3.5, 2.2, -2]} intensity={tod.rim.intensity} color={tod.rim.color} />
        <pointLight position={[0, 0.6, 3]} intensity={tod.warm.intensity} color={tod.warm.color} />
        <pointLight position={[0, 2.6, 1.5]} intensity={0.5} color="#f4ecda" />
        {/* Low warm pool that lifts the saucer off the black backdrop. */}
        <pointLight position={[0, -0.9, 1.6]} intensity={0.55} color="#e0a860" distance={7} />

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
          <CameraRig
            scrollProgress={scrollProgress}
            lookAt={[0, portrait ? 1.7 : 0.85, 0]}
          >
            <group
              scale={portrait ? 0.68 : 0.85}
              position={[0, portrait ? -1.7 : -0.35, 0]}
            >
              <TeaCupModel targetSize={2.7} position={[0, 0, 0]} rotationY={-0.4} />
              <Steam position={[0, 1.6, 0]} height={2.4} progressRef={scrollProgress} />
              <Leaves radius={2.9} center={[0, 1.4, 0]} />
            </group>
          </CameraRig>
          <DustMotes count={portrait ? 80 : 140} radius={6} />
          <ContactShadows
            position={[0, portrait ? -1.72 : -0.37, 0]}
            opacity={0.75}
            scale={8}
            blur={2.8}
            far={3}
          />

          {/* Cinematic post-processing: filmic focus, glowing highlights,
              gentle vignette and grain give the real-time scene the look of
              a rendered commercial shot rather than a raw 3D viewport. */}
          <EffectComposer multisampling={4}>
            <DepthOfField
              target={[0, 0.5, 0]}
              focalLength={0.018}
              bokehScale={2.6}
              height={640}
            />
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.72}
              luminanceSmoothing={0.25}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.3} darkness={0.8} />
            <Noise opacity={0.045} premultiply />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
