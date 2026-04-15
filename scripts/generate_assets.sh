#!/bin/bash
# HoneyDew2026 Generate Assets Script
# Generate static assets for the application

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSETS_DIR="$SCRIPT_DIR/assets"

echo "=========================================="
echo "   HoneyDew2026 Asset Generator"
echo "=========================================="
echo ""

# Create assets directory
mkdir -p "$ASSETS_DIR"

# Generate placeholder SVG icons
echo "Generating SVG icons..."

# Logo
cat > "$ASSETS_DIR/logo.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#F59E0B"/>
  <text x="50" y="55" font-size="40" text-anchor="middle" fill="white">H</text>
</svg>
EOF

# Icon placeholder
cat > "$ASSETS_DIR/icon.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect width="24" height="24" rx="4" fill="#F59E0B"/>
  <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">HD</text>
</svg>
EOF

# Favicon
cat > "$ASSETS_DIR/favicon.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14" fill="#F59E0B"/>
  <text x="16" y="21" font-size="14" text-anchor="middle" fill="white">H</text>
</svg>
EOF

echo "✓ Generated SVG icons"

# Generate manifest
cat > "$ASSETS_DIR/manifest.json" << 'EOF'
{
  "name": "HoneyDew2026",
  "short_name": "HoneyDew",
  "description": "Farm-to-table marketplace",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFBEB",
  "theme_color": "#F59E0B",
  "icons": [
    {
      "src": "/assets/icon.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "/assets/icon.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
}
EOF

echo "✓ Generated PWA manifest"

# Copy to frontend public
if [ -d "$SCRIPT_DIR/frontend/public" ]; then
    cp "$ASSETS_DIR"/*.svg "$SCRIPT_DIR/frontend/public/" 2>/dev/null || true
    cp "$ASSETS_DIR/manifest.json" "$SCRIPT_DIR/frontend/public/" 2>/dev/null || true
    echo "✓ Copied to frontend public/"
fi

echo ""
echo "=========================================="
echo "   Assets generated successfully!"
echo "=========================================="
echo ""
echo "Generated files:"
ls -la "$ASSETS_DIR"
echo ""