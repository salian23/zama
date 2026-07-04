import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import useSmoothScroll from './hooks/useSmoothScroll'
import { IntroContext } from './context/IntroContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'

// Opacity-only: a translate/scale here would force a `transform` onto this
// wrapper, which creates a new containing block and breaks `position:
// sticky` for the scroll-pinned hero canvas inside Home.
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  useSmoothScroll()
  const [introDone, setIntroDone] = useState(false)

  // Hold the inline boot-loader briefly for a deliberate arrival, then lift
  // it and start the hero's choreographed entrance in sync.
  useEffect(() => {
    const boot = document.getElementById('boot')
    const hideAt = setTimeout(() => {
      boot?.classList.add('boot-hide')
      setIntroDone(true)
    }, 2100)
    const removeAt = setTimeout(() => boot?.remove(), 3400)
    return () => {
      clearTimeout(hideAt)
      clearTimeout(removeAt)
    }
  }, [])

  return (
    <IntroContext.Provider value={introDone}>
      <div className="relative bg-ink-950 min-h-screen">
        <div className="film-grain" />
        <div className="vignette" />
        <Navbar />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/shop" element={<AnimatedPage><Shop /></AnimatedPage>} />
            <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </IntroContext.Provider>
  )
}
