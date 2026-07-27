import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useIntroDone } from '../context/IntroContext'
import { getTimeOfDay } from '../lib/timeOfDay'
import { attachTeaGrowth } from '../lib/teaGrowth'
import { PRODUCTS } from '../data/products'

// The signature arrival. The instant the boot curtain dissolves, the visitor
// is "seated": greeted by time of day and offered today's first pour as three
// glowing invitations. Choosing one pours amber into its cup, blooms warm
// light across the screen, and dissolves into the house — so landing feels
// like being served, not browsing. Shown once per session, always skippable,
// and calmed for reduced-motion visitors.

const SALUTATION = {
  morning: 'Good morning',
  day: 'Good afternoon',
  evening: 'Good evening',
  night: 'Good evening',
}

// Three house signatures — one bright, one delicate, one deep.
const TRIO = ['jade-mist', 'silver-needle', 'first-flush']

export default function WelcomeRitual() {
  const introDone = useIntroDone()
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [phase, setPhase] = useState('idle') // idle | seated | chosen | done
  const [chosen, setChosen] = useState(null)
  const overlayRef = useRef(null)
  const fieldRef = useRef(null)

  const { phase: tod } = getTimeOfDay()
  const salutation = SALUTATION[tod] || 'Welcome'
  const teas = TRIO.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)

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

  const open = phase === 'seated' || phase === 'chosen'

  // Lock the page behind the ritual so nothing scrolls underneath it.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // While the visitor is being "seated", the whole arrival screen becomes a
  // living tea field: moving across it sprouts and grows tea leaves.
  useEffect(() => {
    if (phase !== 'seated') return undefined
    return attachTeaGrowth(overlayRef.current, fieldRef.current, {
      spawnDist: 44,
      maxPlants: 60,
      lifespan: 7000,
    })
  }, [phase])

  const finish = useCallback(
    (to) => {
      try {
        sessionStorage.setItem('bt-welcomed', '1')
      } catch {
        /* ignore */
      }
      setPhase('done')
      if (to) navigate(to)
    },
    [navigate]
  )

  const choose = (tea) => {
    setChosen(tea)
    setPhase('chosen')
    // Let the confirmation breathe, then step into the shop with their cup.
    setTimeout(() => finish('/shop'), reduce ? 900 : 2400)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="welcome"
          ref={overlayRef}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reduce ? 1 : 1.08,
            filter: reduce ? 'blur(0px)' : 'blur(20px)',
          }}
          transition={{ duration: reduce ? 0.3 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Beth Tea"
        >
          {/* Deep, warm room */}
          <div className="absolute inset-0 bg-ink-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(212,162,74,0.16),transparent_62%)]" />
          {/* Living tea field — sprouts grow here as the pointer moves */}
          {phase === 'seated' && (
            <div ref={fieldRef} className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
          )}
          <div className="ritual-vignette" />

          <AnimatePresence mode="wait">
            {phase === 'seated' ? (
              <motion.div
                key="seated"
                className="relative z-10 w-full max-w-4xl text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  className="eyebrow text-gold-300 mb-5 block"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  {salutation}
                </motion.span>
                <motion.h2
                  className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-[1.02]"
                  initial={{ opacity: 0, y: 20, filter: reduce ? 'blur(0px)' : 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  Your table is set.
                </motion.h2>
                <motion.p
                  className="mx-auto mt-5 max-w-md text-cream/55"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                >
                  Choose today&rsquo;s first pour — or step inside and wander.
                </motion.p>

                <motion.div
                  className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.14, delayChildren: 0.7 } },
                  }}
                >
                  {teas.map((tea) => (
                    <motion.button
                      key={tea.id}
                      type="button"
                      onClick={() => choose(tea)}
                      className="ritual-card group relative overflow-hidden rounded-2xl border border-cream/12 p-6 text-left transition-colors duration-500 hover:border-gold-400/60"
                      style={{ background: tea.gradient }}
                      variants={{
                        hidden: { opacity: 0, y: 30, filter: reduce ? 'blur(0px)' : 'blur(8px)' },
                        show: {
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      whileHover={reduce ? {} : { y: -6 }}
                    >
                      <div className="absolute inset-0 bg-ink-950/25 transition-opacity duration-500 group-hover:opacity-0" />
                      <div className="relative flex items-start justify-between">
                        <div>
                          <p className="eyebrow text-cream/60">{tea.category}</p>
                          <h3 className="mt-2 font-display text-2xl text-cream">{tea.name}</h3>
                        </div>
                        <div className="ritual-cup" aria-hidden="true">
                          <span className="ritual-liquid" style={{ background: `linear-gradient(${tea.accent}, #7e5426)` }} />
                        </div>
                      </div>
                      <div className="relative mt-6 flex flex-wrap gap-2">
                        {tea.notes.map((n) => (
                          <span
                            key={n}
                            className="rounded-full border border-cream/15 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-cream/70"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                      <div className="relative mt-6 flex items-center justify-between">
                        <span className="text-cream/70 text-sm">${tea.price}</span>
                        <span className="text-[11px] uppercase tracking-widest2 text-gold-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          Steep this &rarr;
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => finish()}
                  className="mt-10 text-xs uppercase tracking-widest2 text-cream/40 transition-colors hover:text-cream/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  Enter the house &rarr;
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="chosen"
                className="relative z-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Warm bloom of light as the cup is poured */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(212,162,74,0.5), rgba(126,84,38,0.15) 45%, transparent 70%)',
                  }}
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: reduce ? 0.3 : 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.p
                  className="eyebrow text-gold-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  A fine choice
                </motion.p>
                <motion.h2
                  className="mt-4 font-display text-4xl sm:text-6xl text-cream"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {chosen?.name}
                </motion.h2>
                <motion.p
                  className="mt-4 text-cream/55"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Steeping now — we&rsquo;ll bring it to your table.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
