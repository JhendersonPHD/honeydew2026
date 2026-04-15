# HoneyDew2026 Project Index

Complete listing of all project files.

## Documentation Files

| File | Description |
|------|-------------|
| [README.md](README.md) | Project overview, quick start, architecture |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Detailed deployment guide |
| [API_REFERENCE.md](API_REFERENCE.md) | Complete API documentation |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues and solutions |
| [SUPPORT.md](SUPPORT.md) | Support resources and diagnostics |
| [CHANGELOG.md](CHANGELOG.md) | Project changelog |
| [LICENSE](LICENSE) | MIT License |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [SECURITY.md](SECURITY.md) | Security policy |
| [ROADMAP.md](ROADMAP.md) | Future plans |
| [INDEX.md](INDEX.md) | This file - project file listing |

## Configuration Files

| File | Description |
|------|-------------|
| `.env.example` | Environment variables template |
| `.dockerignore` | Docker build ignore file |
| `Makefile` | Task automation |
| `docker-compose.yml` | Docker orchestration |

## Docker Files

| File | Description |
|------|-------------|
| `docker-compose.yml` | Multi-container Docker setup |
| `backend/Dockerfile` | Backend container image |
| `frontend/Dockerfile` | Frontend container image |

## Scripts

| File | Description |
|------|-------------|
| `start_services.sh` | Start all HoneyDew services |
| `stop_services.sh` | Stop all HoneyDew services |
| `frontend/dist/serve_spa.py` | SPA server with API proxy |

## Frontend Source

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main App component
│   ├── main.jsx       # Entry point
│   ├── index.css      # Global styles
│   └── App.css        # Component styles
├── dist/              # Production build
│   ├── index.html     # HTML entry
│   ├── assets/        # Bundled assets
│   └── serve_spa.py   # SPA server
└── package.json
```

## Backend Source

```
backend/
├── app/
│   ├── main.py        # FastAPI app
│   ├── routers/       # API routes
│   └── models/        # Data models
├── honeydew.db        # SQLite database
├── seed.py            # Database seeder
└── requirements.txt   # Python dependencies
```

## Assets

```
assets/
└── visual/
    ├── app-icon-honeydew.png
    ├── component-cart-item.png
    ├── component-checkout-button.png
    ├── component-farm-card.png
    ├── component-product-card.png
    ├── empty-state-cart.png
    └── design-tokens.css
```

## Quick Reference

### Start Services
```bash
./start_services.sh
```

### Run Tests
```bash
make check
```

### Build Frontend
```bash
cd frontend && npm run build
```

### Docker Deployment
```bash
docker-compose up -d
```

### API Health Check
```bash
curl http://localhost:3021/api/products/
```

---

**Total Files:** 30+
**Documentation:** 11 files
**Docker:** 3 files
**Scripts:** 3 files