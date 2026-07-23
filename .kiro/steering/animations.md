# Animation System — Cytus II Signature

> A motion design language inspired by **Cytus II's** fluid, rhythmic, and emotionally charged animations.
> This system defines how elements move, appear, transform, and breathe life into your interface.

---

## 1. Animation Philosophy

Cytus II's motion design is defined by one principle: **the interface is alive**. It breathes, reacts, and pulses in rhythm. Nothing is static — even "resting" states have micro-motion that suggests a living digital organism beneath the surface.

### Core Motion Values

| Value | Meaning |
|-------|---------|
| **Rhythmic** | Motion follows musical timing. Elements enter on beats, exit on offbeats. The UI has tempo. |
| **Fluid** | No hard stops. Transitions overshoot slightly, ease exponentially, and settle organically. |
| **Layered** | Elements animate in sequence with staggered delays — never all at once. Depth is revealed through time. |
| **Reactive** | The interface responds to user input with immediate, physicality-based feedback. Touch = ripple. Click = pulse. |
| **Emotionally Coded** | Different animation styles signal different moods: smooth = calm, jittery = danger, slow = melancholy. |

### Motion Hierarchy

```
Priority 1: Feedback (instant, <100ms)     — button press, toggle, input
Priority 2: Transition (fast, 200-400ms)   — page change, panel open, card enter
Priority 3: Atmosphere (continuous, loops)  — background pulse, particle drift, scan lines
Priority 4: Narrative (dramatic, 600ms+)    — level up, unlock, achievement, error cascade
```

---

## 2. Timing & Easing System

### 2.1 Duration Scale

```css
:root {
  --anim-instant:    60ms;    /* Micro-feedback, toggle states */
  --anim-swift:      120ms;   /* Button depress, ripple start */
  --anim-fast:       200ms;   /* Hover states, small transitions */
  --anim-normal:     350ms;   /* Standard transitions, card enter */
  --anim-smooth:     500ms;   /* Panel slides, route changes */
  --anim-slow:       700ms;   /* Dramatic reveals, modals */
  --anim-dramatic:   1000ms;  /* Full-screen transitions, achievements */
  --anim-cinematic:  1500ms;  /* Splash screens, narrative moments */
}
```

### 2.2 Easing Library

```css
:root {
  /* PRIMARY — used for 80% of animations */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);       /* Quick start, graceful settle */
  --ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);       /* Slightly less dramatic */

  /* ENTER — elements appearing */
  --ease-enter:       cubic-bezier(0, 0, 0.2, 1);          /* Decelerate into view */
  --ease-enter-back:  cubic-bezier(0.34, 1.56, 0.64, 1);   /* Overshoot then settle */

  /* EXIT — elements leaving */
  --ease-exit:        cubic-bezier(0.4, 0, 1, 1);          /* Accelerate away */
  --ease-exit-sharp:  cubic-bezier(0.4, 0, 0.6, 1);       /* Snappy disappear */

  /* SPRING — playful, bouncy motion */
  --ease-spring:      cubic-bezier(0.34, 1.8, 0.64, 1);    /* Bouncy overshoot */
  --ease-spring-soft: cubic-bezier(0.22, 1.4, 0.36, 1);    /* Gentle overshoot */

  /* GLITCH — mechanical, digital feel */
  --ease-steps:       steps(6, end);                        /* Stuttery digital */
  --ease-glitch:      steps(3, jump-both);                  /* Hard jumps */

  /* CONTINUOUS — looping ambience */
  --ease-breathe:     cubic-bezier(0.37, 0, 0.63, 1);      /* Smooth in-out for loops */
  --ease-linear:      linear;                               /* Constant rate (scrolling, rotation) */
}
```

### 2.3 BPM-Synced Timing

Cytus II is a rhythm game — its UI pulses at musical tempo. When possible, sync ambient animations to a base BPM.

