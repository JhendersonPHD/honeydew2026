#!/bin/bash
# HoneyDew2026 Port Check Script
# Usage: ./ports.sh

set -e

echo "=========================================="
echo "   HoneyDew2026 Port Status"
echo "=========================================="
echo ""

check_port() {
    local port=$1
    local name=$2
    if lsof -i:$port &>/dev/null; then
        echo "✓ $name (port $port) - IN USE"
        return 0
    else
        echo "✗ $name (port $port) - FREE"
        return 1
    fi
}

echo "Service Ports:"
echo ""
check_port 3021 "Frontend SPA"
check_port 8017 "Backend API"
check_port 3017 "Frontend SSR"
check_port 3000 "Gateway"

echo ""
echo "Database:"
echo ""
check_port 5432 "PostgreSQL"

echo ""
echo "=========================================="
echo "   Process Details"
echo "=========================================="
echo ""

show_process() {
    local port=$1
    local pids=$(lsof -i:$port 2>/dev/null | grep -v "^COMMAND" | awk '{print $2}' | sort -u)
    if [ -n "$pids" ]; then
        for pid in $pids; do
            echo "Port $port - PID $pid:"
            ps -p $pid -o pid,ppid,cmd,etime --no-headers 2>/dev/null | while read line; do
                echo "  $line"
            done
        done
    fi
}

show_process 3021
show_process 8017
show_process 3017
show_process 3000

echo ""
echo "=========================================="
echo "   Quick Commands"
echo "=========================================="
echo ""
echo "Kill process on port:"
echo "  lsof -ti:3021 | xargs kill -9"
echo ""
echo "Check what's using a port:"
echo "  lsof -i:3021"
echo ""
echo "=========================================="
