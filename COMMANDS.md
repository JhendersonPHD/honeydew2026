# HoneyDew2026 Commands Cheatsheet

## Daily Commands

| Task | Command |
|------|---------|
| Start services | `./start_services.sh` |
| Stop services | `./stop_services.sh` |
| Health check | `./health_check.sh` |
| View logs | `./logs.sh` |
| Follow logs | `./logs.sh -f` |

## Development

| Task | Command |
|------|---------|
| Setup project | `./setup.sh` |
| Update project | `./update.sh` |
| Reset all | `./reset.sh` |
| Backup data | `./backup.sh` |
| View quickref | `cat QUICKREF.md` |

## Docker

| Task | Command |
|------|---------|
| Start containers | `docker-compose up -d` |
| Stop containers | `docker-compose down` |
| View logs | `docker-compose logs -f` |
| Check status | `docker-compose ps` |
| Rebuild | `docker-compose up -d --build` |

## Service URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3021 |
| Backend API | http://localhost:8017 |
| API Docs | http://localhost:8017/docs |
| Health | http://localhost:8017/api/products/ |

## Quick Status

```bash
./health_check.sh && echo "All healthy!" || echo "Issues found"
```
