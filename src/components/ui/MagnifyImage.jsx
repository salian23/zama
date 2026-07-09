import { useEffect, useRef } from 'react'

// Hover-to-zoom "loupe". As the cursor moves across the photo, the image
// scales into exactly the point beneath it (transform-origin chases the
// cursor), a warm specular highlight glides over the leaf, and a sheen rakes
// across once on entry — so pointing at a leaf reveals its finest detail with
// a glint of light. Fine-pointer only; a plain photo on touch/coarse devices.
export default function MagnifyImage({ src, alt, zoom = 2.4 }) {
  const rootRef = useRef(null)
  const imgRef = useRef(null)
  const glossRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const img = imgRef.current
    const gloss = glossRef.current
    if (!root || !img || !gloss) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let x = 50
    let y = 50
    let active = false

    const activate = () => {
      if (active) return
      active = true
      root.classList.add('is-zoom')
      img.style.transform = `scale(${zoom})`
    }
    const apply = () => {
      img.style.transformOrigin = `${x}% ${y}%`
      gloss.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,246,214,0.55) 0%, rgba(255,246,214,0.14) 14%, transparent 36%)`
    }
    const onMove = (e) => {
      activate()
      const r = root.getBoundingClientRect()
      x = ((e.clientX - r.left) / r.width) * 100
      y = ((e.clientY - r.top) / r.height) * 100
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      active = false
      root.classList.remove('is-zoom')
      img.style.transform = 'scale(1)'
    }

    root.addEventListener('pointerenter', activate)
    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('mousemove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('mouseleave', onLeave)
    return () => {
      root.removeEventListener('pointerenter', activate)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [zoom])

  return (
    <div ref={rootRef} className="magnify absolute inset-0 overflow-hidden">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)', transformOrigin: '50% 50%' }}
      />
      {/* specular highlight that follows the cursor */}
      <div
        ref={glossRef}
        aria-hidden="true"
        className="magnify-gloss pointer-events-none absolute inset-0"
      />
      {/* focus vignette that deepens on zoom */}
      <div aria-hidden="true" className="magnify-vignette pointer-events-none absolute inset-0" />
    </div>
  )
}
