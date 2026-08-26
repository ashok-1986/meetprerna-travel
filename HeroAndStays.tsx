'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// HERO + STAYS - Apple style immersive for meetprerna-travel.vercel.app
// Drop this into app/page.tsx or app/components/HeroAndStays.tsx
// Requires: gsap, lenis (optional), images in public/images/

export default function HeroAndStays() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero word stagger - Apple TV+ style
    gsap.to('.hero-word span', { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.3 })
    
    // Hero bg Ken Burns
    gsap.to('.hero-bg', { scale: 1.1, duration: 8, ease: 'power1.out' })

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
  }, [])

  return (
    <>
      {/* Global styles - add to globals.css */}
      <style>{`
        .grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:gM 8s steps(10) infinite}
        @keyframes gM{0%,100%{transform:translate(0,0)}20%{transform:translate(-5%,5%)}40%{transform:translate(-8%,-6%)}60%{transform:translate(6%,4%)}80%{transform:translate(-3%,8%)}}
        .blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.18;pointer-events:none}
        .b1{width:420px;height:420px;background:#C86B5A;top:10%;right:-5%;animation:d1 22s ease-in-out infinite}
        .b2{width:560px;height:560px;background:#5A5A40;top:50%;left:-10%;animation:d2 28s ease-in-out infinite}
        @keyframes d1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,40px) scale(1.1)}}
        @keyframes d2{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-20px) scale(1.15)}}
        .reveal{opacity:0;transform:translateY(40px) scale(0.98);filter:blur(8px);transition:all 0.9s cubic-bezier(0.16,1,0.3,1)}
        .reveal.active{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}
        .hero-word{display:inline-block;overflow:hidden}
        .hero-word span{display:inline-block;transform:translateY(110%)}
        .cursor{position:fixed;width:24px;height:24px;border:1.5px solid #1A1A18;border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:difference;transition:transform 0.15s ease;left:0;top:0}
        .cursor.hover{transform:scale(2.5);background:#FFFCF5;border-color:#FFFCF5}
        @media(max-width:768px){.cursor,.blob{display:none}}
      `}</style>

      <div className="grain"></div>
      <div id="progress" style={{position:'fixed',top:0,left:0,height:'3px',background:'#C86B5A',width:'0%',zIndex:10000}}></div>
      <div id="cursor" className="cursor"></div>

      {/* HERO - Apple immersive 100vh */}
      <section className="relative h-[100vh] overflow-hidden bg-[#FFFCF5]">
        <div className="blob b1"></div><div className="blob b2"></div>
        {/* Background slider */}
        <div className="absolute inset-0">
          <img src="/images/tea_plantation_landscape.webp" alt="Tea estate Darjeeling" className="hero-bg absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/80 via-[#1A1A18]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-radial from-transparent to-[#1A1A18]/30"></div>
        </div>

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex items-end pb-20 md:pb-28">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8DCC6]/60 text-[11px] uppercase tracking-[0.15em] mb-6 reveal">
              <span className="w-1.5 h-1.5 bg-[#C86B5A] rounded-full animate-pulse"></span>
              Darjeeling 17-20 Aug Live • Mumbai + Travel
            </div>
            <h1 className="font-serif text-[42px] md:text-[72px] leading-[0.9] tracking-[-0.03em] text-cream md:text-[#FFFCF5] mb-6" style={{fontFamily:'Instrument Serif, Playfair Display, serif'}}>
              <span className="hero-word"><span>Where Journeys</span></span><br/>
              <span className="hero-word"><span className="italic text-[#C86B5A]">Become Ink.</span></span>
            </h1>
            <p className="text-[18px] md:text-[20px] leading-[1.5] text-white/70 max-w-[520px] mb-8 reveal" style={{fontFamily:'General Sans, Satoshi, sans-serif'}}>
              Hand-poked tattoos inspired by slow travel through India's coasts, mountains, and temples. Each piece carries a story. Each stay leaves a mark.
            </p>
            <div className="flex gap-3 reveal">
              <a href="#stays" className="bg-[#1A1A18] text-[#FFFCF5] px-7 py-3.5 rounded-full text-[14px] font-medium hover:bg-[#C86B5A] transition magnetic inline-flex items-center gap-2">Explore Stays <span>→</span></a>
              <a href="#services" className="border border-white/20 bg-white/10 backdrop-blur text-white px-7 py-3.5 rounded-full text-[14px] font-medium hover:bg-white hover:text-[#1A1A18] transition magnetic">Services</a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[11px] uppercase tracking-[0.2em] flex flex-col items-center gap-2">
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* STAYS EXPERIENCE - Apple sticky stack */}
      <section id="stays" className="py-24 md:py-32 bg-[#FFFCF5] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-6 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-50 mb-3">Travel & Stay Experience</div>
              <h2 className="font-serif text-[36px] md:text-[54px] leading-[0.9] tracking-[-0.02em]" style={{fontFamily:'Instrument Serif, serif'}}>
                Where I've <span className="italic text-[#C86B5A]">stayed slow</span>
              </h2>
            </div>
            <p className="text-[14px] opacity-60 max-w-[360px]">Not a pitch deck. Real stays, real stories, shot on Sony. No filters, just mist and tea.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 - Tea Estate */}
            <div className="stack-card reveal group rounded-[24px] overflow-hidden bg-white border border-[#1A1A18]/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="aspect-[4/5] overflow-hidden relative bg-[#E8DCC6]">
                <img src="/images/tea_plantation_landscape.webp" className="parallax-img w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Tea estate Darjeeling" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FFFCF5] text-[10px] uppercase tracking-[0.12em]">Tea Estate • Darjeeling</div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-[22px] leading-[1.1] mb-2">Morning Mist, No Poles</h3>
                <p className="text-[13px] opacity-60 leading-[1.6]">Balcony tea, red top, endless green. Edited realistic, poles removed, soul intact.</p>
                <div className="mt-4 text-[11px] uppercase tracking-[0.12em] opacity-40">Deliverables: 3 Reels + 20 Photos + Blog</div>
              </div>
            </div>

            {/* Card 2 - Forest */}
            <div className="stack-card reveal group rounded-[24px] overflow-hidden bg-white border border-[#1A1A18]/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{transitionDelay:'0.1s'} as any}>
              <div className="aspect-[4/5] overflow-hidden relative bg-[#E8DCC6]">
                <img src="/images/misty_forest_portrait.webp" className="parallax-img w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Lamahatta forest" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C86B5A] text-white text-[10px] uppercase">Forest • Lamahatta</div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-[22px] leading-[1.1] mb-2">Forest Cathedral</h3>
                <p className="text-[13px] opacity-60 leading-[1.6]">Looking up at tall trees, light breaking through. Breathe.</p>
                <div className="mt-4 text-[11px] uppercase tracking-[0.12em] opacity-40">Deliverables: Reels + Photos + Review</div>
              </div>
            </div>

            {/* Card 3 - Temple/Spiritual */}
            <div className="stack-card reveal group rounded-[24px] overflow-hidden bg-white border border-[#1A1A18]/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{transitionDelay:'0.2s'} as any}>
              <div className="aspect-[4/5] overflow-hidden relative bg-[#E8DCC6]">
                <img src="/images/shiva_statue_daylight.webp" className="parallax-img w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Shiva statue Namchi" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#5A5A40] text-white text-[10px] uppercase">Spiritual • Sikkim</div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-[22px] leading-[1.1] mb-2">87ft of Calm</h3>
                <p className="text-[13px] opacity-60 leading-[1.6]">Namchi Chardham, realistic daylight, no fantasy glow. Real is rare.</p>
                <div className="mt-4 text-[11px] uppercase tracking-[0.12em] opacity-40">Deliverables: Photos + Blog + Story</div>
              </div>
            </div>
          </div>
          <div className="stack-end"></div>
        </div>
      </section>

      {/* SERVICES - Top Deliverables */}
      <section id="services" className="py-16 md:py-24 bg-[#1A1A18] text-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="reveal mb-12">
            <div className="text-[11px] uppercase tracking-[0.2em] opacity-50 mb-3">Services</div>
            <h2 className="font-serif text-[36px] md:text-[54px] leading-[0.9]">Top Deliverables</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Reels (2-3)', d: 'Golden hour, property walk, guest moments. 9:16 edited + captioned.' },
              { t: 'Photo Set (25-30)', d: 'Edited realistic, no over-edit. For IG + Google + website.' },
              { t: 'Blog Story', d: '800 words SEO, your slow travel voice, honest.' },
              { t: 'Reviews', d: 'Google + Instagram + TripAdvisor, real experience.' },
              { t: 'Story Takeover', d: '1 day live from property, behind scenes.' },
              { t: 'Tattoo Pop-up', d: 'Optional flash inspired by destination, guests love it.' },
            ].map((s, i) => (
              <div key={i} className="reveal rounded-[20px] bg-[#1E1E1E] border border-white/10 p-6" style={{transitionDelay: `${i*0.05}s`} as any}>
                <h3 className="font-serif text-[18px] mb-2">{s.t}</h3>
                <p className="text-[13px] opacity-60 leading-[1.6]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
