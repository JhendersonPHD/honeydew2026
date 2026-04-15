#!/bin/bash
# HoneyDew2026 Health Check Script
# Usage: ./health_check.sh [--json]

set -e

JSON_OUTPUT=false
if [ "$1" = "--json" ]; then
    JSON_OUTPUT=true
fi

FRONTEND_URL="http://localhost:3021"
BACKEND_URL="http://localhost:8017"
API_PROXY_URL="http://localhost:3021"

check_service() {
    local name="$1"
    local url="$2"
    local expected="$3"
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
    
    if [ "$response" = "$expected" ]; then
        echo "✓ $name is healthy"
        return 0
    else
        echo "✗ $name is DOWN (got $response, expected $expected)"
        return 1
    fi
}

check_api() {
    local name="$1"
    local url="$2"
    local check_for="$3"
    
    response=$(curl -s "$url" 2>/dev/null || echo "")
    
    if echo "$response" | grep -q "$check_for"; then
        echo "✓ $name API working"
        return 0
    else
        echo "✗ $name API FAILED (missing: $check_for)"
        return 1
    fi
}

echo "=========================================="
echo "   HoneyDew2026 Health Check"
echo "=========================================="
echo ""

total=0
passed=0

# Check Frontend
total=$((total + 1))
if check_service "Frontend SPA" "$FRONTEND_URL/" "200"; then
    passed=$((passed + 1))
fi

# Check Backend
total=$((total + 1))
if check_service "Backend API" "$BACKEND_URL/api/products/" "200"; then
    passed=$((passed + 1))
fi

# Check API Proxy
total=$((total + 1))
if check_service "API Proxy" "$API_PROXY_URL/api/products/" "200"; then
    passed=$((passed + 1))
fi

echo ""
echo "=========================================="
echo "   API Functionality Tests"
echo "=========================================="
echo ""

# Check Products API
total=$((total + 1))
if check_api "Products" "$BACKEND_URL/api/products/" "Organic Tomatoes"; then
    passed=$((passed + 1))
fi

# Check Farms API
total=$((total + 1))
if check_api "Farms" "$BACKEND_URL/api/farms/" "Green Valley"; then
    passed=$((passed + 1))
fi

# Check Categories API
total=$((total + 1))
if check_api "Categories" "$BACKEND_URL/api/categories/" "Vegetables"; then
    passed=$((passed + 1))
fi

echo ""
echo "=========================================="
echo "   Summary: $passed/$total checks passed"
echo "=========================================="
echo ""

if [ $passed -eq $total ]; then
    echo "✓ All health checks passed!"
    exit 0
else
    echo "✗ Some health checks failed"
    exit 1
fi
