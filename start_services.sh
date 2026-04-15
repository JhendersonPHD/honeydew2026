#!/bin/bash
# HoneyDew2026 Start Services
# Usage: ./start_services.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "   HoneyDew2026 Start Services"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Load environment
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Check for existing processes
backend_pid=$(lsof -ti:8017 2>/dev/null || true)
frontend_pid=$(lsof -ti:3017 2>/dev/null || true)

if [ -n "$backend_pid" ]; then
    echo -e "${YELLOW}!${NC} Backend already running on port 8017 (PID: $backend_pid)"
else
    echo "Starting Backend API..."
    cd backend
    if [ -d ".venv" ]; then
        source .venv/bin/activate
    fi
    nohup python -m uvicorn app.main:app --host 0.0.0.0 --port 8017 > ../backend.log 2>&1 &
    echo -e "${GREEN}✓${NC} Backend started on port 8017"
    cd ..
fi

if [ -n "$frontend_pid" ]; then
    echo -e "${YELLOW}!${NC} Frontend already running on port 3017 (PID: $frontend_pid)"
else
    echo "Starting Frontend SPA..."
    cd frontend
    nohup npm run dev > ../frontend.log 2>&1 &
    echo -e "${GREEN}✓${NC} Frontend started on port 3017"
    cd ..
fi

echo ""
echo "Waiting for services to be ready..."
sleep 3

# Health check
echo ""
echo "Health Check:"
if curl -s http://localhost:8017/api/products/ > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} Backend API (8017)"
else
    echo -e "  ${RED}✗${NC} Backend API (8017)"
fi

if curl -s http://localhost:3017/ > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} Frontend SPA (3017)"
else
    echo -e "  ${RED}✗${NC} Frontend SPA (3017)"
fi

echo ""
echo "=========================================="
echo -e "   ${GREEN}Services started!${NC}"
echo "=========================================="
echo ""
echo "Access:"
echo "  Frontend: http://localhost:3017"
echo "  Backend:  http://localhost:8017"
echo "  Docs:     http://localhost:8017/docs"
echo ""