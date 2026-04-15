#!/bin/bash
# HoneyDew2026 Database Migration Script
# Usage: ./migrate.sh [--seed] [--fresh]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "   HoneyDew2026 Database Migration"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check for --fresh flag
FRESH=false
if [ "$1" = "--fresh" ]; then
    FRESH=true
fi

# Check for --seed flag
SEED=false
if [ "$1" = "--seed" ]; then
    SEED=true
fi

# Stop services
echo "Stopping services..."
./stop_services.sh 2>/dev/null || true

# Backup existing database
if [ -f "$SCRIPT_DIR/backend/honeydew.db" ]; then
    BACKUP_FILE="$SCRIPT_DIR/backups/honeydew_$(date +%Y%m%d_%H%M%S).db"
    mkdir -p "$SCRIPT_DIR/backups"
    cp "$SCRIPT_DIR/backend/honeydew.db" "$BACKUP_FILE"
    echo -e "${GREEN}✓${NC} Backed up database to: $BACKUP_FILE"
fi

# Remove existing database
if [ "$FRESH" = true ]; then
    echo "Removing existing database..."
    rm -f "$SCRIPT_DIR/backend/honeydew.db"
    echo -e "${GREEN}✓${NC} Database removed"
fi

# Create new database
echo ""
echo "Creating database..."
cd "$SCRIPT_DIR/backend"

# Initialize database
if [ -f "init_db.py" ]; then
    source .venv/bin/activate 2>/dev/null || true
    python init_db.py
    echo -e "${GREEN}✓${NC} Database initialized"
fi

# Seed data
if [ "$SEED" = true ] || [ "$FRESH" = true ]; then
    echo ""
    echo "Seeding database..."
    if [ -f "seed.py" ]; then
        python seed.py
        echo -e "${GREEN}✓${NC} Database seeded"
    fi
fi

# Start services
echo ""
echo "Starting services..."
cd "$SCRIPT_DIR"
./start_services.sh

echo ""
echo "=========================================="
echo -e "   ${GREEN}Migration complete!${NC}"
echo "=========================================="
echo ""
echo "Run ./health_check.sh to verify"
echo ""
