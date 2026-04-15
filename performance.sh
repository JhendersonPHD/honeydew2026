#!/bin/bash
# HoneyDew2026 Performance Monitoring
# Usage: ./performance.sh [--watch]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

WATCH=false
if [ "$1" = "--watch" ] || [ "$1" = "-w" ]; then
    WATCH=true
fi

echo "=========================================="
echo "   HoneyDew2026 Performance"
echo "=========================================="
echo ""

# Function to run checks
run_checks() {
    # Response times
    echo "Response Times:"
    
    FRONTEND_TIME=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:3021/)
    echo "  Frontend (3021): ${FRONTEND_TIME}s"
    
    BACKEND_TIME=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:8017/api/products/)
    echo "  Backend (8017): ${BACKEND_TIME}s"
    
    echo ""
    echo "HTTP Status Codes:"
    
    FRONTEND_STATUS=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:3021/)
    echo "  Frontend (3021): $FRONTEND_STATUS"
    
    BACKEND_STATUS=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:8017/api/products/)
    echo "  Backend (8017): $BACKEND_STATUS"
    
    echo ""
    echo "API Response Check:"
    
    # Test API endpoints
    PRODUCTS=$(curl -s http://localhost:8017/api/products/ | head -c 100)
    if echo "$PRODUCTS" | grep -q "products"; then
        echo "  Products API: OK"
    else
        echo "  Products API: FAIL"
    fi
    
    FARMS=$(curl -s http://localhost:8017/api/farms/ | head -c 100)
    if echo "$FARMS" | grep -q "farms"; then
        echo "  Farms API: OK"
    else
        echo "  Farms API: FAIL"
    fi
    
    echo ""
    echo "Memory Usage:"
    ps aux --sort=-%mem | grep -E "node|python" | grep -v grep | head -5 | awk '{print "  " $11 " - " $4"% mem"}'
    
    echo ""
    echo "=========================================="
}

run_checks

if [ "$WATCH" = true ]; then
    echo "Watching... (Ctrl+C to stop)"
    while true; do
        sleep 5
        clear
        echo "=========================================="
        echo "   HoneyDew2026 Performance"
        echo "=========================================="
        echo ""
        run_checks
    done
fi
