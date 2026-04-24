#!/bin/bash
# HoneyDew2026 — Quick Restart Script
# Usage: ./restart_services.sh

set -e
cd "$(dirname "$0")"

echo "=== HoneyDew2026 Restart ==="

# Kill existing backend on 8018
if lsof -ti:8018 > /dev/null 2>&1; then
    echo "Stopping backend on 8018..."
    kill $(lsof -ti:8018) 2>/dev/null || true
    sleep 1
fi

# Start backend
echo "Starting backend on 8018..."
nohup node backend/src/server.js > backend.log 2>&1 &
echo "Backend started (PID: $!)"

sleep 2

# Verify
if curl -s http://localhost:8018/api/health | grep -q "ok"; then
    echo "Backend health: OK"
else
    echo "Backend health: FAILED"
    cat backend.log | tail -20
fi

echo "Frontend on 3016 should already be running from previous startup."
echo "Done."
