#!/bin/bash
# HoneyDew2026 Install Script
# First-time setup for a new environment

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Install"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check requirements
check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 found"
        return 0
    else
        echo -e "${RED}✗${NC} $1 not found"
        return 1
    fi
}

echo "Checking requirements..."
MISSING=0

check_command python3 || MISSING=1
check_command pip3 || MISSING=1
check_command node || MISSING=1
check_command npm || MISSING=1
check_command git || MISSING=1

if [ $MISSING -eq 1 ]; then
    echo ""
    echo -e "${RED}Missing required commands. Please install them first.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ All requirements met${NC}"
echo ""

# Clone or update
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git remote add origin https://github.com/your-org/honeydew2026.git 2>/dev/null || true
fi

# Create backend venv
echo "Setting up Python virtual environment..."
cd "$SCRIPT_DIR/backend"
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
echo -e "${GREEN}✓${NC} Backend dependencies installed"

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd "$SCRIPT_DIR/frontend"
npm install
echo -e "${GREEN}✓${NC} Frontend dependencies installed"

# Copy environment file
if [ ! -f "$SCRIPT_DIR/.env" ]; then
    echo ""
    echo "Creating .env file..."
    cp "$SCRIPT_DIR/.env.example" "$SCRIPT_DIR/.env"
    echo -e "${YELLOW}!${NC} Please edit .env with your settings"
fi

# Build frontend
echo ""
echo "Building frontend..."
npm run build
echo -e "${GREEN}✓${NC} Frontend built"

# Initialize database
echo ""
echo "Initializing database..."
cd "$SCRIPT_DIR/backend"
source .venv/bin/activate
python seed.py 2>/dev/null || echo "Database seed (if applicable)"

echo ""
echo "=========================================="
echo -e "   ${GREEN}Installation complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Edit .env with your settings"
echo "  2. Run ./start_services.sh"
echo "  3. Open http://localhost:3021"
echo ""
