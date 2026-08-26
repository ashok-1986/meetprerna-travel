'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STAYS = [
  { src: '/images/mystical_forest_cathedral.webp', tag: 'FOREST • DEEP', title: 'Mystical canopy', desc: 'Tall trees, mist, breathe.', alt: 'Prerna photographing a deep mystical forest canopy' },
  { src: '/images/shiva_statue_daylight.webp', tag: 'SPIRITUAL • NAMCHI', title: '87ft of calm, real sky', desc: 'Realistic daylight, no fantasy glow.', alt: 'Prerna photographing a large Shiva statue in Namchi daylight' },
  { src: '/images/cinematic_temple_portrait.webp', tag: 'HERITAGE • TEMPLE', title: 'Temple colours', desc: 'Gopuram detail, golden sunset.', alt: 'Prerna photographing a colourful temple Gopuram at sunset' },
  { src: '/images/cinematic_mountain_photographer.webp', tag: 'MOUNTAIN • WORK', title: 'Mountain work', desc: 'Sony in hand, real work.', alt: 'Prerna working as a photographer in the mountains' },
  { src: '/images/bare_feet_stream.webp', tag: 'CONNECTION • NATURE', title: 'Bare feet, cold stream', desc: 'Grounding, feeling the earth.', alt: 'Bare feet in a cold mountain stream' },
  { src: '/images/goa_beach_sunset.webp', tag: 'BEACH • GOA', title: 'Golden hour waves', desc: 'Soft light, salt air, slow pace.', alt: 'Prerna photographing golden hour waves on a Goa beach' },
  { src: '/images/cozy_neon_studio.webp', tag: 'STUDIO • VIBE', title: 'Cozy neon', desc: 'Warm lights, intimate space.', alt: 'Prerna working in a cozy neon-lit tattoo studio' },
  { src: '/images/ethereal_forest_canopy.webp', tag: 'FOREST • LIGHT', title: 'Ethereal canopy', desc: 'Light filtering through ancient trees.', alt: 'Ethereal light filtering through a forest canopy' },
  { src: '/images/darjeeling_balcony_sunglasses_stay.webp', tag: 'STAY • DARJEELING', title: 'Balcony slow morning', desc: 'Coffee, sunglasses, mountain air.', alt: 'Prerna enjoying a slow morning on a Darjeeling balcony' },
]

