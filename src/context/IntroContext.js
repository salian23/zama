import { createContext, useContext } from 'react'

// True once the preloader curtain has lifted, so the home hero can begin its
// choreographed entrance in sync with the reveal instead of animating behind
// the curtain.
export const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)
