#!/bin/bash
# HoneyDew2026 Port Check
# Usage: ./port_check.sh [port]

PORT=${1:-3021}

echo "Checking port $PORT..."

if lsof -i:$PORT &>/dev/null; then
    echo "Port $PORT is IN USE by:"
    lsof -i:$PORT
else
    echo "Port $PORT is AVAILABLE"
fi

# Check all HoneyDew ports
echo ""
echo "HoneyDew Services:"
for p in 3021 3022 8017 3017; do
    if lsof -i:$p &>/dev/null; then
        echo "  ✓ Port $p - IN USE"
    else
        echo "  ✗ Port $p - AVAILABLE"
    fi
done
