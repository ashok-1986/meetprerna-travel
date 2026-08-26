'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const ctx = gsap.context(() => {
      // Hero entrance animations
      gsap.from('.hero-headline', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
      gsap.from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      })
      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      })
      gsap.from('.polaroid-card', {
        y: 80,
        opacity: 0,
        rotation: (i) => (i % 2 === 0 ? -4 : 4),
        duration: 1.4,
        stagger: 0.15,
        delay: 0.6,
        ease: 'power3.out',
      })

      // Section reveal animations
      gsap.utils.toArray('.reveal-card').forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleClass: 'in-view',
          },
        })
      })

      gsap.utils.toArray('.line-draw').forEach((line: any) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            toggleClass: 'in-view',
          },
        })
      })

      // Parallax blobs
      gsap.to('.blob-1', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      gsap.to('.blob-2', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      gsap.to('.blob-3', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [mounted])

  return (
    <main ref={heroRef} className="relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-electric-violet/5 rounded-full blur-[200px] blob-1" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-bright-indigo/5 rounded-full blur-[200px] blob-2" />
        <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-signal-green/5 rounded-full blur-[200px] blob-3" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-lavender-mist/20 rounded-full blur-[300px] mist-1" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-periwinkle-wash/20 rounded-full blur-[300px] mist-2" />
      </div>

      {/* Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-8 px-8 py-3 bg-white/80 backdrop-blur-md border border-mist rounded-navpill shadow-navpill">
          <a href="/" className="font-marund font-semibold text-near-black text-xl" aria-label="Prerna Home">
            Prerna
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#travel" className="btn-ghost text-sm">Travel</a>
            <a href="#tattoo" className="btn-ghost text-sm">Tattoo</a>
            <a href="#journal" className="btn-ghost text-sm">Journal</a>
            <a href="#contact" className="btn-ghost text-sm">Contact</a>
          </div>
          <a href="#contact" className="btn-primary hidden sm:inline-flex items-center gap-2">
            Book a Session
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        {/* Decorative polaroids - semantic wrapper, reduced on mobile */}
        <figure className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
          <PolaroidCard 
            src="/images/goa_beach_sunset.webp" 
            alt="Goa beach sunset"
            className="hidden lg:block absolute top-20 left-10 w-64 rotate-[-3deg]"
          />
          <PolaroidCard 
            src="/images/bare_feet_stream.webp" 
            alt="Bare feet in stream"
            className="hidden lg:block absolute top-10 right-10 w-56 rotate-[2deg]"
          />
          <PolaroidCard 
            src="/images/misty_shiva_statue.webp" 
            alt="Misty Shiva statue"
            className="hidden lg:block absolute bottom-20 left-1/4 w-60 rotate-[-2deg]"
          />
          <PolaroidCard 
            src="/images/goa_beach_sunset.webp" 
            alt="Goa beach detail"
            className="hidden lg:block absolute bottom-10 right-1/4 w-52 rotate-[3deg]"
          />
          {/* Mobile: 2 cards only, no rotation */}
          <PolaroidCard 
            src="/images/goa_beach_sunset.webp" 
            alt="Goa beach sunset"
            className="lg:hidden absolute top-16 left-4 w-56"
          />
          <PolaroidCard 
            src="/images/misty_shiva_statue.webp" 
            alt="Misty Shiva statue"
            className="lg:hidden absolute bottom-16 right-4 w-56"
          />
        </figure>

        <div className="relative z-10 max-w-page mx-auto text-center">
          <span className="eyebrow-label pill inline-block mb-8">
            Travel & Tattoo by Prerna
          </span>
          <h1 className="display-headline mb-6 hero-headline">
            Where Journeys<br />Become Ink
          </h1>
          <p className="body-subtitle mx-auto mb-10 hero-subtitle">
            Hand-poked tattoos inspired by slow travel through India's coasts, mountains, and temples. Each piece carries a story. Each journey leaves a mark.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-cta">
            <a href="#tattoo" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto">
              Book a Session
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#travel" className="btn-secondary inline-flex items-center gap-2 w-full sm:w-auto">
              Explore Journeys
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Travel Section */}
      <section id="travel" className="py-24 px-6 bg-fog">
        <div className="max-w-page mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow-label pill inline-block mb-6">Curated Journeys</span>
            <h2 className="heading-lg mb-4">Travel Slow, Ink Deep</h2>
            <p className="text-iron max-w-2xl mx-auto text-body">
              Three regions. Three rhythms. Each journey is designed for immersion — not tourism. 
              You'll return with more than photos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Goa',
                subtitle: 'Coastal Slow Living',
                image: '/images/goa_beach_sunset.webp',
                alt: 'Goa beach sunset',
                tattooThumb: '/images/misty_shiva_statue.webp',
                highlights: ['Dawn beach walks where I inked a wave line', 'Portuguese homes — azulejo patterns under skin', 'Spice plantation stays, cardamom scent in the studio', 'Sunset sessions: salt air, fresh ink'],
                link: 'https://www.instagram.com/p/DUnrxgaDMjs/',
              },
              {
                title: 'Kerala',
                subtitle: 'Backwaters & Mountains',
                image: '/images/bare_feet_stream.webp',
                alt: 'Kerala backwaters',
                tattooThumb: '/images/goa_beach_sunset.webp',
                highlights: ['Houseboat nights — lotus blooms at first light', 'Tea plantation treks, mist on the needles', 'Ayurveda retreats, turmeric-stained fingertips', 'Temple visits, jasmine garlands and vows'],
                link: 'https://www.instagram.com/p/DVqkewxiTYI/',
              },
              {
                title: 'Sikkim',
                subtitle: 'Himalayan Silence',
                image: '/images/misty_shiva_statue.webp',
                alt: 'Sikkim mountains',
                tattooThumb: '/images/bare_feet_stream.webp',
                highlights: ['Monastery stays — prayer flags in the wind', 'High-altitude lakes, mirror-sky reflections', 'Rhododendron forests, blood-red petals', 'Prayer ceremonies, butter lamps and breath'],
                link: 'https://www.instagram.com/p/DWTyPzMgDNG/',
              },
            ].map((journey, i) => (
              <JourneyCard key={journey.title} journey={journey} />
            ))}
          </div>
        </div>
      </section>

      {/* Violet connection line - threads Travel → Tattoo */}
      <div className="relative h-24 w-px mx-auto max-w-page" aria-hidden="true">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px" viewBox="0 0 1 100" preserveAspectRatio="none">
          <path className="connection-line" d="M0.5,0 C0.5,30 0.5,70 0.5,100" />
          <circle className="status-node" cx="0.5" cy="50" r="4" />
        </svg>
      </div>

      {/* Tattoo Section */}
      <section id="tattoo" className="py-24 px-6 bg-paper">
        <div className="max-w-page mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow-label pill inline-block mb-6">Hand-Poked Art</span>
            <h2 className="heading-lg mb-4">Ink That Breathes</h2>
            <p className="text-iron max-w-2xl mx-auto text-body">
              No machines. No rush. Hand-poked (stick-and-poke) tattoos heal faster, age beautifully, 
              and carry the intention of every dot placed by hand.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="reveal-card">
                <h3 className="heading mb-4">The Process</h3>
                <ul className="space-y-4 text-iron text-body">
                  <li className="flex items-start gap-3">
                    <span className="status-node mt-1 flex-shrink-0" />
                    <span>Consultation & design — we draw together</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="status-node mt-1 flex-shrink-0" />
                    <span>Placement & stencil — you approve every line</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="status-node mt-1 flex-shrink-0" />
                    <span>Hand-poked session — 1 to 4 hours, tea included</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="status-node mt-1 flex-shrink-0" />
                    <span>Aftercare kit & healing guide provided</span>
                  </li>
                </ul>
              </div>

              <div className="reveal-card">
                <h3 className="heading mb-4">Philosophy</h3>
                <p className="text-iron text-body mb-4">
                  Hand-poking is the oldest form of tattooing. Each dot is placed with intention — 
                  no motor vibration between you and the art. The result is softer, more organic, 
                  and deeply personal.
                </p>
                <p className="text-iron text-body">
                  I specialize in fine line, botanical, script, and minimal geometric work. 
                  All designs are custom — no flash, no copies.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-cards overflow-hidden shadow-polaroid relative">
                <img 
                  src="/images/misty_shiva_statue.webp" 
                  alt="Hand-poked tattoo detail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-marund font-medium text-2xl mb-2">@meetprerna.tattoos</p>
                  <p className="text-sm opacity-80">View portfolio on Instagram</p>
                </div>
              </div>
              {/* Floating connection dots */}
              <div className="absolute -top-4 -right-4 status-node" />
              <div className="absolute bottom-1/2 -right-4 status-node" />
              <div className="absolute -bottom-4 -right-4 status-node" />
            </div>
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://calendly.com/meetprerna.tattoos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Book a Tattoo Session
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Journal / Field Notes Section */}
      <section id="journal" className="py-24 px-6 bg-fog">
        <div className="max-w-page mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow-label pill inline-block mb-6">Field Notes</span>
            <h2 className="heading-lg mb-4">From the Road</h2>
            <p className="text-iron max-w-2xl mx-auto text-body">
              Real moments from journeys and sessions. Unfiltered, uncurated, alive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" role="list" aria-label="Field notes">
            <JournalCard
              image="/images/goa_beach_sunset.webp"
              caption="Goa mornings: salt air, slow coffee, and the kind of quiet that stays with you."
              link="https://www.instagram.com/p/DUnrxgaDMjs/"
            />
            <JournalCard
              image="/images/bare_feet_stream.webp"
              caption="Kerala backwaters at golden hour. The water holds the sky."
              link="https://www.instagram.com/p/DVqkewxiTYI/"
            />
            <JournalCard
              image="/images/misty_shiva_statue.webp"
              caption="Sikkim monastery morning prayers. Breath visible in the cold."
              link="https://www.instagram.com/p/DWTyPzMgDNG/"
            />
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://instagram.com/meetprerna" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 text-lg"
            >
              Follow the Journey
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter / Contact Section */}
      <section id="contact" className="py-24 px-6 bg-paper">
        <div className="max-w-page mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2">
              <span className="eyebrow-label pill inline-block mb-6">Stay Connected</span>
              <h2 className="heading-lg mb-4">Letters from the Road</h2>
              <p className="text-iron text-body mb-8 max-w-md">
                Monthly notes on travel, tattoo stories, and the quiet moments between. 
                No spam. Just soul.
              </p>
              
              <form className="space-y-4 max-w-md" onSubmit={handleSubscribe} noValidate>
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-white border border-mist rounded-inputs text-iron placeholder-slate focus:border-electric-violet focus:outline-none focus:ring-2 focus:ring-electric-violet/20 transition-all duration-200 font-inter text-body"
                    aria-describedby="email-hint"
                  />
                  <p id="email-hint" className="text-micro text-slate mt-1 hidden" aria-live="polite">Please enter a valid email address</p>
                </div>
                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  id="subscribe-btn"
                >
                  <span className="btn-text">Subscribe</span>
                  <span className="btn-loading hidden inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle className="opacity-25" cx="12" cy="12" r="10" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing…
                  </span>
                </button>
                <p id="form-status" className="text-micro text-slate text-center h-4" aria-live="polite" aria-atomic="true"></p>
                <p className="text-micro text-slate text-center">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>
            </div>

            <div className="space-y-8">
              <div className="reveal-card p-8 bg-white rounded-cards border border-mist">
                <h3 className="heading mb-4">Get in Touch</h3>
                <div className="space-y-4 text-iron text-body">
                  <a href="mailto:hello@meetprerna.com" className="btn-ghost flex items-center gap-3 hover:text-electric-violet">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    hello@meetprerna.com
                  </a>
                  <a href="https://instagram.com/meetprerna" target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center gap-3 hover:text-electric-violet">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    @meetprerna (Travel)
                  </a>
                  <a href="https://instagram.com/meetprerna.tattoos" target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center gap-3 hover:text-electric-violet">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    @meetprerna.tattoos (Ink)
                  </a>
                </div>
              </div>

              <div className="reveal-card p-8 bg-white rounded-cards border border-mist">
                <h3 className="heading mb-4">Tattoo Enquiries</h3>
                <p className="text-iron text-body mb-6">
                  Ready to book? Share your idea, placement, and preferred dates.
                </p>
                <a 
                  href="https://calendly.com/meetprerna.tattoos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Book Consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-fog border-t border-mist">
        <div className="max-w-page mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="font-marund font-semibold text-near-black text-xl">Prerna</span>
              <span className="text-mist">·</span>
              <span className="text-slate text-sm">Travel & Tattoo</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate">
              <a href="#travel" className="hover:text-electric-violet transition-colors">Travel</a>
              <a href="#tattoo" className="hover:text-electric-violet transition-colors">Tattoo</a>
              <a href="#journal" className="hover:text-electric-violet transition-colors">Journal</a>
              <a href="#contact" className="hover:text-electric-violet transition-colors">Contact</a>
            </nav>
            <p className="text-micro text-slate">
              © {new Date().getFullYear()} Prerna. Handmade with intention.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function PolaroidCard({ 
  src, 
  alt, 
  rotation = 0, 
  className = '',
  children 
}: { 
  src: string
  alt: string
  rotation?: number
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div 
      className={`relative rounded-cards overflow-hidden shadow-polaroid bg-white ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto rounded-images object-cover"
        loading="lazy"
      />
      {children && (
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent flex items-end p-4 text-white">
          {children}
        </div>
      )}
    </div>
  )
}

function JourneyCard({ journey }: { journey: any }) {
  return (
    <article className="reveal-card group">
      <div className="relative rounded-cards overflow-hidden shadow-polaroid bg-white">
        <img 
          src={journey.image} 
          alt={journey.alt} 
          className="w-full h-56 object-cover rounded-t-cards group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Tattoo micro-thumb - connects journey to ink */}
        <div 
          className="absolute bottom-3 right-3 w-12 h-12 rounded-full border-2 border-white bg-cover bg-center shadow-md" 
          style={{backgroundImage: `url(${journey.tattooThumb})`}} 
          aria-label={`${journey.title} tattoo preview`}
        />
        <div className="p-6">
          <h3 className="font-marund font-semibold text-near-black text-xl mb-1">{journey.title}</h3>
          <p className="text-slate text-sm mb-4">{journey.subtitle}</p>
          <ul className="space-y-2 mb-6">
            {journey.highlights.map((highlight: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-iron text-sm">
                <span className="status-node w-2 h-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
          <a 
            href={journey.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 w-full justify-center"
          >
            View Journey
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

function JournalCard({ image, caption, link }: { image: string; caption: string; link: string }) {
  return (
    <article className="reveal-card group relative rounded-cards overflow-hidden bg-white shadow-polaroid" role="listitem">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Read field note: ${caption}`}>
        <img 
          src={image} 
          alt="" 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="font-inter text-body text-center">{caption}</p>
          <span className="inline-flex items-center gap-1 mt-3 text-sm opacity-80">
            Read field note
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </a>
    </article>
  )
}

