# Design System Reference — Portfolio Site Rebuild
Source: https://dhruvbelekar.framer.website/ (Framer site, captured Aug 2026)
Status: **intermediate reference only** — not for building yet, per instruction. To be handed to Claude Code for implementation.

---

## 1. Brand Personality
- Dark, moody, "studio at night" feel — confident, minimal, slightly playful copy tone.
- Self-described "slight obsession with the color blue" — blue is the single accent color running through the whole site, everything else is near-monochrome.
- Positions itself as part designer / part filmmaker — content mixes UI craft language with film/photo language.
- Voice: casual-confident, short punchy sentences, dry humor ("I stopped trying to explain it. I just call it making things.")

## 2. Color Palette (inferred — confirm with live inspector before lockup)
| Token | Approx value | Usage |
|---|---|---|
| `--bg-primary` | near-black, `#0A0A0C`–`#0D0D10` | page background |
| `--bg-elevated` | `#111114`–`#16161A` | cards, testimonial slides |
| `--text-primary` | off-white `#F5F5F3` | headings, primary copy |
| `--text-secondary` | muted gray `#8A8A90` | sub-copy, meta labels (category tags, dates) |
| `--accent-blue` | electric/cobalt blue `#2E5CFF`–`#3B6BFF` | links, hover states, dot leaders, CTA underline, glow accents |
| `--border-hairline` | `#232327` | 1px dividers, card outlines |

Treat blue as a **spot color** — used sparingly for emphasis (hover, active nav, small accents), not as large fills. Everything else stays desaturated to let it pop.

## 3. Typography (inferred)
- **Display / big name lockup** ("DHRUV BELEKAR" in footer, "dhruv" in hero): oversized, tight tracking, bold grotesk-style sans (something in the Neue Montreal / General Sans / Inter Tight family — geometric, modern, slightly condensed at large sizes).
- **Body copy** (bio paragraphs, testimonials): clean grotesk sans, regular weight, generous line-height (~1.5) for long-form readability.
- **Labels / eyebrows** ("Featured Projects," "UI/UX," "About Dhruv"): smaller, wider letter-spacing, often uppercase or small-caps treatment.
- **Monospace**: used specifically for the live clock ("LOCAL / 05:53:26") and possibly the "./ " home icon — a tabular/monospace font (JetBrains Mono, Space Mono, or similar) to reinforce the "system/studio" feel.
- Scale is dramatic: hero name and footer name are huge (likely 100–180px+ desktop), body copy stays modest (16–18px), creating strong hierarchy contrast.

## 4. Layout & Spacing
- Full-bleed, generous vertical rhythm between sections (large section padding, likely 120–160px desktop between major blocks).
- Centered content column for text-heavy sections; edge-to-edge for media (hero video, project cards).
- Sticky/fixed top nav, minimal — logo mark + 4 text links + live clock, all in one row.
- Grid: project cards appear to sit in a responsive grid/row (4 featured on home, full list on /projects).
- Footer is its own oversized "closing statement" section — big name lockup, nav repeated, socials, CTA — a common "confidently redundant" footer pattern.

## 5. Global Components
1. **Top Nav** — `./` (home), `PROJECTS`, `SIDE QUEST`, `ABOUT`, `CONTACT`, right-aligned live clock labeled `LOCAL /` with ticking `HH:MM:SS`. Persistent across all pages.
2. **Hero (home)** — first name lowercase big type ("dhruv"), 1–2 line tagline with the "blue" joke line, full-width autoplay/looping background video.
3. **Featured Projects grid** — image card (portrait orientation), category eyebrow (UI/UX, Branding, Brand & Content), project title, links to `/projects-detail/[slug]`. "View all projects" link below grid.
4. **About block** — layered/stacked images (looks like 2–3 overlapping photos), multi-paragraph bio broken into short punchy blocks, two scrolling marquee rows of skill tags separated by ✦ (UI/UX Design ✦ Brand Identity ✦ Visual Design… / Creative Direction ✦ Photography ✦ Filmmaking ✦ AI…), an ambient audio track tied to this section, Experience list (role — company — dates), Resume link button.
5. **Testimonials carousel** — horizontal slider, avatar/photo + name + title + quote, prev/next arrow controls, auto-advancing loop (content repeats after last slide).
6. **Closing CTA / Footer** — "Still here? Let's make something cool." + "Say Hello" mailto CTA, oversized "DHRUV / BELEKAR" name lockup, repeated nav list, social links (Behance, LinkedIn, Instagram), "Back to Top" link.
7. **Sidequest page** — different template: intro line, then multiple looping video reels + several photo slider strips (auto-scrolling marquee-style galleries, looks like 3 separate horizontal photo tracks moving at different speeds/directions — a "film contact sheet" feel).
8. **Contact page** — stripped down: just direct links (Email me / Behance / Instagram), no form.

## 6. Motion & Animation Patterns
- **Live clock**: real-time ticking seconds counter in nav — needs a `setInterval`-driven JS clock.
- **Infinite marquees**: skills tags row and sidequest photo strips both scroll continuously (likely CSS `@keyframes translateX` looped, duplicated content for seamless loop). Sidequest strips appear to alternate direction per row.
- **Testimonial carousel**: slide/fade transition, manual arrow nav + likely autoplay, infinite loop (last→first).
- **Scroll reveals**: multiple near-duplicate copies of the same paragraph in the raw content strongly suggest Framer's text scroll-triggered reveal/fade-up effect (staggered word or line reveal on scroll into view) rather than literal duplicate text — implement as a fade/slide-up-on-scroll text animation.
- **Hover states**: nav links and project cards likely get the blue accent (underline, glow, or color shift) on hover — consistent with the "blue accent used for interaction" pattern.
- **Video hero**: autoplay, muted, looped background video, no controls.

## 7. Site Map
```
/                     → Home (hero, featured projects, about, testimonials, footer)
/projects             → Full projects grid
/projects-detail/[slug] → Individual case study (mahavitaran, aria, mp4, frelo)
/side-quest           → Photo/video reel gallery
/about                → Extended about page (same content blocks as home's about section)
/contact              → Minimal contact links
```

## 8. Content Inventory (for reference — swap/edit as needed when building)
- **Name / role**: Dhruv Belekar — designer, visual storyteller, filmmaker.
- **Tagline**: "I design digital experiences, create visual stories, and bring ideas to life through design and film. I also have a slight obsession with the color blue. You'll notice."
- **Featured projects**: Mahavitaran (UI/UX), Aria (UI/UX), Mp4 Productions (Branding), Frelo (Brand & Content).
- **Experience**: Creative Head @ Frelo (Present) · Creative Designer @ AiVANTA (Dec '24–May '25) · Design Intern @ Lit Lamps (Jul '24–Dec '24).
- **Skill tags**: UI/UX Design, Brand Identity, Visual Design / Creative Direction, Photography, Filmmaking, AI.
- **Testimonials**: 4 quotes (Vaishakh Sajeevan/Frelo, Nikhil Kulkarni/Docville, Rupak Shah/AiVANTA, Ankit Savla/OPE Innovation Lab).
- **Contact**: dhruv.belekar@gmail.com · Behance · LinkedIn · Instagram.

---

### Open items to verify once we have live inspector access (Claude Code)
- Exact hex values for background/accent blue/text colors.
- Exact font-family names + weights in use (currently Framer-hosted custom fonts).
- Exact breakpoints and section padding values.
- Marquee animation speed/direction and easing.
- Whether "About" audio autoplays or is user-triggered.

This doc is meant as the shared reference — next step (in Claude Code) is scaffolding the project and building section by section against this system.
