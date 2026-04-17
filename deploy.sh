#!/bin/bash
# honeydew2026 Deployment Script
# Run this to deploy frontend/dist/ to a hosting provider

set -e

echo "=== honeydew2026 Deployment Script ==="
echo ""

# Check if dist folder exists
if [ ! -d "frontend/dist" ]; then
    echo "ERROR: frontend/dist not found. Run 'npm run build' first."
    exit 1
fi

echo "Frontend dist/ folder found"
echo ""

# Show what's in dist
echo "Contents of frontend/dist/:"
ls -la frontend/dist/
echo ""

# Check if netlify-cli is installed
if command -v netlify &> /dev/null; then
    echo "Netlify CLI found"
    echo "To deploy to Netlify:"
    echo "  cd frontend"
    echo "  netlify deploy --prod --dir=dist"
    echo ""
else
    echo "Netlify CLI not installed"
    echo "Install with: npm install -g netlify-cli"
    echo ""
fi

# Check if vercel is installed
if command -v vercel &> /dev/null; then
    echo "Vercel CLI found"
    echo "To deploy to Vercel:"
    echo "  cd frontend"
    echo "  vercel --prod"
    echo ""
else
    echo "Vercel CLI not installed"
    echo "Install with: npm install -g vercel"
    echo ""
fi

echo "=== Deployment Options ==="
echo ""
echo "Option 1: Netlify"
echo "  cd frontend"
echo "  netlify deploy --prod --dir=dist"
echo ""
echo "Option 2: Vercel"  
echo "  cd frontend"
echo "  vercel --prod"
echo ""
echo "Option 3: GitHub Pages"
echo "  Use actions/github-pages or manually push dist/"
echo ""
echo "Option 4: Render.com"
echo "  render blueprint render.yaml"
echo ""

echo "Backend API is running on port 8018"
echo "Update VITE_API_URL in frontend/.env before deploying"
