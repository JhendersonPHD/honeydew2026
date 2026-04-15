#!/usr/bin/env python3
"""
HoneyDew2026 Database Migration Script
Usage: python migrate_db.py [--backup] [--restore]

This script manages database migrations for the HoneyDew SQLite database.
"""

import sqlite3
import shutil
import argparse
from datetime import datetime
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "backend" / "honeydew.db"
BACKUP_DIR = Path(__file__).parent.parent / "backups"


def backup_database():
    """Create a timestamped backup of the database."""
    if not DB_PATH.exists():
        print(f"Database not found at {DB_PATH}")
        return False
    
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = BACKUP_DIR / f"honeydew_{timestamp}.db"
    backup_path.with_suffix(".backup").write_text(f"Backup: {timestamp}")
    
    shutil.copy2(DB_PATH, backup_path)
    print(f"Backed up database to: {backup_path}")
    return True


def restore_database(backup_file):
    """Restore database from a backup file."""
    backup_path = BACKUP_DIR / backup_file
    if not backup_path.exists():
        print(f"Backup file not found: {backup_path}")
        return False
    
    # Stop services first (in production)
    # Create a pre-restore backup
    backup_database()
    
    shutil.copy2(backup_path, DB_PATH)
    print(f"Restored database from: {backup_path}")
    return True


def show_tables():
    """Show all tables in the database."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()
    print("\nTables in database:")
    print("-" * 40)
    for table in tables:
        cursor.execute(f"SELECT COUNT(*) FROM {table[0]}")
        count = cursor.fetchone()[0]
        print(f"  {table[0]:<20} {count:>6} rows")
    conn.close()


def show_schema(table_name=None):
    """Show schema for tables."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    if table_name:
        cursor.execute(f"SELECT sql FROM sqlite_master WHERE name='{table_name}'")
    else:
        cursor.execute("SELECT sql FROM sqlite_master WHERE type='table'")
    
    schemas = cursor.fetchall()
    print("\nDatabase Schema:")
    print("-" * 40)
    for schema in schemas:
        print(schema[0] if schema[0] else "N/A")
        print()
    conn.close()


def run_migration(migration_name, sql):
    """Run a specific migration."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if migration already ran
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='migrations'")
    if not cursor.fetchone():
        cursor.execute("CREATE TABLE migrations (name TEXT, applied TEXT)")
        conn.commit()
    
    cursor.execute("SELECT name FROM migrations WHERE name=?", (migration_name,))
    if cursor.fetchone():
        print(f"Migration '{migration_name}' already applied")
        conn.close()
        return False
    
    # Apply migration
    cursor.executescript(sql)
    cursor.execute("INSERT INTO migrations (name, applied) VALUES (?, ?)", 
                   (migration_name, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    print(f"Applied migration: {migration_name}")
    return True


def main():
    parser = argparse.ArgumentParser(description="HoneyDew2026 Database Migrations")
    parser.add_argument("--backup", action="store_true", help="Create database backup")
    parser.add_argument("--restore", metavar="FILE", help="Restore from backup")
    parser.add_argument("--tables", action="store_true", help="Show tables")
    parser.add_argument("--schema", metavar="TABLE", nargs="?", const=True, help="Show schema")
    args = parser.parse_args()
    
    if args.backup:
        backup_database()
    elif args.restore:
        restore_database(args.restore)
    elif args.tables:
        show_tables()
    elif args.schema is not None:
        show_schema(args.schema if args.schema is not True else None)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
