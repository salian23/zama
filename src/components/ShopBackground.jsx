import { useEffect, useRef } from 'react'

// An immersive, living backdrop for the Shop page: a macro tea-leaf field held
// fixed behind the menu. It sits slightly over-scaled and eased toward the
// cursor, so moving the mouse gently zooms and pans across the leaves —
// exploring the texture as you browse — while a warm glow trails the cursor.
// Heavily darkened for legibility. Static on touch / reduced-motion.
export default function ShopBackground({ image }) {
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
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      // Over-scale hard and let the transform-origin chase the cursor, so the
      // leaves zoom and sweep dramatically toward wherever you point.
      img.style.transform = 'scale(1.55)'
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
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.62) saturate(1.08)',
          transform: 'scale(1.55)',
          transformOrigin: 'center',
        }}
      />
      {/* warm cursor glow */}
      <div ref={glowRef} className="absolute inset-0 mix-blend-screen" />
      {/* lighter darkening + vignette — leaves stay visible, text still legible */}
      <div className="absolute inset-0 bg-ink-950/48" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(7,8,10,0.78)_100%)]" />
    </div>
  )
}
