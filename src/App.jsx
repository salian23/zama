import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import PageCurtain from './components/PageCurtain'
import ScrollProgress from './components/ScrollProgress'
import useSmoothScroll from './hooks/useSmoothScroll'
import { IntroContext } from './context/IntroContext'

// Route-level code splitting: each page (and its heavy 3D/video deps) loads
// on demand, so inner pages aren't blocked by the home hero's WebGL bundle.
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

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
        <CustomCursor />
        <ScrollProgress />
        <PageCurtain />
        <div className="film-grain" />
        <div className="vignette" />
        <Navbar />
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </IntroContext.Provider>
  )
}
