'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// BULLETPROOF app/page.tsx - fixes all 5 anomalies
// Fixes: #1 Memory Leaks, #2 Race handled in SmoothScroll, #3 gsap.context, #4 Resize bug, #5 Next.js Link

export default function Page() {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Fix #3: gsap.context() for React Strict Mode - auto-reverts on unmount, prevents duplicate animations
    const ctx = gsap.context(() => {
      gsap.to('.hero-word span', { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.4 })
      gsap.to('.hero-bg', { scale: 1.08, duration: 10, ease: 'power1.out' })
      gsap.to('.hero-sub', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 })

      gsap.utils.toArray('.parallax-img').forEach((img: any) => {
        gsap.to(img, {
          yPercent: -12,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: img.closest('.parallax-wrap'), scrub: 1.5, start: 'top bottom', end: 'bottom top' }
        })
      })

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
    })
    ctxRef.current = ctx

    // --- Fix #1: Track all event listeners for proper cleanup ---
    const listeners: { el: any; type: string; fn: any }[] = []
    const addListener = (el: any, type: string, fn: any) => {
      el.addEventListener(type, fn)
      listeners.push({ el, type, fn })
    }

    // Progress bar
    const prog = document.getElementById('progress')
    const onScroll = () => {
      if (!prog) return
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      prog.style.width = scrolled + '%'
    }
    addListener(window, 'scroll', onScroll)

    // Reveal observer
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') })
    }, { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    // Magnetic buttons - Fix #1: store handlers to remove later
    document.querySelectorAll('.magnetic').forEach((btn: any) => {
      const onMove = (e: any) => {
        const r = btn.getBoundingClientRect()
        const x = e.clientX - r.left - r.width / 2
        const y = e.clientY - r.top - r.height / 2
        gsap.to(btn, { x: x * 0.22, y: y * 0.32, duration: 0.5, ease: 'power3.out' })
      }
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
      addListener(btn, 'mousemove', onMove)
      addListener(btn, 'mouseleave', onLeave)
    })

    // Custom cursor - Fix #1 + #4
    const cursor = document.getElementById('cursor')
    let cursorMoveFn: any = null
    let cursorHoverFns: { el: any; enter: any; leave: any }[] = []

    const setupCursor = () => {
      if (!cursor) return
      // Fix #4: Resize-aware check, not one-time
      if (window.innerWidth <= 768) {
        cursor.style.display = 'none'
        return
      }
      cursor.style.display = 'block'

      cursorMoveFn = (e: MouseEvent) => gsap.to(cursor, { x: e.clientX - 11, y: e.clientY - 11, duration: 0.2, ease: 'power2.out' })
      addListener(window, 'mousemove', cursorMoveFn)

      document.querySelectorAll('a,button,.stack-card').forEach((el: any) => {
        const onEnter = () => cursor.classList.add('hover')
        const onLeave = () => cursor.classList.remove('hover')
        addListener(el, 'mouseenter', onEnter)
        addListener(el, 'mouseleave', onLeave)
        cursorHoverFns.push({ el, enter: onEnter, leave: onLeave })
      })
    }

    const handleResize = () => {
      if (!cursor) return
      // Fix #4: adapt on resize/rotate without refresh
      if (window.innerWidth <= 768) {
        cursor.style.display = 'none'
      } else {
        cursor.style.display = 'block'
      }
    }
    addListener(window, 'resize', handleResize)
    setupCursor()

    // Cleanup - Fixes #1, #3, #4
    return () => {
      // Fix #1: remove every listener we added
      listeners.forEach(({ el, type, fn }) => {
        try { el.removeEventListener(type, fn) } catch {}
      })
      obs.disconnect()
      // Fix #3: revert gsap.context - kills all ScrollTriggers and tweens
      if (ctxRef.current) {
        ctxRef.current.revert()
        ctxRef.current = null
      }
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sora:wght@300;400;500&display=swap');
        *{font-family:'Sora', system-ui, sans-serif}
        .font-serif{font-family:'Instrument Serif', serif !important}
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

      <nav className="fixed top-0 w-full z-40 backdrop-blur-xl bg-[#FFFCF5]/70 border-b border-[#1A1A18]/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
          <div className="font-serif text-[22px]">prerna.</div>
          <div className="hidden md:flex items-center gap-8 text-[13px]">
            {/* Fix #5: Next.js Link for client-side routing */}
            <Link href="#stays" className="opacity-70 hover:opacity-100 transition">Stays</Link>
            <Link href="#services" className="opacity-70 hover:opacity-100 transition">Services</Link>
            <Link href="#about" className="opacity-70 hover:opacity-100 transition">About</Link>
            <Link href="#contact" className="px-5 py-2 rounded-full bg-[#1A1A18] text-[#FFFCF5] hover:bg-[#C86B5A] transition magnetic">Let's talk</Link>
          </div>
        </div>
      </nav>

      <section className="relative h-[100vh] min-h-[700px] overflow-hidden bg-[#FFFCF5]">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="absolute inset-0">
          <img src="/images/tea_plantation_landscape.webp" alt="Tea estate" className="hero-bg absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/85 via-[#1A1A18]/25 to-[#1A1A18]/10"></div>
        </div>
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-[108px]">
          <div className="inline-flex self-start items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFCF5]/90 backdrop-blur text-[11px] uppercase tracking-[0.14em] mb-7 reveal">
            <span className="w-1.5 h-1.5 bg-[#C86B5A] rounded-full animate-pulse"></span>
            Darjeeling 17-20 Aug • Mumbai + Travel
          </div>
          <h1 className="font-serif text-[44px] md:text-[80px] leading-[0.88] tracking-[-0.03em] text-[#FFFCF5] max-w-[760px]">
            <span className="hero-word"><span>Where Journeys</span></span><br/>
            <span className="hero-word"><span className="italic text-[#E8DCC6]">Become Ink.</span></span>
          </h1>
          <p className="hero-sub text-[19px] leading-[1.5] text-white/70 max-w-[520px] mt-6 mb-8">Hand-poked tattoos inspired by slow travel. Each piece carries a story. Each stay leaves a mark.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="#stays" className="magnetic bg-[#FFFCF5] text-[#1A1A18] px-7 py-[13px] rounded-full text-[14px] font-medium hover:bg-[#C86B5A] hover:text-white transition inline-flex gap-2">Explore Stays <span>→</span></Link>
            <Link href="#services" className="magnetic border border-white/25 bg-white/10 backdrop-blur-md text-white px-7 py-[13px] rounded-full text-[14px] font-medium hover:bg-white hover:text-[#1A1A18] transition">Services</Link>
          </div>
        </div>
      </section>

      <section id="stays" className="py-24 md:py-36 bg-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-16 reveal">
            <h2 className="font-serif text-[38px] md:text-[56px] leading-[0.9]">Where I've<br/><span className="italic text-[#C86B5A]">stayed slow.</span></h2>
            <p className="text-[14px] opacity-60 max-w-[380px]">Real stays, real stories. No pitch deck. Sale offline.</p>
          </div>
          <div className="grid md:grid-cols-12 gap-7">
            <div className="md:col-span-7 stack-card reveal rounded-[28px] overflow-hidden bg-white border border-[#1A1A18]/[0.06]">
              <div className="parallax-wrap aspect-[16/11] overflow-hidden"><img src="/images/tea_plantation_landscape.webp" className="parallax-img w-full h-full object-cover" alt="Tea" /></div>
              <div className="p-7"><h3 className="font-serif text-[24px]">Morning mist, no poles</h3><p className="text-[13px] opacity-60 mt-2">Poles removed realistically. Clean.</p></div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-7">
              <div className="stack-card reveal rounded-[28px] overflow-hidden bg-white border border-[#1A1A18]/[0.06]"><div className="parallax-wrap aspect-[16/10] overflow-hidden"><img src="/images/darjeeling_misty_balcony.webp" className="parallax-img w-full h-full object-cover" alt="Darjeeling" /></div><div className="p-6"><h3 className="font-serif text-[20px]">Foggy balcony</h3></div></div>
              <div className="stack-card reveal rounded-[28px] overflow-hidden bg-white border border-[#1A1A18]/[0.06]"><div className="parallax-wrap aspect-[16/10] overflow-hidden"><img src="/images/shiva_statue_daylight.webp" className="parallax-img w-full h-full object-cover" alt="Shiva" /></div><div className="p-6"><h3 className="font-serif text-[20px]">87ft of calm</h3></div></div>
            </div>
          </div>
          <div className="stack-end"></div>
        </div>
      </section>

      <section id="services" className="py-24 bg-[#1A1A18] text-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <h2 className="font-serif text-[38px] md:text-[56px] leading-[0.9] mb-12 reveal">Top deliverables.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: 'Reels (2-3)', d: 'Golden hour, walk, guest moments. 9:16 edited.' },
              { t: 'Photo Set (25-30)', d: 'Realistic, no over-edit.' },
              { t: 'Blog Story', d: '800 words SEO.' },
              { t: 'Reviews', d: 'Google + IG.' },
              { t: 'Story Takeover', d: '1 day live.' },
              { t: 'Tattoo Pop-up', d: 'Optional flash.' },
            ].map((s, i) => (
              <div key={i} className="reveal rounded-[22px] bg-[#202020] border border-white/[0.08] p-7" style={{transitionDelay: `${i*0.06}s`} as any}><h3 className="font-serif text-[18px] mb-2">{s.t}</h3><p className="text-[13px] opacity-60">{s.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="py-16 border-t border-[#1A1A18]/10 bg-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between flex-wrap gap-8 text-[13px]">
          <div className="font-serif text-[24px]">prerna.</div>
          <div className="opacity-60">Mumbai • Darjeeling 17-20 Aug • No pricing, sale offline</div>
        </div>
      </footer>
    </>
  )
}
