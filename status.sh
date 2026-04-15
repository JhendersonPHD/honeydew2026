#!/bin/bash
# HoneyDew2026 Service Status
# Usage: ./status.sh

set -e

echo "=========================================="
echo "   HoneyDew2026 Service Status"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check ports and processes
check_service() {
    local name="$1"
    local port="$2"
    local path="$3"
    
    if lsof -i:"$port" &>/dev/null; then
        echo -e "${GREEN}✓${NC} $name (port $port) - RUNNING"
        return 0
    else
        echo -e "${RED}✗${NC} $name (port $port) - STOPPED"
        return 1
    fi
}

# Check services
check_service "Frontend SPA" 3021 "/"
check_service "Backend API" 8017 "/api/products/"

echo ""
echo "=========================================="
echo "   Process Summary"
echo "=========================================="
echo ""

# Backend processes
uvicorn_count=$(ps aux | grep -c "uvicorn.*app.main:app" | grep -v grep || echo "0")
echo "Backend workers: $uvicorn_count"

# Frontend processes
frontend_count=$(ps aux | grep -c "node.*vite" | grep -v grep || echo "0")
echo "Frontend workers: $frontend_count"

echo ""
echo "=========================================="
echo "   Quick Actions"
echo "=========================================="
echo ""
echo "Start services:  ./start_services.sh"
echo "Stop services:    ./stop_services.sh"
echo "Health check:    ./health_check.sh"
echo "View logs:       ./logs.sh"
echo ""
