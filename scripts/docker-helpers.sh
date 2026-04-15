#!/bin/bash
# HoneyDew2026 Docker Helper Script
# Usage: ./docker-helpers.sh [command]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

show_help() {
    echo "HoneyDew2026 Docker Helper"
    echo ""
    echo "Usage: ./docker-helpers.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start       Start all services"
    echo "  stop        Stop all services"
    echo "  restart     Restart all services"
    echo "  status      Show service status"
    echo "  logs        Show recent logs"
    echo "  tail        Follow logs (Ctrl+C to stop)"
    echo "  ps          Show running containers"
    echo "  cleanup     Remove stopped containers and images"
    echo "  rebuild     Rebuild and restart services"
    echo "  help        Show this help"
    echo ""
}

cmd_start() {
    echo -e "${GREEN}Starting services...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✓ Services started${NC}"
}

cmd_stop() {
    echo -e "${YELLOW}Stopping services...${NC}"
    docker-compose down
    echo -e "${YELLOW}✓ Services stopped${NC}"
}

cmd_restart() {
    echo -e "${YELLOW}Restarting services...${NC}"
    docker-compose restart
    echo -e "${GREEN}✓ Services restarted${NC}"
}

cmd_status() {
    echo "Service Status:"
    docker-compose ps
}

cmd_logs() {
    docker-compose logs --tail=50
}

cmd_tail() {
    echo -e "${YELLOW}Following logs (Ctrl+C to stop)...${NC}"
    docker-compose logs -f
}

cmd_ps() {
    docker ps --filter "name=honeydew" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

cmd_cleanup() {
    echo -e "${YELLOW}Cleaning up...${NC}"
    docker-compose down -v --rmi local 2>/dev/null || true
    echo -e "${GREEN}✓ Cleanup complete${NC}"
}

cmd_rebuild() {
    echo -e "${YELLOW}Rebuilding services...${NC}"
    docker-compose up -d --build
    echo -e "${GREEN}✓ Rebuild complete${NC}"
}

# Main
cd "$PROJECT_DIR"

case "${1:-help}" in
    start)    cmd_start ;;
    stop)     cmd_stop ;;
    restart)  cmd_restart ;;
    status)   cmd_status ;;
    logs)     cmd_logs ;;
    tail)     cmd_tail ;;
    ps)       cmd_ps ;;
    cleanup)  cmd_cleanup ;;
    rebuild)  cmd_rebuild ;;
    help)     show_help ;;
    *)        echo -e "${RED}Unknown command: $1${NC}"; show_help; exit 1 ;;
esac