function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  const email = formData.get('email') as string
  const emailInput = form.querySelector('#email') as HTMLInputElement
  const emailHint = form.querySelector('#email-hint') as HTMLElement
  const submitBtn = form.querySelector('#subscribe-btn') as HTMLButtonElement
  const btnText = submitBtn?.querySelector('.btn-text') as HTMLElement
  const btnLoading = submitBtn?.querySelector('.btn-loading') as HTMLElement
  const statusEl = form.querySelector('#form-status') as HTMLElement

  // Client-side validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    emailInput?.setAttribute('aria-invalid', 'true')
    emailHint?.classList.remove('hidden')
    emailInput?.focus()
    return
  }

  // Clear previous error
  emailInput?.setAttribute('aria-invalid', 'false')
  emailHint?.classList.add('hidden')
  statusEl.textContent = ''

  // Loading state
  submitBtn?.setAttribute('disabled', 'true')
  btnText?.classList.add('hidden')
  btnLoading?.classList.remove('hidden')

  // Simulate API call - replace with actual Mailchimp/ConvertKit integration
  setTimeout(() => {
    // Success
    submitBtn?.removeAttribute('disabled')
    btnText?.classList.remove('hidden')
    btnLoading?.classList.add('hidden')
    statusEl.textContent = `Thanks for subscribing! ${email} has been added.`
    statusEl.className = 'text-micro text-signal-green text-center h-4'
    form.reset()
    
    // Clear success message after 5s
    setTimeout(() => {
      statusEl.textContent = ''
      statusEl.className = 'text-micro text-slate text-center h-4'
    }, 5000)
  }, 1200)
}