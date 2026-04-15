# HoneyDew2026 Troubleshooting Guide

## Common Issues and Solutions

### Services Won't Start

**Symptom:** `./start_services.sh` fails or services exit immediately

**Diagnosis:**
```bash
# Check what's using the ports
lsof -i:3021  # Frontend
lsof -i:8017  # Backend
```

**Solutions:**

1. Kill existing processes on the ports:
```bash
kill $(lsof -t -i:3021)
kill $(lsof -t -i:8017)
```

2. Check if port already in use by another service:
```bash
# Option: change port in .env
echo "PORT=3022" >> .env
```

3. Run services manually to see errors:
```bash
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload
cd frontend && npm run dev
```

### Backend Import Errors

**Symptom:** `ModuleNotFoundError` or `ImportError` when starting backend

**Solution:**
```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
```

### Frontend Build Failures

**Symptom:** `npm run build` fails

**Solutions:**

1. Clear node_modules and reinstall:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

2. Check for syntax errors:
```bash
npm run build 2>&1 | head -30
```

### CORS Errors in Browser

**Symptom:** "Access-Control-Allow-Origin" errors in browser console

**Solution:** Ensure CORS_ORIGINS includes your frontend URL:
```bash
# In .env
CORS_ORIGINS=http://localhost:3021,https://your-domain.com
```

### Database Issues

**Symptom:** "Database is locked" or "No such table" errors

**Solutions:**

1. Check database file exists:
```bash
ls -la backend/honeydew.db
```

2. Reset database:
```bash
cd backend
source .venv/bin/activate
python seed.py  # Recreates schema and seeds data
```

3. Full reset (WARNING: deletes all data):
```bash
./reset.sh --force
```

### Proxy Not Working

**Symptom:** API calls return 404 or timeout

**Diagnosis:**
```bash
curl http://localhost:3021/api/products/
curl http://localhost:8017/api/products/
```

**Solutions:**

1. Ensure Vite proxy config is correct in `vite.config.js`

2. Restart services:
```bash
./stop_services.sh
./start_services.sh
```

### Port Already in Use

**Symptom:** "Address already in use" error

**Find and kill the process:**
```bash
# Find PID using port
lsof -i :3021
lsof -i :8017

# Kill it
kill <PID>

# Or kill all related processes
pkill -f "uvicorn.*8017"
pkill -f "vite.*3021"
```

### Health Check Fails

**Symptom:** `./health_check.sh` reports services as unhealthy

**Diagnosis:**
```bash
# Test endpoints manually
curl http://localhost:3021/
curl http://localhost:8017/api/products/
curl http://localhost:8017/api/farms/
curl http://localhost:8017/api/categories/
```

**Solutions:**

1. Services may need more time to start:
```bash
sleep 5
./health_check.sh
```

2. Check service logs for errors

3. Restart services:
```bash
./stop_services.sh
./start_services.sh
```

### Docker Issues

**Symptom:** Docker containers won't start

**Solutions:**

1. Check Docker is running:
```bash
docker info
```

2. Clean up and rebuild:
```bash
docker-compose down -v
docker-compose up -d --build
```

3. Check container logs:
```bash
docker-compose logs --tail=50
```

### Git Issues

**Symptom:** Can't pull/push changes

**Solutions:**

1. Check git status:
```bash
git status
```

2. Stash changes if needed:
```bash
git stash
git pull
git stash pop
```

3. Force reset (WARNING: loses local changes):
```bash
git fetch origin
git reset --hard origin/main
```

## Diagnostic Commands

```bash
# Full diagnostics
./health_check.sh

# Check ports
lsof -i :3021 -i :8017

# Check processes
ps aux | grep -E "uvicorn|vite|node" | grep -v grep

# View recent logs
./logs.sh

# Test API directly
curl http://localhost:8017/api/products/ | python3 -m json.tool
```

## Getting Help

If issues persist:
1. Check TROUBLESHOOTING.md for more details
2. Run `./health_check.sh` and share output
3. Check service logs: `./logs.sh`
4. Review API_REFERENCE.md for endpoint details
