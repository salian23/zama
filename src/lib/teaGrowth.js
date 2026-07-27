// Interactive tea-growth: wherever the pointer travels across a surface, a tea
// seedling sprouts and grows (stem rising, leaves unfurling) then gently sways.
// Sprouts are created imperatively for smoothness under rapid movement; we
// throttle by distance and cap the living population, recycling the oldest.
// Mature tea greens (deeper, glossy) and pale new-growth tones for the bud.
const GREENS = ['#2f6b34', '#3c7d3f', '#245a2b', '#356e37', '#1f5226']
const NEW_GREENS = ['#6bbf5a', '#7cc766', '#5cb04d']

// A realistic Camellia sinensis (tea) leaf, generated parametrically: an
// elongated oblong blade with a pointed tip, tapering base, and a finely
// serrated (toothed) margin — grown from base (0,0) upward to the tip.
function teaLeafPath(len, halfW, teeth) {
  const N = 22
  const right = []
  const left = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const blade = Math.sin(Math.PI * t) ** 0.85 // fat middle, fine ends
    const tooth = 1 + 0.16 * Math.sin(t * teeth * Math.PI * 2) // serration
    const x = halfW * blade * tooth
    const y = -len * t
    right.push(`${x.toFixed(1)} ${y.toFixed(1)}`)
    left.unshift(`${(-x).toFixed(1)} ${y.toFixed(1)}`)
  }
  return `M ${right.join(' L ')} L ${left.join(' L ')} Z`
}

function buildSprout() {
  const h = 58 + Math.random() * 58
  const w = 52
  const green = GREENS[(Math.random() * GREENS.length) | 0]
  const budGreen = NEW_GREENS[(Math.random() * NEW_GREENS.length) | 0]
  const vein = '#1c3d1c'
  const dark = '#20421c'
  const bend = (Math.random() - 0.5) * 12
  const cx = w / 2
  const top = 9
  const stem = `M${cx} ${h} C ${cx + bend} ${h * 0.6} ${cx + bend} ${h * 0.34} ${(cx + bend * 0.6).toFixed(1)} ${top}`

  // one tea leaf with midrib, placed/rotated/scaled via transform
  const leaf = (x, y, rot, s, fill) => {
    const len = 22
    const d = teaLeafPath(len, 5.4, 7)
    return (
      `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">` +
      `<path d="${d}" fill="${fill}"/>` +
      `<path d="M0 -1 L0 ${(-len + 2).toFixed(1)}" stroke="${vein}" stroke-width="0.7" opacity="0.5"/>` +
      `</g>`
    )
  }

  const pairs = 2 + ((Math.random() * 2) | 0)
  let leaves = ''
  for (let i = 0; i < pairs; i++) {
    const t = (i + 1) / (pairs + 1)
    const ly = h - t * (h - top)
    const lx = cx + bend * (1 - t)
    const s = 0.95 - t * 0.32
    // lower leaves mature/darker, upper leaves lighter (fresh growth)
    const fill = t > 0.6 ? budGreen : green
    leaves += leaf(lx, ly, 40, s, fill)
    leaves += leaf(lx, ly, -40, s, fill)
  }
  // pale silvery bud at the very tip — the classic "two leaves and a bud"
  leaves += leaf(cx + bend * 0.6, top, 0, 0.6, budGreen)

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
