# Contributing to HoneyDew2026

Thank you for your interest in contributing to HoneyDew2026!

## Development Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Quick Start

```bash
# 1. Clone the repository
cd /home/jonathon/VexPivot/projects/honeydew2026

# 2. Install dependencies
make install

# 3. Start development servers
make dev

# 4. Run tests
make check
```

## Project Structure

```
honeydew2026/
├── frontend/          # React + Vite frontend
│   ├── src/           # Source code
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   └── utils/        # Utility functions
│   ├── dist/          # Production build
│   └── package.json
├── backend/           # FastAPI backend
│   ├── app/           # Application code
│   ├── honeydew.db    # SQLite database
│   └── requirements.txt
├── scripts/           # Utility scripts
└── docs/             # Documentation
```

## Making Changes

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Write code following the existing style
- Add tests for new functionality
- Update documentation as needed

### 3. Commit Your Changes
```bash
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### 4. Create a Pull Request
- Use clear PR titles and descriptions
- Reference any related issues
- Ensure all tests pass

## Code Style

### Python (Backend)
- Follow PEP 8
- Use type hints where possible
- Add docstrings to functions

### JavaScript/React (Frontend)
- Use ES6+ syntax
- Follow React best practices
- Use functional components with hooks
- Prefer composition over inheritance

## Testing

### Run Tests
```bash
# Backend tests
cd backend && python -m pytest

# Frontend tests
cd frontend && npm test

# Health checks
make health
```

### Test API Endpoints
```bash
# Test products
curl http://localhost:3021/api/products/

# Test farms
curl http://localhost:3021/api/farms/

# Test categories
curl http://localhost:3021/api/categories/
```

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Reporting Issues

When reporting bugs, please include:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, versions, etc.)

## Questions?

For questions or discussions:
- Check the [SUPPORT.md](SUPPORT.md) file
- Review the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide
- Consult the [API_REFERENCE.md](API_REFERENCE.md)

---

Thank you for contributing to HoneyDew2026!