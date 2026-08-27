'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TravelJourney from './components/TravelJourney'

const WA_NUMBER = "917738147935";
const EMAIL = "prerna@meetprerna.com";

const getWaLink = (template: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(template)}`;

const TRAVELLER_MSG = "Hi Prerna, I’m [name] and I’m interested in a hand-poked tattoo experience. My preferred location/date is [location/date], and the idea I have in mind is [idea].";
const PROPERTY_MSG = "Hi Prerna, I’m interested in a travel-content collaboration for [property/location]. We’re considering [deliverables], for [dates]. Here’s a little about the stay: [details].";
const FALLBACK_MSG = "Hi Prerna, I'm reaching out from your website.";

export default function Page() {
  const ctxRef = useRef<gsap.Context | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.hero-word span', { y: '0%' })
        gsap.set('.hero-sub', { y: 0, opacity: 1 })
        gsap.set('.hero-img-1', { opacity: 0 })
      } else {
        gsap.to('.hero-word span', { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.3 })
        gsap.to('.hero-sub', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 })
        
        const tl = gsap.timeline({ repeat: -1 })
        
        // Base state
        gsap.set('.hero-img-0', { opacity: 1, scale: 1.04, zIndex: 1 })
        gsap.set('.hero-img-1', { opacity: 0, scale: 1.04, zIndex: 2 })

        // 1. Img 0 scales
        tl.to('.hero-img-0', { scale: 1.09, duration: 8, ease: 'none' })
        
        // 2. Img 0 fades out, Img 1 fades in and starts scaling
        tl.to('.hero-img-0', { opacity: 0, duration: 1.5, ease: 'power1.inOut' }, "-=1.5")
        tl.to('.hero-img-1', { opacity: 1, duration: 1.5, ease: 'power1.inOut' }, "-=1.5")
        tl.to('.hero-img-1', { scale: 1.09, duration: 8, ease: 'none' }, "-=1.5")
        
        // 3. Img 1 fades out, Img 0 fades back in
        tl.set('.hero-img-0', { scale: 1.04 }, "-=1.5")
        tl.to('.hero-img-1', { opacity: 0, duration: 1.5, ease: 'power1.inOut' }, "-=1.5")
        tl.to('.hero-img-0', { opacity: 1, duration: 1.5, ease: 'power1.inOut' }, "-=1.5")
        tl.to('.hero-img-0', { scale: 1.05, duration: 1.5, ease: 'none' }, "-=1.5")
        
        // 4. Loop boundary resets
        tl.set('.hero-img-1', { opacity: 0, scale: 1.04, zIndex: 2 })
        tl.set('.hero-img-0', { opacity: 1, zIndex: 1 })
      }
    })
    ctxRef.current = ctx

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const prog = document.getElementById('progress')
      if (prog) {
        prog.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 + '%'
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const obs = new IntersectionObserver((ents) => ents.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('active')
    }), { threshold: 0.15 })
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      obs.disconnect()
      ctxRef.current?.revert()
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 50)
    } else {
      if (document.activeElement && document.activeElement !== document.body) {
        menuToggleRef.current?.focus()
      }
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <>
      <style>{`
        .grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .reveal { opacity: 0; transform: translateY(14px); transition: all 0.9s cubic-bezier(0.16,1,0.3,1) }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .hero-word { overflow: hidden; display: inline-block }
        .hero-word span { display: inline-block; transform: translateY(105%) }
        .hero-sub { opacity: 0; transform: translateY(12px) }
        @media (prefers-reduced-motion: reduce) {
          .grain { display: none; }
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <div className="grain"></div>
      <div id="progress" style={{position:'fixed',top:0,left:0,height:'2px',background:'#C86B5A',width:'0%',zIndex:9999}}></div>

      <header>
        <nav className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${scrolled || menuOpen ? 'bg-[#FFFCF5]/90 backdrop-blur-xl border-black/5 text-black' : 'bg-transparent border-white/10 text-white'}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
            <Link href="/" className="font-header text-[22px] z-50 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded">prerna.</Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-[13px] font-body">
              <Link href="#journey" className="opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1">Journey</Link>
              <Link href="#work" className="opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1">Work</Link>
              <Link href="#travellers" className="opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1">Travellers</Link>
              <Link href="#stays" className="opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1">Stays</Link>
              <Link href="#about" className="opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1">About</Link>
              <Link href={getWaLink(FALLBACK_MSG)} target="_blank" rel="noopener noreferrer" className={`px-5 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C86B5A] ${scrolled || menuOpen ? 'bg-black text-white' : 'bg-white text-black'}`}>WhatsApp Prerna</Link>
            </div>

            {/* Mobile Nav Toggle */}
            <button 
              ref={menuToggleRef}
              className="md:hidden z-50 p-2 focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
            >
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-transform duration-300" style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
              <div className="w-6 h-0.5 bg-current transition-opacity duration-300" style={{ opacity: menuOpen ? 0 : 1 }}></div>
              <div className="w-6 h-0.5 bg-current mt-1.5 transition-transform duration-300" style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></div>
            </button>
          </div>

          {/* Mobile Nav Panel */}
          <div id="mobile-nav-panel" aria-hidden={!menuOpen} {...(!menuOpen ? { inert: "true" } : {})} className={`md:hidden fixed inset-0 bg-[#FFFCF5] pt-[100px] px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'}`}>
            <div className="flex flex-col gap-6 text-[24px] font-header text-[#1A1A18]">
              <Link ref={firstLinkRef} href="#journey" onClick={() => setMenuOpen(false)}>Journey</Link>
              <Link href="#work" onClick={() => setMenuOpen(false)}>Work</Link>
              <Link href="#travellers" onClick={() => setMenuOpen(false)}>Travellers</Link>
              <Link href="#stays" onClick={() => setMenuOpen(false)}>Stays</Link>
              <Link href="#about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
            <div className="mt-12">
              <Link href={getWaLink(FALLBACK_MSG)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-full bg-black text-white font-body text-[14px]">WhatsApp Prerna</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" aria-labelledby="hero-title" className="relative h-[100vh] min-h-[640px] overflow-hidden bg-[#1A1A18]">
          <div className="absolute inset-0">
            <img src="/images/golden_tea_plantation.webp" alt="Prerna walking through golden hour tea rows in Munnar" className="hero-img-0 absolute inset-0 w-full h-full object-cover origin-center" style={{ objectPosition: 'center 60%' }} />
            <img src="/images/cinematic_temple_portrait.webp" alt="Prerna photographing a colourful temple Gopuram at sunset" className="hero-img-1 absolute inset-0 w-full h-full object-cover origin-center" style={{ objectPosition: 'center 40%' }} />
            {/* Dark bottom gradient overlay to protect text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10"></div>
          </div>
          
          <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 pointer-events-none">
            <h1 id="hero-title" className="font-header text-[44px] md:text-[78px] leading-[0.88] text-white max-w-[760px]">
              <span className="hero-word"><span>Where journeys</span></span><br/>
              <span className="hero-word"><span className="italic text-[#E8DCC6]">become something lasting.</span></span>
            </h1>
            <p className="hero-sub font-body text-[16px] md:text-[18px] text-white/80 max-w-[520px] mt-6">
              Prerna and Ashok travel slowly, notice deeply, and turn meaningful places into hand-poked tattoos and property travel-content collaborations.
            </p>
            <div className="hero-sub flex flex-wrap gap-4 mt-8 font-body text-[14px] pointer-events-auto">
              <Link href="#travellers" className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#E8DCC6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C86B5A]">For travellers</Link>
              <Link href="#stays" className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C86B5A]">For stays & properties</Link>
            </div>
          </div>
        </section>

        {/* SHORT JOURNEY STATEMENT */}
        <section aria-labelledby="statement-title" className="py-24 md:py-32 bg-[#FFFCF5]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 reveal">
            <div className="max-w-[800px] mx-auto text-center">
              <h2 id="statement-title" className="font-header text-[32px] md:text-[46px] leading-[1.2] text-[#1A1A18]">
                Prerna and Ashok travel slowly enough to notice what makes a place feel like itself.
              </h2>
              <p className="mt-8 font-body text-[16px] leading-[1.7] opacity-80 text-[#1A1A18]">
                They collect those moments—not as generic tourism content, but as memories, textures, encounters, and stories. That same way of looking is what they offer to travellers and thoughtful stays.
              </p>
            </div>
          </div>
        </section>

        {/* SCROLLYTELLING TRAVEL DIARY */}
        <TravelJourney />

        {/* AUDIENCE SPLIT */}
        <section id="audiences" aria-labelledby="audiences-title" className="py-20 md:py-28 bg-[#FFFCF5]">
          <h2 id="audiences-title" className="sr-only">Our Offerings</h2>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-6 reveal">
              <div className="p-10 md:p-14 rounded-[28px] bg-white border border-black/5 flex flex-col justify-center hover:shadow-lg transition-shadow">
                <h3 className="font-header text-[32px] mb-4 text-[#1A1A18]">For travellers</h3>
                <p className="font-body text-[15px] opacity-70 mb-8 max-w-[400px]">Meaningful hand-poked tattoos connected to a journey or a memory you want to carry with you.</p>
                <Link href="#travellers" className="font-body text-[13px] uppercase tracking-wider text-[#C86B5A] hover:opacity-70 self-start focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1 -ml-1">Explore tattoo experiences &rarr;</Link>
              </div>
              <div className="p-10 md:p-14 rounded-[28px] bg-white border border-black/5 flex flex-col justify-center hover:shadow-lg transition-shadow">
                <h3 className="font-header text-[32px] mb-4 text-[#1A1A18]">For stays & properties</h3>
                <p className="font-body text-[15px] opacity-70 mb-8 max-w-[400px]">Honest, place-led travel content—photography, cinematic reels, and writing that translates the feeling of a place.</p>
                <Link href="#stays" className="font-body text-[13px] uppercase tracking-wider text-[#C86B5A] hover:opacity-70 self-start focus:outline-none focus:ring-2 focus:ring-[#C86B5A] rounded px-1 -ml-1">Explore collaborations &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* WORK GALLERY / PROOF */}
        <section id="work" aria-labelledby="work-title" className="py-20 md:py-28 bg-[#FFFCF5]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-wrap justify-between items-end gap-6 mb-12 reveal text-[#1A1A18]">
              <div>
                <h2 id="work-title" className="font-header text-[36px] md:text-[54px] leading-[0.9]">Selected work &amp;<br/><span className="italic text-[#C86B5A]">real places.</span></h2>
              </div>
              <p className="font-body text-[14px] opacity-70 max-w-[400px]">Every image here comes from a real place, real day, and real point of view. Honest travel storytelling and documentation.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-5 text-white">
              {/* Featured 8-col */}
              <div className="md:col-span-8 reveal rounded-[24px] overflow-hidden bg-[#1A1A18] border border-black/10 group">
                <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-[#262626]">
                  <img src="/images/tea_garden_panorama.webp" alt="Prerna photographing a tea garden panorama" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-header text-[24px]">Morning mist in the estate</h3>
                  <p className="font-body text-[13px] opacity-60 mt-1">Light-touch editing that keeps the place believable.</p>
                </div>
              </div>

              {/* Sidebar 4-col stack */}
              <div className="md:col-span-4 grid grid-rows-2 gap-5">
                <div className="reveal rounded-[24px] overflow-hidden bg-[#1A1A18] border border-black/10 group flex flex-col">
                  <div className="flex-1 min-h-[180px] overflow-hidden bg-[#262626]">
                    <img src="/images/misty_forest_portrait.webp" alt="Prerna in a misty forest cathedral in Lamahatta" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
                  </div>
                  <div className="p-5"><h3 className="font-header text-[20px]">Forest cathedral</h3></div>
                </div>
                <div className="reveal rounded-[24px] overflow-hidden bg-[#1A1A18] border border-black/10 group flex flex-col">
                  <div className="flex-1 min-h-[180px] overflow-hidden bg-[#262626]">
                    <img src="/images/cozy_balcony_mountain_view.webp" alt="Cozy balcony with mountain view" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
                  </div>
                  <div className="p-5"><h3 className="font-header text-[20px]">Slow mornings</h3></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRAVELLER EXPERIENCE */}
        <section id="travellers" aria-labelledby="travellers-title" className="py-20 md:py-28 bg-[#FFFCF5]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center reveal">
              <div className="md:col-span-5 aspect-[3/4] bg-[#E8DCC6] rounded-[28px] overflow-hidden order-2 md:order-1">
                <img src="/images/cozy_neon_studio.webp" alt="Prerna hand-poking a tattoo in a cozy neon studio" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-7 order-1 md:order-2">
                <div className="font-body text-[11px] uppercase tracking-[0.2em] opacity-50 mb-4 text-[#C86B5A]">For Travellers</div>
                <h2 id="travellers-title" className="font-header text-[36px] md:text-[52px] leading-[1.05] text-[#1A1A18] mb-8">A tattoo that belongs<br/>to the journey.</h2>
                
                <div className="space-y-6 font-body text-[15px] leading-[1.6] opacity-80 text-[#1A1A18] mb-10 max-w-[560px]">
                  <p>Hand-poked work is inherently slow, intentional, and quiet. There are no machines, just a needle, ink, and time. It is a process shaped by the place you are in, the story you are carrying, and the time you have to make it meaningful.</p>
                  
                  <ul className="space-y-3 pt-4 border-t border-black/10">
                    <li className="flex items-start gap-3"><span className="text-[#C86B5A] mt-1">•</span><strong>Share the idea:</strong> Tell me what you want to carry with you.</li>
                    <li className="flex items-start gap-3"><span className="text-[#C86B5A] mt-1">•</span><strong>Shape the design:</strong> We refine the visual to fit the hand-poked medium.</li>
                    <li className="flex items-start gap-3"><span className="text-[#C86B5A] mt-1">•</span><strong>Meet and make it:</strong> Sessions happen in curated spaces across Mumbai, Goa, and the mountains. Drink water, eat well before arriving, and bring an open mind.</li>
                  </ul>
                </div>
                
                <Link href={getWaLink(TRAVELLER_MSG)} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full bg-[#1A1A18] text-white hover:bg-[#C86B5A] transition-colors font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C86B5A]">Start a tattoo enquiry</Link>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTY COLLABORATION STORY */}
        <section id="stays" aria-labelledby="stays-title" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center reveal">
              <div className="md:col-span-6">
                <div className="font-body text-[11px] uppercase tracking-[0.2em] opacity-50 mb-4 text-[#C86B5A]">For Stays & Properties</div>
                <h2 id="stays-title" className="font-header text-[36px] md:text-[52px] leading-[1.05] text-[#1A1A18] mb-8">Make your place felt<br/>before guests arrive.</h2>
                
                <p className="font-body text-[15px] leading-[1.6] opacity-80 text-[#1A1A18] mb-8 max-w-[500px]">Prerna and Ashok bring the same attention they use in their own travels to a property’s story. By collecting authentic moments, textures, and light, they help future guests feel the destination.</p>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 font-body text-[14px] opacity-80 mb-10 border-l-2 border-[#C86B5A]/30 pl-6">
                  <div>• Cinematic reels</div>
                  <div>• Honest photography</div>
                  <div>• Place-led writing</div>
                  <div>• Social stories & takeovers</div>
                  <div>• Guest-facing context</div>
                  <div>• Optional tattoo pop-ups</div>
                </div>

                <Link href={getWaLink(PROPERTY_MSG)} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition-all font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">Discuss a collaboration</Link>
              </div>
              <div className="md:col-span-6 aspect-[4/3] bg-[#E8DCC6] rounded-[28px] overflow-hidden">
                <img src="/images/darjeeling_balcony_sunglasses_stay.webp" alt="Prerna enjoying a slow morning on a Darjeeling balcony" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" aria-labelledby="about-title" className="py-20 md:py-28 bg-[#1A1A18] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center reveal">
            <h2 id="about-title" className="font-header text-[42px] md:text-[56px] leading-[1.05] mb-8">Tell me where you're going <br/>&rarr; We shape the idea <br/>&rarr; <span className="italic text-[#E8DCC6]">We make something lasting.</span></h2>
            <p className="font-body text-[16px] leading-[1.7] opacity-70 max-w-[700px] mx-auto mb-6">I believe that the best work comes from slowing down. Whether I'm hand-poking a tattoo that commemorates a journey, or creating honest imagery for a remote property, the process is always rooted in the present moment.</p>
            <p className="font-body text-[16px] leading-[1.7] opacity-70">Currently working between Mumbai, Goa, and the mountains.</p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-title" className="py-24 md:py-32 bg-[#1A1A18] text-white">
          <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center reveal">
            <h2 id="contact-title" className="font-header text-[48px] md:text-[72px] mb-6">Tell me where you're going.</h2>
            <p className="font-body text-[16px] md:text-[18px] opacity-70 mb-12 max-w-[600px] mx-auto leading-relaxed">
              Send a WhatsApp message with your dates, location, and what you have in mind. If it feels like a fit, we’ll shape the next step together.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href={getWaLink(FALLBACK_MSG)} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-[#C86B5A] hover:bg-[#A85544] text-white font-body text-[15px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A18] focus:ring-[#C86B5A]">
                Message on WhatsApp
              </Link>
              <Link href={`mailto:${EMAIL}`} className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors font-body text-[15px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A18] focus:ring-white">
                Send an email
              </Link>
            </div>
            
            <div className="mt-16 font-body text-[13px] opacity-50">
              Response times vary while traveling.
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1A1A18] border-t border-white/10 py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="font-header text-[26px] text-white">prerna.</div>
          
          <div className="flex flex-wrap justify-center gap-6 font-body text-[14px] text-white/70">
            <Link href="#journey" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded">Journey</Link>
            <Link href="#travellers" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded">Travellers</Link>
            <Link href="#stays" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded">Stays</Link>
            <Link href={`mailto:${EMAIL}`} className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded">Email</Link>
            <Link href={getWaLink(FALLBACK_MSG)} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded">WhatsApp</Link>
          </div>
          
          <div className="font-body text-[12px] text-white/40">
            © {new Date().getFullYear()} Prerna. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
