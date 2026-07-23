# Design System — Cytus II Signature

> A design language derived from the visual identity and thematic DNA of **Cytus II** by Rayark Games.
> Use this document as a style guide for building or upgrading projects that channel the same atmosphere: futuristic, emotionally layered, digitally alive.

---

## 1. Design Philosophy

Cytus II's design language is built on a core tension: **cold digital infrastructure vs. raw human emotion**. Every visual, motion, and layout decision reinforces the feeling of navigating a living operating system — one that bleeds personality through each character's unique presence.

### Guiding Principles

| Principle | Description |
|-----------|-------------|
| **Digital Organism** | The interface feels alive — it breathes, pulses, and occasionally glitches. It is not static chrome; it is a system with a heartbeat. |
| **Character as Architecture** | Each section/module has its own identity and color signature, like characters in Cytus II. The system adapts its mood per context. |
| **Layered Revelation** | Information is earned, not dumped. Progressive disclosure mirrors the game's unlocking mechanic — start minimal, reveal depth. |
| **Elegant Corruption** | Perfection is broken by intentional artifacts — glitch effects, scan lines, data noise. Beauty exists in the imperfection. |
| **Rhythm & Flow** | Transitions, scroll behavior, and animations follow musical timing. The UI has tempo. |

---

## 2. Color System

### 2.1 Core Palette

The palette is built on a **near-black foundation** with **selective luminous accents** — the visual equivalent of neon signage in a dark alley.

```
┌─────────────────────────────────────────────────────┐
│  BACKGROUND LAYER                                   │
├─────────────────────────────────────────────────────┤
│  Void Black        #0A0A0F   (primary bg)           │
│  Deep Charcoal     #12121A   (card/surface bg)      │
│  Slate Midnight    #1A1A2E   (elevated surfaces)    │
│  Muted Graphite    #2A2A3E   (borders, dividers)    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  ACCENT LAYER (Character-Mapped)                    │
├─────────────────────────────────────────────────────┤
│  Teal Pulse        #00E5C8   (primary / PAFF)       │
│  Neko Pink         #FF4F9A   (secondary / energy)   │
│  Signal Blue       #4FC3F7   (info / ROBO_Head)     │
│  Crimson Ivy       #E53935   (danger / Ivy)         │
│  Xenon Red         #FF3D3D   (warning / Xenon)      │
│  ConneR Amber      #D4A058   (warm / ConneR)        │
│  JOE Violet        #9C5FE0   (creative / JOE)       │
│  Cherry Blossom    #FF6B9D   (highlight / Cherry)   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  TEXT & UI LAYER                                    │
├─────────────────────────────────────────────────────┤
│  Pure White        #FFFFFF   (headings, emphasis)    │
│  Ghost White       #E0E0E8   (body text)            │
│  Faded Silver      #8888A0   (secondary text)       │
│  Dim Platinum      #555570   (disabled/placeholder)  │
└─────────────────────────────────────────────────────┘
```

### 2.2 Color Usage Rules

- Backgrounds are always dark. Never use light/white backgrounds for primary surfaces.
- Accent colors appear as **thin lines, glows, borders, and text highlights** — never large fills.
- Each major section/module should adopt ONE accent as its signature color.
- Gradients are subtle: dark-to-slightly-less-dark, or accent-to-transparent.
- Glowing effects use the accent color at low opacity (10-30%) for halos/shadows.

### 2.3 Glow & Emission

```css
/* Accent glow — use sparingly on focus states, active elements */
box-shadow: 0 0 12px rgba(0, 229, 200, 0.3),
            0 0 40px rgba(0, 229, 200, 0.1);

/* Text glow for key headings */
text-shadow: 0 0 8px rgba(0, 229, 200, 0.6),
             0 0 24px rgba(0, 229, 200, 0.2);
```

---

## 3. Typography

### 3.1 Font Stack

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| **Display / Titles** | `Rajdhani` | `Orbitron`, `sans-serif` | 600–700 |
| **Body / Interface** | `Inter` | `Segoe UI`, `sans-serif` | 300–500 |
| **Monospace / Data** | `JetBrains Mono` | `Fira Code`, `monospace` | 400 |
| **Accent / Tags** | `Exo 2` | `Rajdhani`, `sans-serif` | 500–600 |

