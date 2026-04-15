# HoneyDew2026 Ports Reference

## Service Ports

| Service | Host Port | Container Port | Protocol | Status |
|---------|-----------|----------------|----------|--------|
| Frontend SPA (Vite) | 3021 | 3021 | HTTP | Running |
| Backend API (FastAPI) | 8017 | 8017 | HTTP | Running |
| Frontend SSR (Next.js) | 3017 | 3017 | HTTP | Running |

## API Endpoints

### Backend API — http://localhost:8017

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products/` | GET | List all products |
| `/api/products/{id}` | GET | Get product by ID |
| `/api/farms/` | GET | List all farms |
| `/api/farms/{id}` | GET | Get farm by ID |
| `/api/categories/` | GET | List all categories |
| `/api/docs` | GET | Swagger UI |
| `/api/redoc` | GET | ReDoc |

### Frontend — http://localhost:3021

| Path | Description |
|------|-------------|
| `/` | Main SPA |
| `/products` | Products page |
| `/farms` | Farms page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout page |

### Frontend SSR — http://localhost:3017

| Path | Description |
|------|-------------|
| `/` | SSR homepage |
| `/products` | SSR products |

## Port Conflicts

If ports are already in use:

```bash
# Find what's using a port
lsof -i :3021
lsof -i :8017

# Kill process on port
kill $(lsof -t -i :3021)
```

## Firewall

```bash
# Allow ports (Ubuntu/Debian)
sudo ufw allow 3021
sudo ufw allow 8017

# Check firewall status
sudo ufw status
```

## Docker

```bash
# View port mappings
docker-compose ps

# View container ports
docker-compose port backend 8017
```
