#!/bin/bash
# HoneyDew2026 Test Script
# Usage: ./test.sh [--coverage]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COVERAGE=false

if [ "$1" = "--coverage" ]; then
    COVERAGE=true
fi

echo "=========================================="
echo "   HoneyDew2026 Test Suite"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASSED=0
FAILED=0

run_test() {
    local name="$1"
    local cmd="$2"
    echo -n "Testing: $name... "
    if eval "$cmd" > /dev/null 2>&1; then
        echo -e "${GREEN}PASS${NC}"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}FAIL${NC}"
        FAILED=$((FAILED + 1))
    fi
}

# API Tests
echo "--- API Tests ---"
echo ""

run_test "Products API returns 200" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:8017/api/products/ | grep -q '200'"

run_test "Farms API returns 200" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:8017/api/farms/ | grep -q '200'"

run_test "Categories API returns 200" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:8017/api/categories/ | grep -q '200'"

run_test "Products API returns valid JSON" \
    "curl -s http://localhost:8017/api/products/ | python3 -c 'import sys,json; json.load(sys.stdin)'"

run_test "Products have required fields" \
    "curl -s http://localhost:8017/api/products/ | python3 -c 'import sys,json; p=json.load(sys.stdin); assert len(p)>0; assert \"name\" in p[0]'"

# Frontend Tests
echo ""
echo "--- Frontend Tests ---"
echo ""

run_test "Frontend returns 200" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:3021/ | grep -q '200'"

run_test "Frontend serves HTML" \
    "curl -s http://localhost:3021/ | grep -q '<html'"

run_test "Frontend has app content" \
    "curl -s http://localhost:3021/ | grep -q 'HoneyDew'"

# Summary
echo ""
echo "=========================================="
echo "   Test Summary"
echo "=========================================="
echo ""
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed.${NC}"
    exit 1
fi
