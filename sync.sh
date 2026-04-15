#!/bin/bash
# HoneyDew2026 Sync Script
# Usage: ./sync.sh [--watch]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Sync Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check for changes in key directories
watch=false
if [ "$1" = "--watch" ] || [ "$1" = "-w" ]; then
    watch=true
fi

# Backend sync
echo "Syncing backend..."
if [ -d "$SCRIPT_DIR/backend" ]; then
    backend_files=$(find "$SCRIPT_DIR/backend" -name "*.py" -newer "$SCRIPT_DIR/backend/app/main.py" 2>/dev/null | wc -l)
    if [ "$backend_files" -gt 0 ]; then
        echo -e "${YELLOW}!${NC} Backend has $backend_files modified file(s)"
    else
        echo -e "${GREEN}✓${NC} Backend up to date"
    fi
fi

# Frontend sync
echo "Syncing frontend..."
if [ -d "$SCRIPT_DIR/frontend/src" ]; then
    frontend_files=$(find "$SCRIPT_DIR/frontend/src" -name "*.jsx" -o -name "*.js" -newer "$SCRIPT_DIR/frontend/dist" 2>/dev/null | wc -l)
    if [ "$frontend_files" -gt 0 ]; then
        echo -e "${YELLOW}!${NC} Frontend has $frontend_files modified file(s)"
        echo "Run './update.sh' to rebuild"
    else
        echo -e "${GREEN}✓${NC} Frontend up to date"
    fi
fi

# Database sync
echo "Checking database..."
if [ -f "$SCRIPT_DIR/backend/honeydew.db" ]; then
    db_size=$(du -h "$SCRIPT_DIR/backend/honeydew.db" 2>/dev/null | cut -f1)
    echo -e "${GREEN}✓${NC} Database exists ($db_size)"
else
    echo -e "${RED}✗${NC} Database not found"
fi

echo ""
echo "=========================================="
echo "   Service Status"
echo "=========================================="

# Check services
if lsof -i:3021 &>/dev/null; then
    echo -e "${GREEN}✓${NC} Frontend (3021) - RUNNING"
else
    echo -e "${RED}✗${NC} Frontend (3021) - STOPPED"
fi

if lsof -i:8017 &>/dev/null; then
    echo -e "${GREEN}✓${NC} Backend (8017) - RUNNING"
else
    echo -e "${RED}✗${NC} Backend (8017) - STOPPED"
fi

echo ""

if [ "$watch" = true ]; then
    echo "Watching for changes... (Ctrl+C to stop)"
    inotifywait -q -e modify "$SCRIPT_DIR/frontend/src" "$SCRIPT_DIR/backend/app" 2>/dev/null || true
fi