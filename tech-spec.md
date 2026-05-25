# Tech Spec — Happy Birthday, My Love

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | React DOM renderer |
| gsap | ^3.12 | Core animation engine, timelines, ScrollTrigger |
| canvas-confetti | ^1.9 | Gift box confetti + reason card micro-bursts |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| typescript | ^5.7 | Type safety |
| vite | ^6.0 | Build tool |
| @types/react | ^19.0 | React type definitions |
| @types/react-dom | ^19.0 | React DOM type definitions |

> **No Three.js / R3F** — The design's visual effects (heart particles, confetti) are 2D. Raw Canvas 2D is sufficient and avoids the `free-gl` system dependency issue. No 3D scenes, no WebGL.

> **No Lenis** — The design does not specify smooth-scroll hijacking. Native `scroll-behavior: smooth` on `window.scrollTo` is sufficient for anchor navigation and back-to-top.

---

## Component Inventory

### Layout (shared across page)

| Component | Source | Notes |
|---|---|---|
| `Navigation` | Custom | Fixed top bar, scroll-triggered glass transition. Desktop: inline links. Mobile: hamburger dropdown. |
| `Footer` | Custom | Single line + pulsing heart. Trivial, custom. |

### Sections (page-specific, each handles its own entrance animations)

| Component | Key Interactions |
|---|---|
| `HeroSection` | GSAP load timeline, CSS shimmer on title, canvas shooting stars |
| `LoveLetterSection` | GSAP ScrollTrigger unfold (scale + fade), staggered text reveals, wax seal bounce |
| `MemoriesSection` | Scroll-scrubbed timeline line (`scaleY`), alternating card slide-ins, dot spring entrances |
| `ReasonsSection` | 10× flip cards with `preserve-3d`, confetti burst on flip via canvas-confetti, flip counter |
| `LoveQuizSection` | 4-question state machine, question slide transitions, answer shake/glow feedback, score counter, confetti on result |
| `GiftBoxSection` | CSS 3D gift box, multi-step open timeline (shake → lid pop → confetti → heart floats → message reveal) |
| `FinalWishSection` | Staggered fade-ins, back-to-top button |

### Reusable Components

| Component | Source | Used By |
|---|---|---|
| `HeartCanvas` | Custom | Global background — see Animation table below. Mounts once in App.tsx, `position: fixed`. |
| `CustomCursor` | Custom | Global — desktop only, disabled on touch. |
| `ScrollReveal` | Custom wrapper | All sections — wraps elements that need `translateY(40px) + opacity` entrance via GSAP ScrollTrigger. Accepts stagger delay as prop. |
| `GlassCard` | Custom | Love Letter, Quiz, Gift message — glass-morphism style container. |

### Hooks

