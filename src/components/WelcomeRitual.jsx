import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useIntroDone } from '../context/IntroContext'
import { attachTeaGrowth } from '../lib/teaGrowth'
import TeaFieldBackdrop from './TeaFieldBackdrop'

// The signature arrival: the boot curtain dissolves onto a quiet tea estate at
// first light. As the visitor moves across the field, tea shoots sprout and
// grow — nothing else, just the land waking up. Shown once per session, always
// skippable, and calmed for reduced-motion visitors.
export default function WelcomeRitual() {
  const introDone = useIntroDone()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('idle') // idle | seated | done
  const overlayRef = useRef(null)
  const fieldRef = useRef(null)

  // Seat the visitor once the boot curtain lifts — but only once per session.
  useEffect(() => {
    if (!introDone || phase !== 'idle') return
    try {
      if (sessionStorage.getItem('bt-welcomed')) {
        setPhase('done')
        return
      }
    } catch {
      /* private mode — just show it */
    }
    setPhase('seated')
  }, [introDone, phase])

  const open = phase === 'seated'

  // Lock the page behind the arrival so nothing scrolls underneath it.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // The whole screen is a living tea field: moving across it slowly sprouts
  // and grows tea shoots.
  useEffect(() => {
    if (phase !== 'seated') return undefined
    return attachTeaGrowth(overlayRef.current, fieldRef.current, {
      spawnDist: 46,
      maxPlants: 120,
      lifespan: 15000,
    })
  }, [phase])

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem('bt-welcomed', '1')
    } catch {
      /* ignore */
    }
    setPhase('done')
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="welcome"
          ref={overlayRef}
          className="fixed inset-0 z-[120] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reduce ? 1 : 1.06,
            filter: reduce ? 'blur(0px)' : 'blur(18px)',
          }}
          transition={{ duration: reduce ? 0.3 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Beth Tea"
        >
          {/* natural tea-estate backdrop */}
          <TeaFieldBackdrop />

          {/* living field — sprouts grow here as the pointer moves */}
          <div ref={fieldRef} className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

          {/* the only affordance: a quiet way inside */}
          <button
            type="button"
            onClick={finish}
            className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest2 text-cream/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] transition-colors hover:text-cream"
          >
            Enter &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
