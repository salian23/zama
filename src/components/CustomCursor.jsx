import { useEffect, useRef, useState } from 'react'

// A soft gold glow that trails the pointer with slight easing and swells over
// interactive elements. Purely additive (the native cursor stays), and it
// disables itself on touch / coarse-pointer devices where it makes no sense.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  // Decide once whether a precise pointer exists (desktop).
  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches)
  }, [])

  // Wire up the trailing loop only after the element is actually rendered.
  useEffect(() => {
    if (!enabled) return undefined
    const dot = dotRef.current
    if (!dot) return undefined

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, [role="button"]')
      dot.classList.toggle('cursor-glow--active', !!interactive)
    }

    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return <div ref={dotRef} className="cursor-glow" aria-hidden="true" />
}
