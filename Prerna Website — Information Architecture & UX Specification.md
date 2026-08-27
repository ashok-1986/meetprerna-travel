# Prerna Website — Information Architecture & UX Specification

## Strategic model

The homepage should not behave like one long mixed portfolio. It should behave like a **two-door editorial experience**: the visitor first understands Prerna’s point of view, then chooses whether they are here as a traveller or as a stay/property representative.

The visual language can remain poetic. The navigation and conversion language must be literal.

## Navigation

### Desktop

`prerna.` on the left. Primary links: `Travellers`, `Stays`, `Work`, `About`. Persistent CTA on the right: `WhatsApp Prerna`.

### Mobile

Use a compact menu trigger labelled `Menu` or an accessible icon button with an explicit accessible name. The open panel should contain the same links plus a prominent `WhatsApp Prerna` action. Do not hide all navigation below the medium breakpoint.

### Footer

Repeat the two audience links, Instagram links, WhatsApp, email, copyright, and privacy link. Avoid a footer that contains only social handles and a copyright line.

## Page map

| Order | Section ID | Primary visitor question | Required content | Main CTA |
|---:|---|---|---|---|
| 1 | Hero | What is this and is it for me? | Literal descriptor plus emotional headline; two audience actions. | `Book a tattoo experience`; `Create a story for your stay` |
| 2 | Audience split | Which path should I take? | Traveller and property cards with outcomes. | `Explore tattoo experiences`; `Explore collaborations` |
| 3 | Work | Can I trust the quality? | Selected images with locations and captions. | `See the process` (targets `#about`) |
| 4 | Travellers | What happens if I want a tattoo? | Offer, process, preparation, region/availability, FAQ. | `Start a tattoo enquiry` |
| 5 | Stays | What can Prerna create for my property? | Collaboration outcomes, deliverables, usage rights, process. | `Discuss a collaboration` |
| 6 | About | Who is Prerna and why this approach? | Short bio, locations, philosophy, real proof. | `Follow the work` |
| 7 | Contact | How do I start? | WhatsApp-first contact block, email fallback, optional real form. | `Message on WhatsApp` |

## Content and interaction rules

The first viewport must contain a literal explanation of the business. A poetic heading may remain, but it cannot be the only description. The two hero CTAs should pass intent to the contact section through a query or local state so the final prompt is relevant to the visitor.

The work gallery should be curated, not exhaustive. Start with six to eight strongest images, then add a secondary gallery only if it contributes proof or context. Every image should have a job: establish place, show the person at work, show a finished tattoo context, or demonstrate property storytelling.

The traveller and property sections should use different proof patterns. Travellers need process, comfort, preparation, and availability clarity. Properties need deliverables, collaboration workflow, content usage, and location/travel clarity. Combining these into the same six-card list weakens both offers.

## Suggested section copy

### Hero

> **Where journeys become something lasting.**  
> Hand-poked tattoos and thoughtful travel storytelling across India.

Buttons: `Book a tattoo experience` and `Create a story for your stay`.

### Traveller section

> **A tattoo that belongs to the journey.**  
> Hand-poked work shaped by the place you are in, the story you are carrying, and the time you have to make it meaningful.

Steps: `Share the idea` → `Shape the design` → `Meet and make it`.

### Property section

> **Make your stay worth travelling for.**  
> Honest photography, cinematic reels, and place-led stories for properties with a point of view.

Deliverables: `Reels`, `Photo sets`, `Story-led writing`, `Social support`, `Story takeovers`, and `Optional tattoo pop-ups`.

### Contact section

> **Tell me where you’re going.**  
> Send a WhatsApp message with your dates, location, and what you have in mind. If it feels like a fit, we’ll shape the next step together.

Buttons: `Message on WhatsApp` and `Send an email`.

## Accessibility behavior

Use `<header>`, `<main>`, and `<footer>` landmarks. Each major section should be labelled by its visible heading. Maintain one `h1`, then use `h2` for section headings and `h3` for cards or subsections. All controls must be keyboard-reachable, have visible focus states, and use descriptive link text. When the mobile menu opens, focus should move into the menu and return to the trigger on close.

## Responsive behavior

At widths below 768px, the navigation becomes a menu, the two audience cards stack vertically, the gallery becomes a single column with intentional image aspect ratios, and the property deliverables become vertically stacked cards. Avoid any fixed desktop height that creates blank space or clips content. The hero should remain readable at 320px width with the CTA buttons either stacked or wrapping cleanly.

At tablet widths, keep the audience split and service cards readable rather than forcing a three-column layout that creates narrow cards. At desktop widths, use asymmetry and editorial whitespace, but cap the content width and verify that the grid never exceeds the viewport.

## CTA state model

Each CTA has four states: default, hover/focus, active/pressed, and unavailable only if a real system condition prevents action. There should be no silent no-op state. A WhatsApp CTA opens a new tab with the correct number and a prefilled message. An email CTA opens the real email address. A real form displays pending, success, and error states; if no form provider exists, do not render the form.
