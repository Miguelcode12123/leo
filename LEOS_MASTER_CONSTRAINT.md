# LEO'S BEAUTIFUL GARDENS — MASTER BUILD CONSTRAINT DOCUMENT
# Inject this at the top of every Claude Code session. Non-negotiable.

---

## 0. THE SINGLE TEST FOR EVERY DECISION

Before adding anything, ask: **"Does this earn its space?"**
If the answer requires more than one sentence to justify — remove it.
The reference point is Flamingo Estate, Heckfield Place, Aesop.
Not a garden maintenance directory. Not a Wix template. Not a SaaS landing page.

---

## 1. WHAT THIS IS

A premium, editorial garden-care website for Leonardo — a fourth-generation Sicilian gardener working in Melbourne's finest residential estates. The brand is **warm, rooted, and quietly refined**. Every design decision should feel like it belongs in a high-end print brochure, not a digital template.

**The emotional arc of the page as the user scrolls:**
Arrival → calm, large, real garden fills the screen → trust accumulates like light through a canopy → heritage story surprises and grounds them → services, simply stated with one beautiful image each → real words from real clients → warm, frictionless invitation to get in touch.

They should finish feeling: *"These are my kind of people, and my garden would be safe with them."*

---

## 2. ABSOLUTE DESIGN PROHIBITIONS

Never use any of the following, regardless of how they're justified:

- Icon libraries (no Heroicons, Lucide, Font Awesome — nothing)
- Card grids with equal-weight items
- CSS gradients (except single, purposeful image overlays)
- Drop shadows on UI elements (box-shadow on cards is forbidden)
- Animated counters, number roll-ups, or stat blocks
- Testimonial carousels or any auto-advancing carousel
- Sticky "Book Now" bars or floating CTAs
- Background videos
- Parallax on text (only on images, and only subtly)
- Hover animations on more than one element per section
- Reveal animations that use bounce, spring, or lateral slide — only vertical fade-up and opacity
- Any font size below 15px for body text
- Any element that looks like a "feature" or "benefit" checklist
- Star ratings displayed as ★★★★★
- Green buttons (the CTA is terracotta — accent colour only)
- The old lime-green logo or any lime/neon green anywhere
- Clip-art, stock illustrations, or placeholder images
- More than 2 typefaces (Fraunces for display, Mulish for body — nothing else)
- Section headings in ALL CAPS
- More than one CTA per section (one action per viewport)

---

## 3. COLOUR SYSTEM (non-negotiable)

```
background: #F7F4EC   ← warm cream, the page atmosphere — NOT white
surface:    #FFFFFF   ← only for elevated elements (forms, nav on scroll)
primary:    #2E4628   ← deep forest green (nav, footer, headlines on cream)
secondary:  #838D6A   ← silver-sage olive (supporting surfaces, subtle accents)
accent:     #B45F38   ← warm terracotta (CTAs ONLY — one per section)
text-base:  #1F2A1A   ← deep green-black body text
text-muted: #5E6B54   ← olive-grey captions, labels, secondary info
border:     #E2DCCB   ← soft sand, dividers only
```