### 3.2 Type Scale

```
Display XL:    3.5rem  / 700  / -0.02em tracking  (hero text)
Display:       2.5rem  / 600  / -0.01em tracking  (page titles)
Heading 1:     1.75rem / 600  / 0em                (section heads)
Heading 2:     1.25rem / 600  / 0.02em             (sub-sections)
Body:          1rem    / 400  / 0.01em             (content)
Caption:       0.8rem  / 400  / 0.04em             (metadata, tags)
Micro:         0.65rem / 500  / 0.08em             (system labels)
```

### 3.3 Typography Rules

- Headings use **ALL CAPS** or **Title Case with letter-spacing** — evokes system terminal readouts.
- Body text stays light-weight (300–400) for contrast against bold headings.
- Monospace is used for data displays, timestamps, IDs, and code-like content.
- Numbers in stats/metrics use **tabular figures** (monospace-aligned digits).

---

## 4. Layout & Spacing

### 4.1 Grid System

```
Base Unit:     4px
Spacing Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96

Columns:
  Mobile:    4 columns,  16px gutter, 16px margin
  Tablet:    8 columns,  20px gutter, 24px margin
  Desktop:  12 columns,  24px gutter, 32px margin
  Ultra:    12 columns,  32px gutter, auto margin (max-width: 1440px)
```

The layout mimics an **operating system interface** — panels, cards, and modules floating in dark space.

### 4.2 Layout Principles

- **Card-based architecture**: Content lives in clearly bordered panels with subtle borders or glow edges.
- **Asymmetric composition**: Avoid perfectly centered, symmetrical layouts. Offset elements create visual rhythm.
- **Generous negative space**: Dark space is not wasted space — it's atmosphere.
- **Vertical scroll as timeline**: Content flows like a chronological feed (iM system style).
- **Sidebar/panel navigation**: Navigation mimics a system OS file structure or character selection panel.
- **Container hierarchy**: Void → Surface → Elevated → Card. Each level adds a shade of depth.

### 4.3 PC Desktop Layout (≥ 1024px)

The desktop layout is a **three-zone OS shell**: persistent nav rail, primary content feed, and a contextual aside panel.

```
┌─────────────────────────────────────────────────────────────────────┐
│  SYSTEM BAR (fixed top, 48px height)                                │
│  [Logo]         [Search ━━━━━━━━━━━━]        [Notif] [User] [···]  │
├────────┬────────────────────────────────────────────┬───────────────┤
│        │                                            │               │
│  NAV   │         MAIN CONTENT AREA                  │  ASIDE PANEL  │
│  RAIL  │                                            │               │
│  72px  │   ┌────────────────────────────────┐       │  280px fixed  │
│        │   │  Content Card                  │       │               │
│  ◉ P   │   │  ...                           │       │  ┌─────────┐  │
│  ○ N   │   └────────────────────────────────┘       │  │ Context │  │
│  ○ R   │                                            │  │ Detail  │  │
│  ○ X   │   ┌────────────────────────────────┐       │  │ Panel   │  │
│  ○ C   │   │  Content Card                  │       │  └─────────┘  │
│        │   │  ...                           │       │               │
│        │   └────────────────────────────────┘       │  ┌─────────┐  │
│  ───   │                                            │  │ Stats / │  │
│  ○ ⚙   │   ┌────────────────────────────────┐       │  │ Meta    │  │
│        │   │  Content Card                  │       │  └─────────┘  │
│        │   │  ...                           │       │               │
│        │   └────────────────────────────────┘       │               │
│        │                                            │               │
└────────┴────────────────────────────────────────────┴───────────────┘
```

