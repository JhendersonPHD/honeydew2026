#!/bin/bash
# HoneyDew2026 Test Runner
# Usage: ./run_tests.sh [--unit|--integration|--all]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Default: run all tests
TEST_MODE="${1:-all}"

echo "=========================================="
echo "   HoneyDew2026 Test Runner"
echo "=========================================="
echo ""
echo "Mode: $TEST_MODE"
echo ""

# Track results
FAILED=0
PASSED=0

# Unit tests for backend
run_backend_unit_tests() {
    echo "Running Backend Unit Tests..."
    echo "--------------------------------"
    
    cd "$SCRIPT_DIR/backend"
    
    if [ ! -d ".venv" ]; then
        echo -e "${YELLOW}!${NC} Backend venv not found. Run ./setup.sh first."
        return 1
    fi
    
    source .venv/bin/activate
    
    # Run pytest
    if pytest tests/ -v --tb=short 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Backend unit tests passed"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} Backend unit tests failed"
        FAILED=$((FAILED + 1))
    fi
    
    cd "$SCRIPT_DIR"
    echo ""
}

# Integration tests
run_integration_tests() {
    echo "Running Integration Tests..."
    echo "--------------------------------"
    
    # Check if services are running
    if ! curl -s http://localhost:8017/api/products/ > /dev/null 2>&1; then
        echo -e "${RED}✗${NC} Backend API not running. Start with ./start_services.sh"
        FAILED=$((FAILED + 1))
        return
    fi
    
    if ! curl -s http://localhost:3021/ > /dev/null 2>&1; then
        echo -e "${RED}✗${NC} Frontend not running. Start with ./start_services.sh"
        FAILED=$((FAILED + 1))
        return
    fi
    
    # Test API endpoints
    echo "Testing API endpoints..."
    
    # Products
    if curl -s http://localhost:8017/api/products/ | grep -q "items"; then
        echo -e "${GREEN}✓${NC} Products API"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} Products API"
        FAILED=$((FAILED + 1))
    fi
    
    # Farms
    if curl -s http://localhost:8017/api/farms/ | grep -q "items"; then
        echo -e "${GREEN}✓${NC} Farms API"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} Farms API"
        FAILED=$((FAILED + 1))
    fi
    
    # Categories
    if curl -s http://localhost:8017/api/categories/ | grep -q "items"; then
        echo -e "${GREEN}✓${NC} Categories API"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} Categories API"
        FAILED=$((FAILED + 1))
    fi
    
    echo ""
}

# Frontend tests
run_frontend_tests() {
    echo "Running Frontend Tests..."
    echo "--------------------------------"
    
    cd "$SCRIPT_DIR/frontend"
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}!${NC} node_modules not found. Run ./setup.sh first."
        return 1
    fi
    
    # Run vite tests
    if npm run test -- --run 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Frontend tests passed"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} Frontend tests failed"
        FAILED=$((FAILED + 1))
    fi
    
    cd "$SCRIPT_DIR"
    echo ""
}

# Run based on mode
case "$TEST_MODE" in
    --unit)
        run_backend_unit_tests
        ;;
    --integration)
        run_integration_tests
        ;;
    --all)
        run_backend_unit_tests
        run_integration_tests
        ;;
    *)
        echo "Unknown mode: $TEST_MODE"
        echo "Usage: ./run_tests.sh [--unit|--integration|--all]"
        exit 1
        ;;
esac

# Summary
echo "=========================================="
echo "   Test Results"
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