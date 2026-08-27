# Cusp — marketing site plan

No code yet. Below: component hierarchy, design tokens, file structure/routes, and open questions.

## 1. Component hierarchy

```
__root.tsx
├── HeadContent (font links, tokens stylesheet)
├── <SiteNav />                      — wordmark, 2 text links, waitlist CTA; transparent→solid on scroll
│   └── mobile: wordmark + CTA only (no hamburger)
└── <Outlet />
    └── / (index.tsx)
    │   ├── <HeroWaitlist />          — display serif promise (3 lines), subhead, <WaitlistForm />,
    │   │                              phone frame with verdict screenshot placeholder + mono caption
    │   ├── <ProblemStatement />      — exactly 3 centred serif lines + 1 mono fact line
    │   ├── <HowItWorks />            — 3 × <StepRow /> (accent numeral, serif heading, 2-line body,
    │   │                              <PhoneFrame> screenshot placeholder; alternating on desktop)
    │   ├── <ScepticsSection />       — quiet/denser surface; 6 one-line refusals, 2 large serif
    │   │                              statements, accent mark, "Refusal List →" primary text link,
    │   │                              "How we rank" secondary link
    │   ├── <Surfaces />              — 3 blocks; Stack gets ~2× vertical space
    │   │   ├── <SurfaceBlock id="signal" />   — mono eyebrow, serif title, body, <PhoneFrame>, mono line
    │   │   ├── <SurfaceBlock id="stack" />    — same + inlined verdict example:
    │   │   │                              <VerdictCard pick|runner-up|skip> × 3 (mono prices/dates)
    │   │   └── <SurfaceBlock id="gap" />
    │   ├── <FounderNote />           — tinted band, serif pull-line, first-person sans body, sign-off
    │   ├── <Faq />                   — <Accordion> with 7 <FaqItem> (chevron rotation ≤180ms)
    │   ├── <FinalCta />              — one serif line + <WaitlistForm /> + mono line
    │   └── (footer below)
    ├── /refusals      — <StubPage> shell (awaits variant prompt)
    ├── /methodology   — <StubPage> shell
    ├── /privacy       — <LegalPage> placeholder content
    └── /terms         — <LegalPage> placeholder content

__root footer: <SiteFooter /> — wordmark, 4 links in order (Privacy, Terms, Methodology, Refusals),
contact email, mono line "Made in Bengaluru. Prices in INR including GST."

Shared primitives:
- <WaitlistForm />   — email input + button; states: empty/invalid(on blur)/error/success, all inline,
                       success replaces field in place; used in Hero + FinalCta only
- <PhoneFrame />     — neutral device frame, real aspect, accepts screenshot (placeholder panel now)
- <Mono /> <Eyebrow /> — JetBrains Mono label styles (letter-spaced, small)
- <Container /> <Section /> — max-width + vertical rhythm wrappers (120px+/72px+ padding)
```

## 2. Design tokens

Colors (oklch conversions of your hexes, light + `.dark`):

```
--background   #FAF9F7   / #141312
--foreground   #1A1917   / #F5F3EF
--muted-foreground #6B6660 / #A09A92
--border (hairline) #E5E1DA / #2B2825
--accent       #B4622A   / #D4854A   (ONLY: primary CTA, waitlist submit, one Refusal-section mark)
--accent-foreground  paper tone on accent
--tinted       warm off-white band for FounderNote + Sceptic surface (very slight paper shift)
```

Type (loaded via `<link>` preconnect + display=swap + metric-matched fallbacks):

```
--font-display: "Newsreader", Georgia fallback (regular weight, 64px+ desktop hero)
--font-sans: "Inter", system fallback (17px desktop / 16px mobile minimum)
--font-mono: "JetBrains Mono", monospace fallback (small, letter-spaced, facts/dates/prices)

Type scale (display steps): hero ~clamp(44px→72px), section serif ~40–48px, statements ~28–36px.
Hierarchy via size, never weight-only.
```

Space/radius/motion:

```
--section-py: 72px mobile / 120px+ desktop (Stack block ~2× sibling blocks)
--radius: small (paper editorial: 6–8px max; phone frame slightly larger)
Motion: ≤180–200ms transitions only; no scroll reveals, parallax, counters.
```

## 3. File structure and routes

```
src/routes/
├── __root.tsx          — head (fonts, meta), <SiteNav>, <Outlet>, <SiteFooter>
├── index.tsx           — landing page, own head() (title/desc/og, no og:image)
├── refusals.tsx        — stub, own head()
├── methodology.tsx     — stub, own head()
├── privacy.tsx         — placeholder legal, own head()
└── terms.tsx           — placeholder legal, own head()

src/components/
├── site-nav.tsx, site-footer.tsx
├── waitlist-form.tsx
├── phone-frame.tsx
├── typography.tsx      — Mono/Eyebrow primitives
├── sections/ (hero, problem, how-it-works, sceptics, surfaces, founder-note, faq, final-cta)

src/styles.css          — tokens above (oklch), font-face metric fallbacks
```

Performance for Indian 4G: zero client-side data fetching (fully static/prerendered), fonts as the only render-blocking externals (preconnected, swapped), screenshot placeholders are CSS panels (no images shipped), no animation libraries — CSS transitions only.

Waitlist storage: **default = no backend**. Form validates and shows the real inline success state but stores nothing. Option: enable Lovable Cloud and persist to a `waitlist` table (real signups from day one). Needs your call.

## 4. Ambiguities that would change the implementation

1. **Waitlist persistence** (biggest one): store emails now (needs backend) or stub the form? Success copy "We'll email deekshitha@…" implies capture.
2. **Refusal List count/date**: "41 refusals, updated 24 Aug 2026" is hardcoded in the link label — fine as static copy, or should the stub page render the real list structure so the count is data-driven later?
3. **Contact email in footer**: address not supplied — placeholder like hello@cusp…? What domain?
4. **Legal pages**: generic placeholder marked "draft — to be replaced", or do you have copy? DPDP Act reference in FAQ suggests India-specific drafting later.
5. **Dark mode trigger**: no toggle specified. Respect `prefers-color-scheme` only, or add a manual toggle (nav/footer)? Brief says "full pass at mobile and desktop" but not how it's activated.
6. **Phone frame content**: pure neutral placeholder panel, or a lightly structured "verdict-shaped" placeholder (grey bars where pick/runner-up/skip sit) so the swap-in is obvious?
7. **Anchor behaviour**: nav links "The Refusal List" and "How we rank" — point at /refusals and /methodology routes (not page anchors), correct?
8. **Favicon/og:image**: keep existing favicon; og:image omitted so hosting injects a screenshot — acceptable?

On approval I'll build everything above, then list every guess I had to make.
