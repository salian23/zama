import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

// A pinned, scroll-scrubbed sequence: the section is tall (one screen per
// step); its inner content sticks while you scroll, and the active step
// advances with scroll progress — big number + title + body cross-fading,
// a vertical gold progress rail filling alongside. Falls back gracefully on
// short screens because the sticky element is just a normal block until the
// tall parent scrolls past.
export default function RitualSequence({ eyebrow, title, steps }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(steps.length - 1, Math.floor(v * steps.length))
    if (idx !== active) setActive(idx)
  })

  const railScale = useTransform(scrollYProgress, [0, 1], [0.05, 1])
  const step = steps[active]

  return (
    <section
      ref={ref}
      className="relative bg-ink-950/45"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-10">
        {/* faint giant step numeral behind everything */}
        <motion.span
          key={`ghost-${active}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-display text-[42vw] leading-none text-cream md:right-16 md:text-[30vw]"
        >
          {step.n}
        </motion.span>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr]">
          {/* progress rail with markers */}
          <div className="flex items-center gap-6">
            <div className="relative h-64 w-px bg-cream/10">
              <motion.div
                style={{ scaleY: railScale }}
                className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-gold-300 to-gold-500"
              />
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className="absolute -left-[5px] flex items-center"
                  style={{ top: `${(i / (steps.length - 1)) * 100}%` }}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full border transition-all duration-500 ${
                      i <= active
                        ? 'border-gold-400 bg-gold-400 scale-110'
                        : 'border-cream/30 bg-ink-950'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="hidden flex-col gap-4 md:flex">
              {steps.map((s, i) => (
                <span
                  key={s.n}
                  className={`eyebrow transition-colors duration-500 ${
                    i === active ? 'text-gold-300' : 'text-cream/25'
                  }`}
                >
                  {s.n}
                </span>
              ))}
            </div>
          </div>

          {/* animated step content */}
          <div className="relative min-h-[320px]">
            <span className="eyebrow text-gold-300/90 block mb-6">{eyebrow}</span>
            <h2 className="font-display text-3xl md:text-4xl text-cream/40 mb-10">
              {title}
            </h2>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-6xl md:text-7xl text-gold-400">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-4xl md:text-5xl text-cream">
                {step.title}
              </h3>
              <p className="mt-5 max-w-md text-cream/60 leading-relaxed text-lg">
                {step.body}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
