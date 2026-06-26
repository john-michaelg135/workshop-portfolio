---
inclusion: always
---

# Design System Rules — Kiroverse Developer Portfolio

> Extracted from Figma: https://www.figma.com/design/UM590vUrX7b28HrFOfDOrY/Kiroverse-Developer-Portfolio--Kael---Copy-
> Stack: Next.js 15 · React 19 · TypeScript · Tailwind CSS 4

---

## 1. Design Tokens

### 1.1 Colors

IMPORTANT: Never hardcode hex values. Always use the CSS custom properties or Tailwind theme tokens defined below.

```
/* Background */
--color-bg-primary: #0A0A0A         /* Main page background (near-black) */
--color-bg-secondary: #1A1A1A       /* Cards, form inputs */
--color-bg-tertiary: #222222        /* Icon circles, subtle surfaces */

/* Text */
--color-text-primary: #FFFFFF       /* Headings, primary body text */
--color-text-secondary: #C7C7C7    /* Paragraphs, descriptions, muted text */

/* Accent */
--color-accent: #C3B1FF            /* Buttons, links, highlights (soft purple) */

/* Border */
--color-border: #484848            /* Skill chips, dividers, list separators */

/* Semantic */
--color-text-on-accent: #0A0A0A    /* Text on accent background */
```

### 1.2 Typography

Two font families are used. IMPORTANT: Import both from Google Fonts.

| Token Name      | Family      | Weight    | Size  | Line Height | Letter Spacing | Usage                        |
|-----------------|-------------|-----------|-------|-------------|----------------|------------------------------|
| Heading/One     | Bebas Neue  | 400       | 101px | 0.9 (90%)   | 0              | Hero heading                 |
| Heading/Two     | Bebas Neue  | 400       | 76px  | 1.0 (100%)  | 0              | Section headings             |
| Heading/Three   | Manrope     | 500       | 32px  | 1.4 (140%)  | 0              | Project titles, subheadings  |
| Heading/Four    | Manrope     | 500       | 24px  | 1.3 (130%)  | -0.24px        | Experience job titles        |
| Heading/Five    | Manrope     | 600       | 16px  | 1.5 (150%)  | 0              | Small section labels (uppercase) |
| Body/Medium     | Manrope     | 400       | 18px  | 1.5 (150%)  | 0              | Body copy, descriptions      |
| Body/Small      | Manrope     | 500       | 16px  | 1.6 (160%)  | 0              | Form labels, footer text     |
| Misc/Button     | Manrope     | 700       | 16px  | 1.0 (100%)  | 0              | Button labels (UPPERCASE)    |
| Misc/Pill       | Manrope     | 700       | 16px  | 1.0 (100%)  | 0              | Skill chip labels (UPPERCASE)|
| Misc/Link       | Manrope     | 700       | 16px  | 1.5 (150%)  | 0              | Text links (UPPERCASE)       |
| Misc/Tag        | Manrope     | 500       | 14px  | 1.5 (150%)  | 0              | Project card tag badges      |
| Nav/Logo        | Bebas Neue  | 400       | 32px  | 1.5 (150%)  | -0.32px        | Logo text in navbar          |
| Nav/Link        | Inter       | 500       | 16px  | 24px        | -0.48px        | Navigation links             |

### 1.3 Spacing Scale

The design uses a base-8 spacing system with these consistent values:

```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
```

Key spacing patterns:
- Section padding (vertical): 80px
- Content gap between left/right columns: 24px
- Internal card/component gaps: 16px, 32px, 40px
- Page horizontal padding: 108px (desktop), 60px (nav)
- Project card inner gaps: 48px between image and content
- Form field gaps: 24px between fields, 8px between label and input

### 1.4 Border Radius

```
--radius-sm: 4px      /* Form inputs */
--radius-md: 12px     /* Project card container */
--radius-lg: 30px     /* Project card images */
--radius-full: 100px  /* Buttons, pills, skill chips, social icons */
```

### 1.5 Shadows & Elevation

