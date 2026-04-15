#!/bin/bash
# HoneyDew2026 - Interactive Service Manager
# Usage: ./manage.sh [command]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Service ports
FRONTEND_PORT=3021
BACKEND_PORT=8017
DOCS_PORT=8017

show_menu() {
    echo ""
    echo "=========================================="
    echo "   HoneyDew2026 Service Manager"
    echo "=========================================="
    echo ""
    echo "1) Start services"
    echo "2) Stop services"
    echo "3) Restart services"
    echo "4) Health check"
    echo "5) View logs"
    echo "6) Update project"
    echo "7) Backup data"
    echo "8) Reset project"
    echo "9) Shell into backend"
    echo "10) Rebuild everything"
    echo "0) Exit"
    echo ""
    echo -n "Select option: "
}

show_status() {
    echo ""
    echo "=========================================="
    echo "   Service Status"
    echo "=========================================="
    echo ""
    
    # Check Frontend
    if lsof -i:$FRONTEND_PORT &>/dev/null; then
        echo -e "${GREEN}✓${NC} Frontend (port $FRONTEND_PORT) - RUNNING"
    else
        echo -e "${RED}✗${NC} Frontend (port $FRONTEND_PORT) - STOPPED"
    fi
    
    # Check Backend
    if lsof -i:$BACKEND_PORT &>/dev/null; then
        echo -e "${GREEN}✓${NC} Backend API (port $BACKEND_PORT) - RUNNING"
    else
        echo -e "${RED}✗${NC} Backend API (port $BACKEND_PORT) - STOPPED"
    fi
    
    echo ""
}

case "${1:-interactive}" in
    start)
        ./start_services.sh
        ;;
    stop)
        ./stop_services.sh
        ;;
    restart)
        ./stop_services.sh
        sleep 1
        ./start_services.sh
        ;;
    status)
        show_status
        ;;
    health)
        ./health_check.sh
        ;;
    logs)
        ./logs.sh
        ;;
    update)
        ./update.sh
        ;;
    backup)
        ./backup.sh
        ;;
    reset)
        ./reset.sh
        ;;
    shell)
        docker-compose exec backend /bin/bash 2>/dev/null || \
        docker exec -it honeydew2026_backend /bin/bash 2>/dev/null || \
        echo "Docker not configured. Use: cd backend && source .venv/bin/activate"
        ;;
    rebuild)
        docker-compose down --rmi local 2>/dev/null || true
        docker-compose up -d --build
        ;;
    interactive)
        while true; do
            show_menu
            read choice
            case $choice in
                1) ./start_services.sh; echo -e "\n${GREEN}Done${NC}";;
                2) ./stop_services.sh; echo -e "\n${GREEN}Done${NC}";;
                3) ./stop_services.sh; sleep 1; ./start_services.sh; echo -e "\n${GREEN}Done${NC}";;
                4) ./health_check.sh;;
                5) ./logs.sh;;
                6) ./update.sh;;
                7) ./backup.sh;;
                8) ./reset.sh --force;;
                9) docker exec -it honeydew2026_backend /bin/bash 2>/dev/null || echo "Container not found";;
                10) docker-compose down --rmi local 2>/dev/null; docker-compose up -d --build; echo -e "\n${GREEN}Rebuilt${NC}";;
                0) echo "Goodbye!"; exit 0;;
                *) echo -e "${RED}Invalid option${NC}";;
            esac
        done
        ;;
    *)
        echo "Usage: ./manage.sh [command]"
        echo ""
        echo "Commands:"
        echo "  start     - Start all services"
        echo "  stop      - Stop all services"
        echo "  restart   - Restart all services"
        echo "  status    - Show service status"
        echo "  health    - Run health check"
        echo "  logs      - View logs"
        echo "  update    - Update project"
        echo "  backup    - Backup data"
        echo "  reset     - Reset project"
        echo "  shell     - Shell into backend container"
        echo "  rebuild   - Rebuild Docker containers"
        echo "  interactive - Show interactive menu"
        echo ""
        echo "Run without arguments for interactive mode."
        exit 1
        ;;
esac