```css
:root {
  /* Base tempo: 120 BPM = 500ms per beat */
  --beat:         500ms;
  --half-beat:    250ms;
  --double-beat:  1000ms;
  --bar:          2000ms;   /* 4 beats */

  /* Use for pulsing/breathing animations */
  --pulse-rate:   var(--bar);  /* Full breath = 1 bar */
}
```

---

## 3. Entrance Animations

### 3.1 Fade In (Base)

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.enter-fade {
  animation: fadeIn var(--anim-normal) var(--ease-enter) both;
}
```

### 3.2 Rise In (Cards, Content Blocks)

The signature entrance: elements rise from below with a fade, like data materializing from the void.

```css
@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.enter-rise {
  animation: riseIn var(--anim-normal) var(--ease-out-expo) both;
}

/* Staggered children */
.enter-rise-stagger > * {
  animation: riseIn var(--anim-normal) var(--ease-out-expo) both;
}
.enter-rise-stagger > *:nth-child(1) { animation-delay: 0ms; }
.enter-rise-stagger > *:nth-child(2) { animation-delay: 60ms; }
.enter-rise-stagger > *:nth-child(3) { animation-delay: 120ms; }
.enter-rise-stagger > *:nth-child(4) { animation-delay: 180ms; }
.enter-rise-stagger > *:nth-child(5) { animation-delay: 240ms; }
.enter-rise-stagger > *:nth-child(6) { animation-delay: 300ms; }
```

### 3.3 Scan Materialize (Hero Elements, Titles)

A horizontal scan line sweeps across, revealing the element — like the Cytus II judgment line.

```css
@keyframes scanReveal {
  0% {
    clip-path: inset(0 100% 0 0);
    opacity: 0.6;
  }
  60% {
    clip-path: inset(0 0% 0 0);
    opacity: 1;
  }
  100% {
    clip-path: inset(0 0% 0 0);
    opacity: 1;
  }
}

.enter-scan {
  animation: scanReveal var(--anim-smooth) var(--ease-out-expo) both;
}
```

### 3.4 Glitch In (Special/Corrupted Elements)

Elements materialize with digital distortion — used for emphasis, unlocks, or error states.

```css
@keyframes glitchIn {
  0% {
    opacity: 0;
    transform: translate(-4px, 2px) skewX(-2deg);
    filter: hue-rotate(90deg) saturate(3);
  }
  20% {
    opacity: 0.8;
    transform: translate(3px, -1px) skewX(1deg);
    filter: hue-rotate(-60deg) saturate(2);
  }
  40% {
    opacity: 0.6;
    transform: translate(-2px, 0px) skewX(-0.5deg);
    filter: hue-rotate(30deg);
  }
  60% {
    opacity: 1;
    transform: translate(1px, 1px) skewX(0deg);
    filter: hue-rotate(0deg);
  }
  80% {
    opacity: 1;
    transform: translate(-1px, 0) skewX(0deg);
    filter: none;
  }
  100% {
    opacity: 1;
    transform: translate(0) skewX(0deg);
    filter: none;
  }
}

