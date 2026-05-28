---
version: alpha
name: Local Maxima
description: "Dark public-lab interface for agentic technology: Pragmatiko manifesto energy, agent observability structure, and restrained product-quality UI."
colors:
  primary: "#B8FF5C"
  secondary: "#6EE7F9"
  tertiary: "#F5C15C"
  background: "#050505"
  backgroundRaised: "#0A0A0A"
  surface: "#101010"
  surfaceRaised: "#171717"
  surfacePeak: "#202514"
  text: "#EDEDED"
  textMuted: "#A3A3A3"
  textDim: "#787878"
  border: "#262626"
  borderSubtle: "#181818"
  accent: "#B8FF5C"
  accentCyan: "#6EE7F9"
  accentAmber: "#F5C15C"
  danger: "#FF6B6B"
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 5rem
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.075em"
  display-lg:
    fontFamily: Geist
    fontSize: 3.5rem
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.06em"
  heading-md:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  label:
    fontFamily: Geist Mono
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.11em"
  mono-sm:
    fontFamily: Geist Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.015em"
rounded:
  xs: 2px
  sm: 6px
  md: 12px
  lg: 20px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 72px
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: 14px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 24px
  input:
    backgroundColor: "{colors.backgroundRaised}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: 14px
---

## Overview

Local Maxima is the public lab for Andrea's agentic technology work: AI-native experiments, build notes, videos, signal curation, and field reports from idea to artifact.

The interface should feel like a strange command center that learned editorial restraint. It inherits Pragmatiko's black-field manifesto energy, but adds product-quality hierarchy and agent-observability structure: traces, statuses, logs, metrics, artifacts, and receipts.

Primary design sentence: **literary lab notebook meets agent observability dashboard.**

## Colors

- **Background (#050505):** near-black canvas. Use for the full page and major negative space.
- **Surface (#101010):** cards, panels, form areas, and command modules.
- **Surface raised (#171717):** elevated or selected cards; use sparingly.
- **Text (#EDEDED):** primary body and headings.
- **Muted (#8A8A8A):** explanatory copy and secondary navigation.
- **Dim (#5F5F5F):** timestamps, metadata, inactive labels.
- **Accent (#B8FF5C):** Local Maxima peak signal. Use for status dots, one active nav item, small chart marks, and high-value emphasis. Do not flood the page with green.
- **Cyan (#6EE7F9):** secondary signal color for links, trace lines, or system references.
- **Amber (#F5C15C):** warning / in-progress state.
- **Danger (#FF6B6B):** failed runs or errors only.

Color behavior: 90% monochrome, 10% signal. The accent should feel discovered, not sprayed.

## Typography

Use **Geist** for readable editorial/product UI and **Geist Mono** for labels, metadata, logs, and trace details.

- Large display type should be tight, heavy, and slightly compressed through negative tracking.
- Body copy should be readable, not terminal cosplay. Avoid monospace for long paragraphs.
- Mono labels should be all-caps only when they are short: `CURRENT EXPERIMENT`, `STATUS`, `FIELD NOTE`.
- Do not use decorative AI/futurist fonts. They look like a vape store achieved sentience.

## Layout

- Max content width: 1180px.
- Page padding: 24px mobile, 32px tablet, 48px desktop.
- Primary grid: 12 columns on desktop, single column on mobile.
- Hero should occupy the first viewport without hiding the next content entirely.
- Use asymmetric composition: large statement on the left, observability/status panel on the right.
- Every major section should have a label, headline, and one useful artifact/card. No ornamental sections.
- Mobile first: preserve hierarchy, collapse grids cleanly, keep tap targets at least 44px.

Preferred modules:

- Hero command panel.
- Current experiment card.
- Build-note cards with problem/build/lesson metadata.
- Signal feed with short commentary.
- Agent trace / receipt panel.
- Newsletter signup.

## Elevation & Depth

Avoid heavy shadows. On dark backgrounds, use:

- 1px translucent borders.
- Subtle inset highlights.
- Low-opacity radial gradients.
- Fine contour/topographic line patterns.

Depth should feel like glass over a black instrument panel, not a neon arcade.

## Shapes

- Cards: 12px radius.
- Buttons: pill radius.
- Inputs: 6px radius.
- Badges/status chips: pill radius.
- Decorative blocks may use 2px radius for terminal/log feeling.

## Components

### Buttons

Primary button: white text block on black or inverted black-on-white. On hover, shift to accent green. Use for one main CTA per section.

Secondary button: dark surface with subtle border. Use for navigation, video links, and artifacts.

### Cards

Cards are bordered panels with a mono label, concise heading, one sentence of explanation, and metadata. Avoid card grids where every card has equal fake importance.

### Status chips

Use a small colored dot plus mono text:

- `BUILDING` → accent green
- `SHIPPED` → cyan
- `WATCHING` → amber
- `FAILED` → danger

### Forms

Email form stays compact. The promise must be explicit: weekly field notes, build receipts, no AI slop.

### Trace panels

Trace panels show a sequence of steps: idea, agents, tools, artifact, lesson. They should look operational and real, not like decorative code pasted for credibility.

## Do's and Don'ts

Do:

- Use the phrase **from idea to artifact** as the site spine.
- Show receipts: builds, tools, traces, shipped artifacts, failures.
- Keep surfaces dark, precise, and structured.
- Use accent green as signal, not decoration.
- Make Andrea the clear human/person behind the lab.
- Use Local Maxima as the lab/publication umbrella.
- Preserve weirdness where it is load-bearing.

Don't:

- Do not say generic “AI expert” as the main position.
- Do not use generic robot/brain imagery.
- Do not use purple-blue AI gradient soup.
- Do not create a SaaS hero that could sell a procurement dashboard.
- Do not overuse monospace in paragraphs.
- Do not invent new colors/components unless `DESIGN.md` is updated.
- Do not carry over stale Tomas-centric framing as the core premise. Historical agents can appear as artifacts/notes, not the main brand identity.

Agent instruction: when generating or modifying Local Maxima UI, read and follow this `DESIGN.md`. Use these tokens, component rules, and do/don't constraints. Do not invent a new visual system. If a needed component is missing, extend the nearest existing component and document it here.
