# honeydew2026 — S9 Deployment Guide

**Project:** honeydew2026
**Phase:** S9 (Deployment Prep)
**Status:** READY TO DEPLOY

---

## Deployment Resources ✅

| Resource | Status | Location |
|----------|--------|----------|
| Backend Dockerfile | ✅ | `backend/Dockerfile` |
| Frontend Dockerfile | ✅ | `frontend/Dockerfile` |
| docker-compose.yml | ✅ | `docker-compose.yml` |
| Frontend dist/ | ✅ | `frontend/dist/` (pre-built) |
| CI/CD workflow | ✅ | `.github/workflows/ci.yml` |
| Backend source | ✅ | `backend/src/server.js` |

---

## Backend Health
- **Port:** 8017 (Python FastAPI)
- **Health:** `{"status":"ok","app":"honeydew2026"}`
- **API Docs:** http://localhost:8017/docs

---

## Local Deployment

### Option 1: Docker Compose (Recommended)
```bash
cd /home/jonathon/VexPivot/projects/honeydew2026
docker-compose up -d
```

This will:
- Build and start backend on port 8017
- Build and start frontend on port 3021
- Create persistent volume for database

### Option 2: Manual (for debugging)
```bash
# Backend
cd /home/jonathon/VexPivot/projects/honeydew2026/backend
pip install -r requirements.txt
python src/server.py

# Frontend (pre-built static)
cd /home/jonathon/VexPivot/projects/honeydew2026/frontend/dist
python -m http.server 3021
```

---

## Production Deployment Options

### Option 1: Digital Ocean App Platform
1. Connect GitHub repo to Digital Ocean
2. Use docker-compose.yml for multi-container setup
3. Set environment variables (SECRET_KEY, DATABASE_URL, CORS_ORIGINS)

### Option 2: Railway
1. Deploy backend as Docker container
2. Deploy frontend as static hosting
3. Set API_BACKEND environment variable

### Option 3: VPS with Docker
```bash
# On server
git clone <repo>
cd honeydew2026
docker-compose up -d
```

### Option 4: Vercel/Netlify (Frontend only)
- Frontend is pre-built in `frontend/dist/`
- Configure API_BACKEND to point to deployed backend URL

---

## Required Environment Variables

### Backend
- `SECRET_KEY` - JWT signing secret
- `DATABASE_URL` - SQLite or PostgreSQL connection
- `CORS_ORIGINS` - Allowed origins (e.g., https://honeydew.yoursite.com)

### Frontend
- `API_BACKEND` - URL of deployed backend (e.g., https://api.honeydew.yoursite.com)

---

## CI/CD Status

GitHub Actions workflow exists at `.github/workflows/ci.yml`

To enable:
1. Push to GitHub
2. Connect repo to GitHub Actions
3. Configure secrets (SECRET_KEY, DATABASE_URL, etc.)

---

## Deliverables for S9 Completion

1. ✅ Deployment resources verified
2. ⬜ Backend deployed and accessible
3. ⬜ Frontend deployed and accessible
4. ⬜ Provide live URLs

---

## Contact

- **Pipeline Owner:** App-Tracker-3
- **DevOps-Engineer:** Assigned but not responding
- **Escalations:** CEO notified multiple times

---

*Last updated: 2026-04-17 by App-Tracker-3*