.enter-glitch {
  animation: glitchIn var(--anim-slow) steps(1) both;
}
```

### 3.5 Scale Bloom (Notifications, Badges, Indicators)

```css
@keyframes scaleBoom {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  70% {
    opacity: 1;
    transform: scale(1.08);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.enter-bloom {
  animation: scaleBoom var(--anim-normal) var(--ease-spring-soft) both;
}
```


---

## 4. Exit Animations

### 4.1 Fade Out (Default)

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}

.exit-fade {
  animation: fadeOut var(--anim-fast) var(--ease-exit) both;
}
```

### 4.2 Sink Out (Cards leaving, list item removal)

```css
@keyframes sinkOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
}

.exit-sink {
  animation: sinkOut var(--anim-fast) var(--ease-exit-sharp) both;
}
```

### 4.3 Dissolve (Data being deleted, memory fading)

```css
@keyframes dissolve {
  0% {
    opacity: 1;
    filter: blur(0px) brightness(1);
  }
  50% {
    opacity: 0.6;
    filter: blur(2px) brightness(1.3);
  }
  100% {
    opacity: 0;
    filter: blur(8px) brightness(0.5);
  }
}

.exit-dissolve {
  animation: dissolve var(--anim-smooth) var(--ease-exit) both;
}
```

### 4.4 Glitch Out (Error, crash, forced termination)

```css
@keyframes glitchOut {
  0% {
    opacity: 1;
    transform: translate(0) skewX(0);
    filter: none;
  }
  25% {
    opacity: 1;
    transform: translate(6px, -2px) skewX(4deg);
    filter: hue-rotate(180deg) saturate(4);
  }
  50% {
    opacity: 0.7;
    transform: translate(-8px, 3px) skewX(-6deg);
    filter: hue-rotate(-90deg) brightness(2);
  }
  75% {
    opacity: 0.3;
    transform: translate(3px, -4px) skewX(2deg);
    filter: saturate(0);
  }
  100% {
    opacity: 0;
    transform: translate(-2px, 8px) skewX(0deg);
    filter: blur(4px);
  }
}

.exit-glitch {
  animation: glitchOut var(--anim-slow) steps(1) both;
}
```

---

## 5. Page & Route Transitions

### 5.1 Cross-Fade (Default Route Change)

```css
/* Outgoing page */
.page-exit {
  animation: fadeOut var(--anim-fast) var(--ease-exit) both;
}

/* Incoming page */
.page-enter {
  animation: riseIn var(--anim-normal) var(--ease-out-expo) both;
  animation-delay: 100ms; /* Overlap with exit */
}
```

### 5.2 Slide Transition (Tab/Section Switch)

```css
@keyframes slideOutLeft {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(-40px); opacity: 0; }
}

@keyframes slideInRight {
  from { transform: translateX(40px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

/* Forward navigation */
.page-exit-forward  { animation: slideOutLeft var(--anim-fast) var(--ease-exit) both; }
.page-enter-forward { animation: slideInRight var(--anim-normal) var(--ease-out-expo) both; }

/* Backward navigation — reversed */
@keyframes slideOutRight {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(40px); opacity: 0; }
}

@keyframes slideInLeft {
  from { transform: translateX(-40px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

.page-exit-back  { animation: slideOutRight var(--anim-fast) var(--ease-exit) both; }
.page-enter-back { animation: slideInLeft var(--anim-normal) var(--ease-out-expo) both; }
```

### 5.3 Morph Transition (Character/Section Switch)

When switching between character contexts, the accent color morphs and content cross-fades. The whole interface "recolors" itself.

```css
/* Smooth accent color transition on context switch */
.app-shell {
  transition: 
    --accent var(--anim-smooth) var(--ease-breathe),
    --accent-rgb var(--anim-smooth) var(--ease-breathe);
}

/* Enable CSS custom property transitions via @property */
@property --accent {
  syntax: '<color>';
  inherits: true;
  initial-value: #00E5C8;
}

/* Content swap during morph */
.section-content {
  transition: opacity var(--anim-fast) var(--ease-exit);
}

.section-content.switching {
  opacity: 0;
}
```

### 5.4 Panel Slide (Aside, Drawers, Sheets)

```css
/* Desktop aside panel */
.aside-enter {
  animation: slideInFromRight var(--anim-normal) var(--ease-out-expo) both;
}

@keyframes slideInFromRight {
  from { transform: translateX(100%); opacity: 0.8; }
  to   { transform: translateX(0); opacity: 1; }
}

/* Mobile bottom sheet */
@keyframes sheetUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.sheet-enter {
  animation: sheetUp var(--anim-normal) var(--ease-out-expo) both;
}

/* Backdrop fade */
.backdrop-enter {
  animation: fadeIn var(--anim-fast) var(--ease-enter) both;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}
```


---

## 6. Micro-Interactions & Feedback

### 6.1 Button Press (Tap Feedback)

```css
.btn {
  transition: transform var(--anim-swift) var(--ease-out-expo),
              box-shadow var(--anim-fast) var(--ease-out-expo);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 16px rgba(var(--accent-rgb), 0.3);
}

.btn:active {
  transform: translateY(1px) scale(0.97);
  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.5);
  transition-duration: var(--anim-instant);
}
```

### 6.2 Ripple Effect (Touch/Click Expansion)

```css
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.3);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  top: var(--ripple-y, 50%);
  left: var(--ripple-x, 50%);
  transform: scale(0);
  opacity: 1;
  pointer-events: none;
}

.ripple.active::after {
  animation: rippleExpand var(--anim-smooth) var(--ease-out-expo) forwards;
}

@keyframes rippleExpand {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

### 6.3 Toggle / Switch

```css
.toggle__track {
  transition: background-color var(--anim-fast) var(--ease-out-expo);
}

.toggle__thumb {
  transition: transform var(--anim-fast) var(--ease-spring-soft);
}

.toggle.active .toggle__thumb {
  transform: translateX(20px);
}

/* Glow burst on toggle */
.toggle.active .toggle__track::after {
  animation: glowBurst var(--anim-normal) var(--ease-out-expo) both;
}

@keyframes glowBurst {
  0%   { box-shadow: 0 0 0px rgba(var(--accent-rgb), 0.8); }
  100% { box-shadow: 0 0 20px rgba(var(--accent-rgb), 0); }
}
```

### 6.4 Input Focus

```css
.input {
  border-bottom: 2px solid var(--bg-border);
  transition: border-color var(--anim-fast) var(--ease-out-expo);
}

.input:focus {
  border-color: var(--accent);
}

/* Underline expand from center */
.input-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width var(--anim-normal) var(--ease-out-expo),
              left var(--anim-normal) var(--ease-out-expo);
  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.4);
}

