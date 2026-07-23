---
name: Aetherium Pokedex
colors:
  surface: '#10131f'
  surface-dim: '#10131f'
  surface-bright: '#363946'
  surface-container-lowest: '#0b0e1a'
  surface-container-low: '#181b27'
  surface-container: '#1c1f2c'
  surface-container-high: '#272936'
  surface-container-highest: '#313442'
  on-surface: '#e0e1f3'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e0e1f3'
  inverse-on-surface: '#2d303d'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#dcb8ff'
  on-secondary: '#480081'
  secondary-container: '#7701d0'
  on-secondary-container: '#dcb7ff'
  tertiary: '#00e4ee'
  on-tertiary: '#003739'
  tertiary-container: '#00c6ce'
  on-tertiary-container: '#004d51'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#dcb8ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6700b5'
  tertiary-fixed: '#63f7ff'
  tertiary-fixed-dim: '#00dce5'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#004f53'
  background: '#10131f'
  on-background: '#e0e1f3'
  surface-variant: '#313442'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md-mobile:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  stat-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  stat-value:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style
The design system embodies the "Celestial Relic" aesthetic—a fusion of primordial divinity and hyper-advanced technology. It is designed for those who seek to catalog the masters of time, space, and the origin. The UI does not just present data; it reveals it through shimmering glass, sacred geometry, and cosmic depth.

**Design Style: Ethereal High-Tech**
- **Glassmorphism:** Surfaces act as crystalline viewports into the cosmos, utilizing heavy backdrop blurs and subtle prismatic refractions.
- **Divine Minimalism:** Content is spaced generously to evoke a sense of awe and reverence, utilizing thin strokes and precise alignments.
- **High-Contrast Accents:** Radiant gold and glowing cyan "circuitry" lines provide a high-tech layer over deep, ancient-feeling gradients.

## Colors
The palette is rooted in the depth of the universe, accented by the brilliance of celestial bodies.

- **Primary (Solar Gold):** Used for critical interaction points, legendary headers, and "holy" decorative elements.
- **Secondary (Nebula Purple):** Applied to active states, glow effects, and background gradients to provide depth.
- **Tertiary (Aether Cyan):** Represents the futuristic technology layer. Used for data visualizations, stats, and scanning animations.
- **Neutral (Void Navy):** The foundation of the UI. It is a near-black navy that serves as the canvas for all glass and light effects.
- **Surface (Glass):** A semi-transparent white (`rgba(255, 255, 255, 0.05)`) with a high saturation blur (32px+).

## Typography
The typography system balances the traditional authority of a serif with the clinical precision of a monospaced font.

- **Headlines:** Use high-contrast serifs to evoke the feeling of ancient scriptures or high-end luxury.
- **Body:** Use a modern, sharp grotesque for maximum readability of pokedex entries and lore.
- **Stats & Labels:** Monospaced fonts are used for all technical data, type attributes, and numerical values to emphasize the "data-analysis" aspect of the tech.

## Layout & Spacing
The layout follows a **Fluid Grid** model with high internal margins to prevent the UI from feeling cluttered.

- **Structure:** 12-column grid for desktop, 4-column for mobile.
- **Margins:** Large outer margins (min 40px on desktop) create a "window" effect, framing the content as if it's projected in space.
- **Rhythm:** Spacing is strictly based on a 4px scale, favoring large `xl` and `xxl` gaps between major sections to maintain the divine, airy atmosphere.

## Elevation & Depth
Depth is created through luminosity and opacity rather than shadows.

- **The Backdrop:** A deep navy gradient with a subtle "starfield" noise texture.
- **Layer 1 (The Relic):** Large, frosted glass containers with a 1px border gradient (Gold to Transparent).
- **Layer 2 (The Interface):** Inner cards and elements use a slightly higher opacity glass with cyan glow-borders.
- **Focus:** Active elements utilize "Inner Glow" effects (Cyan or Gold) to appear as if they are energizing.
- **Light Source:** A soft "Top-Down" divine light effect should always be present at the top of the viewport, casting subtle highlights on the edges of glass panels.

## Shapes
The shape language is "Angular-Sacred." While base containers have soft corners to feel sophisticated, the system incorporates sharp diamond motifs and hexagonal accents.

- **Base Radius:** Soft (4px) for cards and buttons to maintain a modern feel.
- **Decorative:** 45-degree clipped corners for header backgrounds and specific stat badges to reference the "Diamond & Pearl" aesthetic.
- **Borders:** Extremely thin (0.5px to 1px) to suggest precision technology.

## Components
- **Buttons:** Primary buttons are "Aether-filled" with a horizontal gradient (Cyan to Purple) and a gold 1px outline. Text is always uppercase Monospace.
- **Chips / Badges:** Used for Elemental Types. These feature a high-blur background colored according to the type, with a 1px white "inner shine" border.
- **Input Fields:** Bottom-border only (Gold or Cyan), with floating labels that use the `stat-label` typography style.
- **Cards:** The Pokedex entry card is a massive glass panel. The Pokemon image should "break" the container, overflowing the top or side to create a sense of scale.
- **Progress Bars (Stats):** Dual-layered. A dim background track with a "glowing" foreground track that has a subtle pulse animation.
- **Navigation:** A floating "Orbit" menu at the bottom center of the screen, using circular glass icons with gold iconography.