# HoneyDew2026 Development Guide

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn
- Git

## Project Structure

```
honeydew2026/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py     # FastAPI app entry
│   │   ├── database.py # Database config
│   │   ├── models.py   # SQLAlchemy models
│   │   ├── schemas.py  # Pydantic schemas
│   │   └── routers/    # API routes
│   ├── requirements.txt
│   └── .venv/          # Virtual environment
├── frontend/            # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── public/
│   └── package.json
├── scripts/             # Utility scripts
├── docker-compose.yml
└── Makefile
```

## Local Development Setup

### 1. Clone and Setup

```bash
git clone <repo>
cd honeydew2026
./setup.sh
```

### 2. Backend Development

```bash
cd backend

# Create venv
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install deps
pip install -r requirements.txt

# Run dev server
uvicorn app.main:app --reload --port 8017
```

### 3. Frontend Development

```bash
cd frontend

# Install deps
npm install

# Run dev server (proxies API to backend)
npm run dev

# Run with different port
VITE_PORT=3000 npm run dev
```

### 4. VS Code Setup

Recommended extensions:
- Python
- Pylance
- ESLint
- Prettier
- Auto Rename Tag

Settings (`.vscode/settings.json`):
```json
{
  "python.defaultInterpreterPath": "backend/.venv/bin/python",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Testing

### Backend Tests

```bash
cd backend
source .venv/bin/activate
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

### End-to-End Tests

```bash
# Start services
./start_services.sh

# Run e2e tests
npm run test:e2e
```

## Debugging

### Backend

```bash
# Run with verbose logging
DEBUG=1 uvicorn app.main:app --reload

# Use debugger
import pdb; pdb.set_trace()
```

### Frontend

```bash
# Enable React DevTools
npm run dev

# Use browser DevTools
```

## Code Quality

### Linting

```bash
# Python
cd backend && flake8 app/

# JavaScript
cd frontend && npm run lint
```

### Formatting

```bash
# Python
cd backend && black app/

# JavaScript
cd frontend && npm run format
```

## Git Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/VEX-XXXX-feature-name
```

### 2. Make Changes

```bash
# Edit code
git add .
git commit -m "VEX-XXXX: Add feature"
```

### 3. Push and Create PR

```bash
git push origin feature/VEX-XXXX-feature-name
```

### 4. Pre-commit Hook

The pre-commit hook runs automatically:
- Checks for debug code
- Ensures TODO references VEX issues
- Runs health checks

## Common Tasks

### Add New API Endpoint

1. Create schema in `backend/app/schemas.py`
2. Create model in `backend/app/models.py`
3. Create router in `backend/app/routers/`
4. Register router in `backend/app/main.py`

### Add New Frontend Page

1. Create component in `frontend/src/components/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link

### Add Database Migration

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "Add column"
alembic upgrade head
```

## Resources

- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- Tailwind: https://tailwindcss.com/
- Vite: https://vitejs.dev/
