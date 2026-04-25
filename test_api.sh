#!/bin/bash
# HoneyDew2026 API Test Suite
# Usage: ./test_api.sh [base_url]

set +e

BASE_URL=${1:-"http://localhost:8017"}
SPA_URL=${2:-"http://localhost:3016"}

echo "=========================================="
echo "   HoneyDew2026 API Tests"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

test_endpoint() {
    local name="$1"
    local method="$2"
    local path="$3"
    local expected_code="${4:-200}"
    local target_url="$5"
    if [ -z "$target_url" ]; then target_url="$BASE_URL"; fi
    
    echo -n "Testing $name... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" -o /tmp/api_response.json "$target_url$path" 2>/dev/null)
        actual_code=$(echo "$response" | tail -1)
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$target_url$path" 2>/dev/null)
        actual_code=$(echo "$response" | tail -1)
    fi
    
    if [ "$actual_code" = "$expected_code" ]; then
        echo -e "${GREEN}✓ PASS${NC} ($actual_code)"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} (expected $expected_code, got $actual_code)"
        ((FAIL++))
    fi
}

test_json() {
    local name="$1"
    local path="$2"
    local field="$3"
    
    echo -n "Testing $name... "
    
    if curl -s "$BASE_URL$path" 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(d$field)" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((FAIL++))
    fi
}

echo "=== Backend API Tests ==="
test_endpoint "Products List" "GET" "/api/products/" 200 "$BASE_URL"
test_endpoint "Farms List" "GET" "/api/farms/" 200 "$BASE_URL"
test_endpoint "Categories List" "GET" "/api/categories/" 200 "$BASE_URL"
test_endpoint "Invalid Route" "GET" "/api/invalid/" 404 "$BASE_URL"

echo ""
echo "=== SPA Frontend Tests ==="
test_endpoint "SPA Root" "GET" "/" 200 "$SPA_URL"

echo ""
echo "   Results: $PASS passed, $FAIL failed"
echo "=========================================="

