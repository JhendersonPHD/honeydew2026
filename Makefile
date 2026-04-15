.PHONY: help install dev backend frontend build start stop restart status logs clean docker-build docker-up docker-down health check

# Default target
help:
	@echo "HoneyDew2026 - Makefile Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development:"
	@echo "  install       Install dependencies (backend + frontend)"
	@echo "  dev           Start development servers (backend + frontend)"
	@echo "  backend       Start backend only (port 8017)"
	@echo "  frontend      Start frontend dev server only (port 5173)"
	@echo ""
	@echo "Production:"
	@echo "  build         Build frontend production bundle"
	@echo "  start         Start production services (frontend SPA + backend)"
	@echo "  stop          Stop all services"
	@echo "  restart       Restart all services"
	@echo ""
	@echo "Docker:"
	@echo "  docker-build  Build Docker images"
	@echo "  docker-up     Start Docker containers"
	@echo "  docker-down   Stop Docker containers"
	@echo ""
	@echo "Utilities:"
	@echo "  health        Check service health"
	@echo "  status        Show service status"
	@echo "  logs          Show service logs"
	@echo "  clean         Remove build artifacts"
	@echo "  check         Run health checks"

# Install dependencies
install:
	@echo "Installing backend dependencies..."
	cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Done!"

# Start development servers
dev:
	@echo "Starting development servers..."
	cd backend && (.venv/bin/activate && python -m uvicorn app.main:app --host 0.0.0.0 --port 8017 --reload) &
	cd frontend && npm run dev

# Start backend only
backend:
	@echo "Starting backend on port 8017..."
	cd backend && (.venv/bin/activate && python -m uvicorn app.main:app --host 0.0.0.0 --port 8017 --reload)

# Start frontend dev server only
frontend:
	@echo "Starting frontend dev server on port 5173..."
	cd frontend && npm run dev

# Build frontend for production
build:
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Build complete!"

# Start production services
start:
	@echo "Starting HoneyDew2026 services..."
	@cd backend && (.venv/bin/activate && python -m uvicorn app.main:app --host 0.0.0.0 --port 8017) &
	@sleep 2
	@cd frontend/dist && python3 serve_spa.py 3021 &
	@sleep 2
	@echo "Services started!"
	@make status

# Stop all services
stop:
	@echo "Stopping HoneyDew2026 services..."
	@pkill -f "uvicorn app.main:app --port 8017" 2>/dev/null || true
	@pkill -f "serve_spa.py" 2>/dev/null || true
	@lsof -ti:8017 | xargs kill -9 2>/dev/null || true
	@lsof -ti:3021 | xargs kill -9 2>/dev/null || true
	@echo "All services stopped."

# Restart all services
restart:
	@echo "Restarting services..."
	@make stop
	@sleep 2
	@make start

# Docker build
docker-build:
	@echo "Building Docker images..."
	docker-compose build

# Docker up
docker-up:
	@echo "Starting Docker containers..."
	docker-compose up -d
	@make status

# Docker down
docker-down:
	@echo "Stopping Docker containers..."
	docker-compose down

# Check health
health:
	@echo "Checking service health..."
	@echo -n "Frontend (port 3021): "
	@curl -s -o /dev/null -w "%{http_code}" http://localhost:3021/ | grep -q "200" && echo "✓ OK" || echo "✗ DOWN"
	@echo -n "Backend API (port 8017): "
	@curl -s -o /dev/null -w "%{http_code}" http://localhost:8017/api/products/ | grep -q "200" && echo "✓ OK" || echo "✗ DOWN"
	@echo -n "API Proxy (port 3021): "
	@curl -s -o /dev/null -w "%{http_code}" http://localhost:3021/api/products/ | grep -q "200" && echo "✓ OK" || echo "✗ DOWN"

# Show service status
status:
	@echo "HoneyDew2026 Service Status"
	@echo "============================"
	@echo ""
	@echo "Native Services:"
	@echo "  Frontend SPA:   http://localhost:3021"
	@echo "  Backend API:     http://localhost:8017"
	@echo "  API Docs:        http://localhost:8017/docs"
	@echo ""
	@echo "Docker Containers:"
	@docker-compose ps 2>/dev/null || echo "  (Docker not running or docker-compose not found)"
	@echo ""
	@make health

# Show logs
logs:
	docker-compose logs -f

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@cd frontend && rm -rf dist node_modules/.cache
	@cd backend && rm -rf __pycache__ .venv
	@find . -name "*.pyc" -delete
	@find . -name "__pycache__" -delete
	@echo "Clean complete!"

# Run health checks
check: health
	@echo ""
	@echo "Testing API endpoints..."
	@echo -n "GET /api/products/: "
	@curl -s http://localhost:3021/api/products/ | grep -q "Organic Tomatoes" && echo "✓ Working" || echo "✗ Failed"
	@echo -n "GET /api/farms/: "
	@curl -s http://localhost:3021/api/farms/ | grep -q "Sunny Acres" && echo "✓ Working" || echo "✗ Failed"
	@echo -n "GET /api/categories/: "
	@curl -s http://localhost:3021/api/categories/ | grep -q "Produce" && echo "✓ Working" || echo "✗ Failed"