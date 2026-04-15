#!/bin/bash
# HoneyDew2026 Service Checker
# Quick check if all services are running

set -e

echo "=========================================="
echo "   HoneyDew2026 Service Check"
echo "=========================================="
echo ""

FAILED=0

check_service() {
    local name="$1"
    local url="$2"
    
    if curl -s --fail --max-time 3 "$url" > /dev/null 2>&1; then
        echo "✓ $name - OK"
    else
        echo "✗ $name - FAILED"
        FAILED=1
    fi
}

# Check services
check_service "Frontend SPA (3021)" "http://localhost:3021/"
check_service "Backend API (8017)" "http://localhost:8017/api/products/"
check_service "Backend Health" "http://localhost:8017/api/farms/"

echo ""
if [ $FAILED -eq 0 ]; then
    echo "All services are healthy!"
    exit 0
else
    echo "Some services are down."
    echo "Run ./start_services.sh to start them."
    exit 1
fi
