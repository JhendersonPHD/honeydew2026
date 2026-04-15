# HoneyDew2026 Scripts Reference

## All Project Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `setup.sh` | First-time setup | `./setup.sh` |
| `start_services.sh` | Start all services | `./start_services.sh` |
| `stop_services.sh` | Stop all services | `./stop_services.sh` |
| `health_check.sh` | Health check | `./health_check.sh` |
| `backup.sh` | Backup/restore | `./backup.sh --backup` or `./backup.sh --restore` |
| `reset.sh` | Full reset | `./reset.sh` or `./reset.sh --force` |
| `logs.sh` | View logs | `./logs.sh` or `./logs.sh -f` |
| `update.sh` | Update project | `./update.sh` |

## Quick Start

```bash
# First time
./setup.sh

# Start services
./start_services.sh

# Check health
./health_check.sh

# View logs
./logs.sh

# Update project
./update.sh
```

## Service URLs

| Service | URL |
|---------|-----|
| Frontend SPA | http://localhost:3021 |
| Backend API | http://localhost:8017 |
| API Proxy | http://localhost:3021/api |

## Troubleshooting

```bash
# Check what's running
./logs.sh

# Full reset
./reset.sh --force

# Re-run setup
./setup.sh
```
