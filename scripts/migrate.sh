#!/bin/bash
# HoneyDew2026 Database Migration Script
# Usage: ./migrate.sh [up|down|status]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DB_PATH="${DB_PATH:-$SCRIPT_DIR/backend/honeydew.db}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "=========================================="
echo "   HoneyDew2026 Migration"
echo "=========================================="
echo ""

# Check database exists
if [ ! -f "$DB_PATH" ]; then
    echo -e "${RED}✗ Database not found at $DB_PATH${NC}"
    echo "Run ./setup.sh first"
    exit 1
fi

echo "Database: $DB_PATH"
echo ""

# Check if SQLite
if ! file "$DB_PATH" | grep -q "SQLite"; then
    echo -e "${RED}✗ Not a SQLite database${NC}"
    exit 1
fi

echo -e "${GREEN}✓ SQLite database found${NC}"
echo ""

# Show current schema version if table exists
echo "Checking schema..."
if sqlite3 "$DB_PATH" "SELECT name FROM sqlite_master WHERE type='table' AND name='alembic_version';" 2>/dev/null | grep -q "alembic_version"; then
    VERSION=$(sqlite3 "$DB_PATH" "SELECT * FROM alembic_version;" 2>/dev/null || echo "unknown")
    echo "Alembic version: $VERSION"
else
    echo "No Alembic version table (may be using simple migrations)"
fi

# Show table count
TABLE_COUNT=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';" 2>/dev/null)
echo "Tables: $TABLE_COUNT"

# List tables
echo ""
echo "Tables in database:"
sqlite3 "$DB_PATH" ".tables" 2>/dev/null | tr ' ' '\n'

echo ""
echo "=========================================="
echo "Migration commands:"
echo "  ./migrate.sh up    - Apply migrations"
echo "  ./migrate.sh down  - Rollback migrations"
echo "  ./migrate.sh status - Show status"
echo "=========================================="
