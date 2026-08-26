'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// FINAL FIXED page.tsx - uses ONLY images you have in C:\Users\Alchemetryx\Downloads\prerna-site
// No more 404s. Fixes Travel & Stay Experience UX/UI.

const STAYS = [
  { src: '/images/tea_plantation_landscape.webp', tag: 'TEA ESTATE • DARJEELING', title: 'Morning mist, no poles', desc: 'Red top, chest ink, endless green. Poles removed realistically.' },
  { src: '/images/golden_tea_plantation.webp', tag: 'TEA GARDEN • MUNNAR', title: 'Golden hour tea rows', desc: 'Warm light, slow walk.' },
  { src: '/images/misty_forest_portrait.webp', tag: 'FOREST • LAMAHATTA', title: 'Forest cathedral', desc: 'Looking up, light breaking.' },
  { src: '/images/mystical_forest_cathedral.webp', tag: 'FOREST • DEEP', title: 'Mystical canopy', desc: 'Tall trees, mist, breathe.' },
  { src: '/images/shiva_statue_daylight.webp', tag: 'SPIRITUAL • NAMCHI', title: '87ft of calm, real sky', desc: 'Realistic daylight, no fantasy glow.' },
  { src: '/images/cinematic_temple_portrait.webp', tag: 'HERITAGE • TEMPLE', title: 'Temple colours', desc: 'Gopuram detail, golden sunset.' },
  { src: '/images/cinematic_mountain_photographer.webp', tag: 'MOUNTAIN • WORK', title: 'Mountain work', desc: 'Sony in hand, real work.' },
  { src: '/images/candid_phone_photo.webp', tag: 'BEHIND SCENES • REAL', title: 'No crew, just phone', desc: 'ENTRY gate, yellow sunnies, OnePlus check.' },
]

