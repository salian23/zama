import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-ink-800/60 backdrop-blur-sm"
    >
      <div
        className="relative h-64 w-full overflow-hidden"
        style={{ background: product.gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        <div className="film-grain-local absolute inset-0 opacity-20 mix-blend-overlay" />
        <span className="absolute top-4 left-4 eyebrow text-cream/80 bg-ink-950/40 px-3 py-1 rounded-full backdrop-blur-sm">
          {product.category}
        </span>
        <div
          className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-40 blur-2xl transition-transform duration-700 group-hover:scale-125"
          style={{ background: product.accent }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl text-cream">{product.name}</h3>
          <span className="font-body text-gold-300 font-semibold whitespace-nowrap">
            ${product.price}
          </span>
        </div>
        <p className="text-sm text-cream/60 leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            {product.notes.map((note) => (
              <span
                key={note}
                className="text-[10px] uppercase tracking-wide text-tea-300 border border-tea-700/60 rounded-full px-2 py-1"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="mt-2 w-full rounded-full border border-gold-400/50 py-2.5 text-xs uppercase tracking-widest2 text-gold-300 transition-all duration-300 hover:bg-gold-400 hover:text-ink-950"
        >
          {added ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}
