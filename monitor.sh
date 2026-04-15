#!/bin/bash
# HoneyDew2026 Monitor Script
# Real-time service and resource monitoring

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "=========================================="
echo "   HoneyDew2026 Monitor"
echo "=========================================="
echo ""

# Function to check port
check_port() {
    local port=$1
    local name=$2
    local code=$(curl -s http://localhost:$port/ -o /dev/null -w "%{http_code}" 2>/dev/null || echo "000")
    if [ "$code" = "200" ]; then
        echo -e "${GREEN}✓${NC} $name (port $port) - HTTP $code"
    else
        echo -e "${RED}✗${NC} $name (port $port) - HTTP $code"
    fi
}

# Service checks
echo -e "${BLUE}Services:${NC}"
check_port 3017 "Frontend Next.js"
check_port 3021 "Frontend SPA"
check_port 8017 "Backend API"

# API health checks
echo ""
echo -e "${BLUE}API Health:${NC}"
for endpoint in "products" "farms" "categories"; do
    code=$(curl -s http://localhost:8017/api/$endpoint/ -o /dev/null -w "%{http_code}" 2>/dev/null || echo "000")
    if [ "$code" = "200" ]; then
        echo -e "${GREEN}✓${NC} /api/$endpoint/"
    else
        echo -e "${RED}✗${NC} /api/$endpoint/ (HTTP $code)"
    fi
done

# Process checks
echo ""
echo -e "${BLUE}Running Processes:${NC}"
for port in 3017 3021 8017; do
    pid=$(lsof -ti:$port 2>/dev/null || true)
    if [ -n "$pid" ]; then
        echo -e "${GREEN}✓${NC} Port $port - PID $pid"
    else
        echo -e "${RED}✗${NC} Port $port - Not running"
    fi
done

# Resource usage
echo ""
echo -e "${BLUE}Resource Usage:${NC}"
for port in 3017 3021 8017; do
    pid=$(lsof -ti:$port 2>/dev/null || true)
    if [ -n "$pid" ]; then
        cpu=$(ps -p $pid -o %cpu= 2>/dev/null || echo "0")
        mem=$(ps -p $pid -o %mem= 2>/dev/null || echo "0")
        echo "  Port $port: CPU ${cpu}% MEM ${mem}%"
    fi
done

# Disk usage
echo ""
echo -e "${BLUE}Disk Usage:${NC}"
du -sh "$SCRIPT_DIR/frontend/dist" 2>/dev/null || echo "  dist/: N/A"
du -sh "$SCRIPT_DIR/backend/*.db" 2>/dev/null || echo "  database: N/A"

# Uptime
echo ""
echo -e "${BLUE}Uptime:${NC}"
for port in 3017 3021 8017; do
    pid=$(lsof -ti:$port 2>/dev/null || true)
    if [ -n "$pid" ]; then
        uptime=$(ps -p $pid -o etime= 2>/dev/null | tr -d ' ' || echo "unknown")
        echo "  Port $port: $uptime"
    fi
done

echo ""
echo "=========================================="
