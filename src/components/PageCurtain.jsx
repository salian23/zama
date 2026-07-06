import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Cinematic route transition: on every navigation a dark panel is already
// covering the screen the instant the new route mounts (keyed to pathname,
// so it renders in the same commit as the route swap — no flash of the new
// page), then it lifts away to reveal the page, echoing the intro loader.
// The very first load is skipped because the inline boot loader already
// handles arrival.
export default function PageCurtain() {
  const { pathname } = useLocation()
  const first = useRef(true)
  const isFirst = first.current
  first.current = false

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink-950 pointer-events-none"
        initial={isFirst ? { y: '-100%' } : { y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
          delay: isFirst ? 0 : 0.12,
        }}
      >
        {!isFirst && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, times: [0, 0.45, 1], ease: 'easeInOut' }}
          >
            <span className="font-display text-3xl md:text-5xl tracking-wide text-cream">
Beth <span className="text-gold-400">Tea</span>
            </span>
            <span className="h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
