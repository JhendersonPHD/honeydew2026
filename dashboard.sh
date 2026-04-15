#!/bin/bash
# HoneyDew2026 Service Dashboard
# Shows real-time status of all services

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         HoneyDew2026 Service Dashboard                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Function to check service
check_service() {
    local name=$1
    local url=$2
    local port=$3
    
    if curl -s --fail -o /dev/null "$url" 2>/dev/null; then
        echo "  [$port] $name     ✓ Running"
        return 0
    else
        echo "  [$port] $name     ✗ Stopped"
        return 1
    fi
}

# Function to get response time
get_response_time() {
    local url=$1
    curl -s -o /dev/null -w "%{time_total}" "$url" 2>/dev/null || echo "N/A"
}

# Function to get status code
get_status_code() {
    local url=$1
    curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000"
}

echo "─── Services ─────────────────────────────────────────────────────"
echo ""

# Check HoneyDew services
check_service "Frontend SPA" "http://localhost:3021/" "3021"
check_service "Backend API" "http://localhost:8017/api/products/" "8017"
check_service "API Docs" "http://localhost:8017/docs" "8017/docs"

echo ""
echo "─── External Services ───────────────────────────────────────────"
echo ""

# Check external services
check_service "VexPivot Gateway" "http://localhost:3132/" "3132"
check_service "Agent Backend" "http://localhost:6000/" "6000"

echo ""
echo "─── Response Times ──────────────────────────────────────────────"
echo ""

printf "  %-20s %s\n" "Frontend SPA" "$(get_response_time http://localhost:3021/)s"
printf "  %-20s %s\n" "Backend API" "$(get_response_time http://localhost:8017/api/products/)s"

echo ""
echo "─── Process Info ────────────────────────────────────────────────"
echo ""

# Count relevant processes
backend_count=$(ps aux | grep "uvicorn.*8017" | grep -v grep | wc -l)
frontend_count=$(ps aux | grep "vite" | grep -v grep | wc -l)

printf "  %-20s %d processes\n" "Backend workers" "$backend_count"
printf "  %-20s %d processes\n" "Frontend workers" "$frontend_count"

echo ""
echo "─── Resource Usage ─────────────────────────────────────────────"
echo ""

# Get CPU and memory for uvicorn processes
ps aux | grep "uvicorn.*8017" | grep -v grep | awk '{sum_cpu+=$3; sum_mem+=$4} END {printf "  %-20s CPU: %.1f%% MEM: %.1f%%\n", "Backend", sum_cpu, sum_mem}'

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Run './health_check.sh' for detailed health report            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