| Hook | Purpose |
|---|---|
| `useScrollReveal` | Initializes GSAP ScrollTrigger on a ref. Single hook reusable by all sections via the `ScrollReveal` wrapper component. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|---|---|---|---|
| **Heart canvas particles** | 🔒 Raw Canvas 2D | Custom particle class, `bezierCurveTo` heart drawing, `requestAnimationFrame` loop. 120 desktop / 50 mobile particles. DPR-aware canvas sizing. | **High** |
| **Shooting stars** | 🔒 Raw Canvas 2D | Same canvas as heart particles. Random-interval streaks with gradient trails. Part of the `HeartCanvas` component. | **Medium** |
| **Scroll reveal (global pattern)** | GSAP ScrollTrigger | `ScrollReveal` wrapper: `from(y:40, opacity:0)` with stagger. `batch()` for groups. | **Low** |
| **Page load sequence** | GSAP timeline | Single `gsap.timeline()` coordinating 6 steps: overlay fade, canvas start, title/subtitle/CTA staggered reveals, nav slide-down. | **Medium** |
| **Title shimmer** | CSS keyframes | `background-clip: text` gradient sweep. Pure CSS, no JS. | **Low** |
| **Love letter unfold** | GSAP ScrollTrigger | Card `scale(0.92→1) + opacity` on scroll. Wax seal `bounce.out`. Text paragraphs staggered `0.2s`. | **Medium** |
| **Memory timeline line draw** | GSAP ScrollTrigger | `scaleY: 0→1` scrubbed to section scroll progress, `transform-origin: top`. | **Low** |
| **Memory card entrances** | GSAP ScrollTrigger | Left cards `translateX(-40px)`, right cards `translateX(40px)`, mobile `translateY(30px)`. Individual triggers. | **Low** |
| **Reason card flip** | CSS 3D transforms | `preserve-3d`, `rotateY(180deg)`, `backface-visibility: hidden`. JS toggles `.flipped` class. | **Medium** |
| **Flip confetti burst** | canvas-confetti | `particleCount: 12`, pink palette, fired from card center coordinates on flip. | **Low** |
| **Quiz question transitions** | GSAP | Outgoing slides `translateX(-30px), opacity:0`, incoming from `translateX(30px)→0`. `power2.inOut`. | **Medium** |
| **Quiz answer shake** | GSAP | Wrong answer: rapid `x: -5→5→-5→5→0` over `0.4s`. Correct: green glow pulse. | **Low** |
| **Gift box open sequence** | GSAP timeline | 6-step coordinated timeline: shake → lid pop (`translateY + rotateX + opacity`) → confetti burst → floating heart divs → box scale-down → message fade-in. | **High** |
| **Gift box idle shake** | CSS keyframes | `rotate(-3deg↔3deg)` loop every 3s. Stops when opened. | **Low** |
| **Floating hearts (gift open)** | CSS keyframes | 20 small `div` hearts with random `translateX` sway, `opacity` fade, `2s` duration. Generated on click. | **Low** |
| **Custom cursor** | `requestAnimationFrame` | Lerp position tracking (factor 0.12) via rAF. Scale/fill change on `mouseenter/mouseleave` of interactive elements. | **Medium** |
| **Scroll indicator bounce** | CSS keyframes | `translateY(0→10→0)`, `2s infinite`. | **Low** |
| **Nav glass transition** | Scroll listener | Toggle CSS class at 100px scroll. `backdrop-filter + background` transition. | **Low** |

---

## State & Logic

### Quiz State Machine

4 questions with 4-step progression. State shape:

```
{ currentQuestion: 0..3, selectedAnswer: null|'A'|'B'|'C'|'D', answers: (boolean|null)[], showResult: boolean }
```

Transitions: `idle → answered (show feedback) → next → idle` (repeat ×4) → `result`. Score derived from `answers` array. Result screen with confetti fire-once guard.

### Gift Box Open Guard

One-shot interaction. Track `isOpened` boolean. Once true: disable click, stop idle shake animation, lock open timeline from re-triggering.

### Flip Card Tracker

Track flipped states per card (boolean array, length 10). Track global reveal count for "X of 10 revealed" counter.

### Scroll-Triggered One-Shot Plays

Several animations (love letter unfold, memory line draw, gift box entrance) fire once and do not reverse. Use ScrollTrigger `toggleActions: 'play none none none'` (default play-on-enter, no reset).

---

## Other Key Decisions

### Raw Canvas 2D over PixiJS

The design explicitly specifies Canvas 2D `bezierCurveTo` heart drawing with a simple particle loop. PixiJS/WebGL would add unnecessary dependency weight and hit the `free-gl` system constraint. The particle count (120 max) is trivial for Canvas 2D.

### HeartCanvas as Global Background

The canvas is `position: fixed; z-index: 0; pointer-events: none`. It renders once at App level and persists behind all sections. Shooting stars are part of this same canvas — no separate layer needed.

### Gift Box: CSS 3D vs Canvas

The gift box is CSS-constructed (divs + gradients + `border-radius`) with CSS 3D transforms for the lid pop. No WebGL/Three.js needed. The confetti on open uses canvas-confetti (separate temporary canvas overlay), not the persistent heart canvas.

### Loading Overlay

A simple full-screen div with CSS-animated pulsing heart, dismissed via the GSAP load timeline. Not a separate component — inline in App.tsx or HeroSection.
