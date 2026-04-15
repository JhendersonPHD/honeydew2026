#!/bin/bash
# HoneyDew2026 CLI Tool
# Usage: ./honeydew.sh <command>

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

show_help() {
    cat << EOF
HoneyDew2026 CLI

Commands:
    start       Start all services
    stop        Stop all services
    restart     Restart all services
    status      Show service status
    health      Run health check
    logs        View service logs
    update      Update project
    backup      Backup data
    reset       Reset project
    help        Show this help

Examples:
    ./honeydew.sh start
    ./honeydew.sh health
    ./honeydew.sh logs -f
EOF
}

case "${1:-help}" in
    start)
        shift
        "$SCRIPT_DIR/start_services.sh" "$@"
        ;;
    stop)
        shift
        "$SCRIPT_DIR/stop_services.sh" "$@"
        ;;
    restart)
        "$SCRIPT_DIR/stop_services.sh"
        sleep 1
        "$SCRIPT_DIR/start_services.sh"
        ;;
    status)
        echo "Frontend (3021): $(curl -s http://localhost:3021/ -o /dev/null -w '%{http_code}')"
        echo "Backend  (8017): $(curl -s http://localhost:8017/api/products/ -o /dev/null -w '%{http_code}')"
        ;;
    health)
        "$SCRIPT_DIR/health_check.sh"
        ;;
    logs)
        shift
        "$SCRIPT_DIR/logs.sh" "$@"
        ;;
    update)
        "$SCRIPT_DIR/update.sh"
        ;;
    backup)
        "$SCRIPT_DIR/backup.sh"
        ;;
    reset)
        "$SCRIPT_DIR/reset.sh"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