.input-wrapper:focus-within::after {
  width: 100%;
  left: 0;
}
```

### 6.5 Card Hover (Desktop)

```css
.card {
  transition: transform var(--anim-fast) var(--ease-out-expo),
              border-color var(--anim-fast) var(--ease-out-expo),
              box-shadow var(--anim-normal) var(--ease-out-expo);
}

.card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--accent-rgb), 0.2);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(var(--accent-rgb), 0.1);
}

/* Accent line animates on hover */
.card::before {
  transition: width var(--anim-normal) var(--ease-out-expo);
  width: 40%;
}

.card:hover::before {
  width: 100%;
}
```

### 6.6 List Item Interactions

```css
/* Swipe-to-reveal action (mobile) */
@keyframes revealAction {
  from { transform: translateX(0); }
  to   { transform: translateX(-80px); }
}

/* Reorder drag */
.list-item.dragging {
  transform: scale(1.02);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
              0 0 1px rgba(var(--accent-rgb), 0.3);
  z-index: 100;
  transition: transform var(--anim-swift) var(--ease-out-expo),
              box-shadow var(--anim-swift) var(--ease-out-expo);
}

/* Checkbox/completion tick */
@keyframes checkmark {
  0%   { stroke-dashoffset: 24; }
  100% { stroke-dashoffset: 0; }
}

.checkbox.checked svg path {
  animation: checkmark var(--anim-normal) var(--ease-out-expo) both;
  stroke-dasharray: 24;
}
```

### 6.7 Progress & Loading Feedback

```css
/* XP bar fill with glow pulse at end */
.xp-fill {
  transition: width var(--anim-slow) var(--ease-out-expo);
}

.xp-fill.leveling::after {
  animation: xpPulse var(--beat) var(--ease-breathe) 3;
}

@keyframes xpPulse {
  0%, 100% { box-shadow: 0 0 4px rgba(var(--accent-rgb), 0.3); }
  50%      { box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.8); }
}

