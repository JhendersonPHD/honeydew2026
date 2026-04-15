#!/bin/bash
# HoneyDew2026 Setup Script
# Run this once to set up the project environment

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo "=========================================="
echo "   HoneyDew2026 Setup"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 found"
        return 0
    else
        echo -e "${RED}✗${NC} $1 not found"
        return 1
    fi
}

echo "Checking prerequisites..."
echo ""

errors=0

if check_command "python3"; then
    python_version=$(python3 --version | cut -d' ' -f2)
    echo "  Version: $python_version"
fi

if check_command "node"; then
    node_version=$(node --version | cut -d'v' -f2)
    npm_version=$(npm --version)
    echo "  Node: v$node_version, npm: $npm_version"
fi

if check_command "docker"; then
    docker_version=$(docker --version | cut -d' ' -f3 | tr -d ',')
    echo "  Version: $docker_version"
fi

if check_command "curl"; then
    echo -e "${GREEN}✓${NC} curl found"
else
    errors=$((errors + 1))
fi

echo ""

if [ $errors -gt 0 ]; then
    echo -e "${RED}Error: Missing required commands${NC}"
    exit 1
fi

# Backend setup
echo "=========================================="
echo "   Setting up Backend"
echo "=========================================="
echo ""

cd "$PROJECT_DIR/backend"

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv .venv
    echo -e "${GREEN}✓${NC} Virtual environment created"
else
    echo -e "${YELLOW}!${NC} Virtual environment already exists"
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip -q
pip install -r requirements.txt -q
echo -e "${GREEN}✓${NC} Python dependencies installed"

# Check database
if [ -f "honeydew.db" ]; then
    echo -e "${YELLOW}!${NC} Database already exists"
else
    echo "Database not found. Run: python seed.py"
fi

echo ""

# Frontend setup
echo "=========================================="
echo "   Setting up Frontend"
echo "=========================================="
echo ""

cd "$PROJECT_DIR/frontend"

if [ -d "node_modules" ]; then
    echo -e "${YELLOW}!${NC} node_modules already exists"
else
    echo "Installing Node dependencies..."
    npm install
    echo -e "${GREEN}✓${NC} Node dependencies installed"
fi

# Build frontend
echo ""
echo "Building frontend..."
npm run build
echo -e "${GREEN}✓${NC} Frontend built"

echo ""
echo "=========================================="
echo "   Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "  1. Start services:"
echo "     ./start_services.sh"
echo ""
echo "  2. Or use Makefile:"
echo "     make install"
echo "     make start"
echo ""
echo "  3. Run health check:"
echo "     ./health_check.sh"
echo ""
echo "  4. Access the app:"
echo "     http://localhost:3021"
echo ""
echo "=========================================="
