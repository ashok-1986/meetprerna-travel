'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorActive, setCursorActive] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const trustedBy = [
    'Stay Canopy Homes Wayanad',
    'En Ooru Tribal Village',
    'Four Points Sheraton Sonmarg',
    'Interlude Stays Himachal'
  ]

  const btsImages = [
    { src: '/images/intimate_bw_portrait.webp', alt: 'Intimate B&W moment — leaning on shoulder, playful, real emotion' },
    { src: '/images/candid_phone_photo.webp', alt: 'Outside ENTRY gate planning with yellow sunglasses + OnePlus phone' },
  ]

  useEffect(() => {
    setMounted(true)
    
    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollTop / docHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseEnter = () => setCursorActive(true)
    const handleMouseLeave = () => setCursorActive(false)
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Initialize Lenis
    let lenis: any
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    })

    const ctx = gsap.context(() => {
      // Progress bar
      const onScroll = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        const prog = document.getElementById('progress')
        if (prog) prog.style.width = scrolled + '%'
      }
      window.addEventListener('scroll', onScroll)

      // Reveal observer - Apple Vision Pro blur+Y
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') })
      }, { threshold: 0.15 })
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

      // Parallax scale on scroll - Apple MacBook style
      gsap.utils.toArray('.parallax-img').forEach((img: any) => {
        gsap.to(img, {
          yPercent: -12,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, scrub: 1.5, start: 'top bottom', end: 'bottom top' }
        })
      })

      // Stack cards pin - Apple Services
      gsap.utils.toArray('.stack-card').forEach((card: any, i: number) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top+=${i * 20} top`,
          endTrigger: '.stack-end',
          end: 'top bottom',
          pin: true,
          pinSpacing: false,
        })
      })

      // Magnetic buttons - Apple Store
      document.querySelectorAll('.magnetic').forEach((btn: any) => {
        btn.addEventListener('mousemove', (e: any) => {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(btn, { x: x * 0.25, y: y * 0.35, duration: 0.5, ease: 'power3.out' })
        })
        btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.6 }))
      })

      // Custom cursor
      const cursor = document.getElementById('cursor')
      if (cursor && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
          gsap.to(cursor, { x: e.clientX - 12, y: e.clientY - 12, duration: 0.25, ease: 'power2.out' })
        })
        document.querySelectorAll('a,button,.stack-card').forEach(el => {
          el.addEventListener('mouseenter', () => cursor?.classList.add('hover'))
          el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'))
        })
      }

      return () => {
        window.removeEventListener('scroll', onScroll)
        observer.disconnect()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }, heroRef)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (lenis) lenis.destroy()
      ctx.revert()
    }
  }, [mounted])

  return (
    <main ref={heroRef} className="relative overflow-hidden">
      {/* Scroll progress bar */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* Custom cursor */}
      {mounted && cursorActive && (
        <div 
          className="custom-cursor" 
          style={{ 
            left: cursorPos.x, 
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)'
          }} 
          aria-hidden="true"
        />
      )}

      {/* Navigation - Sticky top 0 */}
      <header 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <nav className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-18">
            <a href="/" className="font-instrument font-normal text-charcoal text-xl md:text-2xl tracking-tight" aria-label="Prerna Home">
              prerna.
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <a href="#stays" className="font-satoshi text-sm font-medium text-charcoal/80 hover:text-terracotta transition-colors">Stays</a>
              <a href="#services" className="font-satoshi text-sm font-medium text-charcoal/80 hover:text-terracotta transition-colors">Services</a>
              <a href="#about" className="font-satoshi text-sm font-medium text-charcoal/80 hover:text-terracotta transition-colors">About</a>
              <a href="#contact" className="btn-primary text-sm magnetic-btn">Let's Talk</a>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden flex flex-col gap-5 w-6 h-5 justify-center items-center p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`w-full h-0.5 bg-charcoal transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`w-full h-0.5 bg-charcoal transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-charcoal transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu open md:hidden">
            <a href="#stays" onClick={() => setMobileMenuOpen(false)}>Stays</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary mt-4 magnetic-btn">Let's Talk</a>
          </div>
        )}

        {/* Nav background on scroll */}
        <div className="absolute inset-0 -z-10 bg-cream/80 backdrop-blur-xl border-b border-charcoal/5 opacity-0 transition-opacity duration-300" 
             style={{ opacity: mobileMenuOpen || false ? 1 : 0 }} />
      </header>

      {/* HERO + STAYS - Apple style immersive */}
      

      {/* BEHIND THE SCENES - REAL WORK, REAL MOMENTS */}
      <section id="bts" className="py-28 px-6 md:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16 reveal-up">
            <span className="section-badge">Behind the Scenes</span>
            <h2 className="section-title mt-4 mb-6">Real Work, Real Moments</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: B&W Intimate Portrait */}
            <div className="reveal-up relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={btsImages[0].src}
                alt={btsImages[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Right: Candid ENTRY Gate Planning */}
            <div className="reveal-up relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={btsImages[1].src}
                alt={btsImages[1].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Caption */}
          <div className="mt-10 max-w-3xl mx-auto text-center reveal-up">
            <p className="font-satoshi text-charcoal-light text-lg leading-relaxed">
              "No crew, no filter. Just me, my camera, and figuring it out on the ground. 
              <br />That&apos;s the story hotels get — honest, not staged."
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT - Typeform button instead of pricing */}
      <section id="contact" className="py-28 px-6 md:px-10 bg-charcoal">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-up">
              <span className="section-badge text-terracotta border-terracotta/30 bg-terracotta/10">Contact</span>
              <h2 className="section-title mt-4 mb-6 text-white">Let's Talk Offline</h2>
              <p className="section-subtitle text-white/80 mb-10">
                Tell me about your stay. Dates, vision, budget — I'll send a tailored proposal within 48 hours.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-terracotta/20 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-white">hello@meetprerna.com</p>
                    <p className="font-satoshi text-white/50 text-sm">24hr response on weekdays</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-terracotta/20 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-white">@meetprerna (Travel)</p>
                    <p className="font-satoshi text-white/50 text-sm">DM for quick questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-terracotta/20 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-white">@meetprerna.tattoos (Ink)</p>
                    <p className="font-satoshi text-white/50 text-sm">Tattoo bookings & studio</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-up">
              {/* Typeform embed placeholder - replace with actual Typeform embed code */}
              <div className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10">
                <div className="text-center mb-8">
                  <p className="font-instrument text-white text-2xl md:text-3xl font-normal mb-4">Start a Conversation</p>
                  <p className="font-satoshi text-white/60">Fill this out or book directly via Calendly</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="hotelName" 
                        name="hotelName" 
                        placeholder=" " 
                        required
                        className="form-input"
                        autoComplete="organization"
                      />
                      <label htmlFor="hotelName" className="form-label">Property Name</label>
                      <p className="form-error">Please enter your property name</p>
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="location" 
                        name="location" 
                        placeholder=" " 
                        required
                        className="form-input"
                      />
                      <label htmlFor="location" className="form-label">Location</label>
                      <p className="form-error">Please enter location</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <input 
                        type="date" 
                        id="dates" 
                        name="dates" 
                        required
                        className="form-input"
                        style={{ color: 'var(--color-charcoal)' }}
                      />
                      <label htmlFor="dates" className="form-label">Preferred Dates</label>
                      <p className="form-error">Please select dates</p>
                    </div>
                    <div className="form-group">
                      <select id="interest" name="interest" required className="form-input appearance-none bg-white cursor-pointer">
                        <option value="">What do you need?</option>
                        <option value="stay">Slow Stay Collaboration</option>
                        <option value="tattoo">Tattoo Pop-Up</option>
                        <option value="both">Stay + Tattoo Pop-Up</option>
                        <option value="custom">Custom / Not Sure</option>
                      </select>
                      <label htmlFor="interest" className="form-label">Interest</label>
                      <p className="form-error">Please select</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea 
                      id="vision" 
                      name="vision" 
                      rows={4} 
                      placeholder=" " 
                      className="form-input resize-none"
                    />
                    <label htmlFor="vision" className="form-label">Your Vision / Notes</label>
                  </div>
                  <button 
                    type="submit" 
                    className="btn-typeform w-full magnetic-btn"
                    id="submit-btn"
                  >
                    <span className="btn-text">Send Proposal Request</span>
                    <span className="btn-loading hidden inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle className="opacity-25" cx="12" cy="12" r="10" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending…
                    </span>
                  </button>
                  <p id="form-status" className="font-satoshi text-center text-sm mt-4 h-6" aria-live="polite"></p>
                  
                  {/* Calendly link */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="font-satoshi text-white/50 text-sm mb-3">Prefer to book directly?</p>
                    <a 
                      href="https://calendly.com/meetprerna.tattoos" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary magnetic-btn inline-flex items-center gap-2"
                    >
                      Book a Call on Calendly
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-10 bg-charcoal border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="font-instrument font-normal text-white text-xl md:text-2xl">prerna.</span>
              <span className="text-white/30">·</span>
              <span className="text-white/50 text-sm">Travel & Tattoo</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
              <a href="#stays" className="hover:text-terracotta transition-colors font-satoshi">Stays</a>
              <a href="#services" className="hover:text-terracotta transition-colors font-satoshi">Services</a>
              <a href="#about" className="hover:text-terracotta transition-colors font-satoshi">About</a>
              <a href="#contact" className="hover:text-terracotta transition-colors font-satoshi">Contact</a>
            </nav>
            <p className="font-satoshi text-white/30 text-xs">
              © {new Date().getFullYear()} Prerna Kesarwani. Handmade with intention.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  const submitBtn = form.querySelector('#submit-btn') as HTMLButtonElement
  const btnText = submitBtn?.querySelector('.btn-text') as HTMLElement
  const btnLoading = submitBtn?.querySelector('.btn-loading') as HTMLElement
  const statusEl = form.querySelector('#form-status') as HTMLElement

  // Validation
  let valid = true
  const requiredFields = ['hotelName', 'location', 'dates', 'interest']
  requiredFields.forEach(field => {
    const input = form.querySelector(`#${field}`) as HTMLInputElement | HTMLSelectElement
    if (!input?.value) {
      input?.classList.add('error')
      valid = false
    } else {
      input?.classList.remove('error')
    }
  })

  if (!valid) {
    statusEl.textContent = 'Please fill in all required fields'
    statusEl.className = 'font-satoshi text-center text-sm text-red-500'
    return
  }

  // Loading state
  submitBtn?.setAttribute('disabled', 'true')
  btnText?.classList.add('hidden')
  btnLoading?.classList.remove('hidden')
  statusEl.textContent = ''

  // Simulate API call
  setTimeout(() => {
    submitBtn?.removeAttribute('disabled')
    btnText?.classList.remove('hidden')
    btnLoading?.classList.add('hidden')
    statusEl.textContent = `Thanks ${data.hotelName}! I'll reach out within 48 hours with a tailored proposal.`
    statusEl.className = 'font-satoshi text-center text-sm text-green-600'
    form.reset()
    
    // Reset floating labels
    form.querySelectorAll('.form-label').forEach(label => {
      (label as HTMLElement).style.top = ''
      ;(label as HTMLElement).style.fontSize = ''
      ;(label as HTMLElement).style.color = ''
    })

    setTimeout(() => {
      statusEl.textContent = ''
    }, 8000)
  }, 1500)
}
