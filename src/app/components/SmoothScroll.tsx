'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    let cancelled = false
    gsap.registerPlugin(ScrollTrigger)
    
    const updateScroll = (time: number) => {
      if (!cancelled && lenisRef.current) {
        lenisRef.current.raf(time * 1000)
      }
    }

    if (!lenisRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenisRef.current = new Lenis({ lerp: 0.08, smoothWheel: true })
      lenisRef.current.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(updateScroll)
      gsap.ticker.lagSmoothing(0)
    }

    return () => {
      cancelled = true
      gsap.ticker.remove(updateScroll)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])
  
  return null
}
