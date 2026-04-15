#!/bin/bash
# HoneyDew2026 Development Tools
# Usage: ./devtools.sh [command]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

show_help() {
    cat << EOF
HoneyDew2026 Development Tools

Commands:
    api          Test API endpoints
    db           Open database shell
    logs         Tail backend logs
    console      Open backend Python console
    seed         Re-seed database
    clean        Clean cache and build files
    help         Show this help

EOF
}

case "${1:-help}" in
    api)
        echo "Testing API endpoints..."
        echo ""
        echo "Products:"
        curl -s http://localhost:8017/api/products/ | python3 -m json.tool 2>/dev/null | head -30
        echo ""
        echo "Farms:"
        curl -s http://localhost:8017/api/farms/ | python3 -m json.tool 2>/dev/null | head -20
        echo ""
        echo "Categories:"
        curl -s http://localhost:8017/api/categories/ | python3 -m json.tool 2>/dev/null | head -20
        ;;
    db)
        echo "Opening database shell..."
        cd "$SCRIPT_DIR/backend"
        if [ -d ".venv" ]; then
            source .venv/bin/activate
        fi
        sqlite3 honeydew.db
        ;;
    logs)
        if [ -f "$SCRIPT_DIR/backend/app.log" ]; then
            tail -100 "$SCRIPT_DIR/backend/app.log"
        else
            echo "No log file found. Services may not be logging to file."
        fi
        ;;
    console)
        echo "Opening Python console with FastAPI app..."
        cd "$SCRIPT_DIR/backend"
        if [ -d ".venv" ]; then
            source .venv/bin/activate
        fi
        python3 -c "from main import app; print('FastAPI app loaded:', app)"
        ;;
    seed)
        echo "Re-seeding database..."
        cd "$SCRIPT_DIR/backend"
        if [ -d ".venv" ]; then
            source .venv/bin/activate
        fi
        python3 -c "import seed; seed.seed_all()" 2>/dev/null || python3 seed.py 2>/dev/null || echo "Seed script not found"
        ;;
    clean)
        echo "Cleaning cache and build files..."
        find "$SCRIPT_DIR" -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
        find "$SCRIPT_DIR" -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
        find "$SCRIPT_DIR" -type d -name "node_modules/.cache" -exec rm -rf {} + 2>/dev/null || true
        rm -rf "$SCRIPT_DIR/frontend/dist" 2>/dev/null || true
        echo "Clean complete."
        ;;
    help|*)
        show_help
        ;;
esac
