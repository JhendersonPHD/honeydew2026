#!/usr/bin/env python3
"""
HoneyDew2026 Database Inspector
Usage: python db_inspect.py [table_name]
"""

import sys
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "backend" / "honeydew.db"

def get_tables():
    """Get all table names."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    conn.close()
    return tables

def inspect_table(table_name):
    """Inspect a specific table."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get table info
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()
    
    # Get row count
    cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
    count = cursor.fetchone()[0]
    
    # Get sample rows
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
    rows = cursor.fetchall()
    
    conn.close()
    
    print(f"\n{'='*60}")
    print(f"Table: {table_name}")
    print(f"{'='*60}")
    print(f"Row count: {count}")
    print(f"\nColumns:")
    for col in columns:
        print(f"  {col[1]:20} {col[2]}")
    
    if rows:
        print(f"\nSample rows (up to 5):")
        for i, row in enumerate(rows, 1):
            print(f"  [{i}] {row}")
    else:
        print("\n(No data)")
    
    return columns, count, rows

def main():
    if not DB_PATH.exists():
        print(f"Database not found: {DB_PATH}")
        print("Run ./setup.sh first")
        sys.exit(1)
    
    tables = get_tables()
    
    if len(sys.argv) > 1:
        table_name = sys.argv[1]
        if table_name not in tables:
            print(f"Table '{table_name}' not found. Available tables:")
            for t in tables:
                print(f"  - {t}")
            sys.exit(1)
        inspect_table(table_name)
    else:
        print("HoneyDew2026 Database Inspector")
        print(f"Database: {DB_PATH}")
        print(f"\nAvailable tables:")
        for t in tables:
            print(f"  - {t}")
        print(f"\nUsage: python db_inspect.py <table_name>")
        
        # Inspect all tables
        for t in tables:
            inspect_table(t)

if __name__ == "__main__":
    main()
