#!/bin/bash
# HoneyDew2026 Backup Script
# Usage: ./backup.sh [--restore]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$SCRIPT_DIR/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="honeydew_backup_$TIMESTAMP.tar.gz"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "=========================================="
echo "   HoneyDew2026 Backup"
echo "=========================================="
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

do_backup() {
    echo "Creating backup..."
    
    # Backup database
    if [ -f "$SCRIPT_DIR/backend/honeydew.db" ]; then
        cp "$SCRIPT_DIR/backend/honeydew.db" "$BACKUP_DIR/honeydew.db.$TIMESTAMP"
        echo -e "${GREEN}✓${NC} Database backed up"
    else
        echo -e "${YELLOW}!${NC} Database not found"
    fi
    
    # Backup frontend dist
    if [ -d "$SCRIPT_DIR/frontend/dist" ]; then
        tar -czf "$BACKUP_DIR/frontend_dist.$TIMESTAMP.tar.gz" -C "$SCRIPT_DIR/frontend" dist/
        echo -e "${GREEN}✓${NC} Frontend dist backed up"
    fi
    
    # Backup configuration files
    tar -czf "$BACKUP_DIR/config.$TIMESTAMP.tar.gz" \
        -C "$SCRIPT_DIR" \
        docker-compose.yml \
        .env.example \
        Makefile \
        2>/dev/null || true
    echo -e "${GREEN}✓${NC} Config files backed up"
    
    # Create full archive
    tar -czf "$BACKUP_DIR/$BACKUP_FILE" \
        -C "$BACKUP_DIR" \
        "honeydew.db.$TIMESTAMP" \
        "frontend_dist.$TIMESTAMP.tar.gz" \
        "config.$TIMESTAMP.tar.gz" \
        2>/dev/null || true
    
    echo ""
    echo -e "${GREEN}Backup complete!${NC}"
    echo "Backup file: $BACKUP_DIR/$BACKUP_FILE"
    echo ""
    
    # List backups
    echo "Available backups:"
    ls -lh "$BACKUP_DIR"/*.tar.gz 2>/dev/null | tail -5 || echo "No backups found"
}

do_restore() {
    echo "Available backups:"
    ls -lh "$BACKUP_DIR"/*.tar.gz 2>/dev/null || { echo "No backups found"; exit 1; }
    
    echo ""
    read -p "Enter backup file to restore: " backup_file
    
    if [ ! -f "$BACKUP_DIR/$backup_file" ]; then
        echo -e "${RED}Error: Backup file not found${NC}"
        exit 1
    fi
    
    echo "Restoring from $backup_file..."
    
    # Extract archive
    tar -xzf "$BACKUP_DIR/$backup_file" -C "$BACKUP_DIR"
    
    # Restore database
    if [ -f "$BACKUP_DIR/honeydew.db.$TIMESTAMP" ]; then
        cp "$BACKUP_DIR/honeydew.db.$TIMESTAMP" "$SCRIPT_DIR/backend/honeydew.db"
        echo -e "${GREEN}✓${NC} Database restored"
    fi
    
    # Restore frontend dist
    if [ -f "$BACKUP_DIR/frontend_dist.$TIMESTAMP.tar.gz" ]; then
        tar -xzf "$BACKUP_DIR/frontend_dist.$TIMESTAMP.tar.gz" -C "$SCRIPT_DIR/frontend"
        echo -e "${GREEN}✓${NC} Frontend dist restored"
    fi
    
    echo ""
    echo -e "${GREEN}Restore complete!${NC}"
    echo "Restart services for changes to take effect."
}

case "$1" in
    --restore)
        do_restore
        ;;
    *)
        do_backup
        ;;
esac
