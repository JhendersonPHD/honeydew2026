#!/bin/bash
# HoneyDew2026 Performance Test Script
# Usage: ./perf_test.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Performance Tests"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

API_BASE="http://localhost:8017"
FRONTEND_BASE="http://localhost:3017"

# Function to check response time
check_endpoint() {
    local url=$1
    local name=$2
    local start=$(date +%s%3N)
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    local end=$(date +%s%3N)
    local duration=$((end - start))
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓${NC} $name: ${duration}ms"
        return 0
    else
        echo -e "${RED}✗${NC} $name: FAILED (HTTP $response)"
        return 1
    fi
}

echo "API Endpoints:"
echo "--------------"
check_endpoint "$API_BASE/api/products/" "Products API"
check_endpoint "$API_BASE/api/categories/" "Categories API"  
check_endpoint "$API_BASE/api/farms/" "Farms API"

echo ""
echo "Frontend:"
echo "---------"
check_endpoint "$FRONTEND_BASE/" "Frontend SPA"

echo ""
echo "=========================================="
echo "   Concurrent Load Test"
echo "=========================================="
echo ""

# Simple concurrent test
echo "Sending 10 concurrent requests to products API..."
for i in {1..10}; do
    curl -s -o /dev/null "$API_BASE/api/products/" &
done
wait

echo "Concurrent test complete"

echo ""
echo "=========================================="
echo "   Performance test complete"
echo "=========================================="