/* Skeleton loading shimmer */
@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position: 200% center; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-surface) 25%,
    var(--bg-elevated) 50%,
    var(--bg-surface) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s var(--ease-linear) infinite;
}
```


---

## 7. Ambient & Atmosphere Animations

The "liveliness" layer — these run continuously to make the interface feel alive even when idle. In Cytus II, the background always pulses, particles drift, and the scan line crawls. These are the digital heartbeat.

### 7.1 Breathing Pulse (Accent Elements)

Active indicators, selected nav items, and live elements gently pulse to indicate aliveness.

```css
@keyframes breathe {
  0%, 100% {
    opacity: 0.7;
    box-shadow: 0 0 4px rgba(var(--accent-rgb), 0.2);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.5);
  }
}

.alive {
  animation: breathe var(--pulse-rate) var(--ease-breathe) infinite;
}

/* Subtle text breathing for live status */
@keyframes textBreathe {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}

.status-live {
  animation: textBreathe var(--bar) var(--ease-breathe) infinite;
}
```

### 7.2 Floating Particles

Small luminous dots drift across the background — data fragments in the void.

```css
@keyframes particleDrift {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translate(var(--drift-x, 100px), var(--drift-y, -200px)) scale(0.5);
    opacity: 0;
  }
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--accent);
  animation: particleDrift var(--particle-duration, 8s) var(--ease-linear) infinite;
  animation-delay: var(--particle-delay, 0s);
}

/* Generate variety via custom properties */
.particle:nth-child(1)  { --drift-x: 80px;  --drift-y: -180px; --particle-duration: 7s;  --particle-delay: 0s; }
.particle:nth-child(2)  { --drift-x: -60px; --drift-y: -220px; --particle-duration: 9s;  --particle-delay: 1s; }
.particle:nth-child(3)  { --drift-x: 120px; --drift-y: -150px; --particle-duration: 6s;  --particle-delay: 2.5s; }
.particle:nth-child(4)  { --drift-x: -90px; --drift-y: -250px; --particle-duration: 11s; --particle-delay: 0.5s; }
.particle:nth-child(5)  { --drift-x: 40px;  --drift-y: -300px; --particle-duration: 10s; --particle-delay: 3s; }
```

### 7.3 Scan Line Crawl

The signature Cytus scan line — a horizontal band that perpetually sweeps the viewport.

```css
@keyframes scanLineSweep {
  0%   { top: -2px; }
  100% { top: 100%; }
}

.scan-line {
  position: fixed;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(var(--accent-rgb), 0.15) 20%,
    rgba(var(--accent-rgb), 0.4) 50%,
    rgba(var(--accent-rgb), 0.15) 80%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 9999;
  animation: scanLineSweep 6s var(--ease-linear) infinite;
}

/* Subtle glow trailing the line */
.scan-line::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(var(--accent-rgb), 0.05) 0%,
    transparent 100%
  );
}
```

### 7.4 Background Grid Pulse

A subtle geometric grid that fades in/out in sections — suggesting an underlying data matrix.

```css
@keyframes gridPulse {
  0%, 100% { opacity: 0.02; }
  50%      { opacity: 0.06; }
}

.bg-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background-image:
    linear-gradient(rgba(var(--accent-rgb), 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--accent-rgb), 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridPulse var(--bar) var(--ease-breathe) infinite;
}
```

### 7.5 Noise Grain

Animated film grain that adds texture to the void.

```css
@keyframes grainShift {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -1%); }
  20% { transform: translate(1%, 0%); }
  30% { transform: translate(0%, 1%); }
  40% { transform: translate(-1%, 1%); }
  50% { transform: translate(1%, -1%); }
  60% { transform: translate(-1%, 0%); }
  70% { transform: translate(0%, -1%); }
  80% { transform: translate(1%, 1%); }
  90% { transform: translate(-1%, -1%); }
}

.noise-overlay {
  position: fixed;
  inset: -10%; /* Oversized to avoid edge gaps during transform */
  pointer-events: none;
  z-index: 9998;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,..."); /* Use generated noise texture */
  animation: grainShift 0.5s steps(4) infinite;
}
```

### 7.6 Cursor Trail (Desktop, Optional)

A subtle glow trail that follows the cursor — like data particles responding to presence.

```js
// Lightweight cursor trail — use sparingly
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 600);
});
```

```css
.cursor-trail {
  position: fixed;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  z-index: 10000;
  animation: trailFade 600ms var(--ease-exit) forwards;
}

