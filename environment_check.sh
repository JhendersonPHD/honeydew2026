#!/bin/bash
# HoneyDew2026 Environment Check Script
# Checks all environment dependencies and configurations

set -e

echo "=========================================="
echo "   HoneyDew2026 Environment Check"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

PASS=0
FAIL=0

check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAIL++))
    fi
}

# Python check
echo "=== Python Environment ==="
python3 --version && check "Python3 available"
pip3 --version && check "pip3 available"

# Node check
echo ""
echo "=== Node.js Environment ==="
node --version && check "Node.js available"
npm --version && check "npm available"

# Project directories
echo ""
echo "=== Project Structure ==="
[ -d "backend" ] && check "Backend directory exists"
[ -d "frontend" ] && check "Frontend directory exists"
[ -f "docker-compose.yml" ] && check "docker-compose.yml exists"
[ -f "Makefile" ] && check "Makefile exists"

# Backend checks
echo ""
echo "=== Backend Dependencies ==="
cd backend
[ -f "requirements.txt" ] && check "requirements.txt exists"
[ -d ".venv" ] && check "Python virtualenv exists"
if [ -d ".venv" ]; then
    source .venv/bin/activate
    python -c "import fastapi" 2>/dev/null && check "FastAPI installed" || echo -e "${YELLOW}!${NC} FastAPI not installed"
    python -c "import uvicorn" 2>/dev/null && check "uvicorn installed" || echo -e "${YELLOW}!${NC} uvicorn not installed"
fi
cd ..

# Frontend checks
echo ""
echo "=== Frontend Dependencies ==="
cd frontend
[ -f "package.json" ] && check "package.json exists"
[ -d "node_modules" ] && check "node_modules installed"
cd ..

# Docker check
echo ""
echo "=== Docker ==="
docker --version && check "Docker available" || echo -e "${YELLOW}!${NC} Docker not installed"
docker ps >/dev/null 2>&1 && check "Docker daemon running" || echo -e "${YELLOW}!${NC} Docker daemon not running"

# Port availability
echo ""
echo "=== Port Availability ==="
lsof -i:8017 >/dev/null 2>&1 && echo -e "${RED}✗${NC} Port 8017 in use (Backend)" || echo -e "${GREEN}✓${NC} Port 8017 available"
lsof -i:3021 >/dev/null 2>&1 && echo -e "${RED}✗${NC} Port 3021 in use (Frontend)" || echo -e "${GREEN}✓${NC} Port 3021 available"

# Summary
echo ""
echo "=========================================="
echo "   Summary: $PASS passed, $FAIL failed"
echo "=========================================="

if [ $FAIL -gt 0 ]; then
    echo ""
    echo "Run ./setup.sh to fix missing dependencies"
    exit 1
fi

echo ""
echo "Environment is ready!"
echo ""