The design uses a flat/minimal aesthetic with NO box shadows. Elevation is achieved through:
- Background color contrast (dark cards on darker background)
- Subtle borders (#484848) for separation
- No drop shadows, no blur effects

---

## 2. Reusable Component Definitions

### 2.1 Navbar

```
Structure: <header> with flex justify-between
- Left: Logo text (Bebas Neue, 32px, off-white, tracking tight)
- Right: Navigation links (Inter, 500, 16px, off-white, gap-32px)
- Height: 96px (py-24px, px-60px)
- Position: Fixed/sticky top
- Background: transparent or bg-primary
- Links: Home, Projects, About, Contact
```

### 2.2 Hero Section

```
Structure: Two-column layout
- Left column: Heading (Bebas Neue 101px) + subtext (18px) + action buttons
- Right column: Profile image (600×700, rounded-lg)
- Content max-width: 1224px (108px padding each side of 1440px canvas)
- Vertical spacing from nav: ~55px
```

### 2.3 Button (Primary CTA)

```
Variants:
  - Primary (with icon): bg-accent, rounded-full, pl-24 pr-6 py-20
    - Text: Manrope Bold 16px UPPERCASE, color text-on-accent
    - Right: circular arrow icon (42×42)
  - Primary (text only): bg-accent, rounded-full, px-40 py-20
    - Text: Manrope Bold 16px UPPERCASE, color text-on-accent
  - Social Icon: bg-tertiary, rounded-full, 54×54
    - Contains 26×26 icon centered
```

### 2.4 Project Card

```
Structure: Horizontal flex layout (gap-48)
- Left: Image card (600×600, bg-secondary, rounded-md)
  - Inner image with rounded-lg (30px)
  - Optional tag badge (top-left, bg-primary, rounded-full, px-16 py-8)
- Right: Content (flex-1)
  - Title: Heading/Three (32px, medium weight)
  - Description: Body/Medium (18px, off-white)
  - Project Info: label-value pairs with top-border dividers
  - Links: "Live Demo" + "See on Github" with underline + accent color
```

### 2.5 Skill Chip

```
Structure: Inline pill
- Border: 1px solid border-color (#484848)
- Rounded: full (100px)
- Padding: px-40 py-20
- Text: Manrope Bold 16px UPPERCASE, white
- Layout: flex-wrap container with gap-16
- No background fill (transparent)
```

### 2.6 Contact Form

```
Structure: Two-column layout
- Left: Section heading + email link + social icons + copyright
- Right: Form fields stacked vertically (gap-24)
  - Input fields: bg-secondary, rounded-sm (4px), px-16 py-12
  - Label: Body/Small (16px, medium, off-white)
  - Input text: Body/Medium (18px, white)
  - Message field: taller (multi-line, ~156px height)
  - Submit button: Primary text-only variant
```

### 2.7 Footer

```
Integrated with Contact section (not separate)
- Copyright text: Body/Small (16px, medium, off-white)
- Social icons: 32×32 with gap-24
- Positioned at bottom-left of contact section
```

---

## 3. Layout Rules

### 3.1 Page Layout

```
- Canvas width: 1440px (design reference)
- Content max-width: 1224px (centered with 108px padding on each side)
- Navigation: full-width with px-60
- Background: bg-primary (#0A0A0A) for entire page
- Sections separated by horizontal lines (1px, border-color)
```

### 3.2 Section Layout Pattern

Most content sections follow a consistent two-column pattern:
```
- Left column: Section heading (Bebas Neue, 76px) — flex: 1
- Right column: Section content — flex: 1
- Gap between columns: 24px
- Section vertical padding: 80px
```

### 3.3 Grid and Containers

```
- Use CSS Grid or Flexbox (flex preferred based on design)
- No traditional grid columns — layout is flex-based
- Content areas use flex-1 for equal distribution
- Skill chips use flex-wrap for responsive reflow
```

---

## 4. Responsive Rules

IMPORTANT: Follow mobile-first responsive design.

### Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1440px (design reference width)
```

### Responsive Behavior

```
Mobile (< 768px):
- Stack all two-column layouts vertically
- Hero: single column, image above or hidden
- Navigation: hamburger menu
- Project cards: stacked (image above content)
- Section headings: scale down (76px → 48px, 101px → 56px)
- Content padding: 24px horizontal
- Skills: wrap naturally (already flex-wrap)

Tablet (768px — 1024px):
- Maintain two-column where possible
- Reduce heading sizes by ~25%
- Content padding: 48px horizontal
- Project cards: may stack on smaller tablets

Desktop (> 1024px):
- Full two-column layouts
- All typography at full design size
- Content padding: 108px horizontal
```

---

## 5. Accessibility Rules

IMPORTANT: All components must meet WCAG 2.1 AA standards.

```
- Use semantic HTML elements: <header>, <nav>, <main>, <section>, <footer>, <article>
- All interactive elements must be keyboard accessible (focus-visible styles)
- Form inputs must have associated <label> elements
- Images must have meaningful alt text
- Social icon links must have aria-label descriptions
- Color contrast: verify #C7C7C7 on #0A0A0A meets 4.5:1 ratio (it does: ~10.4:1)
- Accent #C3B1FF on #0A0A0A meets contrast requirements (~8.7:1)
- Text on accent: #0A0A0A on #C3B1FF meets contrast (~8.7:1)
- Navigation links must use proper <a> tags or Next.js <Link>
- Skip-to-content link for keyboard users
- Focus states: visible outline using accent color
- Reduced motion: respect prefers-reduced-motion
- Form validation: provide clear error messages with aria-describedby
```

---

## 6. Implementation Rules

### 6.1 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with fonts + metadata
│   ├── page.tsx           # Home page (single-page portfolio)
│   └── globals.css        # Tailwind imports + CSS custom properties
├── components/
│   ├── ui/                # Atomic/reusable components
│   │   ├── Button.tsx
│   │   ├── SkillChip.tsx
│   │   ├── ProjectTag.tsx
│   │   ├── SocialIcon.tsx
│   │   ├── FormInput.tsx
│   │   └── FormTextarea.tsx
│   ├── sections/          # Page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── ProjectCard.tsx    # Compound component
├── lib/
│   └── data.ts            # Portfolio content data (projects, skills, etc.)
└── types/
    └── index.ts           # TypeScript interfaces
```

### 6.2 Tailwind CSS 4 Configuration

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-bg-primary: #0A0A0A;
  --color-bg-secondary: #1A1A1A;
  --color-bg-tertiary: #222222;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #C7C7C7;
  --color-accent: #C3B1FF;
  --color-border: #484848;
  --color-text-on-accent: #0A0A0A;

  /* Font families */
  --font-display: "Bebas Neue", cursive;
  --font-body: "Manrope", sans-serif;
  --font-nav: "Inter", sans-serif;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 12px;
  --radius-lg: 30px;
  --radius-full: 100px;
}
```

### 6.3 Coding Standards

```
- IMPORTANT: Use TypeScript strict mode
- IMPORTANT: All components must be typed with explicit Props interfaces
- Use Next.js App Router conventions (server components by default)
- Mark client components with "use client" only when interactivity is needed
- Use next/font for loading Bebas Neue, Manrope, and Inter fonts
- Use next/image for optimized image loading
- Use next/link for internal navigation
- Prefer composition over inheritance
- Extract repeated patterns into reusable components
- Keep components focused — one responsibility per component
- Use clsx or cn() utility for conditional class merging
```

### 6.4 Component Patterns

```tsx
// Example component structure
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "submit" | "social";
  href?: string;
  className?: string;
}