```css
/* PC Desktop Shell */
.app-shell {
  display: grid;
  grid-template-columns: 72px 1fr 280px;
  grid-template-rows: 48px 1fr;
  grid-template-areas:
    "header header header"
    "nav    main   aside";
  height: 100vh;
  overflow: hidden;
}

.system-bar   { grid-area: header; position: sticky; top: 0; z-index: 100; }
.nav-rail     { grid-area: nav;    overflow-y: auto; }
.main-content { grid-area: main;   overflow-y: auto; padding: 32px; }
.aside-panel  { grid-area: aside;  overflow-y: auto; padding: 24px; }

/* Ultrawide (>1440px): constrain and center */
@media (min-width: 1441px) {
  .app-shell {
    max-width: 1600px;
    margin: 0 auto;
    border-left: 1px solid var(--bg-border);
    border-right: 1px solid var(--bg-border);
  }
}

/* Tablet/Small Desktop (768px–1023px): collapse aside */
@media (max-width: 1023px) {
  .app-shell {
    grid-template-columns: 72px 1fr;
    grid-template-areas:
      "header header"
      "nav    main";
  }
  .aside-panel { display: none; }  /* Or convert to slide-over drawer */
}
```

### 4.4 Mobile Layout (< 768px)

On mobile, the layout transforms into a **single-column feed** with bottom tab navigation — mimicking a phone OS with the iM feed as the primary interaction surface.

```
┌───────────────────────────────────┐
│  SYSTEM BAR (sticky top, 56px)    │
│  [☰]    Section Title     [🔍]   │
├───────────────────────────────────┤
│                                   │
│  ┌─────────────────────────────┐  │
│  │  Content Card (full width)  │  │
│  │  ...                        │  │
│  └─────────────────────────────┘  │
│                                   │
│  ┌─────────────────────────────┐  │
│  │  Content Card               │  │
│  │  ...                        │  │
│  └─────────────────────────────┘  │
│                                   │
│  ┌─────────────────────────────┐  │
│  │  Content Card               │  │
│  │  ...                        │  │
│  └─────────────────────────────┘  │
│                                   │
│         (scrollable)              │
│                                   │
├───────────────────────────────────┤
│  ◉    ○    ○    ○    ○           │
│  P    N    R    X    C           │
│  BOTTOM TAB BAR (fixed, 64px)    │
└───────────────────────────────────┘
```

```css
/* Mobile Shell */
@media (max-width: 767px) {
  .app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh; /* dynamic viewport for mobile browsers */
  }

  .system-bar {
    position: sticky;
    top: 0;
    height: 56px;
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--bg-border);
  }

  .nav-rail {
    /* Transforms into bottom tab bar */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: var(--bg-surface);
    border-top: 1px solid var(--bg-border);
    padding-bottom: env(safe-area-inset-bottom); /* iPhone notch */
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    padding-bottom: 80px; /* Space for bottom tab */
    -webkit-overflow-scrolling: touch;
  }

  .aside-panel {
    display: none; /* Use modal/sheet on mobile */
  }
}
```

### 4.5 Mobile-Specific Patterns

#### Slide-Up Sheet (replaces aside panel on mobile)

```css
.sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 85vh;
  background: var(--bg-surface);
  border-top: 1px solid var(--bg-border);
  border-radius: 12px 12px 0 0;
  padding: 16px;
  padding-top: 8px;
  transform: translateY(100%);
  transition: transform var(--duration-normal) var(--ease-out-expo);
  z-index: 200;
  overflow-y: auto;
}

.sheet.open {
  transform: translateY(0);
}

.sheet__handle {
  width: 40px;
  height: 4px;
  background: var(--bg-border);
  border-radius: 2px;
  margin: 0 auto 16px;
}
```

#### Swipe Navigation (horizontal character switching)

```css
.character-swipe {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.character-swipe::-webkit-scrollbar { display: none; }

.character-swipe__item {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
```

#### Touch-Optimized Cards

```css
@media (max-width: 767px) {
  .card {
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 4px; /* Slightly more radius on mobile for thumb comfort */
  }

  /* Larger tap targets */
  .card__action {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
```

### 4.6 PC-Specific Patterns

#### Hover-Reveal Panels

On desktop, secondary info reveals on hover — not possible on mobile, so structure differs.

```css
@media (min-width: 1024px) {
  .card__meta {
    opacity: 0;
    transform: translateY(4px);
    transition: all var(--duration-fast) var(--ease-out-expo);
  }

  .card:hover .card__meta {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Keyboard Navigation

```css
/* Focus ring for keyboard nav — PC only visible via :focus-visible */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  box-shadow: var(--glow-sm);
}