**Usage rules:**
- Page background is ALWAYS #F7F4EC, never white
- Footer and nav (scrolled) are #2E4628 (primary/forest green)
- Terracotta (#B45F38) appears ONLY on the single CTA per section
- No colour appears "randomly" — every colour choice maps to the system above
- When in doubt, use more cream and green, less of everything else

---

## 4. TYPOGRAPHY SYSTEM

**Fonts:** Fraunces (display) + Mulish (body) — import from Google Fonts.

```
Hero headline:    Fraunces, 4.5rem, weight 400, lh 1.02, ls -0.02em
Section opener:   Fraunces, 3.25rem, weight 400, lh 1.06, ls -0.015em
H2 heading:       Fraunces, 2.25rem, weight 400, lh 1.15, ls -0.01em
Service title:    Fraunces, 1.375rem, weight 500, lh 1.3
Body intro:       Mulish, 1.1875rem (19px), weight 400, lh 1.7
Body standard:    Mulish, 1.0625rem (17px), weight 400, lh 1.7
Caption/meta:     Mulish, 0.9375rem (15px), weight 400, lh 1.6
Eyebrow label:    Mulish, 0.8125rem (13px), weight 600, ls 0.12em, UPPERCASE
```

**Typography rules:**
- Fraunces italic is reserved for Italian/heritage phrases only (e.g. *coltivato con cura*)
- Never bold a body paragraph or use bold for emphasis within sentences
- Eyebrow labels (e.g. "OUR SERVICES", "ABOUT US") are the only ALL CAPS text permitted
- Generous line height (1.7) is maintained throughout — text breathes
- Maximum line length: 65ch for body copy

---

## 5. SPACING & LAYOUT SYSTEM

```
Section vertical padding:  6rem top/bottom (desktop), 4rem (mobile)
Hero section padding:      8rem top/bottom (desktop)
Max content width:         80rem (1280px), centered
Image gutters:             0 — images bleed to container edge, not padded in boxes
```

**Layout philosophy:**
- Sections alternate between full-bleed image moments and text-forward cream moments
- Never two image-heavy sections in a row
- Never two text-heavy sections in a row
- Asymmetry is preferred over symmetry — offset image/text pairs, not centered grids
- Generous negative space is a feature, not wasted space
- Mobile: single column throughout, images above text

---

## 6. IMAGE HANDLING RULES

**Every image rule is mandatory:**

- Hero images: full viewport width, 85vh–100vh height, `object-fit: cover`, no border-radius
- Service images: full-width within their column, no border-radius, no box shadows
- All images reference local `/images/` path (using Leo's supplied 29 Tier-1 assets)
- Never display images at thumbnail size — minimum display size is 40% of viewport width
- Never show more than 4 images in a single viewport
- Gallery uses a masonry-style or editorial grid — never equal-size uniform thumbnails
- Before/after: CSS clip-path slider, not two side-by-side thumbnails
- Image overlays (for text legibility): linear-gradient from transparent to rgba(30,42,25,0.55) — forest-green toned, not black

**Scroll animation on images (Intersection Observer only — no libraries):**
- Hero image: subtle Ken Burns (scale 1.0 → 1.04, 12s ease-in-out, pauses at 1.04)
- Section images: fade up + scale from 0.97 → 1.0 as they enter viewport (300ms ease-out)
- Parallax: background-attachment approach on hero only, 0.3 speed ratio — subtle
- No animation should ever feel "bouncy" or call attention to itself

---

## 7. SCROLL ANIMATION SPECIFICATION

**Use only the Intersection Observer API + CSS transitions. No GSAP, no ScrollTrigger, no AOS.**

### Implementation pattern (copy exactly):

```javascript
// animations.js — include once, before </body>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

```css
/* animations.css */
[data-animate] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children (e.g. service cards) */
[data-animate-stagger] > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
[data-animate-stagger].is-visible > *:nth-child(1) { opacity: 1; transform: none; transition-delay: 0ms; }
[data-animate-stagger].is-visible > *:nth-child(2) { opacity: 1; transform: none; transition-delay: 120ms; }
[data-animate-stagger].is-visible > *:nth-child(3) { opacity: 1; transform: none; transition-delay: 240ms; }
[data-animate-stagger].is-visible > *:nth-child(4) { opacity: 1; transform: none; transition-delay: 360ms; }

/* Image parallax (hero only) */
.hero-image {
  transform: scale(1.0);
  transition: transform 12s ease-in-out;
}
.hero-image.is-loaded {
  transform: scale(1.04);
}

/* Image reveal */
[data-animate-image] {
  opacity: 0;
  transform: scale(0.97);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
[data-animate-image].is-visible {
  opacity: 1;
  transform: scale(1.0);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  [data-animate], [data-animate-stagger] > *, [data-animate-image] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Usage in HTML:**
- Text blocks, headings, body copy: `data-animate`
- Image elements: `data-animate-image`
- Service lists or sequential items: wrap parent in `data-animate-stagger`
- Never animate the nav or footer

---

## 8. NAVIGATION

**Desktop:**
- Fixed top, transparent on hero, transitions to forest-green (#2E4628) background after 80px scroll
- Logo: `logo_4` (round cream-on-green emblem), minimum 44px height
- Nav links: Mulish 14px, weight 500, cream (#F7F4EC) colour, letter-spacing 0.06em
- Single CTA button: "Get a Quote" — terracotta fill, cream text, pill shape, no hover shadow (underline only or subtle opacity shift)
- No dropdown menus — flat nav only
- Mobile: hamburger → full-screen overlay, forest-green background, large Fraunces nav items

**Nav items (7 maximum):**
Home / Services / Gallery / About / Before & After / Service Areas / Contact

---

## 9. SECTION STRUCTURE (follow this order exactly)

```
1. HERO
   — Full-bleed image (Image 8 or 17), 100vh
   — Transparent nav overlay
   — Single Fraunces headline, cream coloured, bottom-left aligned
   — Subtitle (Mulish), one line only
   — One "Get a Free Quote" CTA (terracotta pill button)
   — Subtle scroll indicator (animated line, not chevron/arrow icon)

2. TRUST BAR
   — Cream background, narrow band (no background image here)
   — 4 simple text facts: "Est. 2021 · Melbourne", "Fourth-generation craft", 
     "Premium residential estates", "Fully insured & uniformed"
   — Mulish 15px, text-muted colour, separated by · or thin vertical rule
   — No icons, no logos, no star ratings

3. SERVICES INTRO (the "what we do" beat)
   — Forest-green background section
   — Left: Fraunces headline + short Mulish paragraph, cream coloured
   — Right: list of 10 services, Mulish, simple, no icons, terracotta hover underline
   — This is restraint as a statement

4. FEATURED SERVICES (3 hero services only)
   — Full-width alternating image/text layout (not a card grid)
   — Service 1 (Scheduled Maintenance): Image 19, text right
   — Service 2 (Garden Renovations): Image 16, text left
   — Service 3 (Pre-Sale Makeovers): Image 20, text right
   — Each: eyebrow label, Fraunces service name, Mulish 2-sentence description, 
     terracotta "Learn more →" text link (no button)
   — Images: full-height of their row, no border-radius

5. BEFORE & AFTER
   — Cream background
   — Fraunces section heading
   — Two before/after sliders (Image 26↔27, Image 28↔29)
   — CSS clip-path drag interaction — no third-party library
   — Short caption beneath each, Mulish italic, text-muted

6. HERITAGE STORY (the emotional heart)
   — Split: left = Image 23 (Leonardo, full height), right = text column
   — Eyebrow: "THE STORY" or "COLTIVATO CON CURA" (Fraunces italic)
   — Fraunces headline: "Four generations of craft."
   — Mulish body: the Sicilian story, 3 short paragraphs, no longer
   — No bullet points, no bold, no decorative elements
   — Optional: Image 24 (hands in soil) as a small inset below the text column

7. TEAM
   — Forest-green background
   — Image 12 (team group): wide/full-bleed, slightly darkened
   — Cream text overlay (bottom-left): short team intro, Mulish
   — This is one image, one paragraph — nothing more

8. SERVICES GRID (all 10 services)
   — Cream background
   — Editorial grid: NOT equal-size cards
   — Masonry or varied-height layout, 10 services with image and 2-line description
   — Each service links to its detail page
   — No hover cards, no icon overlays — clean image + Fraunces title + Mulish line

9. GALLERY TEASER
   — 4–6 images, editorial layout (not uniform grid)
   — Images: 8, 13, 17, 21, 22, and one more
   — Single "View Gallery →" text link, terracotta, centred below

10. TESTIMONIALS
    — Forest-green background
    — 3 testimonials maximum on homepage, displayed sequentially (no carousel)
    — Fraunces large quote mark (decorative), Mulish body, Mulish small attribution
    — One per "card" — generous padding, no borders, no stars

11. SERVICE AREAS
    — Cream background
    — Simple list of suburbs in two columns, Mulish
    — Optional: minimal map embed, no satellite view, styled to cream/green
    — Note about Mornington Peninsula availability

12. CONTACT / FOOTER CTA
    — Forest-green background, full-bleed
    — Large Fraunces headline: "Let's talk about your garden."
    — Short Mulish subtext
    — Two ways to reach: "Call Leonardo" (tap-to-call) and "Send a message" (form link)
    — No form on the homepage — link to contact page
    — Below: full footer with logo_4, nav links, Instagram link, copyright

```

---

## 10. CTA BUTTON STYLE

```css
.btn-primary {
  background-color: #B45F38;    /* terracotta accent */
  color: #F7F4EC;               /* cream */
  font-family: 'Mulish', sans-serif;
  font-size: 0.9375rem;         /* 15px */
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 0.875rem 2rem;
  border-radius: 9999px;        /* pill */
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}
.btn-primary:hover {
  background-color: #984B2C;    /* one shade darker */
}

/* Text links (not buttons) */
.link-accent {
  color: #B45F38;
  font-family: 'Mulish', sans-serif;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(180, 95, 56, 0.3);
  transition: border-color 0.2s ease;
}
.link-accent:hover {
  border-color: #B45F38;
}
```

---

## 11. BEFORE/AFTER SLIDER (no libraries)

```html
<!-- Before/After Slider Component -->
<div class="before-after" style="position:relative; overflow:hidden; cursor:col-resize;">
  <img class="img-before" src="/images/26.jpg" alt="Before renovation" 
       style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
  <div class="img-after-wrap" style="position:absolute; inset:0; width:50%; overflow:hidden;">
    <img src="/images/27.jpg" alt="After renovation" 
         style="width:100vw; max-width:none; height:100%; object-fit:cover;">
  </div>
  <div class="slider-handle" style="position:absolute; top:0; left:50%; width:2px; 
       height:100%; background:#F7F4EC; cursor:col-resize;">
    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
         width:40px; height:40px; border-radius:50%; background:#F7F4EC;
         display:flex; align-items:center; justify-content:center;">
      <span style="color:#2E4628; font-size:18px; user-select:none;">⟷</span>
    </div>
  </div>
</div>

<script>
// Drag-to-reveal logic — pure JS, no libraries
document.querySelectorAll('.before-after').forEach(slider => {
  let dragging = false;
  const handle = slider.querySelector('.slider-handle');
  const afterWrap = slider.querySelector('.img-after-wrap');

  const setPosition = (x) => {
    const rect = slider.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
    afterWrap.style.width = pct + '%';
    handle.style.left = pct + '%';
  };

  handle.addEventListener('mousedown', () => dragging = true);
  window.addEventListener('mouseup', () => dragging = false);
  window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });

  // Touch support
  handle.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); });
  window.addEventListener('touchend', () => dragging = false);
  window.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); });
});
</script>
```

---

## 12. COPY TONE RULES

Every line of copy must pass this test: **would a tasteful person be embarrassed to say this out loud?**

**Forbidden phrases (never use):**
- "work in harmony with nature"
- "living canvas" / "breathtaking oasis" / "lush paradise"
- "passionate about" anything
- "we pride ourselves on"
- "dedicated team of professionals"
- "tailored to your needs" / "bespoke solutions"
- Any sentence that could appear on a generic tradie website

**Voice guidelines:**
- Specific over generic: "sculpted olive trees and box-hedge parterres" not "beautiful gardens"
- Confident but never boastful: state the fact, don't editorialize it
- Warm but not effusive: one strong sentence beats three pleasant ones
- The Italian heritage is real — use it specifically (Rosario, Sicily, Olio Qucco, olive groves) not generically

**Hero headline options (use one, do not change):**
- "Your garden, in the hands it deserves."
- "Expert care for Melbourne's finest gardens."
- "Gardens tended like living masterpieces."

---

## 13. ACCESSIBILITY NON-NEGOTIABLES

- All images have descriptive alt text (never filename)
- Tap targets minimum 44×44px
- Colour contrast minimum 4.5:1 for body text
- Focus styles visible (forest-green outline on cream bg, cream outline on green bg)
- Prefers-reduced-motion respected (see animation section)
- Semantic HTML: one `<h1>` per page, logical heading hierarchy

---

## 14. PERFORMANCE RULES

- Images: WebP format, responsive srcset, lazy-loaded (except hero, which is eager)
- No JavaScript libraries for animations (Intersection Observer + CSS only)
- No jQuery
- No icon font libraries
- Google Fonts: preconnect + single combined request
- Hero image: preloaded in `<head>`

---

## 15. WHAT MAKES THIS SITE FEEL PREMIUM (the intangibles)

These cannot be encoded in CSS but must be felt in every decision:

1. **Nothing fights for attention.** Each section has one dominant element.
2. **Images are respected.** They are never shrunk, cropped awkwardly, or competing with text.
3. **Whitespace is structural, not accidental.** Gaps between sections are intentional statements.
4. **The type does heavy lifting.** A Fraunces headline at the right size is worth three card components.
5. **The brand story is a real one.** Leonardo, Rosario, Sicily, olive groves — these are specific and true. Use them specifically and truly.
6. **Everything is slightly slower than you expect.** Transitions at 0.7s feel considered. 0.2s feels cheap.
7. **There is one obvious action per section.** Never two, never none.

---

*End of constraint document. Begin build.*
