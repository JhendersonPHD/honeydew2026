#!/bin/bash
# HoneyDew2026 Logs Viewer
# Usage: ./logs.sh [--follow]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FOLLOW=false

if [ "$1" = "--follow" ] || [ "$1" = "-f" ]; then
    FOLLOW=true
fi

echo "=========================================="
echo "   HoneyDew2026 Service Logs"
echo "=========================================="
echo ""

# Find processes and their logs
uvicorn_pids=$(ps aux | grep "uvicorn.*app.main:app" | grep -v grep | awk '{print $2}')
spa_pids=$(ps aux | grep "serve_spa.py" | grep -v grep | awk '{print $2}')

if [ -z "$uvicorn_pids" ] && [ -z "$spa_pids" ]; then
    echo "No HoneyDew services are currently running."
    echo ""
    echo "Start services with: ./start_services.sh"
    exit 0
fi

echo "Active services:"
echo ""

# Show backend info
if [ -n "$uvicorn_pids" ]; then
    echo "Backend API (port 8017):"
    for pid in $uvicorn_pids; do
        echo "  PID: $pid"
    done
fi

# Show frontend info
if [ -n "$spa_pids" ]; then
    echo "Frontend SPA (port 3021):"
    for pid in $spa_pids; do
        echo "  PID: $pid"
    done
fi

echo ""
echo "=========================================="
echo "   Recent API Requests"
echo "=========================================="
echo ""

# Get recent API activity (if we can find any logs)
if [ -d "$SCRIPT_DIR/logs" ]; then
    tail -20 "$SCRIPT_DIR/logs/"*.log 2>/dev/null || echo "No log files found"
else
    echo "Log directory not configured"
fi

echo ""
echo "=========================================="
echo "   Service Status"
echo "=========================================="
echo ""

# Check if ports are in use
if lsof -i:3021 &>/dev/null; then
    echo "✓ Frontend (3021) - RUNNING"
else
    echo "✗ Frontend (3021) - STOPPED"
fi

if lsof -i:8017 &>/dev/null; then
    echo "✓ Backend API (8017) - RUNNING"
else
    echo "✗ Backend API (8017) - STOPPED"
fi

if lsof -i:8017 &>/dev/null; then
    echo "✓ Backend Docs (8017/docs) - RUNNING"
else
    echo "✗ Backend Docs (8017/docs) - STOPPED"
fi

echo ""
echo "=========================================="
echo "   Useful Commands"
echo "=========================================="
echo ""
echo "View real-time logs:"
echo "  docker-compose logs -f"
echo ""
echo "Check service status:"
echo "  make status"
echo ""
echo "Tail backend logs:"
echo "  tail -f backend/app.log 2>/dev/null || echo 'No log file'"
echo ""
echo "=========================================="

if [ "$FOLLOW" = true ]; then
    echo ""
    echo "Following logs... (Ctrl+C to stop)"
    echo ""
    # In follow mode, just keep the script alive
    tail -f /dev/null 2>/dev/null || sleep infinity
fi