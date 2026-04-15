# HoneyDew2026 Development Guide

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn
- SQLite (included with Python)

## Initial Setup

```bash
# Clone and setup
git clone <repository>
cd honeydew2026
./setup.sh
```

## Running Locally

### Backend Only

```bash
cd backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8017
```

### Frontend Only (with proxy to backend)

```bash
cd frontend
npm run dev
# API calls proxy to localhost:8017
```

### Full Stack (docker-compose)

```bash
docker-compose up -d
```

## Project Structure

```
honeydew2026/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app
│   │   ├── database.py       # SQLite setup
│   │   ├── models.py        # Pydantic models
│   │   └── routers/
│   │       ├── products.py
│   │       ├── farms.py
│   │       └── categories.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main component
│   │   ├── App.css          # Styles
│   │   └── main.jsx         # Entry point
│   └── vite.config.js       # Vite config with proxy
├── docker-compose.yml
└── Makefile
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products/ | List all products |
| GET | /api/products/{id} | Get product by ID |
| POST | /api/products/ | Create product |
| GET | /api/farms/ | List all farms |
| GET | /api/categories/ | List all categories |

## Testing API

```bash
# Health check
curl http://localhost:8017/api/products/

# Create product
curl -X POST http://localhost:8017/api/products/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":9.99,"farm_id":1,"category_id":1}'
```

## Debugging

### Backend Logs
```bash
# With uvicorn --reload, logs go to stdout
# Check console output
```

### Frontend Logs
```bash
# Vite shows all requests and errors in console
cd frontend && npm run dev
```

### API Proxy Issues
If frontend API calls fail, check:
1. Backend is running on port 8017
2. Vite proxy config matches backend URL
3. CORS is enabled in backend

## Adding New Features

### 1. Add API Route (Backend)

Create new router in `backend/app/routers/`:

```python
from fastapi import APIRouter
router = APIRouter()

@router.get("/items")
def list_items():
    return [{"id": 1}]
```

### 2. Add Frontend Component

Create component in `frontend/src/components/`:

```jsx
function MyComponent() {
  return <div>Hello</div>;
}
export default MyComponent;
```

### 3. Import in App.jsx

```jsx
import MyComponent from './components/MyComponent';
```

## Code Style

- Python: Black formatter
- JavaScript: Prettier
- Run `./scripts/pre-commit` before committing

## Performance Tips

1. Use React.memo for expensive components
2. Lazy load routes with React.lazy
3. Use production build for testing: `npm run build`
4. Database indexes on frequently queried fields

## Troubleshooting

### Port already in use
```bash
# Find and kill process
lsof -i :8017
kill <PID>
```

### Database locked
```bash
# Restart backend to release connection
pkill -f "uvicorn.*app.main:app"
./start_services.sh
```

### Frontend shows old data
```bash
# Clear cache and rebuild
cd frontend
rm -rf node_modules/.vite
npm run build
```
