# HoneyDew2026 Support

## Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | Project overview, quick start, architecture |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Detailed deployment guide |
| [API_REFERENCE.md](API_REFERENCE.md) | Complete API documentation |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues and solutions |

---

## Quick Diagnosis

### Check Service Status
```bash
# All services (using Makefile)
make status

# Manual check
curl http://localhost:3021/           # Frontend
curl http://localhost:3021/api/       # API Proxy
curl http://localhost:8017/api/        # Backend API
```

### Run Health Checks
```bash
make health
# or
make check
```

---

## Service Information

### Frontend (SPA)
- **URL:** http://localhost:3021
- **Theme:** Warm cream (#FFFBEB) with amber (#F59E0B)
- **API Proxy:** All `/api/*` requests forwarded to backend

### Backend API
- **URL:** http://localhost:8017
- **API Docs:** http://localhost:8017/docs
- **Database:** SQLite (honeydew.db)
- **Products:** 14 products across 7 categories

### Docker Containers
- `honeydew2026-frontend` - Port 3021
- `honeydew2026-backend` - Port 8017

---

## Common Tasks

### Restart Services
```bash
./stop_services.sh && ./start_services.sh
# or
make restart
```

### View Logs
```bash
# Docker logs
docker-compose logs -f

# Backend logs (if running natively)
cd backend && source .venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8017 --reload
```

### Rebuild Frontend
```bash
cd frontend
npm run build
```

### Reset Database
```bash
cd backend
rm honeydew.db
python seed.py
```

---

## Reporting Issues

When reporting an issue, please include:

1. **What you were trying to do**
2. **What command/page you used**
3. **Expected behavior**
4. **Actual behavior**
5. **Error messages** (from console or logs)
6. **Service status** (output of `make status`)

---

## Service Ports Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend SPA | 3021 | http://localhost:3021 |
| Backend API | 8017 | http://localhost:8017 |
| API Docs | 8017 | http://localhost:8017/docs |
| Frontend Dev | 5173 | http://localhost:5173 (Vite) |

---

## Environment Variables

```bash
# Backend (.env)
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./honeydew.db
CORS_ORIGINS=http://localhost:3021
```

---

## Docker Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```
