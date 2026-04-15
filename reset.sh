#!/bin/bash
# HoneyDew2026 Reset Script
# Usage: ./reset.sh [--force]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Reset"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check force flag
FORCE=false
if [ "$1" = "--force" ]; then
    FORCE=true
fi

# Warning
if [ "$FORCE" = false ]; then
    echo -e "${YELLOW}Warning: This will reset the database and rebuild everything!${NC}"
    echo ""
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        echo "Cancelled."
        exit 0
    fi
fi

# Stop services
echo "Stopping services..."
./stop_services.sh 2>/dev/null || true

# Remove database
echo ""
echo "Removing database..."
rm -f "$SCRIPT_DIR/backend/honeydew.db"
rm -f "$SCRIPT_DIR/backend/honeydew.db.backup"
echo -e "${GREEN}✓${NC} Database removed"

# Remove Python cache
echo ""
echo "Cleaning Python cache..."
find "$SCRIPT_DIR/backend" -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
find "$SCRIPT_DIR/backend" -name "*.pyc" -delete 2>/dev/null || true
echo -e "${GREEN}✓${NC} Python cache cleaned"

# Remove frontend build
echo ""
echo "Removing frontend build..."
rm -rf "$SCRIPT_DIR/frontend/dist"
rm -rf "$SCRIPT_DIR/frontend/.next"
echo -e "${GREEN}✓${NC} Frontend build removed"

# Seed database
echo ""
echo "Seeding database..."
cd "$SCRIPT_DIR/backend"
source .venv/bin/activate
python seed.py
echo -e "${GREEN}✓${NC} Database seeded"

# Build frontend
echo ""
echo "Building frontend..."
cd "$SCRIPT_DIR/frontend"
npm run build
echo -e "${GREEN}✓${NC} Frontend built"

# Start services
echo ""
echo "Starting services..."
./start_services.sh

echo ""
echo "=========================================="
echo -e "   ${GREEN}Reset complete!${NC}"
echo "=========================================="
echo ""
echo "Access the app: http://localhost:3021"
echo ""