/* Nav rail keyboard shortcut indicators */
.nav-item__shortcut {
  display: none;
}

@media (min-width: 1024px) {
  .nav-item__shortcut {
    display: block;
    font-size: 0.65rem;
    font-family: var(--font-mono);
    color: var(--text-disabled);
    margin-top: 2px;
  }
}
```

#### Split-View / Multi-Panel Mode

```css
/* Widescreen: content can split into two-column masonry */
@media (min-width: 1200px) {
  .feed--grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Ultrawide: three columns available */
@media (min-width: 1600px) {
  .feed--grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 4.7 Card Design

```css
.card {
  background: var(--bg-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.card::before {
  /* Top accent line */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
}

@media (max-width: 767px) {
  .card {
    padding: 16px;
    border-radius: 4px;
    border-left: none;
    border-right: none;
  }
}
```

### 4.8 Content Width & Readability

```css
/* Readable content column — never too wide */
.content-readable {
  max-width: 680px; /* Optimal line length ~65-75 chars */
  margin: 0 auto;
}

/* Full bleed option for media/dashboards */
.content-full {
  max-width: none;
}

@media (max-width: 767px) {
  .content-readable {
    max-width: none; /* Full width on mobile */
  }
}
```

---

## 5. Visual Effects & Motion

### 5.1 Signature Effects

| Effect | Usage | Intensity |
|--------|-------|-----------|
| **Scan Line** | Background overlay on hero sections | Subtle (5-10% opacity) |
| **Glitch Flicker** | Page transitions, error states, hover on special elements | Brief (100-200ms) |
| **Data Noise** | Loading states, skeleton screens | Animated grain texture |
| **Pulse Glow** | Active/live elements, notifications | Rhythmic (synced to 120BPM if possible) |
| **Chromatic Aberration** | Image borders, focus effects on hover | Slight RGB split (1-2px) |
| **Parallax Drift** | Background layers on scroll | Slow, subtle movement |

### 5.2 Animation Timing

```css
/* Standard transitions — smooth but snappy */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);

--duration-instant:  100ms;
--duration-fast:     200ms;
--duration-normal:   350ms;
--duration-slow:     600ms;
--duration-dramatic: 1000ms;
```

### 5.3 Scan Line Effect (CSS)

```css
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  animation: scanDrift 8s linear infinite;
}

@keyframes scanDrift {
  from { transform: translateY(0); }
  to   { transform: translateY(4px); }
}
```

### 5.4 Glitch Effect (CSS)

```css
@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); filter: none; }
  92% { transform: translate(-2px, 1px); filter: hue-rotate(90deg); }
  94% { transform: translate(2px, -1px); filter: hue-rotate(-90deg); }
  96% { transform: translate(-1px, -1px); filter: saturate(2); }
  98% { transform: translate(1px, 2px); filter: brightness(1.2); }
}

.glitch-hover:hover {
  animation: glitch 0.3s steps(1) forwards;
}
```

---

## 6. Component Patterns

### 6.1 Navigation (Character Selection Style)

The nav mimics Cytus II's character select — a vertical strip of identity-marked items, each glowing with their signature color on selection.

```
┌──────┐
│ ◉ P  │  ← Active (teal glow pulse)
│ ○ N  │
│ ○ R  │
│ ○ X  │
│ ○ C  │
└──────┘
```

- Vertical sidebar with icon + abbreviated labels
- Active state: accent-colored left border (3px) + subtle glow
- Hover: slight scale (1.02) + border fade-in
- Each section changes the accent color of the entire interface

### 6.2 Feed / Timeline (iM System Style)

The primary content area mimics a social media feed — posts, comments, interactions flowing vertically.

```
┌─────────────────────────────────────────┐
│ [Avatar] @username · 2m ago             │
│                                         │
│ Content text here with support for      │
│ media embeds, code blocks, and links.   │
│                                         │
│ ♡ 42   ↻ 12   💬 8                     │
├─────────────────────────────────────────┤
│ [Avatar] @another_user · 5m ago         │
│ ...                                     │
└─────────────────────────────────────────┘
```

### 6.3 Progress / Experience Bar

```css
.xp-bar {
  height: 4px;
  background: #1A1A2E;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.xp-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-bright));
  box-shadow: 0 0 8px var(--accent);
  transition: width 0.6s var(--ease-out-expo);
}
```

### 6.4 Buttons

```css
.btn-primary {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 10px 24px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
  transition: all var(--duration-fast) var(--ease-out-expo);
}

.btn-primary:hover {
  background: rgba(var(--accent-rgb), 0.1);
  box-shadow: 0 0 16px rgba(var(--accent-rgb), 0.3);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.5);
}
```

### 6.5 Modal / Dialog (OS Log Style)

Modals appear as **system OS file viewers** — a flat, dark panel with a filename/title bar, monospaced metadata, and clear close action.

```
╔══════════════════════════════════════════╗
║  OS_LOG_2680_08_14.sys         [×]      ║
╠══════════════════════════════════════════╣
║                                          ║
║  SUBJECT: Memory Fragment #2247          ║
║  DATE:    N.A. 702.08.14                 ║
║  STATUS:  DECLASSIFIED                   ║
║                                          ║
║  Content body goes here with             ║
║  monospace or body font depending        ║
║  on content type.                        ║
║                                          ║
╚══════════════════════════════════════════╝
```

### 6.6 Notification / Toast

```css
.toast {
  background: #12121A;
  border-left: 3px solid var(--accent);
  padding: 12px 16px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideInRight var(--duration-normal) var(--ease-out-expo);
}
```

---

## 7. Iconography

### Style Rules

- **Line-based**: 1.5px stroke, no fills
- **Geometric**: Built from circles, rectangles, and angular lines
- **Minimal detail**: Icons are functional, not decorative
- **Glow on active**: Active icons get the accent color + subtle emission

### Icon Set Recommendations

Use or derive from:
- [Phosphor Icons](https://phosphoricons.com) — for clean line icons
- [Lucide](https://lucide.dev) — for consistent geometric style
- Custom glyphs for system-specific symbols (scan line icon, waveform, data node)

---

## 8. Imagery & Art Direction

### 8.1 Character Art Style

- **Monochrome base** with single-color accent highlights
- Illustrations are sketchy, angular, and slightly rough — not polished 3D renders
- Portraits fade into darkness at edges (vignette treatment)
- Art evolves: early states are cleaner, later states show more distortion/corruption

### 8.2 Background Treatment

- Deep dark gradients with subtle noise texture (2-4% grain)
- Geometric circuit-line patterns at very low opacity (3-5%)
- Occasional floating data particles (small dots drifting slowly)
- Hero backgrounds can use radial gradient spotlight from accent color

### 8.3 Media Cards

```css
.media-card img {
  filter: grayscale(30%) contrast(1.1);
  transition: filter var(--duration-normal);
}

.media-card:hover img {
  filter: grayscale(0%) contrast(1.05);
}

.media-card::after {
  /* Chromatic aberration on hover */
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  mix-blend-mode: screen;
  background: linear-gradient(135deg,
    rgba(255, 0, 0, 0.1),
    transparent,
    rgba(0, 0, 255, 0.1)
  );
  transition: opacity var(--duration-fast);
}

.media-card:hover::after {
  opacity: 1;
}
```

---

## 9. Sound & Interaction Feedback

Even if the project isn't audio-focused, micro-interactions should feel "musical":

| Action | Feedback |
|--------|----------|
| Button click | Short percussive tick (10ms) |
| Navigation transition | Soft whoosh/sweep |
| Notification arrive | Clear bell/chime tone |
| Error state | Low distorted buzz |
| Progress complete | Ascending tone sequence |
| Hover over interactive | Subtle high-freq blip |

Use Web Audio API or pre-rendered short samples. Keep volume low and optional.

---

## 10. Responsive Behavior

### 10.1 Breakpoint System

```css
/* Breakpoint tokens */
--bp-mobile-sm:  320px;   /* Small phones */
--bp-mobile:     480px;   /* Standard phones */
--bp-tablet:     768px;   /* Tablets portrait */
--bp-desktop:    1024px;  /* Laptops / tablets landscape */
--bp-desktop-lg: 1280px;  /* Standard desktop */
--bp-ultra:      1440px;  /* Large monitors */
--bp-cinema:     1920px;  /* Ultrawide / 4K */
```

| Breakpoint | Columns | Gutter | Margin | Layout Mode |
|-----------|---------|--------|--------|-------------|
| < 480px | 4 | 12px | 16px | Stack + Bottom Tabs |
| 480–767px | 4 | 16px | 16px | Stack + Bottom Tabs |
| 768–1023px | 8 | 20px | 24px | Rail + Single Column |
| 1024–1279px | 12 | 24px | 32px | Rail + Content + Collapsible Aside |
| 1280–1439px | 12 | 24px | 32px | Rail + Content + Aside |
| ≥ 1440px | 12 | 32px | auto | Contained + Cinematic spacing |

### 10.2 Mobile Adaptations (< 768px)

#### Navigation
- Sidebar rail → **fixed bottom tab bar** (64px + safe area inset)
- Maximum 5 items in bottom tabs; overflow goes to "more" menu
- Active tab shows accent-colored icon + dot indicator (no text labels by default)
- Swipe between sections enabled via horizontal scroll snap

#### Content & Cards
- Cards span full viewport width (edge-to-edge with 16px internal padding)
- Card borders on left/right are removed for seamless full-bleed feel
- Card stacking gap reduced to 12px (vs 24px on desktop)
- Horizontal card carousels for multi-item sections (scroll snap)

#### Typography Scaling
```css
@media (max-width: 767px) {
  :root {
    font-size: 15px; /* Slight reduction from 16px base */
  }
  
  .display-xl { font-size: 2rem; }    /* 3.5rem → 2rem */
  .display    { font-size: 1.6rem; }  /* 2.5rem → 1.6rem */
  .heading-1  { font-size: 1.35rem; } /* 1.75rem → 1.35rem */
  .heading-2  { font-size: 1.1rem; }  /* 1.25rem → 1.1rem */
}
```

#### Interactions
- Touch targets: minimum **44×44px** hit area (even if visually smaller)
- No hover-dependent reveals — all info accessible without hover
- Swipe gestures for dismissing sheets, switching tabs, revealing actions
- Pull-to-refresh with custom glitch animation
- Long-press replaces right-click context menus

#### Performance
- Scan line overlay **disabled** (no pseudo-element overlay on mobile)
- Glitch animations **simplified** — reduced keyframes, shorter duration
- Background particle effects **halved** or disabled
- `will-change` used sparingly (only on actively animating elements)
- Prefer `transform` and `opacity` for mobile animations (GPU-composited)

```css
@media (max-width: 767px) {
  .scanlines::after { display: none; }
  .particles { --particle-count: 15; } /* vs 40 on desktop */
  .glitch-hover:hover { animation-duration: 0.15s; }
}
```

#### Safe Areas & Notch Handling
```css
/* iOS safe areas */
.system-bar   { padding-top: env(safe-area-inset-top); }
.nav-bottom   { padding-bottom: env(safe-area-inset-bottom); }
.main-content { padding-left: env(safe-area-inset-left);
                padding-right: env(safe-area-inset-right); }

/* Prevent content from hiding behind system bars */
body {
  min-height: 100dvh; /* Dynamic viewport height */
}
```

### 10.3 Tablet Adaptations (768px – 1023px)

- Nav rail visible at 72px width (icons + abbreviated labels)
- Aside panel becomes a **slide-over drawer** (triggered by button/swipe from right edge)
- Content area gets comfortable padding (24px)
- Cards can arrange in 2-column grid for dashboard-style views
- Touch targets still 44px minimum (tablet can be touch-only)

```css
@media (min-width: 768px) and (max-width: 1023px) {
  .app-shell {
    grid-template-columns: 72px 1fr;
    grid-template-areas:
      "header header"
      "nav    main";
  }

  .aside-panel {
    position: fixed;
    right: 0;
    top: 48px;
    bottom: 0;
    width: 320px;
    transform: translateX(100%);
    transition: transform var(--duration-normal) var(--ease-out-expo);
    z-index: 150;
    background: var(--bg-surface);
    border-left: 1px solid var(--bg-border);
  }

  .aside-panel.open {
    transform: translateX(0);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
  }

  .feed--grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
```

### 10.4 Desktop Adaptations (≥ 1024px)

- Full three-zone layout: Rail (72px) + Content (fluid) + Aside (280px)
- Hover states fully active (hover-reveal metadata, tooltips, context menus)
- Keyboard shortcuts visible on nav items
- Multi-column feed layouts available (2-col at 1200px+, 3-col at 1600px+)
- Scroll-linked animations at full fidelity
- All visual effects enabled (scan lines, particles, parallax)

#### Aside Panel Behavior
```css
@media (min-width: 1024px) {
  .aside-panel {
    position: sticky;
    top: 48px;
    height: calc(100vh - 48px);
    overflow-y: auto;
    border-left: 1px solid var(--bg-border);
  }

  /* Aside can be toggled collapsed on desktop too */
  .aside-panel.collapsed {
    width: 0;
    padding: 0;
    overflow: hidden;
    border: none;
  }

  .app-shell:has(.aside-panel.collapsed) {
    grid-template-columns: 72px 1fr;
  }
}
```

#### Ultrawide Handling (≥ 1440px)
```css
@media (min-width: 1441px) {
  .app-shell {
    max-width: 1600px;
    margin: 0 auto;
    /* Cinematic pillarboxing — void shows on sides */
    border-left: 1px solid var(--bg-border);
    border-right: 1px solid var(--bg-border);
  }

  /* Extra breathing room */
  .main-content {
    padding: 48px 64px;
  }

  /* Cards get more generous sizing */
  .card {
    padding: 32px;
  }
}
```

### 10.5 Orientation Handling

```css
/* Landscape mobile — common for media consumption */
@media (max-width: 767px) and (orientation: landscape) {
  .nav-bottom {
    /* Move to left side rail instead of bottom */
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 56px;
    height: 100%;
    flex-direction: column;
    border-top: none;
    border-right: 1px solid var(--bg-border);
  }

  .main-content {
    padding-left: 72px;  /* Offset for side rail */
    padding-bottom: 16px; /* Remove bottom tab spacing */
  }

  .system-bar {
    height: 40px; /* Shorter in landscape */
  }
}
```

### 10.6 Responsive Component Variants

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| **Nav** | Bottom tabs (5 icons) | Left rail (icons + labels) | Left rail + keyboard hints |
| **Cards** | Full-bleed stack | 2-column grid | Flexible (1–3 col) |
| **Modals** | Bottom sheet (85vh max) | Centered dialog (560px) | Centered dialog (640px) |
| **Aside** | Hidden → sheet trigger | Slide-over drawer | Persistent panel |
| **Feed** | Single column scroll | Single/double column | Multi-column masonry |
| **Images** | Full-width, 16:9 ratio | Contained with padding | Original ratio, contained |
| **Actions** | Bottom-anchored FAB | Inline buttons | Inline + hover-reveal |
| **Search** | Full-screen overlay | Expandable top bar | Inline in system bar |
| **Tooltips** | Long-press popup | Long-press popup | Hover tooltip |

### 10.7 Responsive Spacing Scale

```css
/* Fluid spacing using clamp() */
:root {
  --space-section:  clamp(32px, 6vw, 96px);    /* Between major sections */
  --space-card-gap: clamp(12px, 2vw, 24px);    /* Between cards */
  --space-content:  clamp(16px, 3vw, 32px);    /* Content padding */
  --space-inline:   clamp(8px, 1.5vw, 16px);   /* Inline element spacing */
}
```

---

## 11. Dark Mode Handling

This design system IS dark mode. There is no light variant. The darkness is foundational to the atmosphere.

If a light mode is absolutely required for accessibility:
- Invert to off-white (#F5F5F7) backgrounds
- Accents become darker/saturated versions
- Glitch/glow effects are replaced with subtle shadow/border treatments
- This should be treated as a completely separate "clean mode" — not a simple inversion

---

## 12. Implementation Tokens (CSS Custom Properties)

```css
:root {
  /* Foundations */
  --bg-void:          #0A0A0F;
  --bg-surface:       #12121A;
  --bg-elevated:      #1A1A2E;
  --bg-border:        #2A2A3E;

  /* Text */
  --text-primary:     #FFFFFF;
  --text-secondary:   #E0E0E8;
  --text-muted:       #8888A0;
  --text-disabled:    #555570;

  /* Accent (override per section/character) */
  --accent:           #00E5C8;
  --accent-bright:    #33FFE0;
  --accent-rgb:       0, 229, 200;

  /* Typography */
  --font-display:     'Rajdhani', 'Orbitron', sans-serif;
  --font-body:        'Inter', 'Segoe UI', sans-serif;
  --font-mono:        'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing */
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   32px;
  --space-2xl:  48px;
  --space-3xl:  64px;

  /* Radius */
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-lg:   8px;

  /* Shadows / Glows */
  --glow-sm: 0 0 8px rgba(var(--accent-rgb), 0.2);
  --glow-md: 0 0 16px rgba(var(--accent-rgb), 0.3);
  --glow-lg: 0 0 32px rgba(var(--accent-rgb), 0.15);

  /* Motion */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:      cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast:    200ms;
  --duration-normal:  350ms;
  --duration-slow:    600ms;
}

/* Character/Section variants */
[data-theme="neko"]    { --accent: #FF4F9A; --accent-rgb: 255, 79, 154; }
[data-theme="robo"]    { --accent: #4FC3F7; --accent-rgb: 79, 195, 247; }
[data-theme="ivy"]     { --accent: #E53935; --accent-rgb: 229, 57, 53; }
[data-theme="xenon"]   { --accent: #FF3D3D; --accent-rgb: 255, 61, 61; }
[data-theme="conner"]  { --accent: #D4A058; --accent-rgb: 212, 160, 88; }
[data-theme="joe"]     { --accent: #9C5FE0; --accent-rgb: 156, 95, 224; }
[data-theme="cherry"]  { --accent: #FF6B9D; --accent-rgb: 255, 107, 157; }
```

---

## 13. Content Voice & Tone

The writing style within this design system mirrors Cytus II's world:

| Context | Tone | Example |
|---------|------|---------|
| **System messages** | Cold, precise, technical | `SESSION_TERMINATED. Reconnect to proceed.` |
| **User-facing copy** | Warm but concise | `Your progress has been saved.` |
| **Error states** | Ominous, glitched | `ERR://CONNECTION_LOST — signal integrity compromised` |
| **Empty states** | Poetic, melancholic | `Nothing here yet. The void awaits your input.` |
| **Success states** | Triumphant, brief | `ACHIEVED. New path unlocked.` |

---

## 14. Accessibility Notes

Despite the dark, stylized aesthetic, accessibility is non-negotiable:

- All text meets **WCAG AA** contrast ratios (4.5:1 body, 3:1 large text) against dark backgrounds
- Accent colors on dark backgrounds naturally pass contrast — verify Teal (#00E5C8) on Void (#0A0A0F) = ~11:1 ✓
- Glitch animations respect `prefers-reduced-motion` — disable entirely when set
- Focus states use visible accent-colored outlines (not just color change)
- Screen reader text for all icon-only actions
- Scan line overlays use `pointer-events: none` and `aria-hidden`

---

## 15. Quick Reference — Do's & Don'ts

### ✓ Do

- Use dark backgrounds as the canvas
- Let accent colors breathe — less is more
- Add subtle motion that follows rhythm
- Use monospace for system/data content
- Progressive disclosure — reveal layers
- Make the interface feel like a living OS

### ✗ Don't

- Use large blocks of bright color
- Make everything glow (reserve for emphasis)
- Overdo glitch effects (disorienting)
- Use rounded, bubbly, "friendly" design language
- Center everything symmetrically
- Ignore accessibility for aesthetics

---

## Appendix: Mood Keywords

When in doubt, ask: *Does this feel like...*

`digital consciousness` · `neon in darkness` · `social feed from the future` ·
`operating system with a soul` · `rhythm in the void` · `elegant data corruption` ·
`cyberpunk intimacy` · `the space between heartbeat and machine pulse`

---

*Design system derived from Cytus II (Rayark Games, 2018). This document is a creative interpretation for project use — not affiliated with Rayark.*
