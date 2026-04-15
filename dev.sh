#!/bin/bash
# HoneyDew2026 Development Script
# Usage: ./dev.sh [command]
# Commands: start, stop, restart, status, logs, test

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMMAND="${1:-help}"

case "$COMMAND" in
    start)
        echo "Starting HoneyDew2026 development environment..."
        ./start_services.sh
        ;;
    stop)
        echo "Stopping HoneyDew2026..."
        ./stop_services.sh
        ;;
    restart)
        echo "Restarting HoneyDew2026..."
        ./stop_services.sh
        sleep 1
        ./start_services.sh
        ;;
    status)
        echo "Checking service status..."
        ./health_check.sh
        ;;
    logs)
        echo "Viewing logs..."
        ./logs.sh
        ;;
    test)
        echo "Running tests..."
        curl -s http://localhost:8017/api/products/ | head -c 200
        echo ""
        curl -s http://localhost:3017/ | head -c 200
        echo ""
        ;;
    help|*)
        echo "HoneyDew2026 Development Script"
        echo ""
        echo "Usage: ./dev.sh [command]"
        echo ""
        echo "Commands:"
        echo "  start    - Start development environment"
        echo "  stop     - Stop services"
        echo "  restart  - Restart services"
        echo "  status   - Check service health"
        echo "  logs     - View service logs"
        echo "  test     - Test API endpoints"
        echo "  help     - Show this help"
        echo ""
        ;;
esac