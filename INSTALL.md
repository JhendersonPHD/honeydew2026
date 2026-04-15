# HoneyDew2026 Installation Guide

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn
- Git

## Clone and Setup

```bash
# Clone repository
git clone <repo-url>
cd honeydew2026

# Run setup
./setup.sh
```

## Manual Installation

### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export SECRET_KEY="your-secret-key"
export DATABASE_URL="sqlite:///./honeydew.db"
export CORS_ORIGINS="http://localhost:3021"

# Run database seed
python seed.py

# Start backend
uvicorn app.main:app --reload --port 8017
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Verify Installation

```bash
./health_check.sh
```

Expected output:
```
Frontend (3021): ✓
Backend (8017): ✓
Products API: ✓
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3021
lsof -i :8017

# Kill process
kill -9 <PID>
```

### Database Issues

```bash
# Reset database
cd backend
rm honeydew.db
python seed.py
```

### Node Modules Issues

```bash
cd frontend
rm -rf node_modules
npm install
```
