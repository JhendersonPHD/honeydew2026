# HoneyDew2026 Deployment Guide

## Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

## Local Development

### 1. Clone and Setup

```bash
cd /home/jonathon/VexPivot/projects/honeydew2026
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8017 --reload
```

The backend will be available at: http://localhost:8017

API documentation: http://localhost:8017/docs

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at: http://localhost:5173

Note: The Vite dev server does NOT proxy API calls. Use the production build with `serve_spa.py` for full API proxy support.

### 4. Production Build

```bash
cd frontend

# Create production build
npm run build

# This creates the dist/ folder with optimized assets
```

### 5. Run Production Frontend

```bash
cd frontend/dist

# Start the SPA server with API proxy
python3 serve_spa.py 3021
```

The app will be available at: http://localhost:3021

## Using the Start/Stop Scripts

```bash
# Start all services
./start_services.sh

# Stop all services  
./stop_services.sh
```

## Docker Deployment (Optional)

### Backend Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
EXPOSE 8017
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8017"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY frontend/package*.json .
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM python:3.11-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY frontend/dist/serve_spa.py .
EXPOSE 3021
CMD ["python3", "serve_spa.py", "3021"]
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=sqlite:///./honeydew.db
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3021
```

### Frontend
The frontend uses relative URLs for API calls (`/api/*`), so no environment variables are needed when using `serve_spa.py` as the API proxy.

## Database

The backend uses SQLite. The database file is located at:
```
backend/honeydew.db
```

### Seed Data

The database is pre-seeded with:
- 4 farms (Sunny Acres Farm, Green Meadow Dairy, Harvest Hills Orchard, MakerSpace 3D Farm)
- 7 categories (Produce, Dairy, Fruits, Vegetables, Eggs, Honey, 3D Printed Items)
- 14 products with images, prices, and inventory

### Reset Database

```bash
cd backend
rm honeydew.db
python seed.py
```

## Troubleshooting

### Frontend shows "Cannot proxy /api"
Make sure `serve_spa.py` is running and proxying to the correct backend port (8017).

### CORS errors
The `serve_spa.py` adds CORS headers to all responses. If you see CORS errors, check that the SPA server is running.

### Backend returns 502
The backend might be down. Restart it:
```bash
cd backend
source .venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8017
```

### Port already in use
```bash
# Find and kill process on port
lsof -ti:3021 | xargs kill -9
lsof -ti:8017 | xargs kill -9
```

## Health Checks

```bash
# Check frontend
curl http://localhost:3021/

# Check backend
curl http://localhost:8017/api/products/

# Check API proxy
curl http://localhost:3021/api/products/
```

All should return HTTP 200.
