# Google Search Timeline

An interactive visualization of Google Search's evolution from 1996 to 2025, featuring scroll-driven animations and a 3D spiral representation.

## Features

- Interactive timeline with milestone cards
- 3D spiral visualization using Three.js
- Scroll-triggered animations with GSAP
- Dark mode support
- Responsive design
- Filter and search functionality

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: GSAP
- **State Management**: Zustand
- **Testing**: Vitest, Playwright

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## Deployment

### Vercel

This project is configured for deployment on Vercel with a custom domain: `rxtimeline.kparakposignal.space`

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure custom domain
vercel domains add rxtimeline.kparakposignal.space
```

### GitHub Pages

The project can also be deployed to GitHub Pages:

```bash
npm run build
# The static files will be in the 'out' directory
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── animations/   # Animation components
│   ├── layout/       # Layout components
│   ├── sections/     # Page sections
│   ├── spiral/       # 3D spiral components
│   ├── timeline/     # Timeline components
│   └── ui/           # UI components
├── contexts/         # React contexts
├── data/             # Static data (JSON)
├── hooks/            # Custom hooks
├── lib/              # Utilities and constants
│   └── utils/        # Helper functions
├── store/            # Zustand stores
├── styles/           # CSS files
└── types/            # TypeScript types
```

## License

Educational project. All Google trademarks and content are property of Google LLC.
