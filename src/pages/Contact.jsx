import { useState } from 'react'
import { motion } from 'framer-motion'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters.'
    }
    return next
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
      setForm(initialForm)
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <main className="relative">
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/tea-leaf-water.mp4"
          poster="/images/tea-leaf-water-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/60" />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="eyebrow text-gold-300 mb-6"
          >
            Say Hello
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl text-cream"
          >
            Let&rsquo;s Talk Tea
          </motion.h1>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h3 className="eyebrow text-gold-300 mb-3">Visit the House</h3>
              <p className="text-cream/70">14 Amber Lane</p>
              <p className="text-cream/70">Kyoto-dori District</p>
              <p className="text-cream/70">Open daily, 8am – 7pm</p>
            </div>
            <div>
              <h3 className="eyebrow text-gold-300 mb-3">Write to Us</h3>
              <p className="text-cream/70">hello@bethtea.co.uk</p>
              <p className="text-cream/70">+1 (555) 013-9284</p>
            </div>
            <div>
              <h3 className="eyebrow text-gold-300 mb-3">Wholesale &amp; Press</h3>
              <p className="text-cream/70">trade@bethtea.co.uk</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 rounded-2xl border border-cream/10 bg-ink-800/40 p-8 md:p-10"
          >
            <div>
              <label className="eyebrow text-cream/60 block mb-2">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                className="w-full bg-transparent border-b border-cream/20 py-2 text-cream focus:outline-none focus:border-gold-400 transition-colors"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="eyebrow text-cream/60 block mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                className="w-full bg-transparent border-b border-cream/20 py-2 text-cream focus:outline-none focus:border-gold-400 transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="eyebrow text-cream/60 block mb-2">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                className="w-full bg-transparent border-b border-cream/20 py-2 text-cream focus:outline-none focus:border-gold-400 transition-colors resize-none"
                placeholder="Tell us what's steeping on your mind..."
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gold-400 py-3.5 text-xs uppercase tracking-widest2 font-semibold text-ink-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_0_30px_rgba(212,162,74,0.35)]"
            >
              Send Message
            </button>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-tea-300"
              >
                Thank you — we&rsquo;ll write back within a day or two.
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>
    </main>
  )
}
