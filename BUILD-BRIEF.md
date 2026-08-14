# Build Brief — Portfolio Rebuild
Companion to `dhruv-portfolio-design-system.md`. Read that first for the design system; this file covers stack, architecture, and execution order.

**Owner:** Dhruv Belekar — this is a rebuild of his own site, currently on Framer.
**Reference:** https://dhruvbelekar.framer.website/

---

## 1. Stack Decisions (locked)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro** | Static output, zero-JS by default, per-component hydration |
| Interactivity | **React islands** via `@astrojs/react` | Only where motion is needed |
| Animation | **Framer Motion** | Closest to the original Framer feel |
| Styling | Open — recommend Tailwind + CSS custom properties for tokens | Tokens defined once, consumed by both |
| Deploy | Open — Vercel/Netlify both fine for static Astro | |

### Why island boundaries matter here
Framer Motion is React-only. If we hydrate too broadly we lose Astro's main advantage. Rule of thumb for this build:

- **Static `.astro`** — hero copy, project cards, bio text blocks, experience list, footer, contact page. No JS shipped.
- **`client:load`** — nav clock only (must tick immediately, above the fold).
- **`client:visible`** — marquees, testimonial carousel, scroll-reveal text wrappers, Sidequest photo strips. Nothing animates before it's in view anyway.
- **`client:idle`** — the About section ambient audio player, if we keep it.

Keep each island small and single-purpose. A `<ScrollReveal>` wrapper that takes `children` from Astro is better than porting whole sections to React.

## 2. Execution Order

**Pass 1 — Foundation**
1. `npm create astro@latest`, add `@astrojs/react`, Framer Motion, Tailwind.
2. Define design tokens (colors, type scale, spacing) as CSS custom properties in a global stylesheet. Everything downstream references these — no hardcoded hex values in components.
3. Verify the real values against the live site with devtools before locking (see "Open items" in the design system doc — the current palette/type values are inferred, not measured).
4. Download and organize assets into `/public` per the manifest.

**Pass 2 — Shared components**
- `Nav.astro` + `<Clock client:load />` island
- `Footer.astro` (big name lockup, nav repeat, socials, back-to-top)
- `<ScrollReveal client:visible />` — generic wrapper, used everywhere
- `<Marquee client:visible />` — takes items + direction + speed props

**Pass 3 — Home page** (the agreed first target)
Sections in order: Hero (video + tagline) → Featured Projects grid → About block (layered images, bio, skill marquees, experience, resume link) → Client logo strip → Testimonial carousel → Closing CTA → Footer.

**Pass 4 — Expand**
`/projects`, `/about`, `/side-quest`, `/contact`, then the `/projects-detail/[slug]` template as a content collection (mahavitaran, aria, mp4, frelo).

## 3. Component Notes

**Clock** — `LOCAL /` label + ticking `HH:MM:SS`, monospace, tabular figures so digits don't jitter. `setInterval` at 1000ms, cleared on unmount. Render a placeholder server-side to avoid hydration mismatch.

**Marquee** — duplicate the content track and translate by -50% on loop for a seamless cycle. Items separated by `✦`. Two rows on the About section running opposite directions. Sidequest uses the same component with image children and varied speeds per row.

**ScrollReveal** — fade + translate-Y on entering viewport, staggered by line or child. Use Framer Motion's `whileInView` with `viewport={{ once: true }}`. This is what the original does on the bio paragraphs.

**Testimonial carousel** — 4 slides (avatar, name, role, quote), prev/next arrows, infinite loop, autoplay with pause on hover. `AnimatePresence` for slide transitions.

**Hero video** — `autoplay muted loop playsinline`, `poster` attribute for first paint. Consider a lighter mobile encode.

## 4. Quality Floor
- Responsive to mobile — the original is desktop-forward, so the mobile layouts need real decisions, not just stacking.
- `prefers-reduced-motion` respected: kill marquees and scroll reveals, keep content visible.
- Visible keyboard focus on nav, project cards, carousel arrows.
- Semantic headings — the Framer output flattens a lot of this; the rebuild should have a proper `h1`/`h2` hierarchy per page.
- Alt text on all project and testimonial images (partially present in the original, listed in the manifest).
- Lazy-load Sidequest videos — six autoplay loops on one page is heavy.

## 5. Known Gaps To Fill During Build
- **Project card images** — the featured project thumbnails weren't recoverable from the rendered pages. Dhruv has these locally; grab them directly.
- **Project detail pages** — not yet captured. Fetch the four `/projects-detail/*` pages to spec the case-study template before Pass 4.
- **Fonts** — the original uses Framer-hosted faces. Need the actual family names, then source equivalents (self-hosted woff2 preferred over Google Fonts CDN for performance and consistency).
- **Contact page discrepancy** — the footer socials and the contact page socials point to different Behance/Instagram handles. Worth reconciling to whichever is current.
