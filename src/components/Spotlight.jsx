import { useEffect, useRef } from 'react'

// A soft pool of warm light that follows the cursor, as if the visitor carries
// a candle through the dark room. Desktop / fine-pointer only, purely
// decorative, and driven with a rAF-throttled CSS variable so it never blocks
// the main thread.
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--sx', `${e.clientX}px`)
        el.style.setProperty('--sy', `${e.clientY}px`)
        el.style.opacity = '1'
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="spotlight" aria-hidden="true" />
}
