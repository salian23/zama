import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import WordReveal from '../components/ui/WordReveal'

const TIMELINE = [
  {
    year: '2014',
    title: 'A Single Garden',
    body: 'Founder Mei Lin returns from a mountain tea region with three kilos of oolong and an idea.',
  },
  {
    year: '2017',
    title: 'Direct Trade Begins',
    body: 'Gilded Leaf signs its first direct-trade agreements, cutting out four layers of middlemen.',
  },
  {
    year: '2020',
    title: 'The Tasting Room Opens',
    body: 'Our first physical house opens its doors — part tea bar, part quiet sanctuary.',
  },
  {
    year: '2024',
    title: 'Four Regions, One Standard',
    body: 'We now source from four mountain regions, all held to the same unhurried standard.',
  },
]

const VALUES = [
  {
    title: 'Radical Traceability',
    body: 'Every tin lists the garden, the harvest week, and the grower who picked it.',
  },
  {
    title: 'Fair, Above-Market Pay',
    body: 'We pay growers 30–60% above regional averages, and we publish the math.',
  },
  {
    title: 'Small, Deliberate Batches',
    body: 'We roast and pack in batches under 40kg so nothing sits and nothing is rushed.',
  },
  {
    title: 'Zero Filler Blends',
    body: 'No dust, no fannings, no flavoring oils standing in for real leaf character.',
  },
]

export default function About() {
  return (
    <main className="relative">
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/tea-garden.mp4"
          poster="/images/tea-garden-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/60" />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="eyebrow text-gold-300 mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl text-cream"
          >
            Grown Slowly,
            <br />
            Held Gently
          </motion.h1>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <WordReveal
            as="p"
            text="“We didn’t set out to build a tea brand. We set out to protect a way of drinking tea that the modern world keeps trying to speed past.”"
            className="font-display text-2xl md:text-3xl text-cream/85 leading-relaxed"
            stagger={0.05}
            amount={0.5}
          />
          <p className="mt-6 eyebrow text-gold-300/80">Mei Lin, Founder</p>
        </div>
      </section>

      <section className="relative bg-tea-950/40 border-y border-cream/10 px-6 md:px-10 py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="A Decade, Roughly" title="How We Got Here" />
          <div className="mt-20 space-y-16">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start border-l border-gold-400/30 md:border-l-0 pl-6 md:pl-0"
              >
                <span className="font-display text-4xl text-gold-400">
                  {item.year}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-cream/60 leading-relaxed max-w-xl">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What We Won't Compromise" title="Our Values" />
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl border border-cream/10 p-8 hover:border-gold-400/40 transition-colors duration-500"
              >
                <div className="h-10 w-10 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mb-6">
                  <span className="text-gold-300 font-display text-lg">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl text-cream mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-cream/55 leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight max-w-2xl mx-auto">
            Come taste what a decade of patience actually tastes like.
          </h2>
          <div className="mt-10">
            <Button to="/shop">Shop the Collection</Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