// All components accept className for composition
// Use forwardRef for interactive elements
// Props should use discriminated unions for variants
```

### 6.5 Data Management

```
- Store portfolio content in lib/data.ts as typed constants
- Project data: title, description, image, tags, year, role, links
- Skills: array of skill names
- Experience: job title, company, dates, description
- This enables easy content updates without touching component code
```

### 6.6 Performance

```
- Use Next.js Image component with proper sizing and priority for above-fold images
- Lazy load below-fold images
- Use font-display: swap for web fonts
- Minimize client-side JavaScript — server components where possible
- Use CSS transitions over JavaScript animations
```

---

## Figma MCP Integration Rules

When implementing designs from this Figma file:

1. Run `get_design_context` for the specific node
2. Run `get_screenshot` for visual reference
3. Map Figma colors to the design tokens defined above
4. Reuse components from `src/components/` — never duplicate
5. Convert all Tailwind utility classes to use theme tokens (e.g., `bg-bg-primary` not `bg-[#0A0A0A]`)
6. Validate visual parity with the Figma design

### Asset Handling

- IMPORTANT: If Figma MCP returns a localhost source for images/SVGs, use that source directly
- IMPORTANT: DO NOT install new icon packages — use inline SVGs or the assets from Figma
- Store downloaded static assets in `public/assets/`
- Use Boxicons (bxl-*) SVGs inline for social icons (LinkedIn, GitHub, Instagram)
