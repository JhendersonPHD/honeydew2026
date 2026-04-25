#!/bin/bash
# Start HoneyDew 2026 Node.js Backend (Express)
# Ensures backend on port 8018 is running with seed data
# Run from backend directory: ./start-node-backend.sh

cd /home/jonathon/VexPivot/projects/honeydew2026/backend

# Check if already running
if curl -s --max-time 2 http://localhost:8018/api/health > /dev/null 2>&1; then
    echo "Backend already running on port 8018"
    exit 0
fi

# Kill any stale process on port 8018
lsof -ti:8018 | xargs kill -9 2>/dev/null || true

# Start backend
nohup node src/server.js > ../node-backend.log 2>&1 &
BACKEND_PID=$!

echo "Backend starting on port 8018 (PID: $BACKEND_PID)..."

# Wait for it to be ready
for i in {1..10}; do
    if curl -s --max-time 2 http://localhost:8018/api/health > /dev/null 2>&1; then
        echo "Backend ready on http://localhost:8018"
        PRODUCTS=$(curl -s http://localhost:8018/api/products | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
        echo "Products loaded: $PRODUCTS"
        exit 0
    fi
    sleep 1
done

echo "WARNING: Backend may not have started properly. Check node-backend.log"
