# HoneyDew2026 Quick Reference

## Essential Commands

| Action | Command |
|--------|---------|
| First setup | `./setup.sh` |
| Start services | `./start_services.sh` |
| Stop services | `./stop_services.sh` |
| Health check | `./health_check.sh` |
| Build frontend | `cd frontend && npm run build` |
| Docker up | `docker-compose up -d` |
| Docker down | `docker-compose down` |

## Services

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3021 |
| Backend API | http://localhost:8017 |
| API Docs | http://localhost:8017/docs |

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| GET /api/products/ | List products |
| GET /api/farms/ | List farms |
| GET /api/categories/ | List categories |
| POST /api/auth/register | Register |
| POST /api/auth/login | Login |

## Theme Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Amber | #F59E0B | Primary |
| Warm Cream | #FFFBEB | Background |
| Emerald | #10B981 | Secondary |

## Files

- Scripts: `start_services.sh`, `stop_services.sh`, `health_check.sh`, `setup.sh`
- Docs: `README.md`, `API_REFERENCE.md`, `TROUBLESHOOTING.md`
- Docker: `docker-compose.yml`

## Make Targets

```bash
make help      # Show all commands
make install   # Install dependencies
make dev       # Development servers
make start     # Production services
make status    # Check status
make health    # Health checks
make stop      # Stop services
make check     # API tests
```
