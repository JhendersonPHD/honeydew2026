#!/usr/bin/env python3
"""Reset and re-seed the HoneyDew 2026 database with correct farm data.

This script:
1. Deletes the existing database
2. Creates a fresh database with correct schema
3. Seeds it with proper farm produce data from seed.py

Run from backend directory: python reset_seed.py
"""
import os
import sys

def reset_and_seed():
    db_path = "honeydew.db"
    db_path_backup = "honeydew.db.old"
    
    # Remove old backup if exists
    if os.path.exists(db_path_backup):
        os.remove(db_path_backup)
    
    # Backup existing database
    if os.path.exists(db_path):
        os.rename(db_path, db_path_backup)
        print(f"Backed up old database to {db_path_backup}")
    
    # Import and run seed
    sys.path.insert(0, ".")
    from seed import seed
    seed()
    
    print("\nReset complete! Database now has correct farm produce data.")

if __name__ == "__main__":
    reset_and_seed()
