import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// A "2.5D" layered hero. One photograph, split into depth planes — a blurred,
// darkened background plate, a drifting warm glow, the headline, and a sharp
// cut-out of the subject floating in front. Each plane tracks the cursor at a
// different rate (lerped for buttery motion), so the flat image reads as real
// three-dimensional depth that breathes as you move the mouse. Calms to a
// static image for touch devices and reduced-motion visitors.
export default function LayeredHero({
  image,
  cutout,
  className = '',
  children,
}) {
  const reduce = useReducedMotion()
  const rootRef = useRef(null)
  const bgRef = useRef(null)
  const glowRef = useRef(null)
  const contentRef = useRef(null)
  const cupRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const root = rootRef.current
    if (!root) return

    // target (tx,ty) chases the pointer; current (cx,cy) eases toward it.
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const onMove = (e) => {
      const r = root.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width - 0.5
      ty = (e.clientY - r.top) / r.height - 0.5
    }
    const onLeave = () => {
      tx = 0
      ty = 0
    }

    const render = () => {
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      if (bgRef.current)
        bgRef.current.style.transform = `scale(1.16) translate(${cx * -14}px, ${cy * -14}px)`
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${cx * 26}px, ${cy * 22}px)`
      if (contentRef.current)
        contentRef.current.style.transform = `translate(${cx * -30}px, ${cy * -22}px)`
      if (cupRef.current)
        cupRef.current.style.transform = `scale(1.16) translate(${cx * 40}px, ${cy * 34}px) rotateX(${cy * -3.5}deg) rotateY(${cx * 5}deg)`
      raf = requestAnimationFrame(render)
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(render)
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  return (
    <section
      ref={rootRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Back plane — the full scene, softened and dimmed so the sharp cut-out
          reads as the focal foreground. */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px) brightness(0.62) saturate(1.05)',
        }}
      />
      {/* Depth + legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-ink-950/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]" />

      {/* Mid plane — a drifting pool of warm light. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-screen will-change-transform"
        style={{
          background:
            'radial-gradient(40vmax circle at 55% 45%, rgba(212,162,74,0.18), transparent 60%)',
        }}
      />

      {/* Headline plane — anchored in the dark left third so the cup can float
          center-right without ever covering the type. Kept in front (z-30) for
          guaranteed legibility. */}
      <div
        ref={contentRef}
        className="relative z-30 flex h-full max-w-2xl flex-col items-start justify-center px-6 sm:px-12 md:px-20 text-left will-change-transform"
      >
        {children}
      </div>

      {/* Front plane — the razor-sharp cut-out of the cup, floating forward.
          Rendered as a background image so a not-yet-added asset simply shows
          nothing (no broken-image glyph) rather than breaking the hero. */}
      {cutout && (
        <div
          ref={cupRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 will-change-transform"
          style={{
            backgroundImage: `url(${cutout})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Fade the base of the hero into the page below. */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-ink-950 to-transparent" />
    </section>
  )
}
