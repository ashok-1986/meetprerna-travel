# Prerna Travel Website Audit

**Audited URL:** [meetprerna-travel.vercel.app](https://meetprerna-travel.vercel.app/)  
**Audit date:** 26 August 2026 (Review Context)  
**Scope:** Messaging, UX, visual hierarchy, information architecture, conversion, accessibility, SEO, and deployment hygiene.

## Executive verdict

The site has a distinctive visual direction and a potentially memorable proposition: slow-travel storytelling combined with hand-poked tattoo work. The photography and editorial typography create a strong mood. However, the current site behaves more like a **private creative moodboard or production proof page** than a public-facing business website. It asks visitors to admire the aesthetic without telling them clearly what to buy, who it is for, why Prerna is credible, or how to start a conversation.

The most damaging problem is not visual. It is conversion and trust: the primary “Let’s talk” link points to `#contact`, but no `#contact` element exists, and the page contains no form, email, phone, WhatsApp link, booking path, or other inquiry mechanism. The second major problem is technical: `/robots.txt` and `/sitemap.xml` currently return the app’s 404 HTML, including a `noindex` directive, rather than valid crawl files. That can undermine discoverability even if the page itself looks polished.

> **Bottom line:** Do not spend the next week refining card radii, animations, or image treatments. First make the site commercially legible, remove internal draft copy, repair the contact path, and fix crawlability.

## Scorecard

| Area | Current assessment | Severity | Why it matters |
|---|---|---:|---|
| Positioning | Intriguing but ambiguous | High | Visitors cannot tell whether this is a tattoo artist, travel creator, hotel-content service, or all three. |
| Visual design | Strong editorial atmosphere | Low | The visual system is the site’s best asset; preserve it while improving clarity. |
| Conversion | Failing | Critical | There is no working contact destination or inquiry mechanism. |
| Content quality | Contains internal/draft notes | Critical | Copy such as “from your local folder” and “Sale offline” destroys professionalism and trust. |
| Information architecture | Too thin for the offer | High | A single scroll page cannot adequately explain two materially different offers. |
| Trust | Nearly absent | High | No proof of work, client/property names, testimonials, process, location, or availability details. |
| Accessibility semantics | Weak | Medium | No `main`, `header`, or `footer` landmarks; section headings are not consistently used to expose structure. |
| SEO crawlability | Broken endpoints | Critical | `robots.txt` and `sitemap.xml` do not return their intended file formats. |
| Performance hygiene | Needs testing | Medium | Many large images are loaded on one page, and a slight right-edge overflow was detected at desktop width. |

## What the visitor currently experiences

The hero says **“Where Journeys Become Ink.”** and describes hand-poked tattoos inspired by slow travel. The next major section pivots to “Where I’ve stayed slow,” then presents a gallery of tea estates, forests, temples, mountains, and behind-the-scenes imagery. The final visible content lists deliverables such as reels, a photo set, a blog story, reviews, a story takeover, and a tattoo pop-up.

That sequence creates a positioning problem. The page appears to sell at least two different services: **personal tattoo experiences** and **travel/property content packages**. The site does not explicitly separate those audiences or tell each one where to go. A traveller looking for a tattoo may wonder why hotel deliverables dominate the page. A hotel owner may wonder whether they are hiring a creator, a photographer, a reviewer, or a tattoo artist.

The page also exposes internal production language: “All images from your local folder. No more missing. Sale offline — this is proof,” “Poles removed realistically,” and “ENTRY gate, yellow sunnies, OnePlus check.” These are not quirky brand copy. They read as implementation notes accidentally shipped to customers.

## Priority 0: Fix before sending anyone the link

| Finding | What is wrong | Recommended fix | Success condition |
|---|---|---|---|
| Broken CTA | `Let’s talk` links to `#contact`, but no contact target exists. | Add a real contact section and change the CTA to a concrete action such as `Plan a stay`, `Book a tattoo`, or `Work with me`. | Clicking the header CTA lands on a usable inquiry form or a real WhatsApp/email destination. |
| No conversion mechanism | The DOM contains zero forms and zero buttons; the only interactive elements are three anchors. | Add a short form with name, email/WhatsApp, enquiry type, dates/location, and message. Provide a direct WhatsApp fallback. | A visitor can submit an enquiry in under two minutes without leaving the site. |
| Internal copy leak | Draft notes are visible in the stays section and behind-the-scenes copy. | Replace all production notes with customer-facing statements or remove them entirely. | A first-time visitor sees no language about folders, offline sales, editing instructions, devices, or asset troubleshooting. |
| Offer confusion | Travel experiences, tattoo work, and hotel content are presented as one undifferentiated offer. | Split the site into two clear paths: `For travellers` and `For stays & properties`. | Each audience can identify its relevant offer within five seconds. |
| No proof | The gallery shows imagery but not outcomes, client context, or credibility. | Add 2–4 mini case studies, testimonials, locations, and a short “how it works” section. | The visitor can answer “Why should I trust Prerna?” without contacting you first. |

## Recommended information architecture

The existing single-page structure is acceptable as a landing page, but not as the long-term architecture for two businesses. The immediate version can stay one page if it adds clear audience routing. The stronger version is a small site with dedicated pages.

```text
/
├── /tattoos              Hand-poked tattoos for travellers
├── /travel-stays         Travel storytelling and stay experiences
├── /work                 Selected work / case studies
├── /about                Prerna, approach, locations, availability
└── /contact              Enquiry form, WhatsApp, email, response expectations
```

Use a primary navigation of no more than five items: **Tattoos**, **For stays**, **Work**, **About**, and **Let’s talk**. Keep `Stays` as a label only if it means a clearly defined audience or page. Navigation should describe the visitor’s task, not the creator’s internal categorisation.

## Recommended homepage flow

| Section | Job to do | Suggested content |
|---|---|---|
| Hero | State the offer and invite action | One audience-neutral positioning line plus two CTAs: `Book a tattoo` and `Work with me`. |
| Audience split | Stop the positioning collision | Two cards: `For travellers` and `For stays & properties`. |
| Selected work | Prove quality | 4–6 images with location, project type, and one-sentence context. |
| Process | Remove uncertainty | `Tell me where you’re going → We shape the idea → We make something lasting.` |
| Deliverables | Make the property offer concrete | Package names, inclusions, turnaround, travel area, and starting price or “custom quote.” |
| About Prerna | Create human trust | Short bio, location, approach, and why hand-poked tattoos and slow travel belong together. |
| Proof | Reduce perceived risk | Testimonials, hotel/property names, social proof, or links to published work. |
| Contact | Capture intent | Form, WhatsApp, email, response time, and availability note. |

## Messaging and copy recommendations

### Replace the hero copy

The existing line is memorable but too abstract to carry the business by itself. Keep it as the emotional hook, then add a literal descriptor.

**Recommended version:**

> **Travel slowly. Leave with a story you can wear.**  
> Hand-poked tattoos and thoughtful travel storytelling by Prerna, created across India.

Primary CTA: **Book a tattoo**  
Secondary CTA: **Create content for your stay**

If the business is primarily hotel/property content, use this instead:

> **Make your stay worth travelling for.**  
> Cinematic reels, honest photography, and place-led stories for stays that want guests to feel the destination before they arrive.

Primary CTA: **Plan a collaboration**  
Secondary CTA: **See the work**

### Replace the ambiguous section headings

| Current | Recommended |
|---|---|
| `Where I’ve stayed slow.` | `Places I’ve experienced, photographed, and remembered.` |
| `Top deliverables.` | `Content packages for stays that have a story to tell.` |
| `No crew. Just phone...` | `Real moments, thoughtfully captured.` |
| `Travel & Stay Experience` | `For travellers and thoughtful stays` |

### Remove or rewrite the draft notes

Delete `All images from your local folder. No more missing. Sale offline — this is proof.` entirely. It is not customer value. Replace it with:

> Every image here comes from a real place, real day, and real point of view. No stock moodboards; just honest travel storytelling.

Replace `Poles removed realistically — clean green.` with:

> Light-touch editing that keeps the place believable.

Replace `ENTRY gate, yellow sunnies, OnePlus check.` with:

> The work happens in the real world: on the road, between check-ins, and sometimes from a phone screen.

## Conversion design

The site currently has no reason for a qualified visitor to act now. Add a persistent but restrained CTA in the header, then repeat it after the work gallery and at the end of the page. Do not use “Let’s talk” alone; it is vague and gives no expectation of what happens next.

The contact section should ask only for information needed to route the enquiry. A suitable form is: **Name**, **Email or WhatsApp**, **I’m interested in** with options `Tattoo`, `Stay/content collaboration`, and `Both`, **Preferred dates/location**, and **Tell me a little about the idea**. Add a response promise such as “I usually reply within 48 hours.” Do not promise a response time unless it is operationally true.

For the property offer, add a simple package table. For example, `Essentials` could include one reel and 15 edited photographs; `Story-led` could include two to three reels, 25–30 photographs, and an article; `Custom stay` could be scoped around the property’s goals. The numbers already present on the page are useful, but without package names, price anchors, turnaround, usage rights, or next steps, they do not help someone buy.

## Visual and UX recommendations

The cream, charcoal, serif, italic-coral visual system is coherent and worth keeping. The issue is not that the page needs more decoration; it needs more **hierarchy and friction removal**. Make the two offers visually distinct with a clear split immediately beneath the hero. Use the strongest image for each audience instead of making visitors infer the offer from a general gallery.

The fixed header is visually light but the navigation is small and low-contrast against some imagery. Increase the effective hit area of each link, ensure keyboard focus states are visible, and keep the primary CTA visually dominant. On mobile, stack the navigation into a clear menu or keep only one primary CTA visible; do not allow three tiny links to compete with the hero.

The gallery is image-heavy and currently presents several assets with similar visual weight. Reduce the number of first-load images, lazy-load below-the-fold media, provide explicit dimensions, and use responsive image sizes. The current desktop inspection also found one image extending slightly past the viewport while the body clips horizontal overflow. Clipping hides the symptom; fix the element width or grid gap so the layout genuinely fits at every breakpoint.

The large blank area observed before the behind-the-scenes panel needs investigation on a real phone and a throttled connection. If it is intentional editorial whitespace, reduce it. If it is a loading or aspect-ratio issue, reserve correct image space and verify the component’s responsive height rules.

## Accessibility and semantic HTML

The DOM currently has one navigation landmark but no `main`, `header`, or `footer` landmarks. Wrap the site-oriented header in `<header>`, the primary content in one `<main>`, and the closing information and links in `<footer>`. Give major sections accessible names using their visible headings. This makes the visual structure available to assistive technology users and supports skip navigation [3] [4].

The page has one `h1`, followed by `h2` section headings and `h3` card headings, which is broadly sensible. Keep the heading hierarchy aligned with the actual content structure rather than using headings only for visual styling. W3C guidance notes that headings communicate organization and enable in-page navigation [3].

All inspected images had non-empty alt text, which is a good baseline. Rewrite alt text to describe the image’s content rather than repeat promotional captions. Decorative images should use empty alt text, while portfolio images should identify the subject and context, for example `Prerna photographing a mountain property in Darjeeling`, not `Mountain work`.

## SEO and deployment hygiene

The most urgent technical issue is that `https://meetprerna-travel.vercel.app/robots.txt` and `/sitemap.xml` return the application’s 404 HTML instead of valid files. A robots file belongs at the root of the host, and Google’s documented example includes a fully qualified sitemap declaration [1] [2]. Create valid endpoints or static files, then verify them directly after deployment.

A minimal `robots.txt` for this public site could be:

```text
User-agent: *
Allow: /

Sitemap: https://meetprerna-travel.vercel.app/sitemap.xml
```

A minimal sitemap should contain the canonical homepage URL as XML, not HTML. Add a canonical link to the page, a favicon, a meaningful social sharing image, and complete Open Graph/Twitter metadata. The current title and description exist, but they are generic: `Prerna — Travel & Tattoo` and `Immersive travel experiences and hand-poked tattoos by Prerna`. Make the description specific to the audience and geography you want to attract.

Suggested metadata:

```text
Title: Hand-Poked Tattoos & Slow Travel Stories | Prerna
Description: Hand-poked tattoos and honest travel storytelling across India. Book a meaningful tattoo experience or create place-led content for your stay.
OG image: A 1200×630 image with Prerna, the destination, and a short readable title.
```

Add structured data appropriate to the actual business, such as `Person`, `ProfessionalService`, and `ImageObject`, only when the values are accurate. Do not add fake ratings, reviews, locations, or prices to chase rich results.

## Trust and legal basics

Add a real About section, a clear location/coverage statement, availability or booking expectations, and links to Instagram or published work. If tattoos are offered in temporary locations, state where and when rather than implying permanent availability. If property content is sponsored, gifted, or review-based, disclose that relationship clearly.

The footer should include an email or social contact, copyright, privacy policy, and any tattoo-specific health/safety information that is relevant to the booking process. Keep this factual and concise; do not bury important terms in the form.

## 7-day implementation order

| Day | Owner | Deliverable | Kill switch / acceptance test |
|---|---|---|---|
| 1 | Founder + developer | Decide the primary business priority: tattoos, property content, or a deliberately equal two-offer model. | If the team cannot describe the primary audience in one sentence, stop visual refinement and resolve positioning. |
| 2 | Copywriter | Remove internal notes and ship the revised hero, audience split, and CTA labels. | Ask three people what the site sells after five seconds. If answers differ materially, rewrite. |
| 3 | Developer | Implement `/contact`, a working form or WhatsApp/email route, and a success state. | Test from a logged-out phone. If a visitor must hunt for contact details, it fails. |
| 4 | Founder | Add bio, process, proof, locations, availability, and at least two case studies or testimonials. | If proof cannot be supplied, label the site as an early portfolio and do not imply established client results. |
| 5 | Developer | Fix `robots.txt`, `sitemap.xml`, canonical, favicon, social image, and metadata. | Direct requests must return correct content types and no 404 HTML. |
| 6 | Designer + developer | Test 375px, 768px, and 1440px widths, keyboard navigation, focus states, and reduced motion. | Any horizontal overflow, inaccessible control, or broken anchor blocks release. |
| 7 | Founder | Publish and measure CTA clicks, form starts, form completions, WhatsApp clicks, and qualified enquiries. | After 30–50 qualified visits with no meaningful enquiry, change the offer or CTA before changing the color palette. |

## What to stop doing

Stop adding gallery images until the existing images have context and a job in the funnel. Stop calling a list of deliverables a service offer without price guidance, process, usage rights, or a next step. Stop using poetic headlines without an adjacent literal explanation. Stop hiding the absence of proof behind a cinematic aesthetic. Visitors do not need more atmosphere; they need enough clarity to decide whether this is for them.

## Final recommendation

Keep the current visual language, but rebuild the page around **audience clarity, proof, and a working enquiry path**. The fastest high-value version is not a full redesign. It is the same aesthetic with a sharper hero, two audience routes, a credible About/Work layer, a real contact mechanism, and technically valid crawl files. Only after those are live should you optimize animation, gallery choreography, or fine-grained typography.

## References

[1]: https://developers.google.com/search/docs/crawling-indexing/robots/intro "Google Search Central: Introduction to robots.txt"  
[2]: https://developers.google.com/crawling/docs/robots-txt/create-robots-txt "Google Crawling Infrastructure: How to write and submit a robots.txt file"  
[3]: https://www.w3.org/WAI/tutorials/page-structure/headings/ "W3C WAI: Headings"  
[4]: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/ "WAI-ARIA Authoring Practices Guide: Landmark Regions"  
[5]: https://meetprerna-travel.vercel.app/ "Prerna — Travel & Tattoo, audited homepage"
