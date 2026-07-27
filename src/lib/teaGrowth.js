// Interactive tea-growth: wherever the pointer travels across a surface, a tea
// seedling sprouts and grows (stem rising, leaves unfurling) then gently sways.
// Sprouts are created imperatively for smoothness under rapid movement; we
// throttle by distance and cap the living population, recycling the oldest.
const GREENS = ['#4c9a3f', '#5aa84a', '#3f7d34', '#357a2f', '#63b552']
const LEAF = 'M0 0 C 6 -3 12 -10 9 -22 C 4 -13 -3 -6 0 0 Z'

function buildSprout() {
  const h = 58 + Math.random() * 58
  const w = 46
  const green = GREENS[(Math.random() * GREENS.length) | 0]
  const dark = '#274d20'
  const bend = (Math.random() - 0.5) * 12
  const cx = w / 2
  const top = 9
  const stem = `M${cx} ${h} C ${cx + bend} ${h * 0.6} ${cx + bend} ${h * 0.34} ${(cx + bend * 0.6).toFixed(1)} ${top}`
  const pairs = 2 + ((Math.random() * 2) | 0)
  let leaves = ''
  for (let i = 0; i < pairs; i++) {
    const t = (i + 1) / (pairs + 1)
    const ly = (h - t * (h - top)).toFixed(1)
    const lx = (cx + bend * (1 - t)).toFixed(1)
    const s = (0.95 - t * 0.35).toFixed(2)
    leaves += `<path d="${LEAF}" fill="${green}" transform="translate(${lx} ${ly}) rotate(38) scale(${s})"/>`
    leaves += `<path d="${LEAF}" fill="${green}" transform="translate(${lx} ${ly}) rotate(-38) scale(-${s} ${s})"/>`
  }
  leaves += `<path d="${LEAF}" fill="#8fd074" transform="translate(${(cx + bend * 0.6).toFixed(1)} ${top}) scale(0.68)"/>`
  return {
    w,
    h,
    html: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
      <path d="${stem}" stroke="${dark}" stroke-width="2.3" stroke-linecap="round"/>
      ${leaves}</svg>`,
  }
}

// Attach growth to a root element (pointer source) that plants into `field`
// (which should be pointer-events:none so it never blocks clicks underneath).
// Returns a cleanup function.
export function attachTeaGrowth(root, field, opts = {}) {
  if (!root || !field) return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const maxPlants = opts.maxPlants ?? 70
  const spawnDist = opts.spawnDist ?? 38
  const lifespan = opts.lifespan ?? 8000
  const live = []
  let lastX = -9999
  let lastY = -9999

  const plant = (clientX, clientY) => {
    const rect = field.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
    const dx = x - lastX
    const dy = y - lastY
    if (dx * dx + dy * dy < spawnDist * spawnDist) return
    lastX = x
    lastY = y

    const { w, h, html } = buildSprout()
    const el = document.createElement('div')
    el.className = 'farm-sprout'
    el.style.left = `${x}px`
    el.style.top = `${y - h}px`
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    el.style.marginLeft = `${-w / 2}px`
    el.innerHTML = html
    field.appendChild(el)

    const rec = { el }
    live.push(rec)
    if (live.length > maxPlants) {
      const old = live.shift()
      old.el.classList.add('farm-fade')
      setTimeout(() => old.el.remove(), 1300)
    }
    rec.timer = setTimeout(() => {
      el.classList.add('farm-fade')
      setTimeout(() => {
        el.remove()
        const i = live.indexOf(rec)
        if (i > -1) live.splice(i, 1)
      }, 1300)
    }, lifespan)
  }

  const onMove = (e) => plant(e.clientX, e.clientY)
  const onTouch = (e) => {
    const t = e.touches && e.touches[0]
    if (t) plant(t.clientX, t.clientY)
  }

  root.addEventListener('pointermove', onMove, { passive: true })
  root.addEventListener('touchmove', onTouch, { passive: true })
  return () => {
    root.removeEventListener('pointermove', onMove)
    root.removeEventListener('touchmove', onTouch)
    live.forEach((r) => {
      clearTimeout(r.timer)
      r.el.remove()
    })
  }
}
