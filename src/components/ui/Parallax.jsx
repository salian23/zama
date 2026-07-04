import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Translates its children vertically as the element scrolls through the
// viewport, creating a subtle depth/parallax effect. `speed` is how far (in
// px) it drifts across the full scroll range; negative moves opposite.
export default function Parallax({ children, speed = 60, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
