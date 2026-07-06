import { Fragment } from 'react'
import { motion } from 'framer-motion'

// Reveals text one word at a time — each word rises and un-blurs on a short
// stagger as the block scrolls into view. Renders as the given `as` tag so it
// can be a heading, blockquote paragraph, etc.
const container = {
  hidden: {},
  show: (stagger) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
}
const word = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function WordReveal({
  text,
  as = 'p',
  className = '',
  stagger = 0.045,
  amount = 0.5,
}) {
  const MotionTag = motion[as] || motion.p
  const words = text.split(' ')

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span
            variants={word}
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </MotionTag>
  )
}
