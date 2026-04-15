#!/bin/bash
# HoneyDew2026 Restart Script
# Usage: ./restart.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Restart"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Stop services
echo "Stopping services..."
cd "$SCRIPT_DIR"
./stop_services.sh 2>/dev/null || true
sleep 2

# Clear any stuck ports
echo "Checking for stuck ports..."
for port in 3021 8017; do
    if lsof -i:$port &>/dev/null; then
        echo -e "${YELLOW}!${NC} Port $port still in use, killing..."
        fuser -k $port/tcp 2>/dev/null || true
        sleep 1
    fi
done

# Start services
echo "Starting services..."
./start_services.sh

# Wait for services
echo ""
echo "Waiting for services to be ready..."
sleep 3

# Health check
echo ""
echo "Running health check..."
./health_check.sh

echo ""
echo "=========================================="
echo -e "   ${GREEN}Restart complete!${NC}"
echo "=========================================="
echo ""
