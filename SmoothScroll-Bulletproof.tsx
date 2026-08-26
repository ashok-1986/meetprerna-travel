'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// BULLETPROOF SmoothScroll.tsx - fixes Race Condition #2
export default function SmoothScroll() {
  const lenisRef = useRef<any>(null)
  const rafRef = useRef<(time: number) => void>(null)

  useEffect(() => {
    let cancelled = false
    gsap.registerPlugin(ScrollTrigger)

    const init = async () => {
      try {
        const mod = await import('lenis')
        if (cancelled) return // Fix #2: abort if unmounted before import finishes

        const Lenis = mod.default
        const lenis = new Lenis({
          lerp: 0.08,
          smoothWheel: true,
          gestureOrientation: 'vertical',
        })

        lenisRef.current = lenis
        lenis.on('scroll', ScrollTrigger.update)

        const raf = (time: number) => lenis.raf(time * 1000)
        rafRef.current = raf
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)
      } catch (e) {
        console.error('Lenis failed to load', e)
      }
    }

    init()

    return () => {
      cancelled = true // Fix #2: prevents Lenis init after unmount
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current)
        rafRef.current = null
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  return null
}
