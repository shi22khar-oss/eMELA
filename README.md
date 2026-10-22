# eMELA 🎡

## [Visit the live website → https://shi22khar-oss.github.io/eMELA/](https://shi22khar-oss.github.io/eMELA/)

**Don’t just browse the fair. Step inside and play.**

eMELA is an immersive, mobile-first digital mela built around things visitors can actually do: ride above the lights, play fairground games, fry a virtual treat, paint a diya, launch fireworks, and switch on an optional musical soundscape.

---

## Experience highlights

- **Animated interactive fairground** with clickable attractions, a rotating Ferris wheel, glowing stalls, and fireworks.
- **Sky-High Wheel ride** with an animated gondola journey and changing views.
- **Two playable games**—a 30-second balloon-pop challenge and six-ring ring toss with scoring and replay states.
- **Interactive jalebi counter** for choosing a finish and frying a fresh virtual batch.
- **Paint-your-own diya studio** with colours, patterns, and a lightable flame.
- **Optional Centre Stage soundscape** generated locally with the Web Audio API; never autoplays.
- **Responsive and accessible** with touch-sized controls, keyboard support, accessible dialogs, visible focus, and reduced-motion fallbacks.
- **Private by default** with no accounts, tracking, backend, or personal data collection.

## Technology

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and optimized production builds
- Variable, self-hosted DM Sans and Bricolage Grotesque fonts
- SVG artwork, hand-built responsive CSS, and Lucide icons
- Web Audio API for the optional original soundscape
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
2. `npm run test` — ride, game, stall, and audio interaction tests
3. `npm run build` — strict TypeScript and production build validation

The interface is designed for keyboard navigation, semantic landmarks, accessible dialogs, reduced motion, and layouts from 320px phones to wide desktops.

## Project structure

```text
.
├── .github/workflows/    # CI and GitHub Pages automation
├── public/               # Optimized artwork, icons, manifest, robots.txt
├── src/
│   ├── components/       # Fairground, ride, games, stalls, stage, and UI
│   ├── hooks/            # Optional fair-audio lifecycle
│   ├── styles/           # Responsive design rules
│   ├── test/             # Shared test setup
│   ├── utils/            # Browser-generated soundscape
│   ├── App.tsx           # Experience composition and navigation
│   ├── data.ts           # Fairground stops and asset helpers
│   └── types.ts          # Shared domain types
├── index.html            # Metadata and application entry
└── vite.config.ts        # Build, preview, and test configuration
```

## Update the fair content

Fairground stops live in **`src/data.ts`**. Each attraction has its own focused component in **`src/components/`**, making game rules, stall interactions, visual treatments, and motion independently maintainable.

## Deployment

**[Open the published eMELA website →](https://shi22khar-oss.github.io/eMELA/)**

GitHub Pages is enabled with **GitHub Actions** as its publishing source. Every push to `main` runs **`.github/workflows/deploy.yml`**, which validates the application and publishes the optimized `dist/` build.

To deploy manually, open **Actions → Deploy website → Run workflow** and select the `main` branch. Pull requests and default-branch pushes also run the automated quality workflow in **`.github/workflows/ci.yml`**.

## Privacy and data

eMELA has no server-side data collection. Game and stall state exists only for the current page visit. Audio is generated on the device and starts only after an explicit visitor action. There are no accounts, forms, cookies, analytics, or stored personal details.

---

Made with React, TypeScript, and a sincere love for the mela. ✦
