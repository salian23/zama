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
  edges = null,
  edgeColor = '#3fe6b3',
  edgeGradient = null,
  staticImage = false,
}) {
  const imgRef = useRef(null)
  const glowRef = useRef(null)
  const revealRef = useRef(null)

  useEffect(() => {
    if (staticImage) return
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
    let cs = scale
    const start = performance.now()
    const clamp = (v) => Math.max(0.08, Math.min(0.92, v))

    const onMove = (e) => {
      tx = e.clientX / window.innerWidth
      ty = e.clientY / window.innerHeight
    }
    const render = () => {
      const t = (performance.now() - start) / 1000
      // Cinematic "breathing" zoom: the scale drifts slowly in and out, and
      // the focal point glides on a slow path (Ken Burns), with a gentle
      // cursor nudge on top — all heavily eased for a buttery, filmic push-in.
      const targetScale = scale + Math.sin(t * 0.16) * 0.08
      const fx = 0.5 + Math.sin(t * 0.07) * 0.16 + (tx - 0.5) * 0.35
      const fy = 0.5 + Math.sin(t * 0.053 + 1.2) * 0.13 + (ty - 0.5) * 0.35
      cx += (clamp(fx) - cx) * ease
      cy += (clamp(fy) - cy) * ease
      cs += (targetScale - cs) * 0.04
      img.style.transform = `scale(${cs})`
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
  }, [scale, ease, staticImage])

  // Touch-reveal (phones only): the glow lights up around the finger and fades
  // when not touching, so the real leaf is visible by default. Desktop keeps
  // its constant glow untouched.
  useEffect(() => {
    if (!edges) return undefined
    const el = revealRef.current
    if (!el) return undefined
    if (!window.matchMedia('(pointer: coarse)').matches) return undefined

    let tx = 50
    let ty = 50
    let cx = 50
    let cy = 50
    let act = 0
    let ca = 0
    let raf = 0

    const onTouch = (e) => {
      const t = e.touches && e.touches[0]
      if (!t) return
      tx = (t.clientX / window.innerWidth) * 100
      ty = (t.clientY / window.innerHeight) * 100
      act = 1
    }
    const end = () => {
      act = 0
    }
    const render = () => {
      cx += (tx - cx) * 0.2
      cy += (ty - cy) * 0.2
      ca += (act - ca) * 0.1
      el.style.setProperty('--mx', `${cx}%`)
      el.style.setProperty('--my', `${cy}%`)
      el.style.setProperty('--reveal-op', ca.toFixed(3))
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', end)
    window.addEventListener('touchcancel', end)
    raf = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', end)
      window.removeEventListener('touchcancel', end)
      cancelAnimationFrame(raf)
    }
  }, [edges])

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

      {/* "Living light" traced along the leaf edges: a constant soft rim glow
          plus a bright band that flows along the contours. */}
      {edges && (
        <div ref={revealRef} className="leaf-edge-reveal">
          {/* wide bloom that bleeds the glow out into the surroundings */}
          <div className="leaf-edge-bloom">
            <div
              className="leaf-edge-bloom-mask"
              style={{
                WebkitMaskImage: `url(${edges})`,
                maskImage: `url(${edges})`,
                background: edgeGradient || edgeColor,
              }}
            />
          </div>
          <div
            className="leaf-edge-glow"
            style={{
              WebkitMaskImage: `url(${edges})`,
              maskImage: `url(${edges})`,
              background: edgeGradient || edgeColor,
            }}
          />
          <div
            className="leaf-edge-flow"
            style={{
              WebkitMaskImage: `url(${edges})`,
              maskImage: `url(${edges})`,
              backgroundImage: `linear-gradient(115deg, transparent 40%, ${edgeColor} 50%, transparent 60%)`,
            }}
          />
        </div>
      )}
    </div>
  )
}
