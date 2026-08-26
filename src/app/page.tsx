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
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const heroSlides = [
    { src: '/images/misty_forest_portrait.webp', alt: 'Prerna in misty Lamahatta forest' },
    { src: '/images/cinematic_tea_garden.webp', alt: 'Tea garden balcony with chest tattoo' },
    { src: '/images/gopuram_golden_sunset.webp', alt: 'South Indian temple gopuram at sunset' },
    { src: '/images/shiva_statue_daylight.webp', alt: '87ft Shiva statue with trident' },
    { src: '/images/darjeeling_misty_landscape.webp', alt: 'Misty Darjeeling hill town' },
  ]

  const trustedBy = [
    'Stay Canopy Homes Wayanad',
    'En Ooru Tribal Village',
    'Four Points Sheraton Sonmarg',
    'Interlude Stays Himachal'
  ]

  const stays = [
    {
      title: 'Tea Estate, Wayanad',
      story: 'Woke up to mist rolling over endless green rows — no tourists, just the pickers\' chai break.',
      image: '/images/tea_plantation_landscape.webp',
      deliverables: '3 Reels + 20 photos + Blog'
    },
    {
      title: 'Darjeeling Balcony',
      story: 'Three of us, one foggy morning, zero plans. The town appeared and disappeared in clouds.',
      image: '/images/darjeeling_misty_balcony.webp',
      deliverables: '2 Reels + 15 photos + Blog'
    },
    {
      title: 'Darjeeling Hills',
      story: 'Pure mist, pure silence. The kind of morning that reminds you why you started shooting.',
      image: '/images/darjeeling_misty_landscape.webp',
      deliverables: '2 Reels + 15 photos + Blog'
    },
    {
      title: 'Temple Gopuram, South',
      story: 'Golden hour light hitting centuries of color. Faith looks different up close.',
      image: '/images/gopuram_golden_sunset.webp',
      deliverables: '2 Reels + 15 photos + Blog'
    },
    {
      title: '87ft Shiva, Namchi',
      story: 'Stood at his feet at noon. The trident casts no shadow at this hour — just presence.',
      image: '/images/shiva_statue_daylight.webp',
      deliverables: '2 Reels + 15 photos + Blog'
    },
    {
      title: 'On the Ground',
      story: 'Planning the next shot outside the ENTRY gate. No crew, no filter. Just figuring it out.',
      image: '/images/candid_phone_photo.webp',
      deliverables: 'Behind the scenes'
    },
  ]

  const services = [
    { 
      icon: 'reels',
      title: 'Instagram Reels',
      desc: '2–3 cinematic Reels per stay, optimized for reach & saves',
    },
    { 
      icon: 'photos',
      title: 'Photo Set',
      desc: '25–30 professionally edited images with 90-day usage rights',
    },
    { 
      icon: 'blog',
      title: 'Blog Story',
      desc: '800+ word SEO article ranking for destination keywords',
    },
    { 
      icon: 'review',
      title: 'Google + IG Review',
      desc: 'Verified 5-star reviews with photos & detailed stays',
    },
    { 
      icon: 'stories',
      title: 'Story Takeover',
      desc: 'Full-day IG Story coverage + highlights saved to profile',
    },
    { 
      icon: 'tattoo',
      title: 'Tattoo Pop-Up (Optional)',
      desc: 'Flash tattoos for guests — unique revenue & experience',
    },
  ]

  const btsImages = [
    { src: '/images/intimate_bw_portrait.webp', alt: 'Intimate B&W moment — leaning on shoulder, playful, real emotion' },
    { src: '/images/candid_phone_photo.webp', alt: 'Outside ENTRY gate planning with yellow sunglasses + OnePlus phone' },
  ]

  useEffect(() => {
    setMounted(true)
    
    // Hero slider auto-rotate
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 5000)

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
      // Hero entrance - headline stagger
      gsap.fromTo('.hero-word', 
        { y: '110%', opacity: 0 },
        { 
          y: '0%', 
          opacity: 1, 
          duration: 1.4, 
          ease: 'power4.out', 
          stagger: 0.12,
          delay: 0.3
        }
      )
      
      gsap.fromTo('.hero-subtext', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.0 }
      )
      
      gsap.fromTo('.hero-cta-group', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2, stagger: 0.1 }
      )
      
      gsap.fromTo('.hero-stats', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4, stagger: 0.08 }
      )
      
      gsap.fromTo('.hero-pill', 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )

      // Section reveals
      gsap.utils.toArray('.reveal-up').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 40, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0)',
            duration: 0.9, ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleClass: 'in-view',
            }
          }
        )
      })

      // Line draw dividers
      gsap.utils.toArray('.line-draw').forEach((line: any) => {
        gsap.fromTo(line, 
          { scaleX: 0 },
          { 
            scaleX: 1, 
            duration: 1.2, 
            ease: 'power4.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
            }
          }
        )
      })

      // Parallax images
      gsap.utils.toArray('.parallax-image').forEach((img: any) => {
        gsap.to(img, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        })
      })

      // Magnetic buttons
      const magneticBtns = document.querySelectorAll('.magnetic-btn')
      magneticBtns.forEach(btn => {
        const el = btn as HTMLElement
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(el, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' })
        })
      })

      // Scroll progress bar
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
          onUpdate: self => {
            setScrollProgress(self.progress)
          }
        }
      })

      // Nav background on scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (navRef.current) {
            if (self.progress > 0.02) {
              navRef.current.classList.add('scrolled')
            } else {
              navRef.current.classList.remove('scrolled')
            }
          }
        }
      })

    }, heroRef)

    return () => {
      clearInterval(slideInterval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (lenis) lenis.destroy()
      ctx.revert()
    }
  }, [mounted])

  // Slide transition effect
  useEffect(() => {
    slideRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.classList.toggle('active', i === currentSlide)
      }
    })
  }, [currentSlide])

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

      {/* HERO - Immersive 100vh Slider */}
      <section className="hero-section relative min-h-screen flex items-center justify-center px-6 md:px-10">
        {/* Ken Burns Slider */}
        <div className="ken-burns-slider" role="img" aria-label="Prerna travel photography showcase">
          {heroSlides.map((slide, i) => (
            <div 
              key={slide.src}
              ref={(el: HTMLDivElement | null) => { slideRefs.current[i] = el }}
              className="ken-burns-slide"
              style={{ zIndex: i === currentSlide ? 10 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay Layers */}
        <div className="absolute inset-0 z-10" aria-hidden="true">
          {/* Dark gradient bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          {/* Grain */}
          <div className="grain-overlay" />
          {/* Vignette */}
          <div className="vignette" />
          {/* Floating blobs */}
          <div className="blob-terracotta" style={{ top: '20%', left: '-10%' }} />
          <div className="blob-olive" style={{ bottom: '10%', right: '-15%' }} />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left Column */}
            <div className="text-left">
              {/* Pill Badge */}
              <div className="hero-pill inline-flex mb-8">
                <span className="pulse-dot w-2 h-2 bg-terracotta rounded-full" aria-hidden="true" />
                Mumbai + Travel • 15+ Years Art • Darjeeling 17–20 Aug Live
              </div>

              {/* Headline - GSAP Stagger Words */}
              <h1 className="font-instrument font-normal text-white leading-[0.9] tracking-[-0.03em] mb-6" style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}>
                <span className="hero-word block">Where Journeys</span>
                <span className="hero-word block italic text-terracotta">Become Ink</span>
              </h1>

              {/* Subtext */}
              <p className="hero-subtext font-satoshi text-white/70 mb-10 max-w-xl" style={{ fontSize: '20px', lineHeight: '1.6' }}>
                Hand-poked tattoos inspired by slow travel through India's coasts, mountains, and temples. Each piece carries a story. Each journey leaves a mark.
              </p>

              {/* CTAs - 16px gap, magnetic hover */}
              <div className="hero-cta-group flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
                <a href="#contact" className="btn-primary w-full sm:w-auto magnetic-btn">
                  Book a Session
                </a>
                <a href="#contact" className="btn-secondary w-full sm:w-auto magnetic-btn">
                  Let's Talk Offline
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats grid grid-cols-5 gap-6 md:gap-8 mb-12">
                <div className="stat-item">
                  <div className="stat-number">6.7K</div>
                  <div className="stat-label">Community</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">410</div>
                  <div className="stat-label">Tattoo Clients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">210</div>
                  <div className="stat-label">Stories</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">India</div>
                  <div className="stat-label">First</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">12K</div>
                  <div className="stat-label">Avg Reel Views</div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-4">
                <Image
                  src="/images/cinematic_mountain_photographer.jpg"
                  alt="Shot on Sony"
                  width={80}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-satoshi text-white/90 text-sm font-medium">Shot on Sony</p>
                  <p className="font-satoshi text-white/50 text-xs">Creator Partner</p>
                </div>
              </div>
            </div>

            {/* Right Column - Floating IG Cards (Desktop only) */}
            <div className="hidden lg:block relative h-[500px]">
              <div className="absolute top-10 left-10 w-72 h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/goa_beach_sunset.webp"
                  alt="Benaulim Beach, Goa"
                  fill
                  sizes="288px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-satoshi text-white text-sm font-medium">Benaulim Beach, Goa</p>
                  <p className="font-satoshi text-white/70 text-xs">@staycanopyhomes</p>
                </div>
              </div>
              <div className="absolute bottom-10 right-10 w-72 h-96 rounded-xl overflow-hidden shadow-2xl" style={{ transform: 'rotate(3deg)' }}>
                <Image
                  src="/images/tea_plantation_landscape.webp"
                  alt="Wayanad Homestay"
                  fill
                  sizes="288px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-satoshi text-white text-sm font-medium">Wayanad Homestay</p>
                  <p className="font-satoshi text-white/70 text-xs">@interludestays</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section id="proof" className="py-12 px-6 md:px-10 bg-charcoal">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="flex flex-wrap items-center gap-4 text-white/80 font-satoshi text-sm">
              <span className="font-medium text-white">Trusted by:</span>
              {trustedBy.map((name, i) => (
                <span key={name} className="flex items-center gap-2">
                  {name}
                  {i < trustedBy.length - 1 && <span className="text-white/30">·</span>}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-white/70 font-satoshi text-sm">
              <span>As seen:</span>
              <span className="font-medium">6.7K IG</span>
              <span className="text-white/30">|</span>
              <span className="font-medium">410 Tattoo Clients</span>
              <span className="text-white/30">|</span>
              <span className="font-medium">Sony Creator</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE I'VE STAYED SLOW */}
      <section id="stays" className="py-28 px-6 md:px-10 bg-cream">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 reveal-up">
            <span className="section-badge">Where I've Stayed Slow</span>
            <h2 className="section-title mt-4 mb-6">Travel & Stay Experience</h2>
            <p className="section-subtitle mx-auto">Real properties. Real stories. No press trips — just slow stays that became work.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stays.map((stay, i) => (
              <article key={stay.title} className="stay-card reveal-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="stay-card-image"
                  />
                  <div className="stay-card-overlay" />
                  <div className="stay-card-content">
                    <h3 className="font-instrument text-white text-xl font-normal mb-2">{stay.title}</h3>
                    <p className="text-white/90 text-sm mb-3">{stay.story}</p>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur text-white/90 text-xs rounded-full font-satoshi">
                      {stay.deliverables}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SLOW ART - Merged Hand-Poked Art + Ink That Breathes + Philosophy */}
      <section id="about" className="py-28 px-6 md:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/cozy_neon_studio.webp"
                alt="Mumbai tattoo studio interior"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-instrument text-2xl md:text-3xl font-normal mb-2">@meetprerna.tattoos</p>
                <p className="font-satoshi text-white/70">Mumbai Studio • 410+ Clients • 15+ Years</p>
              </div>
            </div>

            <div className="reveal-up">
              <span className="section-badge">Slow Art</span>
              <h2 className="section-title mt-4 mb-6">Hand-Poked. Slow. Intentional.</h2>
              <p className="section-subtitle mb-10">
                No machines. No rush. Hand-poked (stick-and-poke) tattoos heal faster, age beautifully, 
                and carry the intention of every dot placed by hand. This is the oldest form of tattooing — 
                each dot placed with purpose, no motor vibration between you and the art.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-instrument text-charcoal text-lg font-normal mb-1">The Process</p>
                    <p className="font-satoshi text-charcoal-light">Consultation & design → Placement & stencil → Hand-poked session (1–4 hrs, tea included) → Aftercare kit & healing guide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-olive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-olive">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-instrument text-charcoal text-lg font-normal mb-1">Specialization</p>
                    <p className="font-satoshi text-charcoal-light">Fine line, botanical, script, minimal geometric. All custom — no flash, no copies. 410+ clients, 15+ years.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-charcoal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-charcoal">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-instrument text-charcoal text-lg font-normal mb-1">Philosophy</p>
                    <p className="font-satoshi text-charcoal-light">Tattoo as souvenir. Guests leave with permanent memories from their stay. 70/30 revenue split, zero operational overhead for the property.</p>
                  </div>
                </div>
              </div>
              
              <a href="#contact" className="btn-primary magnetic-btn inline-flex items-center gap-2">
                Book a Session
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - TOP DELIVERABLES (no timeline) */}
      <section id="services" className="py-28 px-6 md:px-10 bg-cream">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 reveal-up">
            <span className="section-badge">Services</span>
            <h2 className="section-title mt-4 mb-6">What Hotels Get</h2>
            <p className="section-subtitle mx-auto">A complete creative package delivered within one week of checkout. No day-by-day timeline — just results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={service.title} className="service-card reveal-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="service-icon" aria-hidden="true">
                  {service.icon === 'reels' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M8 10l3 3 5-5" />
                    </svg>
                  )}
                  {service.icon === 'photos' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <rect x="2" y="2" width="20" height="20" rx="2" />
                      <path d="M7 7l5 5 7-7" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                  {service.icon === 'blog' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  )}
                  {service.icon === 'review' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <path d="M10 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
                      <path d="M14 7v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
                    </svg>
                  )}
                  {service.icon === 'stories' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <path d="M17 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10" />
                      <path d="M12 8v8" />
                      <path d="M9 12h6" />
                    </svg>
                  )}
                  {service.icon === 'tattoo' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  )}
                </div>
                <h3 className="font-instrument text-charcoal text-lg font-normal mb-2">{service.title}</h3>
                <p className="font-satoshi text-charcoal-light text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <br />That&apos;s the story hotels get &mdash; honest, not staged."
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