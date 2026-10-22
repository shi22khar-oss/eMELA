# eMELA 🎡

## [Visit the live website → https://shi22khar-oss.github.io/eMELA/](https://shi22khar-oss.github.io/eMELA/)

**A little colour. A little chaos. A whole lot of happy.**

eMELA is an immersive, mobile-first digital fair experience. Explore illustrated fairgrounds, discover food and craft, browse the stage line-up, build a personal itinerary, and create a downloadable digital pass—all from one fast, accessible website.

---

## Experience highlights

- **Interactive fair map** with five explorable zones and useful details for each stop.
- **Personal mela planner** for saving attractions and performances, with a downloadable itinerary.
- **Personalized digital passes** generated and downloaded locally as SVG artwork.
- **Filterable stage line-up** for music, dance, and family events.
- **Responsive original artwork** served as appropriately sized WebP images.
- **Thoughtful motion** with full `prefers-reduced-motion` support.
- **Local-first privacy** with no accounts, tracking, backend, or personal data transmission.

## Technology

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and optimized production builds
- Variable, self-hosted DM Sans and Bricolage Grotesque fonts
- Lucide icons and hand-built responsive CSS
- Vitest + Testing Library for interaction tests
- ESLint for static analysis
- GitHub Actions for CI and GitHub Pages deployment

## Run locally

### Prerequisites

- Node.js **20.19+** (Node.js 22 LTS recommended)
- npm 10+

### Start the development server

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. The server listens on `0.0.0.0`, so it also works with device and container previews.

### Production build

```bash
npm run build
npm run preview
```

The optimized site is generated in `dist/`. Relative asset paths make the same build portable across root domains and repository subpaths.

## Quality checks

```bash
npm run check
```

This runs, in order:

1. `npm run lint` — TypeScript-aware ESLint checks
2. `npm run test` — interaction and download-generation tests
3. `npm run build` — strict TypeScript and production build validation

The interface is also designed for keyboard navigation, visible focus, semantic landmarks, accessible dialogs, reduced motion, and layouts from 320px phones to wide desktops.

## Project structure

```text
.
├── .github/workflows/    # CI and GitHub Pages automation
├── public/               # Optimized artwork, icons, manifest, robots.txt
├── src/
│   ├── components/       # Focused UI and feature components
│   ├── hooks/            # Resilient local-storage state
│   ├── styles/           # Responsive design rules
│   ├── test/             # Shared test setup
│   ├── utils/            # Safe client-side download helpers
│   ├── App.tsx           # Page composition and shared experience state
│   ├── data.ts           # Editable fair content
│   └── types.ts          # Shared domain types
├── index.html            # Metadata and application entry
└── vite.config.ts        # Build, preview, and test configuration
```

## Update the fair content

Attractions, experiences, and stage events live in **`src/data.ts`**. Shared TypeScript types in `src/types.ts` keep content consistent. The UI derives its filters, map markers, planner entries, and counts from this data rather than duplicating content across components.

## Deployment

**[Open the published eMELA website →](https://shi22khar-oss.github.io/eMELA/)**

GitHub Pages is enabled with **GitHub Actions** as its publishing source. Every push to `main` runs **`.github/workflows/deploy.yml`**, which validates the application and publishes the optimized `dist/` build.

To deploy manually, open **Actions → Deploy website → Run workflow** and select the `main` branch. Pull requests and default-branch pushes also run the automated quality workflow in **`.github/workflows/ci.yml`**.

## Privacy and data

eMELA has no server-side data collection. A visitor's plan and pass are stored only in their browser using `localStorage`; clearing browser storage removes them. Downloads are generated entirely on the device. If storage is unavailable, the core experience still works for the current session.

---

Made with React, TypeScript, and a sincere love for the mela. ✦
