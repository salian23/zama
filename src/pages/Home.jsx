import { useRef } from 'react'
import { motion } from 'framer-motion'
import TeaScene from '../components/three/TeaScene'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/ui/ProductCard'
import { PRODUCTS } from '../data/products'

const STEPS = [
  {
    n: '01',
    title: 'Harvested at Dawn',
    body: 'Leaves are hand-picked in the first light, when essential oils are at their peak.',
  },
  {
    n: '02',
    title: 'Rested & Roasted',
    body: 'Small batches rest, oxidize, and roast under the eye of a single tea master.',
  },
  {
    n: '03',
    title: 'Steeped Slowly',
    body: 'We favor low, patient temperatures — every leaf deserves a full unfurling.',
  },
  {
    n: '04',
    title: 'Savored Fully',
    body: 'Poured into your cup, exactly as it left the mountain. No shortcuts, ever.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'The Moonlit Oolong tastes like something you’d be handed in a dream. Genuinely transportive.',
    name: 'R. Ashworth',
  },
  {
    quote:
      'I have never felt a brand understand ritual the way Gilded Leaf does. Every detail is intentional.',
    name: 'M. Okafor',
  },
  {
    quote:
      'Silver Needle changed how I think about white tea entirely. Impossibly delicate.',
    name: 'S. Laurent',
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const featured = PRODUCTS.slice(0, 4)

  return (
    <main className="relative">
      <section ref={heroRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <TeaScene sectionRef={heroRef} className="absolute inset-0" />

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="eyebrow text-gold-300 mb-6"
            >
              Est. for slow mornings
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] text-cream max-w-4xl"
            >
              Steep Into
              <br />
              <span className="text-gold-400">Stillness</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75 }}
              className="mt-6 max-w-xl text-cream/60 text-base md:text-lg"
            >
              Rare leaves, sourced from single gardens and poured with
              intention. This is tea as a cinematic ritual, not a routine.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button to="/shop">Explore the Menu</Button>
              <Button to="/about" variant="ghost">
                Our Story
              </Button>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest2 text-cream/40">
              Scroll
            </span>
            <div className="h-10 w-px bg-gradient-to-b from-cream/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="relative bg-ink-950 px-6 md:px-10 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="This Season's Harvest"
            title="Featured Teas"
          />
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Button to="/shop" variant="ghost">
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Full-bleed cinematic pour banner */}
      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/tea-pour.mp4"
          poster="/images/tea-pour-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/40 to-ink-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />

        <div className="relative z-10 flex h-full items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-7xl w-full px-6 md:px-10"
          >
            <span className="eyebrow text-gold-300 mb-5 block">
              The Pour
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-cream leading-[1.02] max-w-2xl">
              Every cup begins
              <br /> with a slow pour.
            </h2>
            <p className="mt-6 max-w-md text-cream/70 leading-relaxed">
              No rush, no shortcuts — just amber liquor caught in the light,
              exactly as it should be.
            </p>
            <div className="mt-9">
              <Button to="/shop">Find Your Steep</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-tea-950/40 border-y border-cream/10 px-6 md:px-10 py-28 overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow text-gold-300 mb-4 block">
              A Philosophy, Not a Product
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
              Tea is the pause your day forgot it needed.
            </h2>
            <p className="mt-6 text-cream/60 leading-relaxed max-w-lg">
              We work directly with fourth-generation growers across four
              mountain regions, paying well above market rate for leaves
              picked at their peak. What arrives in your cup is unhurried,
              traceable, and honest.
            </p>
            <div className="mt-8">
              <Button to="/about" variant="ghost">
                Read Our Story
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-3xl overflow-hidden border border-gold-400/20"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/tea-steam.mp4"
              poster="/images/tea-steam-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
            <div className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_70%_75%,rgba(212,162,74,0.35),transparent_55%)]" />
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="The Ritual" title="From Mountain to Mug" />
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative border-t border-gold-400/30 pt-6"
              >
                <span className="font-display text-5xl text-gold-400/60">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-2xl text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-cream/55 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 px-6 md:px-10 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Whispers From Our Table" title="Kind Words" />
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="rounded-2xl border border-cream/10 bg-ink-800/50 p-8"
              >
                <p className="font-display text-xl text-cream/90 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 eyebrow text-gold-300/80">
                  {t.name}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,162,74,0.12),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Your next quiet moment
            <br /> is one pour away.
          </h2>
          <div className="mt-10">
            <Button to="/shop">Shop the Collection</Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
