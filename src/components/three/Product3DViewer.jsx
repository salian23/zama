import { Suspense, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
  useGLTF,
  Html,
  useProgress,
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

function ViewerLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
        <span className="text-xs tracking-widest2 uppercase text-cream/60">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}

// Loads a product GLB, recenters it on the origin and scales it to a
// consistent on-screen size so any tin/canister frames the same way.
function ProductModel({ url }) {
  const { scene } = useGLTF(url)
  const model = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    model.position.sub(center)
    const scale = 2.4 / Math.max(size.x, size.y, size.z)
    model.scale.setScalar(scale)
    model.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true
        if (c.material) c.material.envMapIntensity = 1.3
      }
    })
  }, [model])

  return <primitive object={model} />
}

export default function Product3DViewer({ open, onClose, modelUrl, name }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[80vh] w-[92vw] max-w-4xl overflow-hidden rounded-3xl border border-cream/10 bg-ink-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5">
              <div>
                <span className="eyebrow text-gold-300/80">Explore in 3D</span>
                <h3 className="font-display text-2xl text-cream mt-1">{name}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                ✕
              </button>
            </div>

            <Canvas
              shadows
              dpr={[1, 1.75]}
              camera={{ position: [0, 0.4, 5], fov: 35 }}
            >
              <color attach="background" args={['#0c0d08']} />
              <ambientLight intensity={0.5} color="#8aa876" />
              <directionalLight position={[3, 5, 3]} intensity={1.6} color="#f4d9a0" castShadow />
              <pointLight position={[-3, 2, -2]} intensity={1} color="#5c7d43" />
              <Suspense fallback={<ViewerLoader />}>
                <Environment resolution={256}>
                  <Lightformer form="rect" intensity={2.4} color="#f4d9a0" position={[3, 4, 3]} scale={[5, 5, 1]} />
                  <Lightformer form="rect" intensity={1.4} color="#456233" position={[-4, 2, -3]} scale={[5, 5, 1]} />
                  <Lightformer form="ring" intensity={1} color="#d4a24a" position={[0, -2, 4]} scale={[3, 3, 1]} />
                </Environment>
                <ProductModel url={modelUrl} />
                <ContactShadows position={[0, -1.35, 0]} opacity={0.5} scale={6} blur={2.5} far={3} />
              </Suspense>
              <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={7}
                autoRotate
                autoRotateSpeed={1.1}
                enableDamping
                dampingFactor={0.08}
              />
            </Canvas>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center pb-5">
              <span className="text-[10px] uppercase tracking-widest2 text-cream/40">
                Drag to rotate · scroll to zoom
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
