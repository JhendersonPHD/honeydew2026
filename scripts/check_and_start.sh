#!/bin/bash
# HoneyDew2026 Check and Start
# Checks if services are running, starts them if not

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "   HoneyDew2026 Service Check"
echo "=========================================="
echo ""

# Check backend
BACKEND_RUNNING=false
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8017/api/products/ | grep -q "200"; then
    echo "✓ Backend API (8017) - RUNNING"
    BACKEND_RUNNING=true
else
    echo "✗ Backend API (8017) - STOPPED"
fi

# Check frontend
FRONTEND_RUNNING=false
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3021/ | grep -q "200"; then
    echo "✓ Frontend SPA (3021) - RUNNING"
    FRONTEND_RUNNING=true
else
    echo "✗ Frontend SPA (3021) - STOPPED"
fi

echo ""

# Start if needed
if [ "$BACKEND_RUNNING" = false ] || [ "$FRONTEND_RUNNING" = false ]; then
    echo "Starting services..."
    cd "$PROJECT_DIR"
    ./start_services.sh
else
    echo "All services are already running."
fi

echo ""
echo "Run ./health_check.sh to verify"
echo ""
