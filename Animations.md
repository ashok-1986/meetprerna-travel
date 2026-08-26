# Apple-Style Animations Reference for meetprerna-travel.vercel.app

Use this as reference for OpenCode to implement Apple-level motion using GSAP + ScrollTrigger + Lenis. Stack: Next.js 14, Tailwind, GSAP 3.12.5.

## Core Principles (Apple.com style)
1. **Slow, intentional, 60fps**: All animations 0.8s - 1.4s, ease: power3.out or power4.out, never linear
2. **Scroll-driven, not time-driven**: Use ScrollTrigger scrub: 1-2, not setTimeout
3. **One thing moves at a time**: Text reveals, then image scales, then next section pins
4. **Depth via scale + blur + y**: Combine translateY + scale + blur for parallax
5. **Sticky storytelling**: Pin section, animate inside, then unpin

## Setup

```bash
npm install gsap lenis
```

```tsx
// app/components/SmoothScroll.tsx
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf) }
  }, [])
  return null
}
```
Add <SmoothScroll /> in layout.tsx.

## Apple Animation Patterns

### 1. Hero Ken Burns + Text Stagger (Apple TV+ style)
```tsx
useEffect(() => {
  gsap.to('.hero-word span', { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.3 })
  gsap.to('.hero-bg', { scale: 1.1, duration: 8, ease: 'power1.out' })
}, [])
```
HTML: .hero-word { overflow:hidden } span { transform: translateY(110%) }

### 2. Image Scale on Scroll (Apple MacBook page)
```tsx
gsap.to('.scale-img', {
  scale: 1.15,
  yPercent: -10,
  ease: 'none',
  scrollTrigger: { trigger: '.scale-wrap', scrub: 1.5, start: 'top bottom', end: 'bottom top' }
})
```

### 3. Sticky Pin + Reveal (Apple AirPods)
```tsx
ScrollTrigger.create({
  trigger: '.pin-section',
  pin: true,
  start: 'top top',
  end: '+=100%',
  scrub: 1
})
gsap.to('.pin-text', { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.pin-section', scrub: 1, start: 'top 60%' }})
```

### 4. Text Mask Reveal (Apple.com headline)
CSS: .mask-text { clip-path: inset(0 0 100% 0) }
```tsx
gsap.to('.mask-text', { clipPath: 'inset(0 0 0% 0)', duration: 1.2, stagger: 0.1, ease: 'power4.out', scrollTrigger: { trigger: '.mask-wrap', start: 'top 75%' }})
```

### 5. Blur + Y Reveal (Apple Vision Pro)
```css
.reveal { opacity:0; transform: translateY(40px) scale(0.98); filter: blur(8px); transition: all 0.9s cubic-bezier(0.16,1,0.3,1) }
.reveal.active { opacity:1; transform: translateY(0) scale(1); filter: blur(0) }
```
JS: IntersectionObserver threshold 0.15 add .active

### 6. Stack Cards Pin (Apple Services)
```tsx
gsap.utils.toArray('.stack-card').forEach((card, i) => {
  ScrollTrigger.create({ trigger: card, start: `top+=${i*20} top`, pin: true, pinSpacing: false })
})
```

### 7. Magnetic Button (Apple Store CTA)
```tsx
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width/2
    const y = e.clientY - rect.top - rect.height/2
    gsap.to(btn, { x: x*0.25, y: y*0.35, duration: 0.5, ease: 'power3.out' })
  })
  btn.addEventListener('mouseleave', () => gsap.to(btn, { x:0, y:0, duration: 0.6 }))
})
```

### 8. Progress Bar + Scroll Indicator
```tsx
window.addEventListener('scroll', () => {
  const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  document.getElementById('progress').style.width = p + '%'
})
```
HTML: <div id="progress" style="position:fixed;top:0;left:0;height:3px;background:#C86B5A;width:0%;z-index:10000"></div>

### 9. Grain + Blobs (Apple subtle texture)
```css
.grain { position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:0.035; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); animation:gM 8s steps(10) infinite }
.blob { position:absolute; border-radius:50%; filter:blur(80px); opacity:0.18; animation:d1 22s ease-in-out infinite }
@keyframes d1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.1)} }
```

## Performance
- Use will-change: transform only during animation, remove after
- Disable custom cursor + parallax on mobile (window.innerWidth < 768)
- Use transform: translateZ(0) for GPU
- Throttle scroll listeners, prefer ScrollTrigger

## Easing Reference (Apple uses these)
- power3.out for text
- power4.out for large images
- 0.16,1,0.3,1 cubic-bezier for reveals (easeOutExpo)
- power2.out for cursor

## Implementation Order for meetprerna
1. Add SmoothScroll + grain + progress
2. Hero: Ken Burns + word stagger + magnetic CTA
3. Stays: Stack cards pin + scale on scroll
4. Services: Blur + Y reveal with IntersectionObserver
5. About: Mask text reveal
