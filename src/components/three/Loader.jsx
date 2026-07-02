import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-cream font-body">
        <div className="h-8 w-8 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
        <span className="text-xs tracking-widest2 uppercase text-cream/60">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}
