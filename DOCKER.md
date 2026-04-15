# Docker Commands Reference

## Quick Start

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up -d --build
```

## Service Management

```bash
# Start specific service
docker-compose up -d backend
docker-compose up -d frontend

# Stop specific service
docker-compose stop backend
docker-compose stop frontend

# Restart service
docker-compose restart backend
docker-compose restart frontend

# View service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Database Operations

```bash
# Access database container
docker-compose exec backend /bin/bash

# Run database commands
docker-compose exec backend python seed.py

# Backup database from container
docker-compose exec backend tar -czf /tmp/backup.tar.gz /app/honeydew.db
docker cp $(docker-compose ps -q backend):/tmp/backup.tar.gz ./backup.tar.gz

# Restore database
docker cp ./backup.tar.gz $(docker-compose ps -q backend):/tmp/backup.tar.gz
docker-compose exec backend tar -xzf /tmp/backup.tar.gz -C /
```

## Cleanup

```bash
# Remove all containers
docker-compose down

# Remove volumes (deletes database)
docker-compose down -v

# Remove images
docker-compose down --rmi local

# Full cleanup
docker-compose down -v --rmi local
docker system prune -f
```

## Troubleshooting

```bash
# Check container status
docker-compose ps

# Check resource usage
docker stats

# Inspect container
docker-compose exec backend /bin/bash

# Check network
docker network ls
docker network inspect honeydew2026_default

# View all logs
docker-compose logs --tail=100
```

## Port Reference

| Service | Container Port | Host Port |
|---------|---------------|-----------|
| Backend | 8017 | 8017 |
| Frontend | 3021 | 3021 |

## Environment Variables

Create `.env` file:

```bash
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./honeydew.db
CORS_ORIGINS=http://localhost:3021
```

## Health Checks

All containers have health checks configured:

- Backend: `curl -f http://localhost:8017/api/products/`
- Frontend: `curl -f http://localhost:3021/`

Check health:
```bash
docker-compose ps
# Shows 'healthy' status in the STATUS column
```
