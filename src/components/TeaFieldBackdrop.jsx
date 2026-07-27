// A natural tea-estate backdrop: misty dawn sky, hazy far mountains, and the
// signature contoured rows of tea bushes sweeping across rolling hills toward
// the horizon. Rows are generated procedurally (denser + hazier far away,
// bolder + wavier up close) so it reads like a real plantation.
const HORIZON = 300
const W = 1440
const H = 900

const lerp = (a, b, t) => a + (b - a) * t
const mix = (c1, c2, t) =>
  `rgb(${Math.round(lerp(c1[0], c2[0], t))},${Math.round(lerp(c1[1], c2[1], t))},${Math.round(lerp(c1[2], c2[2], t))})`

// contour rows of tea bushes
const rows = []
{
  let y = HORIZON + 6
  let i = 0
  while (y < H + 20) {
    const t = (y - HORIZON) / (H - HORIZON) // 0 = far/horizon, 1 = foreground
    const amp = 6 + t * 42
    const freq = 1.3 + t * 0.7
    const phase = i * 0.6
    const width = (1.3 + t * 6).toFixed(1)
    const col = mix([150, 178, 138], [20, 58, 28], Math.min(1, t))
    const op = (0.42 + t * 0.5).toFixed(2)
    const seg = 20
    let d = `M 0 ${y.toFixed(1)}`
    for (let s = 1; s <= seg; s++) {
      const x = (W / seg) * s
      const yy =
        y +
        Math.sin(phase + (s / seg) * Math.PI * 2 * freq) * amp * 0.45 +
        Math.sin(phase * 1.6 + s * 0.7) * amp * 0.12
      d += ` L ${x.toFixed(1)} ${yy.toFixed(1)}`
    }
    rows.push({ d, col, width, op })
    y += 5 + t * 36
    i++
  }
}

export default function TeaFieldBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fa68f" />
          <stop offset="58%" stopColor="#c0c3a2" />
          <stop offset="100%" stopColor="#e2cf9d" />
        </linearGradient>
        <radialGradient id="tf-sun" cx="50%" cy="46%" r="42%">
          <stop offset="0%" stopColor="rgba(248,226,168,0.55)" />
          <stop offset="100%" stopColor="rgba(248,226,168,0)" />
        </radialGradient>
        <linearGradient id="tf-slope" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7e9a6d" />
          <stop offset="55%" stopColor="#33552f" />
          <stop offset="100%" stopColor="#0f2c19" />
        </linearGradient>
        <linearGradient id="tf-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(226,232,214,0.55)" />
          <stop offset="100%" stopColor="rgba(226,232,214,0)" />
        </linearGradient>
      </defs>

      {/* sky + dawn sun */}
      <rect width={W} height={HORIZON + 30} fill="url(#tf-sky)" />
      <rect width={W} height={HORIZON + 120} fill="url(#tf-sun)" />

      {/* hazy far mountains */}
      <path
        d="M0,300 L0,214 C 200,176 380,232 560,204 C 780,168 980,236 1180,198 C 1300,182 1440,208 1440,216 L1440,300 Z"
        fill="#8ba585"
        opacity="0.45"
      />
      <path
        d="M0,300 L0,250 C 260,222 520,262 800,236 C 1040,214 1240,258 1440,240 L1440,300 Z"
        fill="#6f8b62"
        opacity="0.6"
      />

      {/* the tea slope + contour rows of bushes */}
      <rect y={HORIZON} width={W} height={H - HORIZON} fill="url(#tf-slope)" />
      {rows.map((r, i) => (
        <path
          key={i}
          d={r.d}
          fill="none"
          stroke={r.col}
          strokeWidth={r.width}
          strokeLinecap="round"
          opacity={r.op}
        />
      ))}

      {/* valley mist along the horizon */}
      <rect y={HORIZON - 26} width={W} height="90" fill="url(#tf-fog)" />
    </svg>
  )
}