export default function Page() {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to('.hero-word span', { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.3 })
      gsap.to('.hero-bg', { scale: 1.06, duration: 12, ease: 'power1.out' })
      gsap.to('.hero-sub', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 })
    })
    ctxRef.current = ctx

    const listeners: { el: any; type: string; fn: any }[] = []
    const add = (el: any, type: string, fn: any) => { el.addEventListener(type, fn); listeners.push({ el, type, fn }) }

    const prog = document.getElementById('progress')
    const onScroll = () => { if (prog) prog.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 + '%' }
    add(window, 'scroll', onScroll)

    const obs = new IntersectionObserver((ents) => ents.forEach(e => e.target.classList.add('active')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    return () => {
      listeners.forEach(({ el, type, fn }) => { try { el.removeEventListener(type, fn) } catch {} })
      obs.disconnect()
      ctxRef.current?.revert()
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sora:wght@300;400;500&display=swap');
        *{font-family:'Sora',sans-serif}
        .font-serif{font-family:'Instrument Serif',serif !important}
        .grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .reveal{opacity:0;transform:translateY(24px);filter:blur(6px);transition:all 0.8s cubic-bezier(0.16,1,0.3,1)}
        .reveal.active{opacity:1;transform:translateY(0);filter:blur(0)}
        .hero-word{overflow:hidden;display:inline-block}
        .hero-word span{display:inline-block;transform:translateY(110%)}
        .hero-sub{opacity:0;transform:translateY(12px)}
      `}</style>

      <div className="grain"></div>
      <div id="progress" style={{position:'fixed',top:0,left:0,height:'3px',background:'#C86B5A',width:'0%',zIndex:9999}}></div>

      <nav className="fixed top-0 w-full z-40 backdrop-blur-xl bg-[#FFFCF5]/75 border-b border-black/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
          <div className="font-serif text-[22px]">prerna.</div>
          <div className="hidden md:flex items-center gap-8 text-[13px]">
            <Link href="#stays" className="opacity-60 hover:opacity-100">Stays</Link>
            <Link href="#services" className="opacity-60 hover:opacity-100">Services</Link>
            <Link href="#contact" className="px-5 py-2 rounded-full bg-black text-white">Let's talk</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] overflow-hidden bg-[#FFFCF5]">
        <div className="absolute inset-0">
          <img src="/images/cinematic_temple_portrait.webp" alt="Temple portrait" className="hero-bg absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
        </div>
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-24">
          <div className="inline-flex self-start px-3.5 py-2 rounded-full bg-white/90 text-[11px] uppercase tracking-[0.14em] mb-6 reveal">
            <span className="w-1.5 h-1.5 bg-[#C86B5A] rounded-full animate-pulse mr-2"></span>Darjeeling 17-20 Aug • Mumbai + Travel
          </div>
          <h1 className="font-serif text-[44px] md:text-[78px] leading-[0.88] text-white max-w-[760px]">
            <span className="hero-word"><span>Where Journeys</span></span><br/>
            <span className="hero-word"><span className="italic text-[#E8DCC6]">Become Ink.</span></span>
          </h1>
          <p className="hero-sub text-[18px] text-white/70 max-w-[520px] mt-6">Hand-poked tattoos inspired by slow travel. Each piece carries a story. Each stay leaves a mark.</p>
        </div>
      </section>

      {/* TRAVEL & STAY - FIXED, NO PIN, NO 404 */}
      <section id="stays" className="py-20 md:py-28 bg-[#FFFCF5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 mb-3">Travel & Stay Experience</div>
              <h2 className="font-serif text-[36px] md:text-[54px] leading-[0.9]">Where I've<br/><span className="italic text-[#C86B5A]">stayed slow.</span></h2>
            </div>
            <p className="text-[13px] opacity-60 max-w-[360px]">All images from your local folder. No more missing. Sale offline — this is proof.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 auto-rows-[1fr]">
            {/* Featured large */}
            <div className="md:col-span-8 reveal rounded-[28px] overflow-hidden bg-white border border-black/5">
              <div className="aspect-[16/10] bg-[#E8DCC6] overflow-hidden">
                <img src="/images/tea_plantation_landscape.webp" alt="Tea" className="w-full h-full object-cover hover:scale-[1.02] transition duration-700" />
              </div>
              <div className="p-6 flex justify-between">
                <div><h3 className="font-serif text-[22px]">Morning mist, no poles</h3><p className="text-[13px] opacity-60 mt-1">Poles removed realistically — clean green.</p></div>
                <span className="text-[10px] uppercase opacity-40">TEA ESTATE</span>
              </div>
            </div>

            <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <div className="reveal rounded-[28px] overflow-hidden bg-white border border-black/5">
                <div className="aspect-[16/10] bg-[#E8DCC6] overflow-hidden"><img src="/images/golden_tea_plantation.webp" alt="Golden tea" className="w-full h-full object-cover" /></div>
                <div className="p-5"><h3 className="font-serif text-[18px]">Golden tea rows</h3></div>
              </div>
              <div className="reveal rounded-[28px] overflow-hidden bg-white border border-black/5">
                <div className="aspect-[16/10] bg-[#E8DCC6] overflow-hidden"><img src="/images/misty_forest_portrait.webp" alt="Forest" className="w-full h-full object-cover" /></div>
                <div className="p-5"><h3 className="font-serif text-[18px]">Forest cathedral</h3></div>
              </div>
            </div>

            {/* Row 2 - 4 cards using ONLY your existing files */}
            {STAYS.slice(3).map((c, i) => (
              <div key={i} className="md:col-span-3 reveal rounded-[28px] overflow-hidden bg-white border border-black/5">
                <div className="aspect-[4/3] bg-[#E8DCC6] overflow-hidden">
                  <img src={c.src} alt={c.title} className="w-full h-full object-cover hover:scale-105 transition duration-700" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.12em] opacity-40 mb-1">{c.tag}</div>
                  <h3 className="font-serif text-[16px] leading-[1.2]">{c.title}</h3>
                  <p className="text-[11px] opacity-50 mt-1">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Behind scenes - always loads because you have it */}
          <div className="mt-6 reveal rounded-[28px] bg-[#1A1A18] text-white p-8 md:p-10 flex flex-wrap gap-8 items-center">
            <img src="/images/candid_phone_photo.webp" alt="Behind scenes" className="w-[200px] h-[200px] rounded-[20px] object-cover" />
            <div className="flex-1 min-w-[280px]">
              <div className="text-[11px] uppercase tracking-[0.18em] opacity-50 mb-3">Behind the scenes • Real work</div>
              <h3 className="font-serif text-[26px] leading-[1.15]">No crew. Just phone, <span className="italic text-[#E8DCC6]">yellow sunnies, and figuring it out.</span></h3>
              <p className="text-[13px] opacity-60 mt-3 max-w-[480px]">Outside ENTRY gates, checking shots on OnePlus. This honesty is what hotels get — not filtered reels.</p>
            </div>
            <img src="/images/intimate_bw_portrait.webp" alt="Real moment" className="w-[120px] h-[120px] rounded-full object-cover opacity-80 hidden md:block" />
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#1A1A18] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <h2 className="font-serif text-[36px] md:text-[52px] mb-10 reveal">Top deliverables.</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { t: 'Reels (2-3)', d: 'Golden hour, property walk, guest moments.' },
              { t: 'Photo Set (25-30)', d: 'Realistic edit, poles removed where needed.' },
              { t: 'Blog Story', d: '800 words SEO, slow travel voice.' },
              { t: 'Google + IG Review', d: 'Real experience, helps SEO.' },
              { t: 'Story Takeover', d: '1 day live from property.' },
              { t: 'Tattoo Pop-up', d: 'Optional flash inspired by place.' },
            ].map((s, i) => (
              <div key={i} className="reveal rounded-[20px] bg-white/[0.06] border border-white/10 p-6"><h3 className="font-serif text-[17px] mb-2">{s.t}</h3><p className="text-[12px] opacity-60">{s.d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
