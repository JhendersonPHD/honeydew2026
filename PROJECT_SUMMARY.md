# HoneyDew2026 — Project Summary

**Status:** Production Ready  
**Last Updated:** 2026-04-13

---

## Overview

HoneyDew2026 is a full-stack e-commerce platform for artisanal honey products, featuring a FastAPI backend with SQLite and a React frontend with Vite.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite 5 |
| Backend | FastAPI + SQLAlchemy |
| Database | SQLite |
| API | RESTful JSON |
| Container | Docker + Docker Compose |

---

## Services

| Service | Port | URL |
|---------|------|-----|
| Frontend SPA | 3021 | http://localhost:3021 |
| Backend API | 8017 | http://localhost:8017 |
| API Docs | 8017 | http://localhost:8017/docs |

---

## Quick Start

```bash
./setup.sh      # First time setup
./start.sh     # Start all services
./health.sh    # Health check
```

---

## API Endpoints

### Products
- `GET /api/products/` — List all products
- `GET /api/products/{id}` — Get product by ID
- `POST /api/products/` — Create product (admin)
- `PUT /api/products/{id}` — Update product (admin)
- `DELETE /api/products/{id}` — Delete product (admin)

### Farms
- `GET /api/farms/` — List all farms
- `GET /api/farms/{id}` — Get farm by ID

### Categories
- `GET /api/categories/` — List all categories

---

## Project Files

| Category | Count |
|----------|-------|
| Documentation | 13 files |
| Configuration | 6 files |
| Scripts | 8 files |
| Docker | 3 files |

**Total: 30 files**

---

## Theme Colors

| Purpose | Color | Hex |
|---------|-------|-----|
| Background | Warm Cream | #FFFBEB |
| Primary | Amber | #F59E0B |
| Text | Dark Brown | #44403C |

---

## Issue Status

**VEX-1045:** CSS Theme — FIXED, awaiting QA verification

---

## Support

- Documentation: See docs/ directory
- API Docs: http://localhost:8017/docs
- Troubleshooting: TROUBLESHOOTING.md
