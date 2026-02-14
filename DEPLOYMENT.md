# Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- Vercel account connected
- Domain `kparakposignal.space` configured in Vercel

### Deploy to Vercel

1. **Login to Vercel**
```bash
vercel login
```

2. **Deploy the project**
```bash
cd google-timeline-project
vercel --prod
```

3. **Add custom domain**
```bash
vercel domains add rxtimeline.kparakposignal.space
```

4. **Configure DNS**
Add the following DNS records to your domain:
- Type: CNAME
- Name: rxtimeline
- Value: cname.vercel-dns.com

### Environment Variables
No environment variables required for basic deployment.

## GitHub Pages Deployment

### Prerequisites
- GitHub repository created
- GitHub Pages enabled in repository settings

### Setup

1. **Create GitHub repository**
```bash
gh repo create google-search-timeline --public --source=. --description="Interactive timeline of Google Search evolution" --push
```

Or manually:
- Go to GitHub and create a new repository
- Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/google-search-timeline.git
git branch -M main
git push -u origin main
```

2. **Enable GitHub Pages**
- Go to repository Settings > Pages
- Source: GitHub Actions
- The workflow will automatically deploy on push to main

3. **Custom Domain (Optional)**
- In Settings > Pages > Custom domain
- Add: rxtimeline.kparakposignal.space
- Configure DNS CNAME record pointing to YOUR_USERNAME.github.io

## Build Commands

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Static Export
```bash
npm run build
# Static files will be in ./out directory
```

## Post-Deployment Checklist

- [ ] Verify site loads at production URL
- [ ] Test timeline scrolling and interactions
- [ ] Verify 3D spiral renders correctly
- [ ] Test dark mode toggle
- [ ] Check mobile responsiveness
- [ ] Verify search and filter functionality
- [ ] Test all milestone cards and modals
- [ ] Check Core Web Vitals in PageSpeed Insights
- [ ] Verify favicon and icons display correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

## DNS Configuration

For domain: kparakposignal.space

### Vercel
```
Type: CNAME
Name: rxtimeline
Value: cname.vercel-dns.com
```

### GitHub Pages (Alternative)
```
Type: CNAME
Name: rxtimeline
Value: YOUR_USERNAME.github.io
```

## Monitoring

- Vercel Analytics: Automatically enabled
- Google Search Console: Submit sitemap at /sitemap.xml
- Performance: Use Lighthouse or PageSpeed Insights

## Troubleshooting

### Build fails
- Check Node.js version (>= 18.0.0)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

### 3D visualization not loading
- Ensure Three.js dependencies are installed
- Check browser WebGL support
- Review browser console for errors

### Routing issues
- Ensure `next.config.js` has correct basePath
- For GitHub Pages, may need to adjust basePath

## Updates

To update the deployed site:
```bash
git add .
git commit -m "Update description"
git push origin main
```

Vercel and GitHub Actions will automatically redeploy.
