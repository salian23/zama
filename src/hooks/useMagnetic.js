import { useEffect, useRef } from 'react'

// Subtle "magnetic" pull: the element eases toward the pointer while hovered
// and springs back on leave. Disabled on coarse-pointer devices.
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - (rect.left + rect.width / 2)
      const my = e.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0px, 0px)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
