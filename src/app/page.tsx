'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorActive, setCursorActive] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const heroSlides = [
    { src: '/images/misty_forest_portrait.jpg', alt: 'Prerna in misty Lamahatta forest' },
    { src: '/images/cinematic_tea_garden.jpg', alt: 'Tea garden balcony with chest tattoo' },
    { src: '/images/gopuram_golden_sunset.jpg', alt: 'South Indian temple gopuram at sunset' },
    { src: '/images/shiva_statue_daylight.jpg', alt: '87ft Shiva statue with trident' },
    { src: '/images/darjeeling_misty_landscape.jpg', alt: 'Misty Darjeeling hill town' },
  ]

  const igCards = [
    { 
      image: '/images/goa_beach_sunset.webp', 
      location: 'Benaulim Beach, Goa',
      handle: '@staycanopyhomes'
    },
    { 
      image: '/images/tea_plantation_landscape.jpg', 
      location: 'Wayanad Homestay',
      handle: '@interludestays'
    },
  ]

  const trustedBy = [
    'Stay Canopy Homes Wayanad',
    'En Ooru Tribal Village',
    'Four Points Sheraton Sonmarg',
    'Interlude Stays Himachal'
  ]

  const caseStudies = [
    {
      title: 'Misty Forest Retreat',
      subtitle: 'Lamahatta Forest — From foggy balcony to forest cathedral',
      images: ['/images/misty_forest_portrait.jpg', '/images/mystical_forest_cathedral.jpg'],
      deliverables: ['3 Reels', '20 Photos', '1 SEO Blog', '1 Google Review'],
      location: 'Darjeeling, West Bengal'
    },
    {
      title: 'Tea Estate Slow Living',
      subtitle: 'Wayanad Tea Hills — Red top moments, green sea',
      images: ['/images/cinematic_tea_garden.jpg', '/images/tea_garden_panorama.jpg'],
      deliverables: ['3 Reels', '25 Photos', '1 SEO Blog', '1 Google Review'],
      location: 'Wayanad, Kerala'
    },
    {
      title: 'Spiritual Heritage',
      subtitle: 'Namchi Sikkim — 87ft Shiva, temple bells, soulful stays',
      images: ['/images/gopuram_golden_sunset.jpg', '/images/shiva_statue_daylight.jpg'],
      deliverables: ['2 Reels', '15 Photos', '1 SEO Blog', '1 Google Review'],
      location: 'Namchi, Sikkim'
    }
  ]

  const services = [
    { 
      icon: 'reels',
      title: 'Instagram Reels',
      desc: '2–3 cinematic Reels per stay, optimized for reach & saves',
      number: '01'
    },
    { 
      icon: 'photos',
      title: 'Photo Set',
      desc: '30 professionally edited images with usage rights 90 days',
      number: '02'
    },
    { 
      icon: 'blog',
      title: 'SEO Blog Post',
      desc: '800+ word article ranking for destination keywords',
      number: '03'
    },
    { 
      icon: 'review',
      title: 'Google + TripAdvisor',
      desc: 'Verified 5-star reviews with photos & detailed stays',
      number: '04'
    },
    { 
      icon: 'tattoo',
      title: 'Tattoo Pop-Up',
      desc: 'Flash tattoos for guests — unique revenue & experience',
      number: '05'
    },
    { 
      icon: 'stories',
      title: 'Story Takeovers',
      desc: 'Daily IG Story coverage + highlights saved to profile',
      number: '06'
    },
  ]

  const rates = [
    {
      name: 'Weekend Story',
      subtitle: 'Perfect for quick escapes',
      price: '₹45,000',
      per: '/ stay',
      includes: [
        '1 Night luxury stay',
        '1 Instagram Reel',
        '10 edited photos',
        'Story takeover (24h)',
        'Usage rights 90 days'
      ],
      cta: 'Book Weekend',
      featured: false
    },
    {
      name: 'Slow Immersion',
      subtitle: 'Deep dive into destination',
      price: '₹85,000',
      per: '/ stay',
      includes: [
        '2 Nights luxury stay',
        '2 Instagram Reels',
        '20 edited photos',
        '1 SEO blog post (800+ words)',
        'Google + TripAdvisor review',
        'Story takeover (48h)',
        'Usage rights 90 days'
      ],
      cta: 'Book Immersion',
      featured: true
    },
    {
      name: 'Residency',
      subtitle: 'Full creative partnership',
      price: '₹1,50,000',
      per: '/ stay',
      includes: [
        '4 Nights luxury stay',
        '3 Instagram Reels',
        '30 edited photos',
        '1 SEO blog post',
        'Google + TripAdvisor review',
        'Tattoo pop-up for guests',
        'Story takeover (96h)',
        'Usage rights 90 days',
        'Media kit + raw selects'
      ],
      cta: 'Book Residency',
      featured: false
    }
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

      // Floating IG cards - mousemove parallax
      const igCardsEls = document.querySelectorAll('.ig-card-float')
      igCardsEls.forEach((card, i) => {
        gsap.set(card, { rotation: i === 0 ? -5 : 5 })
      })

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

      // Tilt cards on mousemove
      const tiltCards = document.querySelectorAll('.tilt-card')
      tiltCards.forEach(card => {
        const el = card as HTMLElement
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateY = (x - centerX) / 18
          const rotateX = -(y - centerY) / 18
          gsap.to(el, {
            rotationY: rotateY,
            rotationX: rotateX,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
          })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
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

    }, heroRef)

    return () => {
      clearInterval(slideInterval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
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

      {/* Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-8 px-8 py-3 bg-white/80 backdrop-blur-md border border-charcoal/10 rounded-full shadow-lg">
          <a href="/" className="font-playfair font-semibold text-charcoal text-xl tracking-tight" aria-label="Prerna Home">
            Prerna
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#stories" className="btn-ghost text-sm">Hotel Stories</a>
            <a href="#services" className="btn-ghost text-sm">Services</a>
            <a href="#rates" className="btn-ghost text-sm">Rates</a>
            <a href="#contact" className="btn-ghost text-sm">Contact</a>
          </div>
          <a href="#contact" className="btn-primary hidden sm:inline-flex items-center gap-2 magnetic-btn">
            Pitch Your Property
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </nav>
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
              <h1 className="font-playfair font-semibold text-white leading-[0.9] tracking-[-0.03em] mb-6" style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}>
                <span className="hero-word block">Where Journeys</span>
                <span className="hero-word block italic text-terracotta">Become Ink</span>
              </h1>

              {/* Subtext */}
              <p className="hero-subtext font-inter text-white/70 mb-10 max-w-xl" style={{ fontSize: '20px', lineHeight: '1.6' }}>
                Hand-poked tattoos inspired by slow travel through India's coasts, mountains, and temples. Each piece carries a story. Each journey leaves a mark.
              </p>

              {/* CTAs */}
              <div className="hero-cta-group flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
                <a href="#contact" className="btn-primary w-full sm:w-auto magnetic-btn">
                  Book a Session
                </a>
                <a href="#contact" className="btn-secondary w-full sm:w-auto magnetic-btn">
                  Explore Collaborations
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
                  <p className="font-inter text-white/90 text-sm font-medium">Shot on Sony</p>
                  <p className="font-inter text-white/50 text-xs">Creator Partner</p>
                </div>
              </div>
            </div>

            {/* Right Column - Floating IG Cards (Desktop only) */}
            <div className="hidden lg:block relative h-[500px]">
              {igCards.map((card, i) => (
                <div
                  key={card.image}
                  className="ig-card-float tilt-card absolute"
                  style={{ 
                    top: i === 0 ? '10%' : '55%',
                    left: i === 0 ? '5%' : '60%',
                    zIndex: 20 - i
                  }}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl tilt-card-inner" style={{ width: '280px', height: '350px' }}>
                    <Image
                      src={card.image}
                      alt={card.location}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="font-inter text-white text-sm font-medium">{card.location}</p>
                      <p className="font-inter text-white/70 text-xs">{card.handle}</p>
                    </div>
                  </div>
                </div>
              ))}
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
      <section id="proof" className="py-16 px-6 bg-charcoal">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="flex flex-wrap items-center gap-4 text-white/80 font-inter text-sm">
              <span className="font-medium text-white">Trusted by:</span>
              {trustedBy.map((name, i) => (
                <span key={name} className="flex items-center gap-2">
                  {name}
                  {i < trustedBy.length - 1 && <span className="text-white/30">·</span>}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-white/70 font-inter text-sm">
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

      {/* HOTEL STORIES - CASE STUDIES */}
      <section id="stories" className="py-28 px-6 bg-cream">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 reveal-up">
            <span className="section-badge">Hotel Stories</span>
            <h2 className="section-title mt-4 mb-6">How I Shoot Your Property</h2>
            <p className="section-subtitle mx-auto">Real campaigns. Real results. Each stay becomes a story that sells.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <article key={study.title} className="hotel-card reveal-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={study.images[0]}
                    alt={study.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="hotel-card-image"
                  />
                  <div className="hotel-card-overlay" />
                  <div className="hotel-card-content">
                    <span className="font-inter text-white/70 text-xs uppercase tracking-wider mb-2 block">{study.location}</span>
                    <h3 className="font-playfair text-white text-2xl font-semibold mb-2">{study.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{study.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.deliverables.map((d, j) => (
                        <span key={j} className="px-3 py-1 bg-white/10 backdrop-blur text-white/90 text-xs rounded-full font-inter">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - WHAT HOTELS GET */}
      <section id="services" className="py-28 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 reveal-up">
            <span className="section-badge">Services</span>
            <h2 className="section-title mt-4 mb-6">What Hotels Get</h2>
            <p className="section-subtitle mx-auto">A complete creative package delivered within one week of checkout.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={service.title} className="service-card reveal-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="font-playfair text-terracotta text-3xl font-bold mb-4">{service.number}</div>
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
                  {service.icon === 'tattoo' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  )}
                  {service.icon === 'stories' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                      <path d="M17 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10" />
                      <path d="M12 8v8" />
                      <path d="M9 12h6" />
                    </svg>
                  )}
                </div>
                <h3 className="font-playfair text-charcoal text-lg font-semibold mb-2">{service.title}</h3>
                <p className="font-inter text-charcoal-light text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-16 reveal-up">
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-charcoal/10" />
              {[
                'Day 1: Arrival & property walkthrough',
                'Day 2: Golden hour shoots + Reels',
                'Day 3: Detail shots + guest moments',
                'Day 4: Edit & color grade',
                'Day 5: Blog write + SEO optimize',
                'Day 6: Review + revisions',
                'Day 7: Delivery via cloud link'
              ].map((step, i) => (
                <div key={i} className="relative pl-20 py-6 flex items-start">
                  <div className="absolute left-8 top-1 w-3 h-3 bg-terracotta rounded-full border-4 border-white z-10" />
                  <div className="font-inter">
                    <p className="text-terracotta font-medium text-sm mb-1">Day {i + 1}</p>
                    <p className="text-charcoal-light">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE & MEDIA KIT */}
      <section id="audience" className="py-28 px-6 bg-cream">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
              <span className="section-badge">Audience & Media Kit</span>
              <h2 className="section-title mt-4 mb-6">Who You'll Reach</h2>
              <p className="section-subtitle mb-10">
                Engaged travelers who book based on authentic storytelling — not staged perfection.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl border border-charcoal/10">
                  <p className="font-playfair text-charcoal text-3xl font-bold">68%</p>
                  <p className="font-inter text-charcoal-light text-sm">Female</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-charcoal/10">
                  <p className="font-playfair text-charcoal text-3xl font-bold">22–34</p>
                  <p className="font-inter text-charcoal-light text-sm">Age Range</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-charcoal/10">
                  <p className="font-playfair text-charcoal text-3xl font-bold">60%</p>
                  <p className="font-inter text-charcoal-light text-sm">India</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-charcoal/10">
                  <p className="font-playfair text-charcoal text-3xl font-bold">25%</p>
                  <p className="font-inter text-charcoal-light text-sm">US + UK + Intl</p>
                </div>
              </div>
              <p className="font-inter text-charcoal-light mb-8">
                Interests: Slow travel · Hand-poked tattoos · Sustainable stays · Boutique hotels · Cultural immersion
              </p>
              <a href="#" className="btn-secondary magnetic-btn inline-flex items-center gap-2" download>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Media Kit (PDF)
              </a>
            </div>

            <div className="reveal-up parallax-image relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/misty_tea_plantation.jpg"
                alt="Prerna overlooking tea hills"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RATES */}
      <section id="rates" className="py-28 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12 reveal-up">
            <span className="section-badge">Rates & Packages</span>
            <h2 className="section-title mt-4 mb-6">Three Ways to Work Together</h2>
            <p className="section-subtitle mx-auto">Transparent pricing. No hidden fees. All creative included.</p>
          </div>

          {/* Darjeeling Special Banner */}
          <div className="mb-12 reveal-up">
            <div className="bg-charcoal text-white rounded-xl p-6 md:p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta/20 to-olive/20" />
              <span className="font-inter text-terracotta text-xs uppercase tracking-widest block mb-2">Darjeeling Special • August 17–20</span>
              <h3 className="font-playfair text-2xl md:text-3xl font-semibold mb-3">I'm in Darjeeling Aug 17–20</h3>
              <p className="font-inter text-white/80 max-w-xl mx-auto mb-6">
                Book a Residency during my Darjeeling dates and get the tattoo pop-up included at no extra cost.
              </p>
              <a href="#contact" className="btn-primary border-white text-white hover:bg-white hover:text-charcoal magnetic-btn">
                Book Darjeeling Slot
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {rates.map((rate, i) => (
              <div key={rate.name} className={`rate-card reveal-up ${rate.featured ? 'featured' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                {rate.featured && <span className="rate-badge">Most Popular</span>}
                <div className="mb-6">
                  <h3 className="rate-name">{rate.name}</h3>
                  <p className="font-inter text-charcoal-light text-sm">{rate.subtitle}</p>
                </div>
                <div className="mb-8">
                  <div className="rate-price">{rate.price}<span>{rate.per}</span></div>
                </div>
                <ul className="rate-includes">
                  {rate.includes.map((item, j) => (
                    <li key={j}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`btn-${rate.featured ? 'primary' : 'secondary'} w-full mt-8 magnetic-btn`}>
                  {rate.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEHIND THE SCENES - REAL WORK, REAL MOMENTS */}
      <section id="bts" className="py-28 px-6 bg-cream">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16 reveal-up">
            <span className="section-badge">Behind the Scenes</span>
            <h2 className="section-title mt-4 mb-6">Real Work, Real Moments</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: B&W Intimate Portrait */}
            <div className="reveal-up relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/intimate_bw_portrait.webp"
                alt="Intimate B&W moment - leaning on shoulder, playful, real emotion"
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
                src="/images/candid_phone_photo.webp"
                alt="Outside ENTRY gate planning with yellow sunglasses and OnePlus phone"
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
            <p className="font-inter text-charcoal-light text-lg leading-relaxed">
              "No crew, no filter. Just me, my camera, and figuring it out on the ground. 
              <br />That&apos;s the story hotels get &mdash; honest, not staged."
            </p>
          </div>
        </div>
      </section>

      {/* TATTOO STUDIO INTEGRATION */}
      <section id="tattoo-studio" className="py-28 px-6 bg-charcoal">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-up relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/cozy_neon_studio.jpg"
                alt="Mumbai tattoo studio interior"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-playfair text-2xl md:text-3xl font-semibold mb-2">@meetprerna.tattoos</p>
                <p className="font-inter text-white/70">Mumbai Studio • 410+ Clients • 15+ Years</p>
              </div>
            </div>

            <div className="reveal-up">
              <span className="section-badge text-terracotta border-terracotta/30 bg-terracotta/10">Tattoo Pop-Up</span>
              <h2 className="section-title mt-4 mb-6 text-white">Add a Tattoo Pop-Up to Your Property</h2>
              <p className="section-subtitle text-white/80 mb-10">
                A unique guest experience that drives bookings, revenue, and unforgettable memories. 
                Flash tattoos inspired by your destination — mountains, tea leaves, temple motifs, local flora.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <p className="font-playfair text-white text-xl font-semibold mb-2">For Your Guests</p>
                  <ul className="font-inter text-white/70 space-y-2">
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> Flash designs from ₹3,000</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> 15–30 min sessions</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> Sterile, professional setup</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> Aftercare kit included</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <p className="font-playfair text-white text-xl font-semibold mb-2">For Your Property</p>
                  <ul className="font-inter text-white/70 space-y-2">
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> Additional revenue stream (70/30 split)</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> Unique booking differentiator</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> Social content from every session</li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 bg-terracotta rounded-full" /> Zero operational overhead</li>
                  </ul>
                </div>
              </div>
              <a href="#contact" className="btn-primary magnetic-btn inline-flex items-center gap-2">
                Add Tattoo Pop-Up
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-up">
              <span className="section-badge">Contact</span>
              <h2 className="section-title mt-4 mb-6">Pitch Your Property</h2>
              <p className="section-subtitle mb-10">
                Tell me about your stay. Dates, vision, budget — I'll send a tailored proposal within 48 hours.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-cream rounded-xl border border-charcoal/10">
                  <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-inter font-medium text-charcoal">hello@meetprerna.com</p>
                    <p className="font-inter text-charcoal-light text-sm">24hr response on weekdays</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-cream rounded-xl border border-charcoal/10">
                  <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-inter font-medium text-charcoal">@meetprerna (Travel)</p>
                    <p className="font-inter text-charcoal-light text-sm">DM for quick questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-cream rounded-xl border border-charcoal/10">
                  <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-inter font-medium text-charcoal">@meetprerna.tattoos (Ink)</p>
                    <p className="font-inter text-charcoal-light text-sm">Tattoo bookings & studio</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-up">
              <form className="bg-cream rounded-2xl p-8 md:p-10 border border-charcoal/10" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                    <label htmlFor="hotelName" className="form-label">Hotel / Property Name</label>
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
                <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                    <select id="package" name="package" required className="form-input appearance-none bg-white cursor-pointer">
                      <option value="">Select package</option>
                      <option value="weekend">Weekend Story — ₹45,000</option>
                      <option value="immersion">Slow Immersion — ₹85,000</option>
                      <option value="residency">Residency — ₹1,50,000</option>
                      <option value="custom">Custom / Not Sure</option>
                    </select>
                    <label htmlFor="package" className="form-label">Package Interest</label>
                    <p className="form-error">Please select a package</p>
                  </div>
                </div>
                <div className="form-group mb-6">
                  <textarea 
                    id="deliverables" 
                    name="deliverables" 
                    rows={4} 
                    placeholder=" " 
                    className="form-input resize-none"
                  />
                  <label htmlFor="deliverables" className="form-label">Deliverables Needed / Vision</label>
                </div>
                <div className="form-group mb-8">
                  <input 
                    type="text" 
                    id="budget" 
                    name="budget" 
                    placeholder=" " 
                    className="form-input"
                  />
                  <label htmlFor="budget" className="form-label">Budget Range (optional)</label>
                </div>
                <button 
                  type="submit" 
                  className="btn-primary w-full magnetic-btn"
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
                <p id="form-status" className="font-inter text-center text-sm mt-4 h-6" aria-live="polite"></p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-charcoal border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="font-playfair font-semibold text-white text-xl">Prerna</span>
              <span className="text-white/30">·</span>
              <span className="text-white/50 text-sm">Travel & Tattoo</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
              <a href="#stories" className="hover:text-terracotta transition-colors">Hotel Stories</a>
              <a href="#services" className="hover:text-terracotta transition-colors">Services</a>
              <a href="#rates" className="hover:text-terracotta transition-colors">Rates</a>
              <a href="#contact" className="hover:text-terracotta transition-colors">Contact</a>
            </nav>
            <p className="font-inter text-white/30 text-xs">
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
  const requiredFields = ['hotelName', 'location', 'dates', 'package']
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
    statusEl.className = 'font-inter text-center text-sm text-red-500'
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
    statusEl.className = 'font-inter text-center text-sm text-green-600'
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