import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Easter egg: type "tea" anywhere and a flurry of gold leaves drifts down.
const LEAF = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
    <path
      d="M12 2C7 5 4 9 4 14a8 8 0 0016 0c0-5-3-9-8-12z"
      fill="none"
      stroke="#d4a24a"
      strokeWidth="1.4"
    />
    <path d="M12 4v16" fill="none" stroke="#d4a24a" strokeWidth="1" opacity="0.7" />
  </svg>
)

export default function LeafRain() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let buffer = ''
    const onKey = (e) => {
      if (e.key.length !== 1) return
      buffer = (buffer + e.key.toLowerCase()).slice(-3)
      if (buffer === 'tea') {
        buffer = ''
        setActive(true)
        setTimeout(() => setActive(false), 4200)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const leaves = useMemo(
    () =>
      new Array(28).fill(0).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 26,
        delay: Math.random() * 1.2,
        duration: 3 + Math.random() * 2.5,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() - 0.5) * 720,
      })),
    []
  )

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[75] overflow-hidden">
          {leaves.map((l) => (
            <motion.div
              key={l.id}
              initial={{ y: '-12vh', x: 0, rotate: 0, opacity: 0 }}
              animate={{ y: '112vh', x: l.drift, rotate: l.spin, opacity: [0, 1, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: l.duration, delay: l.delay, ease: 'easeIn' }}
              style={{ position: 'absolute', left: `${l.left}%`, width: l.size, height: l.size }}
            >
              {LEAF}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
