#!/bin/bash

echo "🚀 Google Search Timeline Deployment Script"
echo "============================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be >= 18.0.0"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Run type check
echo "🔍 Type checking..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "⚠️  Type check failed, but continuing..."
fi
echo ""

# Build the project
echo "🏗️  Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build successful"
echo ""

# Deploy to Vercel
echo "🚢 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your site should be available at:"
    echo "   https://rxtimeline.kparakposignal.space"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Configure custom domain in Vercel dashboard"
    echo "   2. Add DNS CNAME record: rxtimeline → cname.vercel-dns.com"
    echo "   3. Wait for DNS propagation (can take up to 48 hours)"
    echo ""
else
    echo "❌ Deployment failed"
    echo "Please check the error messages above"
    exit 1
fi