@keyframes trailFade {
  from {
    opacity: 0.5;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.2);
  }
}
```


---

## 8. Signature Effects

These are the "personality" effects that distinguish a Cytus II-inspired interface from generic dark UI. Use sparingly for maximum impact.

### 8.1 Chromatic Aberration

RGB channel splitting on images and focused elements.

```css
@keyframes chromaticShift {
  0%, 100% {
    text-shadow:
      1px 0 rgba(255, 0, 0, 0),
      -1px 0 rgba(0, 0, 255, 0);
  }
  50% {
    text-shadow:
      2px 0 rgba(255, 0, 0, 0.3),
      -2px 0 rgba(0, 0, 255, 0.3);
  }
}

/* Static chromatic on hover */
.chromatic:hover {
  text-shadow:
    1px 0 rgba(255, 0, 0, 0.4),
    -1px 0 rgba(0, 100, 255, 0.4);
}

/* Animated chromatic for emphasis */
.chromatic-pulse {
  animation: chromaticShift var(--bar) var(--ease-breathe) infinite;
}

/* Image chromatic via pseudo-elements */
.img-chromatic {
  position: relative;
}

.img-chromatic::before,
.img-chromatic::after {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  background-size: cover;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--anim-fast);
}

.img-chromatic:hover::before {
  opacity: 0.4;
  mix-blend-mode: multiply;
  transform: translate(2px, 0);
  filter: hue-rotate(90deg);
}

.img-chromatic:hover::after {
  opacity: 0.4;
  mix-blend-mode: screen;
  transform: translate(-2px, 0);
  filter: hue-rotate(-90deg);
}
```

### 8.2 Data Corruption / Glitch Block

Sections of the interface momentarily corrupt — used for transitions, error emphasis, or atmospheric flavor.

```css
@keyframes corrupt {
  0%, 95%, 100% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  96% {
    clip-path: inset(10% 0 80% 0);
    transform: translate(-4px, 0);
  }
  97% {
    clip-path: inset(50% 0 20% 0);
    transform: translate(6px, 0);
  }
  98% {
    clip-path: inset(30% 0 60% 0);
    transform: translate(-2px, 0);
  }
  99% {
    clip-path: inset(70% 0 10% 0);
    transform: translate(3px, 0);
  }
}

.corrupt-flash {
  animation: corrupt 4s steps(1) infinite;
}

/* Trigger on hover for interactive elements */
.corrupt-on-hover:hover {
  animation: corrupt 0.5s steps(1) forwards;
}
```

### 8.3 VHS Tracking Lines

Horizontal interference bands that drift through content.

```css
@keyframes trackingDrift {
  0%   { top: -10%; }
  100% { top: 110%; }
}

.tracking-lines::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(var(--accent-rgb), 0.08);
  box-shadow: 0 10px 0 rgba(var(--accent-rgb), 0.04),
              0 20px 0 rgba(var(--accent-rgb), 0.02);
  pointer-events: none;
  animation: trackingDrift 10s var(--ease-linear) infinite;
}
```

### 8.4 Screen Flicker (Narrative Moments)

Brief, full-screen flickers for dramatic transitions — like the game's story reveals.

```css
@keyframes screenFlicker {
  0%   { opacity: 1; }
  3%   { opacity: 0.4; }
  6%   { opacity: 1; }
  8%   { opacity: 0.7; }
  10%  { opacity: 1; }
  100% { opacity: 1; }
}

.flicker {
  animation: screenFlicker 0.3s steps(1) forwards;
}

