import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  light = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={align === 'center' ? 'text-center' : 'text-left'}
    >
      {eyebrow && (
        <span className="eyebrow text-gold-300/90 block mb-4">{eyebrow}</span>
      )}
      <h2
        className={`font-display font-medium text-4xl md:text-6xl leading-tight ${
          light ? 'text-cream' : 'text-cream'
        }`}
      >
        {title}
      </h2>
    </motion.div>
  )
}
