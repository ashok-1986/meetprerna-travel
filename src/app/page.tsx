'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// FINAL app/page.tsx for meetprerna-travel.vercel.app
// Includes: Apple animations, realistic images, no pricing, no Day 1-7 timeline
// Fonts: Instrument Serif + Satoshi/General Sans
// Images required in public/images/:
// tea_plantation_landscape.webp (poles removed), misty_forest_portrait.webp, shiva_statue_daylight.webp,
// gopuram_golden_sunset.webp, darjeeling_misty_balcony.webp, darjeeling_misty_landscape.webp,
// candid_phone_photo.webp, intimate_bw_portrait.webp, mystical_forest_cathedral.webp

export default function Page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Apple TV+ hero word stagger
    gsap.to('.hero-word span', { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.4 })
    gsap.to('.hero-bg', { scale: 1.08, duration: 10, ease: 'power1.out' })
    gsap.to('.hero-sub', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 })

    // Progress bar
    const prog = document.getElementById('progress')
    const onScroll = () => {
      if (!prog) return
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      prog.style.width = scrolled + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Lenis smooth scroll - Apple style
    let lenis: any
    import('lenis').then(mod => {
      const Lenis = mod.default
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true, gestureOrientation: 'vertical' })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time: any) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    })

    // Reveal observer - blur+Y (Apple Vision Pro)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') })
    }, { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    // Parallax scale - Apple MacBook
    gsap.utils.toArray('.parallax-img').forEach((img: any) => {
      gsap.to(img, {
        yPercent: -12,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.parallax-wrap'), scrub: 1.5, start: 'top bottom', end: 'bottom top' }
      })
    })

    // Stack cards pin
    gsap.utils.toArray('.stack-card').forEach((card: any, i: number) => {
      ScrollTrigger.create({
        trigger: card as any,
        start: `top+=${i * 16} top`,
        endTrigger: '.stack-end',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })
    })

    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: any) => {
        const r = btn.getBoundingClientRect()
        const x = e.clientX - r.left - r.width / 2
        const y = e.clientY - r.top - r.height / 2
        gsap.to(btn, { x: x * 0.22, y: y * 0.32, duration: 0.5, ease: 'power3.out' })
      })
      btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' }))
    })

    // Custom cursor
    const cursor = document.getElementById('cursor')
    if (cursor && window.innerWidth > 768) {
      const move = (e: MouseEvent) => gsap.to(cursor, { x: e.clientX - 11, y: e.clientY - 11, duration: 0.2, ease: 'power2.out' })
      window.addEventListener('mousemove', move)
      document.querySelectorAll('a,button,.stack-card').forEach((el: any) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
      })
      return () => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('scroll', onScroll)
        obs.disconnect()
        if (lenis) lenis.destroy()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
      if (lenis) lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sora:wght@300;400;500&display=swap');
        *{font-family:'Sora', system-ui, sans-serif}
        .font-serif{font-family:'Instrument Serif', 'Times New Roman', serif !important}
        .grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.032;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:gM 8s steps(10) infinite}
        @keyframes gM{0%,100%{transform:translate(0,0)}25%{transform:translate(-4%,3%)}50%{transform:translate(-7%,-5%)}75%{transform:translate(5%,2%)}}
        .blob{position:absolute;border-radius:50%;filter:blur(82px);opacity:0.16;pointer-events:none}
        .b1{width:420px;height:420px;background:#C86B5A;top:8%;right:-6%;animation:d1 24s ease-in-out infinite}
        .b2{width:560px;height:560px;background:#5A5A40;top:48%;left:-12%;animation:d2 30s ease-in-out infinite}
        @keyframes d1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-28px,38px) scale(1.08)}}
        @keyframes d2{0%,100%{transform:translate(0,0)}50%{transform:translate(36px,-18px) scale(1.12)}}
        .reveal{opacity:0;transform:translateY(32px) scale(0.985);filter:blur(7px);transition:all 0.9s cubic-bezier(0.16,1,0.3,1)}
        .reveal.active{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}
        .hero-word{display:inline-block;overflow:hidden;vertical-align:bottom}
        .hero-word span{display:inline-block;transform:translateY(110%)}
        .hero-sub{opacity:0;transform:translateY(16px)}
        .cursor{position:fixed;width:22px;height:22px;border:1.5px solid #1A1A18;border-radius:50%;pointer-events:none;z-index:10000;mix-blend-mode:difference;left:0;top:0}
        .cursor.hover{transform:scale(2.6);background:#FFFCF5;border-color:#FFFCF5}
        @media(max-width:768px){.cursor,.blob{display:none}}
      `}</style>

      <div className="grain"></div>
      <div id="progress" style={{position:'fixed',top:0,left:0,height:'3px',background:'#C86B5A',width:'0%',zIndex:10000}}></div>
      <div id="cursor" className="cursor"></div>

      {/* NAV - fixes clumsy UX */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-xl bg-[#FFFCF5]/70 border-b border-[#1A1A18]/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
          <div className="font-serif text-[22px] tracking-[-0.02em]">prerna.</div>
          <div className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.02em]">
            <a href="#stays" className="opacity-70 hover:opacity-100 transition">Stays</a>
            <a href="#services" className="opacity-70 hover:opacity-100 transition">Services</a>
            <a href="#about" className="opacity-70 hover:opacity-100 transition">About</a>
            <a href="#contact" className="px-5 py-2 rounded-full bg-[#1A1A18] text-[#FFFCF5] hover:bg-[#C86B5A] transition magnetic">Let's talk</a>
          </div>
        </div>
      </nav>

      {/* HERO - Apple immersive 100vh, fixes font + clumsy */}
      <section className="relative h-[100vh] min-h-[700px] overflow-hidden bg-[#FFFCF5]">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="absolute inset-0">
          <img src="/images/tea_plantation_landscape.webp" alt="Darjeeling tea estate realistic" className="hero-bg absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/85 via-[#1A1A18]/25 to-[#1A1A18]/10"></div>
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at center, transparent 60%, rgba(26,26,24,0.35) 100%)'}}></div>
        </div>

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-[88px] md:pb-[108px]">
          <div className="inline-flex self-start items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFCF5]/90 backdrop-blur text-[11px] uppercase tracking-[0.14em] mb-7 reveal">
            <span className="w-1.5 h-1.5 bg-[#C86B5A] rounded-full animate-pulse"></span>
            Darjeeling 17-20 Aug • Mumbai + Travel • 15+ Years Art
          </div>
          <h1 className="font-serif text-[44px] md:text-[80px] leading-[0.88] tracking-[-0.03em] text-[#FFFCF5] max-w-[760px]">
            <span className="hero-word"><span>Where Journeys</span></span><br/>
            <span className="hero-word"><span className="italic text-[#E8DCC6] font-serif">Become Ink.</span></span>
          </h1>
          <p className="hero-sub text-[17px] md:text-[19px] leading-[1.5] text-white/70 max-w-[520px] mt-6 mb-8">
            Hand-poked tattoos inspired by slow travel through India's coasts, mountains, and temples. Each piece carries a story. Each stay leaves a mark.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#stays" className="magnetic bg-[#FFFCF5] text-[#1A1A18] px-7 py-[13px] rounded-full text-[14px] font-medium hover:bg-[#C86B5A] hover:text-white transition inline-flex gap-2">Explore Stays <span>→</span></a>
            <a href="#services" className="magnetic border border-white/25 bg-white/10 backdrop-blur-md text-white px-7 py-[13px] rounded-full text-[14px] font-medium hover:bg-white hover:text-[#1A1A18] transition">Services</a>
          </div>
          <div className="flex gap-10 mt-10 text-white/60">
            <div><div className="font-serif text-[22px] text-white">6.7K</div><div className="text-[11px] uppercase tracking-[0.12em]">Community</div></div>
            <div><div className="font-serif text-[22px] text-white">210+</div><div className="text-[11px] uppercase tracking-[0.12em]">Stories</div></div>
            <div><div className="font-serif text-[22px] text-white">Sony</div><div className="text-[11px] uppercase tracking-[0.12em]">Creator</div></div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] uppercase tracking-[0.2em] flex flex-col items-center gap-2">
          <span>Scroll</span><span className="w-[1px] h-8 bg-white/30"></span>
        </div>
      </section>

      {/* STAYS EXPERIENCE - Real travel, not pitch deck */}
      <section id="stays" className="py-24 md:py-36 bg-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap justify-between items-end gap-8 mb-16 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 mb-4">Travel & Stay Experience</div>
              <h2 className="font-serif text-[38px] md:text-[56px] leading-[0.9] tracking-[-0.02em]">Where I've<br/><span className="italic text-[#C86B5A]">stayed slow.</span></h2>
            </div>
            <p className="text-[14px] leading-[1.7] opacity-60 max-w-[380px]">Not a hotel pitch deck. Real balconies, foggy towns, tea hills, temple bells. Sale happens offline — this is proof.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 md:gap-7">
            {/* Large card - Tea Estate */}
            <div className="md:col-span-7 stack-card reveal group rounded-[28px] overflow-hidden bg-white border border-[#1A1A18]/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              <div className="parallax-wrap aspect-[16/11] overflow-hidden relative">
                <img src="/images/tea_plantation_landscape.webp" alt="Tea estate Darjeeling no poles realistic" className="parallax-img w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
                <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#FFFCF5] text-[11px] tracking-[0.08em]">TEA ESTATE • DARJEELING</div>
              </div>
              <div className="p-7 flex justify-between gap-6">
                <div>
                  <h3 className="font-serif text-[24px] leading-[1.1]">Morning mist, no poles</h3>
                  <p className="text-[13px] opacity-60 mt-2 leading-[1.6] max-w-[420px]">Red top, chest ink, endless green hills. This image had power lines — removed realistically. Clean, true to place.</p>
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] opacity-40 whitespace-nowrap">Sony A7 • Real light</div>
              </div>
            </div>

            {/* Stack - 2 smaller */}
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-7">
              <div className="stack-card reveal rounded-[28px] overflow-hidden bg-white border border-[#1A1A18]/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.04)]" style={{transitionDelay:'0.08s'} as any}>
                <div className="parallax-wrap aspect-[16/10] overflow-hidden relative">
                  <img src="/images/darjeeling_misty_balcony.webp" alt="Darjeeling 3 friends foggy town" className="parallax-img w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C86B5A] text-white text-[10px]">DARJEELING TOWN • GROUP</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-[20px]">Foggy balcony, real friends</h3>
                  <p className="text-[12px] opacity-60 mt-1.5">Not staged. Just planning next chai stop.</p>
                </div>
              </div>

              <div className="stack-card reveal rounded-[28px] overflow-hidden bg-white border border-[#1A1A18]/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.04)]" style={{transitionDelay:'0.16s'} as any}>
                <div className="parallax-wrap aspect-[16/10] overflow-hidden relative">
                  <img src="/images/shiva_statue_daylight.webp" alt="Shiva statue Namchi realistic daylight" className="parallax-img w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1A1A18] text-[#FFFCF5] text-[10px]">SPIRITUAL • NAMCHI</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-[20px]">87ft of calm, real sky</h3>
                  <p className="text-[12px] opacity-60 mt-1.5">Realistic daylight, not fantasy glow. Hotels trust real.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 - temple + candid */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-7 mt-6 md:mt-7">
            <div className="md:col-span-4 stack-card reveal rounded-[28px] overflow-hidden bg-white border border-[#1A1A18]/[0.06]">
              <div className="parallax-wrap aspect-[4/3] overflow-hidden">
                <img src="/images/gopuram_golden_sunset.webp" alt="Temple gopuram colorful" className="parallax-img w-full h-full object-cover" />
              </div>
              <div className="p-6"><div className="text-[11px] uppercase opacity-40">Heritage • Temple</div><h3 className="font-serif text-[18px] mt-1">Gopuram colours</h3></div>
            </div>
            <div className="md:col-span-8 stack-card reveal rounded-[28px] overflow-hidden bg-[#1A1A18] text-[#FFFCF5] p-8 md:p-10 flex gap-8 items-center flex-wrap">
              <img src="/images/candid_phone_photo.webp" alt="Behind scenes ENTRY gate planning" className="w-[180px] h-[180px] rounded-[20px] object-cover" />
              <div className="flex-1 min-w-[260px]">
                <div className="text-[11px] uppercase tracking-[0.18em] opacity-50 mb-3">Behind the scenes • Real work</div>
                <h3 className="font-serif text-[28px] leading-[1.1]">No crew. Just phone, <span className="italic text-[#E8DCC6]">yellow sunnies, and figuring it out.</span></h3>
                <p className="text-[13px] opacity-60 mt-3 max-w-[440px] leading-[1.7]">This is how I actually work — outside ENTRY gates, checking shots on OnePlus. Hotels get this honesty, not a filtered reel.</p>
              </div>
            </div>
          </div>
          <div className="stack-end"></div>
        </div>
      </section>

      {/* SERVICES - Top Deliverables (No Day 1-7 timeline) */}
      <section id="services" className="py-24 md:py-28 bg-[#1A1A18] text-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-12 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 mb-3">Services</div>
              <h2 className="font-serif text-[38px] md:text-[56px] leading-[0.9]">Top deliverables.<br/><span className="italic opacity-60">No Day 1-7 SOP.</span></h2>
            </div>
            <p className="text-[13px] opacity-50 max-w-[340px]">Removed the clumsy Day 1-7 timeline you flagged. Just what you get, clean.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: 'Reels (2-3)', d: 'Golden hour, property walk, guest moments. 9:16, edited + captions, ultra-realistic grade.' },
              { t: 'Photo Set (25-30)', d: 'Edited realistic, no over-edit, poles/wires removed where needed. For IG, Google, website.' },
              { t: 'Blog Story (1)', d: '800 words SEO, slow travel voice, honest — not ad copy.' },
              { t: 'Google + IG Review', d: 'Real experience, real photos, helps SEO and trust.' },
              { t: 'Story Takeover (1 day)', d: 'Live from property, Q&A, behind scenes, saves to highlights.' },
              { t: 'Tattoo Pop-up (optional)', d: 'Flash inspired by your destination. Guests love it — unique to prerna.' },
            ].map((s, i) => (
              <div key={i} className="reveal rounded-[22px] bg-[#202020] border border-white/[0.08] p-7 hover:bg-[#252525] transition" style={{transitionDelay: `${i*0.06}s`} as any}>
                <div className="w-8 h-8 rounded-full bg-[#C86B5A]/20 flex items-center justify-center text-[12px] mb-4">{i+1}</div>
                <h3 className="font-serif text-[18px] mb-2">{s.t}</h3>
                <p className="text-[13px] opacity-60 leading-[1.6]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - Ink that breathes - merged, not repeated */}
      <section id="about" className="py-24 md:py-36 bg-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 mb-4">About</div>
            <h2 className="font-serif text-[36px] md:text-[48px] leading-[0.95]">Ink that<br/><span className="italic text-[#C86B5A]">breathes.</span></h2>
            <p className="text-[14px] leading-[1.8] opacity-70 mt-6 max-w-[360px]">No machines. No rush. Hand-poked tattoos heal faster, age beautifully, and carry intention of every dot. Fine line, botanical, script, minimal geometric — all custom.</p>
            <div className="mt-8 flex gap-3">
              <a href="https://calendly.com" className="magnetic px-6 py-3 rounded-full bg-[#1A1A18] text-[#FFFCF5] text-[13px]">Book a Session</a>
              <a href="https://instagram.com/meetprerna.tattoos" className="px-6 py-3 rounded-full border border-[#1A1A18]/10 text-[13px]">Tattoo IG</a>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-5">
            <div className="reveal rounded-[22px] overflow-hidden aspect-[3/4] bg-[#E8DCC6]">
              <img src="/images/misty_forest_portrait.webp" alt="Prerna misty forest" className="w-full h-full object-cover" />
            </div>
            <div className="reveal rounded-[22px] overflow-hidden aspect-[3/4] bg-[#1A1A18] p-7 flex flex-col justify-between text-[#FFFCF5]" style={{transitionDelay:'0.1s'} as any}>
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] opacity-50">Process</div>
                <ul className="mt-4 space-y-3 text-[13px] opacity-80">
                  <li>— Consultation & design, we draw together</li>
                  <li>— Placement & stencil, you approve</li>
                  <li>— Hand-poked 1-4h, tea included</li>
                  <li>— Aftercare kit & healing guide</li>
                </ul>
              </div>
              <div className="font-serif italic text-[18px] opacity-60">Oldest form of tattooing. Soft, organic, deeply personal.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FIELD NOTES + CONTACT */}
      <footer id="contact" className="py-16 border-t border-[#1A1A18]/10 bg-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-wrap justify-between gap-8">
          <div>
            <div className="font-serif text-[24px]">prerna.</div>
            <div className="text-[13px] opacity-60 mt-2 max-w-[320px]">Monthly notes on travel, tattoo stories, and quiet moments. No spam. Just soul.</div>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com/meetprerna" className="text-[13px] underline">Travel IG</a>
              <a href="https://instagram.com/meetprerna.tattoos" className="text-[13px] underline">Tattoo IG</a>
            </div>
          </div>
          <div className="flex gap-12 text-[13px]">
            <div><div className="font-medium mb-3">Enquiries</div><a href="mailto:hello@meetprerna.com" className="opacity-60">hello@meetprerna.com</a><div className="mt-2 opacity-60">Mumbai • Darjeeling 17-20 Aug</div></div>
            <div><div className="font-medium mb-3">Stay</div><div className="opacity-60">Let's talk offline — no pricing here.</div><a href="#" className="mt-2 inline-block px-5 py-2 rounded-full bg-[#1A1A18] text-[#FFFCF5]">Typeform →</a></div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pt-8 border-t border-[#1A1A18]/5 flex justify-between text-[11px] uppercase tracking-[0.12em] opacity-40">
          <span>© 2026 Prerna — Travel & Tattoo</span><span>Built on Vercel • Fonts: Instrument Serif + Sora</span>
        </div>
      </footer>
    </>
  )
}
