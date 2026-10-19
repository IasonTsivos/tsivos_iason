# Redesign progress

Working branch: `redesign/3d-badge`. Vercel-style dark voice: mono labels, `SectionHeading`
titles, muted text, purple accent (`--accent`), thin 1px lines, GSAP scroll motion.
Design tokens live in `src/index.css`.

## Done

### Hero (`src/components/Hero.jsx`)
3D lanyard badge (`Badge/`), FoldText headline, rotating "building …" text, CountUp stats.

### Education (`src/components/EducationSection.jsx`)
Scroll-driven timeline: purple progress line, entries light up as the line reaches them,
particle field behind.

### Projects (`src/components/ProjectsSection.jsx`)
- **Mockups** (`src/components/mockups/`)
  - `MacWindow`: websites (Greek Analytics, Jason's Vision). Rounded, fades out at the bottom, screenshot pans on hover.
  - `IPhone`: iPhone 14 Pro from the `devices.css` library, scaled with `--phone-scale` (CakeTime ×4, Pokedex ×3). Sideways snap strip on mobile.
  - `VisionPro`: SVG Vision Pro headset for the VR Museum (`vr.png`).
  - `ThesisCover`: hardbound thesis with page edges and a Fig. 1 print. The text side has the system pipeline (sensor → dashboard), record details and Greek/English/DOI links.
  - `LinkIcon`: GitHub / web / doc icons for the CTA buttons.
- **Motion**: rows reveal with GSAP `scrub: 1`. Colour and the window's traffic lights switch on at `top 65%`.
- **Cursor**: React Bits `TargetCursor`, limited to the section (`container={ref}`). Mark elements with `cursor-target` and `data-cursor-label`.
- **Background**: `DotOcean` (`src/components/backgrounds/DotOcean/`), our own three.js point-cloud ocean.
  - Gerstner waves, distance-faded foam lines, fog, pointer swell, click ripples.
  - Pinned to the viewport for the whole section (sticky `.proj-ocean` inside `.proj-ocean-track`).
  - Same props as React Bits Pro "Contour Tide".

### Site-wide
- `src/utils/scroll.js`: Lenis smooth scroll; a refresh always starts at the top.
- `body { overflow-x: clip }` so full-bleed `100vw` backgrounds don't cause sideways scroll. Keep it `clip`, not `hidden`, or the sticky ocean breaks.

## Notes
- Project images live in `src/assets/projects/`. Use lowercase extensions (`.jpg`), because Vite doesn't treat `.JPG` as an image.
- New component folders opt out of `react/prop-types` in `eslint.config.js`, the same as `reactbits/`.
- `devices.css` is a pure-CSS dependency. Only the iPhone uses it.

## Next up
- Work and Skills sections still use the old `bold-h1/bold-h2` headings and cards. Bring them into the new style (`SectionHeading`, thin lines, GSAP reveals).
- Contact section is not restyled yet.
- Check the CakeTime / Pokedex descriptions and tags in `ProjectsSection.jsx` (written as placeholders).
- Optional: Back-button navigation keeps its scroll position (bfcache). Reset it too if wanted.
- `src/assets/icons/snip.JPG` is untracked and unused. Delete it or use it.
