# Prestige Vue — Implementation Kickstart

## Project Overview

**Type:** Phase 1 Frontend Prototype  
**Framework:** Next.js 16 (App Router)  
**Deployment:** Vercel  
**URL Strategy:** Single-page with client-side language toggle (architected for future `/en` `/fr` migration)

---

## Contact Information

| Field | Value |
|-------|-------|
| Phone | 514-512-1060 (clickable `tel:` link) |
| Email | info@prestigevue.ca (clickable `mailto:` link) |
| Address | 6255 Rue Marivaux, Saint-Leonard, H1P3H6 |

---

## Color Palette (5 Colors Max)

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#1B2A4A` | Primary brand, header bg (scrolled), footer, image fallback |
| Sky Blue | `#7DD3FC` | Accents, active nav underline, icon circles, CTAs |
| White | `#FFFFFF` | Text on dark, card backgrounds |
| Off-White | `#F8FAFC` | Section backgrounds (alternating) |
| Charcoal | `#1E293B` | Body text on light backgrounds |

---

## Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | Inter or Geist | 600–700 |
| Body | Inter or Geist | 400 |

---

## Header Behavior

- **Initial state:** Fully transparent over hero, white text
- **Scroll trigger:** 50px
- **Scrolled state:** Navy at 90% opacity + `backdrop-filter: blur(12px)`, 300ms ease transition
- **Active section:** Intersection Observer highlights current section with sky blue underline
- **Mobile:** Hamburger menu with language toggle inside

---

## Sections (Top to Bottom)

### 1. Hero
- Full-viewport height with `<Image fill priority>` (1920px source)
- Navy fallback bg while loading
- Headline + subheadline (bilingual via context)
- CTA button scrolls to quote form

### 2. Services (4 Cards)
- Grid: 2col mobile / 3col tablet / 4col desktop
- Each card: `<Image fill>` (600px source), title, short description
- Services: Window Installation, Door Installation, Commercial Solutions, Glass Replacement

### 3. Why Choose Us (3 Features)
- Icons from `lucide-react`: Wrench, MessageSquare, ShieldCheck
- Icon style: 28×28px, `strokeWidth={1.5}`, sky blue
- Container: 64×64px circle, sky blue bg at 10% opacity (20% on hover)

### 4. Gallery (Bento Grid)
- Mixed-size responsive grid
- `<Image fill>` lazy loaded (800px source)
- Hover overlay: "View Project" text
- Click opens lightbox modal

### 5. Testimonials (Carousel)
- 3 placeholder testimonials (fake names/quotes)
- 5 filled stars per testimonial (Star icon from lucide-react)
- Left/right arrow navigation
- No auto-rotate

### 6. Free Quote Form
- **Fields (5 total):**
  1. First Name (required)
  2. Last Name (required)
  3. Email (required)
  4. Phone (required)
  5. Additional Info (optional textarea)
- **No validation** — low friction prototype
- **Submit:** Shows success toast (5s duration), then clears form

### 7. Footer
- Contact info (phone, email, address)
- Social icons: Facebook, Instagram (placeholder hrefs)
- Copyright line
- Language toggle (mirrors header)

---

## Lightbox Modal

- Triggered by gallery image click
- Full-screen overlay with enlarged image
- Bilingual caption: location + service type
- Left/right navigation arrows
- Close button (X)

---

## Bilingual Architecture

| Layer | Behavior |
|-------|----------|
| React Context | `LanguageContext` with `lang` state (`'fr'` | `'en'`) |
| Dictionary | JSON file with all strings keyed by language |
| Server meta | Static French (title, description, OG tags, JSON-LD) |
| Client toggle | Updates `document.title`, visible meta, `<html lang>` |
| Persistence | `localStorage` (optional, can add later) |

---

## SEO (Static French)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Prestige Vue",
  "description": "Installation de fenêtres et portes à Montréal",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6255 Rue Marivaux",
    "addressLocality": "Saint-Leonard",
    "postalCode": "H1P3H6",
    "addressCountry": "CA"
  },
  "telephone": "+1-514-512-1060",
  "email": "info@prestigevue.ca"
}
```

---

## Image Strategy

| Location | Size | Loading | Pattern |
|----------|------|---------|---------|
| Hero | 1920px | `priority={true}` | `<Image fill style={{objectFit:'cover'}}>` |
| Services | 600px | lazy (default) | `<Image fill>` |
| Gallery | 800px | lazy (default) | `<Image fill>` |

**Fallback:** Navy bg (`#1B2A4A`) on all image containers to prevent white flash.

---

## File Structure

```
app/
├── layout.tsx          # Root layout, fonts, static FR meta
├── page.tsx            # Main landing page (imports sections)
├── globals.css         # Design tokens, custom styles
components/
├── layout/
│   ├── header.tsx      # Sticky header with scroll behavior
│   └── footer.tsx
├── sections/
│   ├── hero.tsx
│   ├── services.tsx
│   ├── why-choose-us.tsx
│   ├── gallery.tsx
│   ├── testimonials.tsx
│   └── quote-form.tsx
├── lightbox.tsx        # Gallery lightbox modal
├── language-toggle.tsx # FR/EN switch button
└── providers/
    └── language-provider.tsx
lib/
├── dictionary.ts       # All bilingual strings
└── use-active-section.ts # Intersection Observer hook
public/
└── images/             # Hero, gallery, service images
```

---

## Implementation Order

1. **Setup:** Design tokens in globals.css, fonts in layout.tsx
2. **Language Provider:** Context + dictionary structure
3. **Header:** Transparent → solid transition, active section highlighting
4. **Hero:** Full-bleed image with CTA
5. **Services:** 4-card responsive grid
6. **Why Choose Us:** Icon feature cards
7. **Gallery:** Bento grid + lightbox modal
8. **Testimonials:** Carousel with arrows
9. **Quote Form:** 5 fields + success toast
10. **Footer:** Contact info, social links

---

## Success Toast Message

**FR:** "Merci! Nous avons bien reçu votre demande. Un membre de notre équipe vous contactera sous peu."  
**EN:** "Thank you! We've received your request. A team member will contact you shortly."

**Duration:** 5 seconds, then auto-dismiss and clear form.

---

## Notes

- No backend integration — frontend prototype only
- Social links are placeholder `#` hrefs for now
- Testimonials are placeholder content (to be replaced)
- Architecture supports future migration to `next-intl` with `/en` `/fr` routes
