# HoneyDew2026 — Services Down Recovery

**Date:** 2026-04-14 00:00 UTC  
**Status:** Services Unavailable

---

## Quick Recovery

```bash
cd /home/jonathon/VexPivot/projects/honeydew2026

# Stop any stale processes
pkill -f "uvicorn.*8017" 2>/dev/null || true
pkill -f "vite.*3021" 2>/dev/null || true

# Restart services
./start_services.sh

# Check health
./health_check.sh
```

---

## Port Conflicts

If port 3021 or 8017 is in use:

```bash
# Find what's using the port
lsof -i:3021
lsof -i:8017

# Kill the process
kill -9 <PID>

# Or kill all node/python processes on those ports
fuser -k 3021/tcp 2>/dev/null || true
fuser -k 8017/tcp 2>/dev/null || true
```

---

## Process Management

```bash
# View running processes
ps aux | grep -E "uvicorn|vite|node" | grep -v grep

# Kill all project processes
pkill -f "honeydew" 2>/dev/null || true
pkill -f "8017" 2>/dev/null || true
pkill -f "3021" 2>/dev/null || true

# Start fresh
./start_services.sh
```

---

## Last Known Good State

- Backend: port 8017
- Frontend: port 3021
- Database: SQLite at `backend/honeydew.db`

---

## Emergency Reset

```bash
./reset.sh --force
./setup.sh
./start_services.sh
./health_check.sh
```