/* Trigger via JS for story beats */
.narrative-reveal {
  animation: screenFlicker 0.4s steps(1) forwards,
             fadeIn var(--anim-smooth) var(--ease-enter) 0.4s both;
}
```

### 8.5 Holographic Shimmer

A rainbow-refraction effect for premium/special elements.

```css
@keyframes holoShimmer {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.holo {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 128, 0.1),
    rgba(0, 255, 200, 0.1),
    rgba(100, 100, 255, 0.1),
    rgba(255, 200, 0, 0.1),
    rgba(255, 0, 128, 0.1)
  );
  background-size: 300% 300%;
  animation: holoShimmer 6s var(--ease-breathe) infinite;
}
```

### 8.6 Text Decode / Scramble

Text appears to be decoded from random characters — like accessing encrypted data.

```js
// Text decode effect
function decodeText(element, finalText, duration = 1000) {
  const chars = '01アイウエオ!@#$%&*<>[]{}';
  const steps = 12;
  const interval = duration / steps;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    let displayed = '';

    for (let i = 0; i < finalText.length; i++) {
      if (i < finalText.length * progress) {
        displayed += finalText[i];
      } else {
        displayed += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = displayed;

    if (step >= steps) {
      clearInterval(timer);
      element.textContent = finalText;
    }
  }, interval);
}
```

```css
/* CSS companion — monospace during decode */
.decoding {
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  color: var(--accent);
}
```


---

## 9. Scroll-Driven Animations

### 9.1 Scroll-Triggered Entrances

Elements animate in as they enter the viewport — the feed feels like it's being "loaded" in real time.

```css
/* Using Intersection Observer API pattern */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--anim-normal) var(--ease-out-expo),
              transform var(--anim-normal) var(--ease-out-expo);
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger via CSS variable set by JS */
.scroll-reveal.visible {
  transition-delay: calc(var(--stagger-index, 0) * 80ms);
}
```

```js
// Intersection Observer setup
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--stagger-index', index);
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
```

### 9.2 Parallax Layers (Scroll-Linked)

```css
/* CSS-only scroll-driven animation (modern browsers) */
@supports (animation-timeline: scroll()) {
  .parallax-bg {
    animation: parallaxShift linear;
    animation-timeline: scroll();
  }

  @keyframes parallaxShift {
    from { transform: translateY(0); }
    to   { transform: translateY(-100px); }
  }
}

/* Fallback: CSS transform with scroll position via JS */
.parallax-layer {
  will-change: transform;
  transition: transform 0ms linear;
}
```

### 9.3 Progress Scroll Indicator

A thin accent line at the top of the viewport that fills as you scroll — the scan line's journey through the page.

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.5);
  z-index: 10000;
  transform-origin: left;
  animation: scrollProgress linear;
  animation-timeline: scroll();
}

@keyframes scrollProgress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### 9.4 Sticky Header Transform

The system bar subtly transforms on scroll — condensing, gaining a border, and adding blur.

```css
.system-bar {
  transition: background var(--anim-fast),
              border-color var(--anim-fast),
              backdrop-filter var(--anim-fast);
}

.system-bar.scrolled {
  background: rgba(10, 10, 15, 0.85);
  border-bottom: 1px solid var(--bg-border);
  backdrop-filter: blur(12px) saturate(1.2);
}
```

---

## 10. State Animations

### 10.1 Loading States

```css
/* Spinner — rotating accent ring */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--bg-border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 800ms var(--ease-linear) infinite;
}

/* Dot pulse loader — three dots pulsing in sequence */
@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.dot-loader span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  margin: 0 4px;
  animation: dotPulse 1.4s var(--ease-breathe) infinite;
}

.dot-loader span:nth-child(2) { animation-delay: 0.16s; }
.dot-loader span:nth-child(3) { animation-delay: 0.32s; }
```

### 10.2 Success State

```css
@keyframes successFlash {
  0% {
    box-shadow: 0 0 0px rgba(0, 229, 200, 0);
    border-color: var(--bg-border);
  }
  30% {
    box-shadow: 0 0 24px rgba(0, 229, 200, 0.6);
    border-color: var(--accent);
  }
  100% {
    box-shadow: 0 0 0px rgba(0, 229, 200, 0);
    border-color: var(--accent);
  }
}

