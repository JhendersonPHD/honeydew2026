#!/bin/bash
# HoneyDew2026 Metrics Dashboard
# Usage: ./metrics.sh

set -e

echo "=========================================="
echo "   HoneyDew2026 Metrics"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Service status
echo "Service Status:"
echo ""

# Frontend
if curl -sf http://localhost:3021/ > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} Frontend (3021) - Running"
else
    echo -e "  ${RED}✗${NC} Frontend (3021) - Down"
fi

# Backend API
if curl -sf http://localhost:8017/api/products/ > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} Backend API (8017) - Running"
else
    echo -e "  ${RED}✗${NC} Backend API (8017) - Down"
fi

# API Response times
echo ""
echo "API Response Times:"
echo ""

# Products API
START=$(date +%s%3N)
curl -sf http://localhost:8017/api/products/ > /dev/null 2>&1
END=$(date +%s%3N)
PRODUCTS_MS=$((END - START))
echo "  Products API: ${PRODUCTS_MS}ms"

# Farms API
START=$(date +%s%3N)
curl -sf http://localhost:8017/api/farms/ > /dev/null 2>&1
END=$(date +%s%3N)
FARMS_MS=$((END - START))
echo "  Farms API: ${FARMS_MS}ms"

# Categories API
START=$(date +%s%3N)
curl -sf http://localhost:8017/api/categories/ > /dev/null 2>&1
END=$(date +%s%3N)
CATEGORIES_MS=$((END - START))
echo "  Categories API: ${CATEGORIES_MS}ms"

# Data counts
echo ""
echo "Data Counts:"
echo ""

PRODUCTS=$(curl -sf http://localhost:8017/api/products/ | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
echo "  Products: ${PRODUCTS}"

FARMS=$(curl -sf http://localhost:8017/api/farms/ | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
echo "  Farms: ${FARMS}"

CATEGORIES=$(curl -sf http://localhost:8017/api/categories/ | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
echo "  Categories: ${CATEGORIES}"

# Process info
echo ""
echo "Running Processes:"
echo ""
ps aux | grep -E "uvicorn|serve_spa" | grep -v grep | wc -l | xargs echo "  Total:"

# Uptime
echo ""
echo "System Uptime:"
uptime -p 2>/dev/null | sed 's/up /  /' | sed 's/, / /g' || uptime

echo ""
echo "=========================================="
