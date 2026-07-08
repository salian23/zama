import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import LayeredHero from '../components/LayeredHero'
import ProductCard from '../components/ui/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'

export default function Shop() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () =>
      active === 'All'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active]
  )

  return (
    <main className="relative">
      <LayeredHero
        image="/images/shop-hero.webp"
        cutout="/images/shop-hero-cup.webp"
        className="h-[70vh] min-h-[520px]"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow text-gold-300 mb-6"
        >
          The Full Collection
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
        >
          The Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-5 max-w-xl text-cream/70 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]"
        >
          Nine leaves, four regions, one unhurried standard.
        </motion.p>
      </LayeredHero>

      <section className="relative px-6 md:px-10 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest2 transition-all duration-300 ${
                  active === cat
                    ? 'border-gold-400 bg-gold-400 text-ink-950'
                    : 'border-cream/20 text-cream/60 hover:border-gold-400/60 hover:text-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-cream/40 py-20">
              No leaves in this category yet — check back next harvest.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
