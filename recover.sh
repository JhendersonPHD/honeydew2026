#!/bin/bash
# HoneyDew2026 Emergency Recovery Script
# Usage: ./recover.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Emergency Recovery"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Kill stale processes
echo "Killing stale processes on ports 3021, 8017..."
lsof -ti:3021 | xargs kill -9 2>/dev/null || true
lsof -ti:8017 | xargs kill -9 2>/dev/null || true
echo -e "${GREEN}✓${NC} Stale processes killed"
sleep 1

# Start backend first
echo ""
echo "Starting backend API..."
cd "$SCRIPT_DIR/backend"
source .venv/bin/activate
nohup uvicorn app.main:app --host 0.0.0.0 --port 8017 > /dev/null 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓${NC} Backend started (PID: $BACKEND_PID)"
sleep 2

# Check backend
if curl -s http://localhost:8017/api/products/ > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Backend API is healthy"
else
    echo -e "${RED}✗${NC} Backend API failed to start"
fi

# Start frontend
echo ""
echo "Starting frontend SPA..."
cd "$SCRIPT_DIR/frontend"
nohup npm run dev -- --port 3021 > /dev/null 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓${NC} Frontend started (PID: $FRONTEND_PID)"
sleep 3

# Check frontend
if curl -s http://localhost:3021/ > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Frontend is healthy"
else
    echo -e "${RED}✗${NC} Frontend failed to start"
fi

echo ""
echo "=========================================="
echo -e "   ${GREEN}Recovery complete!${NC}"
echo "=========================================="
echo ""
./health_check.sh
