import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <span className="font-display text-2xl text-cream">
            Gilded <span className="text-gold-400">Leaf</span>
          </span>
          <p className="mt-4 text-sm text-cream/50 leading-relaxed max-w-xs">
            Rare leaves, slow steeps, and rituals worth savoring. A tea house
            for the quietly obsessed.
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-cream/80 mb-4">Explore</h4>
          <ul className="space-y-3 text-sm text-cream/50">
            <li><Link to="/" className="hover:text-gold-300 transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gold-300 transition-colors">Shop</Link></li>
            <li><Link to="/about" className="hover:text-gold-300 transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold-300 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-cream/80 mb-4">Visit</h4>
          <ul className="space-y-3 text-sm text-cream/50">
            <li>14 Amber Lane</li>
            <li>Kyoto-dori District</li>
            <li>Open daily, 8am – 7pm</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-cream/80 mb-4">Stay Steeped</h4>
          <p className="text-sm text-cream/50 mb-4">
            Seasonal harvests &amp; slow-living notes, once a month.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center border-b border-cream/20 focus-within:border-gold-400 transition-colors"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="bg-transparent flex-1 py-2 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
            />
            <button
              type="submit"
              className="text-gold-300 text-xs uppercase tracking-widest2 pb-2"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/30">
          <span>&copy; {new Date().getFullYear()} Gilded Leaf Tea House. All rights reserved.</span>
          <span>Crafted with quiet obsession.</span>
        </div>
      </div>
    </footer>
  )
}
