#!/bin/bash
# HoneyDew2026 Update Script
# Usage: ./update.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Update"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check git
if [ -d ".git" ]; then
    echo "Checking git status..."
    git status --short 2>/dev/null || echo "Not a git repo"
    echo ""
fi

# Pull latest changes
echo "Pulling latest changes..."
if git pull origin main 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Pulled latest changes"
else
    echo -e "${YELLOW}!${NC} Not a git repo or no remote"
fi

# Update backend dependencies
echo ""
echo "Updating backend dependencies..."
cd "$SCRIPT_DIR/backend"
if [ -d ".venv" ]; then
    source .venv/bin/activate
    pip install -r requirements.txt -q
    echo -e "${GREEN}✓${NC} Backend dependencies updated"
else
    echo -e "${YELLOW}!${NC} Backend venv not found, skipping"
fi

# Update frontend dependencies
echo ""
echo "Updating frontend dependencies..."
cd "$SCRIPT_DIR/frontend"
if [ -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓${NC} Frontend dependencies updated"
else
    echo -e "${YELLOW}!${NC} node_modules not found, skipping"
fi

# Rebuild frontend
echo ""
echo "Rebuilding frontend..."
npm run build
echo -e "${GREEN}✓${NC} Frontend rebuilt"

# Restart services
echo ""
echo "Restarting services..."
cd "$SCRIPT_DIR"
./stop_services.sh 2>/dev/null || true
sleep 1
./start_services.sh

echo ""
echo "=========================================="
echo -e "   ${GREEN}Update complete!${NC}"
echo "=========================================="
echo ""
echo "Run ./health_check.sh to verify"
echo ""