.state-success {
  animation: successFlash var(--anim-slow) var(--ease-out-expo) both;
}

/* Level-up / unlock celebration */
@keyframes unlockBurst {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0px rgba(var(--accent-rgb), 0.5);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 0 12px rgba(var(--accent-rgb), 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0px rgba(var(--accent-rgb), 0);
  }
}

.unlock {
  animation: unlockBurst var(--anim-dramatic) var(--ease-out-expo);
}
```

### 10.3 Error / Danger State

```css
@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  10%      { transform: translateX(-4px); }
  30%      { transform: translateX(4px); }
  50%      { transform: translateX(-3px); }
  70%      { transform: translateX(3px); }
  90%      { transform: translateX(-1px); }
}

.state-error {
  animation: errorShake 0.4s var(--ease-out-expo);
  border-color: var(--color-danger, #E53935) !important;
}

/* Critical error — full glitch */
.state-critical {
  animation: glitchIn 0.3s steps(1) forwards,
             errorShake 0.5s var(--ease-out-expo) 0.3s;
}
```

### 10.4 Empty / Void State

```css
@keyframes voidFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

.state-empty-icon {
  opacity: 0.3;
  animation: voidFloat 4s var(--ease-breathe) infinite;
}

.state-empty-text {
  animation: textBreathe 3s var(--ease-breathe) infinite;
  color: var(--text-muted);
  font-style: italic;
}
```


---

## 11. Performance & Accessibility

### 11.1 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .scan-line,
  .particles,
  .noise-overlay,
  .bg-grid { display: none; }

  .scroll-reveal {
    opacity: 1;
    transform: none;
  }
}
```

### 11.2 Performance Budget

| Platform | Max simultaneous animations | Particles | Effects |
|----------|---------------------------|-----------|---------|
| Desktop | Unlimited | 30-50 | Full (scan, glitch, grain) |
| Tablet | 8-10 | 15-20 | Reduced (scan only) |
| Mobile | 4-6 | 10-15 | Minimal (no overlays) |

### 11.3 GPU Optimization Rules

- Only animate `transform` and `opacity` for composited performance
- Use `will-change` on elements about to animate, remove after
- Avoid animating `box-shadow` on mobile — use pseudo-element with opacity instead
- Keep particle DOM count under 50; use Canvas for more
- Debounce scroll-linked animations to `requestAnimationFrame`

---

## 12. Quick Implementation Guide

### Minimal Setup (Copy-Paste Ready)

Add these three ambient layers to any page for instant Cytus II atmosphere:

1. **Scan line** — `<div class="scan-line"></div>`
2. **Scroll reveals** — add `.scroll-reveal` to content blocks
3. **Breathing pulse** — add `.alive` to active nav indicators

### Animation Class Reference

| Class | Effect | Duration |
|-------|--------|----------|
| `.enter-fade` | Simple fade in | 350ms |
| `.enter-rise` | Rise from below + fade | 350ms |
| `.enter-scan` | Horizontal reveal wipe | 500ms |
| `.enter-glitch` | Digital distortion in | 700ms |
| `.enter-bloom` | Scale pop with overshoot | 350ms |
| `.exit-fade` | Fade out | 200ms |
| `.exit-sink` | Sink down + shrink | 200ms |
| `.exit-dissolve` | Blur + fade | 500ms |
| `.exit-glitch` | Corruption out | 700ms |
| `.alive` | Breathing glow pulse | 2s loop |
| `.chromatic-pulse` | RGB shift loop | 2s loop |
| `.corrupt-flash` | Periodic glitch | 4s loop |
| `.scroll-reveal` | Appear on scroll | 350ms |
| `.glitch-hover:hover` | Glitch on hover | 300ms |

---

*Animation system inspired by Cytus II (Rayark Games, 2018). Designed for fluid, rhythmic, emotionally resonant interfaces.*
