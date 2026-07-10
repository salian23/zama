import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Product3DViewer from '../three/Product3DViewer'
import MagnifyImage from './MagnifyImage'

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false)
  const [viewer, setViewer] = useState(false)
  // If a product photo hasn't been added yet (or fails to load), fall back to
  // the colour gradient instead of showing a broken-image glyph.
  const [imgOk, setImgOk] = useState(true)
  const showImage = product.image && imgOk

  // Cursor-following 3D tilt (desktop only). Pop-out cards tilt harder and
  // lift toward the viewer, so the image feels like it's coming off the screen.
  const pop = product.popOut
  const tilt = pop ? 20 : 7
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), { stiffness: 150, damping: 18 })

  const finePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const handleMove = (e) => {
    if (!finePointer) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

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
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: pop ? 1000 : 900,
        transformStyle: 'preserve-3d',
      }}
      whileHover={
        pop
          ? {
              scale: 1.2,
              y: -34,
              boxShadow: '0 90px 150px -20px rgba(0,0,0,0.92), 0 0 80px -10px rgba(212,162,74,0.3)',
              zIndex: 30,
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-ink-800/60 backdrop-blur-sm ${
        pop ? 'hover:border-gold-400/50' : ''
      }`}
    >
      <div
        className="relative h-64 w-full overflow-hidden"
        style={showImage ? undefined : { background: product.gradient }}
      >
        {showImage && product.zoom && (
          <MagnifyImage src={product.image} alt={product.name} />
        )}
        {showImage && !product.zoom && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgOk(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out ${
              pop ? 'group-hover:scale-[1.28]' : 'group-hover:scale-110'
            }`}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        <div className="film-grain-local pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" />
        <span className="absolute top-4 left-4 eyebrow text-cream/80 bg-ink-950/40 px-3 py-1 rounded-full backdrop-blur-sm">
          {product.category}
        </span>
        {product.model3d && (
          <button
            onClick={() => setViewer(true)}
            className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-gold-400/50 bg-ink-950/50 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-gold-300 backdrop-blur-sm transition-colors hover:bg-gold-400 hover:text-ink-950"
          >
            <span className="text-sm leading-none">⟳</span> View in 3D
          </button>
        )}
        <div
          className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-40 blur-2xl transition-transform duration-700 group-hover:scale-125"
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

      {product.model3d && (
        <Product3DViewer
          open={viewer}
          onClose={() => setViewer(false)}
          modelUrl={product.model3d}
          name={product.name}
        />
      )}
    </motion.div>
  )
}
