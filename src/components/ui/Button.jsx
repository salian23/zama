import { Link } from 'react-router-dom'
import useMagnetic from '../../hooks/useMagnetic'

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  className = '',
  type = 'button',
}) {
  const magnetic = useMagnetic(variant === 'link' ? 0 : 0.3)
  const base =
    'inline-flex items-center justify-center gap-2 px-8 py-3 text-xs uppercase tracking-widest2 font-body font-semibold transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-out rounded-full will-change-transform'
  const styles =
    variant === 'solid'
      ? 'bg-gold-400 text-ink-950 hover:bg-gold-300 hover:shadow-[0_0_30px_rgba(212,162,74,0.35)]'
      : variant === 'ghost'
      ? 'border border-cream/30 text-cream hover:border-gold-400 hover:text-gold-300'
      : 'text-gold-300 hover:text-gold-200 px-0 py-0'

  const content = <span className="relative">{children}</span>

  if (to) {
    return (
      <Link ref={magnetic} to={to} className={`${base} ${styles} ${className}`}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a ref={magnetic} href={href} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    )
  }
  return (
    <button
      ref={magnetic}
      type={type}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {content}
    </button>
  )
}
