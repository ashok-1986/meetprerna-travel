'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const SCENES = [
  {
    id: 1,
    title: 'ARRIVAL',
    text: 'Every journey begins by arriving without rushing.',
    img: '/images/misty_mountain_valley.webp',
    alt: 'Misty mountain valley',
  },
  {
    id: 2,
    title: 'ATTENTION',
    text: 'We look for the details that make a place feel like itself.',
    img: '/images/mystical_forest_cathedral.webp',
    alt: 'Mystical forest cathedral',
  },
  {
    id: 3,
    title: 'CONNECTION',
    text: 'The story is never only the view. It is the feeling of being there.',
    img: '/images/bare_feet_stream.webp',
    alt: 'Bare feet in a mountain stream',
  },
  {
    id: 4,
    title: 'TRANSLATION',
    text: 'What we notice becomes a photograph, a reel, a story—or something you carry with you.',
    img: '/images/Wayanad_Canopy_Homes.webp',
    alt: 'Wayanad Canopy Homes',
  },
  {
    id: 5,
    title: 'INVITATION',
    text: 'If your place has a feeling, let’s find its story.',
    img: '/images/goa_beach_sunset.webp',
    alt: 'Goa beach sunset',
    hasCta: true
  }
]

// Intent constants
const PROPERTY_MSG = encodeURIComponent("Hi Prerna, I’m interested in a travel-content collaboration for [property/location]. We’re considering [deliverables], for [dates]. Here’s a little about the stay: [details].")
const TRAVELLER_MSG = encodeURIComponent("Hi Prerna, I’m [name] and I’m interested in a hand-poked tattoo experience. My preferred location/date is [location/date], and the idea I have in mind is [idea].")
const getWaLink = (msg: string) => `https://wa.me/917738147935?text=${msg}`

export default function TravelJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isReduced) {
      setEnhanced(true)
    }
  }, [])

  useEffect(() => {
    if (!enhanced || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states for elements except the first
      gsap.set('.journey-img:not(.journey-img-0)', { opacity: 0, scale: 1.2, filter: 'blur(20px)' })
      gsap.set('.journey-text:not(.journey-text-0)', { opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' })
      
      // First element starts normal
      gsap.set('.journey-img-0', { opacity: 1, scale: 1, filter: 'blur(0px)' })
      gsap.set('.journey-text-0', { opacity: 1, y: 0, scale: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      })

      // Create the sequence
      const sceneDuration = 1
      const transitionDuration = 0.8 // Increased for smoother crossfades
      
      // First scene scales gently
      tl.to('.journey-img-0', { scale: 1.05, duration: sceneDuration, ease: 'none' })
      
      // Subsequent scenes
      for (let i = 1; i < SCENES.length; i++) {
        // Fade out previous text with a scale up and blur
        tl.to(`.journey-text-${i-1}`, { opacity: 0, y: -80, scale: 1.1, filter: 'blur(10px)', duration: transitionDuration, ease: 'power2.inOut' }, `scene${i}`)
        
        // Push old image back and blur
        tl.to(`.journey-img-${i-1}`, { scale: 1.1, filter: 'blur(15px)', duration: transitionDuration, ease: 'power2.inOut' }, `scene${i}`)
        
        // Bring in new image from blurred state
        tl.to(`.journey-img-${i}`, { opacity: 1, scale: 1.05, filter: 'blur(0px)', duration: transitionDuration, ease: 'power2.inOut' }, `scene${i}`)
        
        // Bring in new text from below with scale up
        tl.to(`.journey-text-${i}`, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: transitionDuration, ease: 'power3.out' }, `scene${i}+=0.2`)
        
        // Animate current image slightly while active
        tl.to(`.journey-img-${i}`, { scale: 1, duration: sceneDuration, ease: 'none' })
      }
    })
    
    return () => {
      ctx.revert()
    }
  }, [enhanced])

  return (
    <section id="journey" className="relative w-full bg-[#1A1A18] text-white">
      
      {/* 
        DESKTOP CTAs (Exposed before animation sequence)
      */}
      {enhanced && (
        <div className="hidden md:flex justify-center gap-6 py-12 bg-[#1A1A18]">
            <Link href={getWaLink(PROPERTY_MSG)} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#E8DCC6] transition-colors font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A18] focus:ring-white">
               Discuss a collaboration
            </Link>
            <Link href={getWaLink(TRAVELLER_MSG)} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A18] focus:ring-white">
               Book a tattoo experience
            </Link>
        </div>
      )}

      {/* 
        DESKTOP & JS ENABLED SCROLLYTELLING
        Uses a sticky container that tracks progress over 500vh 
      */}
      {enhanced && (
        <div 
          ref={containerRef} 
          className="hidden md:block relative h-[500vh]"
        >
          <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
             {/* Layered Images */}
             {SCENES.map((scene, i) => (
               <div 
                  key={`img-${scene.id}`} 
                  className={`journey-img journey-img-${i} absolute inset-0 z-0 origin-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
               >
                  <img src={scene.img} alt={scene.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40"></div>
               </div>
             ))}

             {/* Layered Text */}
             <div className="absolute inset-0 flex items-center justify-center p-10 z-10 pointer-events-none">
                {SCENES.map((scene, i) => (
                  <div 
                    key={`txt-${scene.id}`} 
                    className={`journey-text journey-text-${i} absolute flex flex-col items-center text-center w-full max-w-[1200px] px-8 ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="font-body text-[14px] uppercase tracking-[0.2em] text-[#E8DCC6] mb-8 drop-shadow-md">{scene.title}</div>
                    <h2 className="font-header text-[60px] md:text-[120px] leading-[1.05] tracking-tight text-white drop-shadow-2xl">{scene.text}</h2>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
      
      {/* 
        MOBILE FALLBACK (or JS disabled fallback for desktop)
        Stacks the scenes sequentially.
      */}
      <div className={`${enhanced ? 'md:hidden' : ''} flex flex-col`}>
        {SCENES.map((scene) => (
          <div key={`mob-${scene.id}`} className="relative min-h-[90vh] flex items-center justify-center p-8 overflow-hidden">
             <div className="absolute inset-0 z-0">
               <img src={scene.img} alt={scene.alt} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40"></div>
             </div>
             
             <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
                <div className="font-body text-[12px] uppercase tracking-[0.2em] text-[#E8DCC6] mb-6 drop-shadow-md">{scene.title}</div>
                <h2 className="font-header text-[48px] leading-[1.1] text-white drop-shadow-lg">{scene.text}</h2>
             </div>
          </div>
        ))}
        {/* Stacked CTAs at the end of mobile layout */}
        <div className="bg-[#1A1A18] py-16 flex flex-col items-center justify-center px-6">
           <div className="flex flex-col gap-4 w-full max-w-[280px]">
              <Link href={getWaLink(PROPERTY_MSG)} target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-full bg-white text-black text-center font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A18] focus:ring-white">
                Discuss a collaboration
              </Link>
              <Link href={getWaLink(TRAVELLER_MSG)} target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-full border border-white/40 text-white text-center font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A18] focus:ring-white">
                Book a tattoo experience
              </Link>
           </div>
        </div>
      </div>
      
    </section>
  )
}
