import { useEffect, useRef } from 'react'

// An immersive, living leaf backdrop held fixed behind a page. The macro leaf
// field sits over-scaled and eases toward the cursor, so moving the mouse
// zooms and sweeps across the leaves while a warm glow trails the pointer.
// `ease` controls how gently it follows (lower = smoother / more floaty).
// Darkened + vignetted for legibility. Static on touch / reduced-motion.
export default function LeafBackground({
  image,
  scale = 1.55,
  ease = 0.05,
  brightness = 0.62,
  overlay = 0.48,
}) {
  const imgRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    const glow = glowRef.current
    if (!img) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let tx = 0.5
    let ty = 0.5
    let cx = 0.5
    let cy = 0.5

    const onMove = (e) => {
      tx = e.clientX / window.innerWidth
      ty = e.clientY / window.innerHeight
    }
    const render = () => {
      cx += (tx - cx) * ease
      cy += (ty - cy) * ease
      img.style.transform = `scale(${scale})`
      img.style.transformOrigin = `${cx * 100}% ${cy * 100}%`
      if (glow) {
        glow.style.background = `radial-gradient(42vmax circle at ${cx * 100}% ${cy * 100}%, rgba(212,162,74,0.22), transparent 62%)`
      }
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [scale, ease])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `brightness(${brightness}) saturate(1.08)`,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
      />
      <div ref={glowRef} className="absolute inset-0 mix-blend-screen" />
      <div className="absolute inset-0" style={{ background: `rgba(7,8,10,${overlay})` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(7,8,10,0.78)_100%)]" />
    </div>
  )
}
