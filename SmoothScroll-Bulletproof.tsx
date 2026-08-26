'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    let cancelled = false
    let lenisRef: any = null

    import('lenis').then(mod => {
      if (cancelled) return
      
      const Lenis = mod.default
      const lenis = new Lenis({ 
        lerp: 0.08, 
        smoothWheel: true, 
        gestureOrientation: 'vertical' 
      })
      lenisRef = lenis
      
      ;(window as any).lenis = lenis 
      
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time: any) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    })

    return () => {
      cancelled = true
      if (lenisRef) {
        lenisRef.destroy()
        ;(window as any).lenis = null
      }
    }
  }, [])

  return null
}