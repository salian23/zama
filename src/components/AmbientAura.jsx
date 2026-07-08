// A living ambient light layer. Three softly-blurred colour fields — warm
// gold, deep tea-green and an ember glow — drift and breathe across the whole
// viewport on long, offset cycles. Rendered fixed with a `screen` blend so it
// only ever *adds* light to the dark backgrounds (bright cream text is left
// untouched), giving every section a slow, cinematic sense of depth instead
// of a flat black field. Purely decorative and pointer-transparent.
export default function AmbientAura() {
  return (
    <div className="ambient-aura" aria-hidden="true">
      <span className="aura-blob aura-blob--gold" />
      <span className="aura-blob aura-blob--tea" />
      <span className="aura-blob aura-blob--ember" />
    </div>
  )
}
