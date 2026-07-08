import { motion, useReducedMotion } from 'framer-motion'

// A "rack focus" reveal: content eases up from a slight lens-blur into sharp
// focus as it enters the viewport, like a camera pulling focus onto it.
// Falls back to a plain fade when the visitor prefers reduced motion.
export default function FocusReveal({
  children,
  className = '',
  amount = 0.35,
  y = 40,
  duration = 1,
  delay = 0,
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, filter: 'blur(14px)', scale: 0.985 }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
      }
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
