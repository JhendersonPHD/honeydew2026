#!/bin/bash
# HoneyDew2026 Port Fix Script
# Fixes port 3021 if frontend shows "Cannot GET /"

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Port Fix"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Check if port 3021 has a broken node process
PID=$(lsof -t -i:3021 2>/dev/null || true)

if [ -n "$PID" ]; then
    echo "Found process on port 3021: PID $PID"
    
    # Check if it's a broken serve_spa.py
    if ps aux | grep -q "$PID.*serve_spa"; then
        echo "Found broken serve_spa.py process"
        echo "Killing PID $PID..."
        kill $PID 2>/dev/null || true
        sleep 1
    fi
fi

# Kill any stale vite processes
echo "Cleaning up stale vite processes..."
pkill -f "vite.*3021" 2>/dev/null || true
sleep 1

# Start fresh frontend
echo "Starting frontend on port 3021..."
cd "$SCRIPT_DIR/frontend"
npm run dev -- --port 3021 --host 0.0.0.0 > /tmp/vite3021.log 2>&1 &
sleep 4

# Verify
HTTP_CODE=$(curl -s http://localhost:3021/ -o /dev/null -w "%{http_code}")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} Frontend is healthy on port 3021"
    echo ""
    echo "Done! Run ./health_check.sh to verify"
    exit 0
else
    echo -e "${RED}✗${NC} Frontend still not working (got $HTTP_CODE)"
    echo "Check logs: cat /tmp/vite3021.log"
    exit 1
fi