export default function Page() {
  const ctxRef = useRef<gsap.Context | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.hero-word span', { y: '0%' })
        gsap.set('.hero-sub', { y: 0, opacity: 1 })
      } else {
        gsap.to('.hero-word span', { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.3 })
        gsap.to('.hero-bg', { scale: 1.05, duration: 15, ease: 'power1.out' })
        gsap.to('.hero-sub', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 })
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
    handleScroll() // initial check

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

  return (
    <>
      <style>{`
        .grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .reveal { opacity: 0; transform: translateY(14px); filter: blur(6px); transition: all 0.9s cubic-bezier(0.16,1,0.3,1) }
        .reveal.active { opacity: 1; transform: translateY(0); filter: blur(0) }
        .hero-word { overflow: hidden; display: inline-block }
        .hero-word span { display: inline-block; transform: translateY(105%) }
        .hero-sub { opacity: 0; transform: translateY(12px) }
        @media (prefers-reduced-motion: reduce) {
          .grain { display: none; }
          .reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
        }
      `}</style>

      <div className="grain"></div>
      <div id="progress" style={{position:'fixed',top:0,left:0,height:'2px',background:'#C86B5A',width:'0%',zIndex:9999}}></div>

      <header>
        <nav className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${scrolled ? 'bg-[#FFFCF5]/80 backdrop-blur-xl border-black/5 text-black' : 'bg-transparent border-white/10 text-white'}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
            <div className="font-header text-[22px]">prerna.</div>
            <div className="hidden md:flex items-center gap-8 text-[13px] font-body">
              <Link href="#stays" className="opacity-60 hover:opacity-100">Stays</Link>
              <Link href="#services" className="opacity-60 hover:opacity-100">Services</Link>
              <Link href="#contact" className={`px-5 py-2 rounded-full transition-colors ${scrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>Let's talk</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="relative h-[100vh] min-h-[640px] overflow-hidden bg-[#FFFCF5]">
          <div className="absolute inset-0">
            <img src="/images/tea_plantation_landscape.webp" alt="Prerna photographing a tea plantation landscape in Darjeeling" className="hero-bg absolute inset-0 w-full h-full object-cover scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
          </div>
          <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-24">
            <div className="inline-flex self-start px-3.5 py-2 rounded-full bg-white/90 text-black text-[11px] uppercase tracking-[0.14em] mb-6 reveal font-body">
              <span className="w-1.5 h-1.5 bg-[#C86B5A] rounded-full animate-pulse mr-2"></span>Darjeeling Live
            </div>
            <h1 className="font-header text-[44px] md:text-[78px] leading-[0.88] text-white max-w-[760px]">
              <span className="hero-word"><span>Where Journeys</span></span><br/>
              <span className="hero-word"><span className="italic text-[#E8DCC6]">Become Ink.</span></span>
            </h1>
            <p className="hero-sub font-body text-[18px] text-white/70 max-w-[520px] mt-6">Hand-poked tattoos and thoughtful travel storytelling across India.</p>
            <div className="hero-sub flex flex-wrap gap-4 mt-8 font-body text-[14px]">
              <Link href="#contact" className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#E8DCC6] transition-colors">Book a tattoo</Link>
              <Link href="#contact" className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors">Plan a collaboration</Link>
            </div>
          </div>
        </section>

        {/* AUDIENCE SPLIT */}
        <section className="py-20 bg-[#FFFCF5]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-6 reveal">
              <div className="p-10 md:p-14 rounded-[28px] bg-white border border-black/5 flex flex-col justify-center hover:shadow-xl transition-shadow">
                <h2 className="font-header text-[32px] mb-4 text-[#1A1A18]">For travellers</h2>
                <p className="font-body text-[15px] opacity-70 mb-8 max-w-[400px]">Immersive hand-poked tattoo experiences, inspired by the places you visit and the stories you carry.</p>
                <Link href="#contact" className="font-body text-[13px] uppercase tracking-wider text-[#C86B5A] hover:opacity-70 self-start">Request a booking &rarr;</Link>
              </div>
              <div className="p-10 md:p-14 rounded-[28px] bg-white border border-black/5 flex flex-col justify-center hover:shadow-xl transition-shadow">
                <h2 className="font-header text-[32px] mb-4 text-[#1A1A18]">For stays & properties</h2>
                <p className="font-body text-[15px] opacity-70 mb-8 max-w-[400px]">Cinematic reels, honest photography, and place-led stories for stays that want guests to feel the destination.</p>
                <Link href="#contact" className="font-body text-[13px] uppercase tracking-wider text-[#C86B5A] hover:opacity-70 self-start">View packages &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* TRAVEL & STAY */}
        <section id="stays" className="py-20 md:py-28 bg-[#FFFCF5]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-wrap justify-between items-end gap-6 mb-12 reveal">
              <div>
                <div className="font-body text-[11px] uppercase tracking-[0.2em] opacity-40 mb-3 text-[#1A1A18]">For travellers and thoughtful stays</div>
                <h2 className="font-header text-[36px] md:text-[54px] leading-[0.9] text-[#1A1A18]">Places I've experienced,<br/><span className="italic text-[#C86B5A]">photographed, and remembered.</span></h2>
              </div>
              <p className="font-body text-[13px] opacity-60 max-w-[360px] text-[#1A1A18]">Every image here comes from a real place, real day, and real point of view. No stock moodboards; just honest travel storytelling.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-5 auto-rows-[1fr]">
              {/* 8-col Featured */}
              <div className="md:col-span-8 reveal rounded-[28px] overflow-hidden bg-white border border-black/5">
                <div className="aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] bg-[#E8DCC6] overflow-hidden">
                  <img src="/images/tea_plantation_landscape.webp" alt="Prerna photographing a tea plantation landscape in Darjeeling" className="w-full h-full object-cover hover:scale-[1.03] transition duration-700" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
                </div>
                <div className="p-6 flex justify-between items-start text-[#1A1A18]">
                  <div>
                    <h3 className="font-header text-[24px]">Morning mist, no poles</h3>
                    <p className="font-body text-[13px] opacity-60 mt-1">Light-touch editing that keeps the place believable.</p>
                  </div>
                  <span className="font-body text-[10px] uppercase opacity-40 whitespace-nowrap ml-4">TEA ESTATE</span>
                </div>
              </div>

              {/* 4-col Stack */}
              <div className="md:col-span-4 grid grid-rows-2 gap-5">
                <div className="reveal rounded-[28px] overflow-hidden bg-white border border-black/5 flex flex-col">
                  <div className="flex-1 bg-[#E8DCC6] overflow-hidden min-h-[160px]">
                    <img src="/images/golden_tea_plantation.webp" alt="Prerna walking through golden hour tea rows in Munnar" className="w-full h-full object-cover hover:scale-[1.03] transition duration-700" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
                  </div>
                  <div className="p-5 text-[#1A1A18]"><h3 className="font-header text-[20px]">Golden hour tea rows</h3></div>
                </div>
                <div className="reveal rounded-[28px] overflow-hidden bg-white border border-black/5 flex flex-col">
                  <div className="flex-1 bg-[#E8DCC6] overflow-hidden min-h-[160px]">
                    <img src="/images/misty_forest_portrait.webp" alt="Prerna in a misty forest cathedral in Lamahatta" className="w-full h-full object-cover hover:scale-[1.03] transition duration-700" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
                  </div>
                  <div className="p-5 text-[#1A1A18]"><h3 className="font-header text-[20px]">Forest cathedral</h3></div>
                </div>
              </div>

              {/* Row 2 - 9 cards using 3-col layout for larger aspect ratio but we use md:col-span-4 to fit 3 per row instead of 4 */}
              {STAYS.map((c, i) => (
                <div key={i} className="md:col-span-4 reveal rounded-[28px] overflow-hidden bg-white border border-black/5 flex flex-col">
                  <div className="aspect-[4/3] bg-[#E8DCC6] overflow-hidden">
                    <img src={c.src} alt={c.alt} className="w-full h-full object-cover hover:scale-[1.03] transition duration-700" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
                  </div>
                  <div className="p-6 text-[#1A1A18] flex-1">
                    <div className="font-body text-[10px] uppercase tracking-[0.12em] opacity-40 mb-2">{c.tag}</div>
                    <h3 className="font-header text-[22px] leading-[1.2]">{c.title}</h3>
                    <p className="font-body text-[12px] opacity-60 mt-2">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Behind scenes banner */}
            <div className="mt-8 reveal rounded-[28px] bg-[#1A1A18] text-white p-8 md:p-12 flex flex-wrap gap-8 items-center">
              <img src="/images/candid_phone_photo.webp" alt="Behind the scenes photo of Prerna working" className="w-[160px] h-[220px] md:w-[220px] md:h-[280px] rounded-[20px] object-cover" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
              <div className="flex-1 min-w-[280px]">
                <div className="font-body text-[11px] uppercase tracking-[0.18em] opacity-50 mb-3">Behind the scenes • Real work</div>
                <h3 className="font-header text-[28px] md:text-[36px] leading-[1.15]">Real moments, <span className="italic text-[#E8DCC6]">thoughtfully captured.</span></h3>
                <p className="font-body text-[14px] opacity-60 mt-4 max-w-[480px]">The work happens in the real world: on the road, between check-ins, and sometimes from a phone screen.</p>
              </div>
              <img src="/images/intimate_bw_portrait.webp" alt="Real moment portrait of Prerna" className="w-[140px] h-[140px] rounded-full object-cover opacity-80 hidden lg:block" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
            </div>
          </div>
        </section>

        <section id="services" className="py-20 md:py-28 bg-[#1A1A18] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <h2 className="font-header text-[36px] md:text-[52px] mb-12 reveal">Content packages for stays<br/>that have a <span className="italic text-[#C86B5A]">story to tell.</span></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { t: 'Essentials', d: 'Perfect for a fresh social push.', i: ['1 Cinematic Reel', '15 Edited Photographs', '1 Story Takeover', 'Basic usage rights'] },
                { t: 'Story-led', d: 'Comprehensive documentation of the experience.', i: ['2-3 Cinematic Reels', '25-30 Edited Photographs', '800-word SEO Blog Story', 'Google + IG Review', 'Extended usage rights'] },
                { t: 'Custom stay', d: 'Tailored specifically to your property goals.', i: ['Bespoke deliverable list', 'Tattoo Pop-up (Optional flash)', 'Multi-day coverage', 'Full commercial buyout option'] },
              ].map((s, i) => (
                <div key={i} className="reveal rounded-[24px] bg-white/[0.03] border border-white/10 p-8 hover:bg-white/[0.06] transition-colors flex flex-col">
                  <h3 className="font-header text-[28px] mb-2">{s.t}</h3>
                  <p className="font-body text-[14px] opacity-60 mb-6">{s.d}</p>
                  <ul className="font-body text-[13px] opacity-80 space-y-3 flex-1">
                    {s.i.map((item, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="text-[#C86B5A] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact" className="mt-8 inline-block font-body text-[12px] uppercase tracking-wider text-white border border-white/20 rounded-full px-5 py-2 text-center hover:bg-white/10 transition-colors">Inquire about {s.t}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / PROCESS */}
        <section id="about" className="py-20 md:py-28 bg-[#FFFCF5]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal">
              <div>
                <h2 className="font-header text-[36px] md:text-[52px] leading-[1.05] text-[#1A1A18] mb-6">Tell me where you're going <br/>&rarr; We shape the idea <br/>&rarr; <span className="italic text-[#C86B5A]">We make something lasting.</span></h2>
                <p className="font-body text-[16px] leading-[1.7] opacity-70 text-[#1A1A18] mb-6">I believe that the best work comes from slowing down. Whether I'm hand-poking a tattoo that commemorates a journey, or creating honest imagery for a remote property, the process is always rooted in the present moment.</p>
                <p className="font-body text-[16px] leading-[1.7] opacity-70 text-[#1A1A18]">Currently working between Mumbai, Goa, and the mountains.</p>
              </div>
              <div className="aspect-square bg-[#E8DCC6] rounded-[28px] overflow-hidden">
                <img src="/images/cozy_neon_studio.webp" alt="Prerna in the studio working on a tattoo" className="w-full h-full object-cover" onError={(e:any)=>{e.target.src='/images/tea_plantation_landscape.webp'}} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 md:py-28 bg-[#1A1A18] text-white">
          <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center reveal">
            <h2 className="font-header text-[42px] md:text-[64px] mb-6">Let's talk.</h2>
            <p className="font-body text-[16px] opacity-70 mb-12">Drop a message below or reach out directly via <a href="mailto:hello@example.com" className="underline hover:text-white transition-colors">email</a> or <a href="https://wa.me/0000000000" className="underline hover:text-white transition-colors">WhatsApp</a>. I usually reply within 48 hours.</p>
            
            <form className="text-left bg-white/5 p-8 md:p-12 rounded-[28px] border border-white/10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-body text-[12px] uppercase opacity-50 block mb-2">Name</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-[12px] px-4 py-3 font-body text-white outline-none focus:border-[#C86B5A] transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="font-body text-[12px] uppercase opacity-50 block mb-2">Email or WhatsApp</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-[12px] px-4 py-3 font-body text-white outline-none focus:border-[#C86B5A] transition-colors" placeholder="How to reach you" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="font-body text-[12px] uppercase opacity-50 block mb-2">I'm interested in...</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-[12px] px-4 py-3 font-body text-white outline-none focus:border-[#C86B5A] transition-colors appearance-none">
                  <option value="" className="text-black">Select an option</option>
                  <option value="tattoo" className="text-black">Tattoo booking</option>
                  <option value="content" className="text-black">Stay / Content collaboration</option>
                  <option value="both" className="text-black">Both</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="font-body text-[12px] uppercase opacity-50 block mb-2">Preferred dates / Location</label>
                <input type="text" className="w-full bg-white/10 border border-white/20 rounded-[12px] px-4 py-3 font-body text-white outline-none focus:border-[#C86B5A] transition-colors" placeholder="Where and when?" />
              </div>

              <div className="mb-8">
                <label className="font-body text-[12px] uppercase opacity-50 block mb-2">Tell me a little about the idea</label>
                <textarea className="w-full bg-white/10 border border-white/20 rounded-[12px] px-4 py-3 font-body text-white outline-none focus:border-[#C86B5A] transition-colors h-[120px] resize-none" placeholder="Share your thoughts..."></textarea>
              </div>

              <button className="w-full bg-[#C86B5A] hover:bg-[#A85544] text-white font-body text-[15px] font-medium py-4 rounded-[12px] transition-colors">Send message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#1A1A18] border-t border-white/10 py-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-header text-[22px] text-white">prerna.</div>
          <div className="flex gap-6 font-body text-[13px] text-white/60">
            <Link href="https://instagram.com/meetprerna" target="_blank" className="hover:text-white transition-colors">@meetprerna</Link>
            <Link href="https://instagram.com/meetprerna.tattoos" target="_blank" className="hover:text-white transition-colors">@meetprerna.tattoos</Link>
          </div>
          <div className="font-body text-[12px] text-white/40">
            © {new Date().getFullYear()} Prerna. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
