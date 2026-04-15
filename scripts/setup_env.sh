#!/bin/bash
# HoneyDew2026 Environment Setup
# Usage: ./scripts/setup_env.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Environment Setup"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if .env exists
if [ -f "$SCRIPT_DIR/.env" ]; then
    echo -e "${YELLOW}!${NC} .env file already exists"
    read -p "Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipped."
        exit 0
    fi
fi

# Generate secure secret key
SECRET_KEY=$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | xxd -p)

# Create .env file
cat > "$SCRIPT_DIR/.env" << EOF
# HoneyDew2026 Environment Variables
# Copy this file to .env and customize as needed

# Security
JWT_SECRET_KEY=$SECRET_KEY

# Database
DATABASE_URL=sqlite:///./honeydew.db

# CORS
CORS_ORIGINS=http://localhost:3017,http://localhost:3021

# API Settings
API_V1_STR=/api
PROJECT_NAME=HoneyDew2026
DEBUG=false

# Shopify (optional)
SHOPIFY_API_KEY=
SHOPIFY_API_SECRET=
SHOPIFY_STORE_URL=

# Email (optional)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
EOF

echo -e "${GREEN}✓${NC} Created .env file with generated JWT_SECRET_KEY"
echo ""
echo "Next steps:"
echo "  1. Customize .env if needed"
echo "  2. Run ./setup.sh"
echo ""