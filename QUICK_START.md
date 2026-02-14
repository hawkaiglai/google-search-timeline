# Quick Start Guide

## Prerequisites

1. **Node.js**: Version 18.0.0 or higher
2. **npm**: Version 9.0.0 or higher
3. **Vercel CLI**: `npm install -g vercel`

## Installation

```bash
cd google-timeline-project
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

### Option 1: Automated Script
```bash
./deploy.sh
```

### Option 2: Manual
```bash
vercel --prod
```

Then configure custom domain:
```bash
vercel domains add rxtimeline.kparakposignal.space
```

## DNS Configuration

Add CNAME record to your DNS:
- **Name**: rxtimeline
- **Value**: cname.vercel-dns.com
- **TTL**: 3600 (or automatic)

## Post-Deployment

1. Visit https://rxtimeline.kparakposignal.space
2. Test all features:
   - Scroll timeline
   - Click milestone cards
   - Toggle dark mode
   - Use search and filters
   - Check 3D spiral visualization

## Project Structure

```
google-timeline-project/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── data/            # Timeline JSON data
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities
│   ├── store/           # State management
│   ├── styles/          # CSS files
│   └── types/           # TypeScript types
├── public/              # Static assets
└── [config files]       # Build configs
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

## Troubleshooting

### Build errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Type errors
```bash
npm run type-check
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## Support

For issues, check:
- README.md
- DEPLOYMENT.md
- PROJECT_SSOT.md
