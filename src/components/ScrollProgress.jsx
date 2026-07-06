import { useEffect, useRef } from 'react'

// A hairline gold bar pinned to the very top of the viewport that fills left
// to right as the page scrolls. Uses a plain window-scroll listener so it
// works identically with native and Lenis-smoothed scrolling.
export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
      style={{ transform: 'scaleX(0)', willChange: 'transform' }}
    />
  )
}
