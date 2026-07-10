import { motion } from 'framer-motion'
import LeafBackground from '../components/LeafBackground'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import Parallax from '../components/ui/Parallax'
import FocusReveal from '../components/ui/FocusReveal'
import WordReveal from '../components/ui/WordReveal'
import RitualSequence from '../components/RitualSequence'

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
      'I have never felt a brand understand ritual the way Beth Tea does. Every detail is intentional.',
    name: 'M. Okafor',
  },
  {
    quote:
      'Silver Needle changed how I think about white tea entirely. Impossibly delicate.',
    name: 'S. Laurent',
  },
]

const UGC = [
  {
    video: '/videos/ugc-1.mp4',
    poster: '/images/ugc-1-poster.jpg',
    name: 'Elise',
    handle: '@slow.mornings',
    caption: 'My whole morning slowed down the day this arrived.',
  },
]

export default function Home() {
  return (
    <main className="relative">
      <LeafBackground
        image="/images/home-leaf-bg.webp"
        staticImage
        scale={1.04}
        edges="/images/home-leaf-edges.png"
        edgeColor="#3fe6b3"
      />
      <div className="relative z-10">
      {/* Minimal hero: the fixed leaf background shows through this transparent
          panel (no 3D cup, no words — placeholder while the top is reworked). */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="h-10 w-px bg-gradient-to-b from-cream/50 to-transparent" />
        </motion.div>
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

          <Parallax speed={40}>
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
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
              <div className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_70%_75%,rgba(212,162,74,0.35),transparent_55%)]" />
            </motion.div>
          </Parallax>
        </div>
      </section>

      <RitualSequence
        eyebrow="The Ritual"
        title="From Mountain to Mug"
        steps={STEPS}
      />

      {/* Full-bleed cinematic pour banner — after the ritual journey */}
      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <Parallax speed={70} className="absolute inset-x-0 -inset-y-[14%]">
          <video
            className="h-full w-full object-cover"
            src="/videos/tea-pour.mp4"
            poster="/images/tea-pour-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </Parallax>
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

      <section className="relative bg-ink-900/55 px-6 md:px-10 py-28">
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
                <WordReveal
                  as="p"
                  text={`“${t.quote}”`}
                  className="font-display text-xl text-cream/90 leading-relaxed italic"
                  stagger={0.03}
                  amount={0.4}
                />
                <footer className="mt-6 eyebrow text-gold-300/80">
                  {t.name}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Real Rituals" title="Loved by Quiet Mornings" />
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {UGC.map((u, i) => (
              <motion.figure
                key={u.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-ink-800/50"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <video
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={u.video}
                    poster={u.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
                  <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-ink-950/40 px-3 py-1 text-[10px] uppercase tracking-widest2 text-cream/80 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> Real customer
                  </span>
                  <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-display text-xl text-cream leading-snug">
                      &ldquo;{u.caption}&rdquo;
                    </p>
                    <p className="mt-3 text-sm text-gold-300/90">
                      {u.name} <span className="text-cream/40">· {u.handle}</span>
                    </p>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,162,74,0.12),transparent_60%)]" />
        <FocusReveal amount={0.5} className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Your next quiet moment
            <br /> is one pour away.
          </h2>
          <div className="mt-10">
            <Button to="/shop">Shop the Collection</Button>
          </div>
        </FocusReveal>
      </section>
      </div>
    </main>
  )
}
