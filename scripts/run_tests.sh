#!/bin/bash
# HoneyDew2026 Test Runner
# Usage: ./scripts/run_tests.sh [backend|frontend|all]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

TEST_MODE="${1:-all}"

echo "=========================================="
echo "   HoneyDew2026 Test Runner"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

run_backend_tests() {
    echo "Running backend tests..."
    cd "$SCRIPT_DIR/backend"
    
    if [ ! -d ".venv" ]; then
        echo -e "${RED}✗ Backend venv not found${NC}"
        echo "Run ./setup.sh first"
        return 1
    fi
    
    source .venv/bin/activate
    
    if [ -f "requirements.txt" ]; then
        pip install pytest pytest-cov -q 2>/dev/null || true
    fi
    
    if [ -d "tests" ]; then
        pytest tests/ -v --tb=short 2>/dev/null && echo -e "${GREEN}✓ Backend tests passed${NC}" || echo -e "${RED}✗ Backend tests failed${NC}"
    else
        echo "No backend tests found"
    fi
}

run_frontend_tests() {
    echo "Running frontend tests..."
    cd "$SCRIPT_DIR/frontend"
    
    if [ ! -d "node_modules" ]; then
        echo -e "${RED}✗ node_modules not found${NC}"
        echo "Run ./setup.sh first"
        return 1
    fi
    
    if [ -f "package.json" ]; then
        npm test -- --run 2>/dev/null && echo -e "${GREEN}✓ Frontend tests passed${NC}" || echo -e "${RED}✗ Frontend tests failed${NC}"
    else
        echo "No frontend tests found"
    fi
}

case "$TEST_MODE" in
    backend)
        run_backend_tests
        ;;
    frontend)
        run_frontend_tests
        ;;
    all)
        run_backend_tests
        echo ""
        run_frontend_tests
        ;;
    *)
        echo "Usage: $0 [backend|frontend|all]"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo -e "   ${GREEN}Test run complete${NC}"
echo "=========================================="
