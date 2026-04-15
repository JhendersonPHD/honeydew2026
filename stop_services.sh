#!/bin/bash
# HoneyDew2026 - Stop All Services
# Usage: ./stop_services.sh

echo "Stopping HoneyDew2026 services..."

# Kill by PID file if exists
if [ -f /tmp/honeydew2026_pids.txt ]; then
    PIDS=$(cat /tmp/honeydew2026_pids.txt)
    echo "Killing PIDs: $PIDS"
    kill $PIDS 2>/dev/null || true
    rm /tmp/honeydew2026_pids.txt
fi

# Also kill by port
lsof -ti:3021 | xargs kill -9 2>/dev/null || true
lsof -ti:3020 | xargs kill -9 2>/dev/null || true
lsof -ti:3021 | xargs kill -9 2>/dev/null || true
lsof -ti:8017 | xargs kill -9 2>/dev/null || true

echo "All services stopped."