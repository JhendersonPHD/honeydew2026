# HoneyDew2026 Testing Guide

## Overview

This document describes the testing strategy and procedures for HoneyDew2026.

## Test Types

### 1. Unit Tests
Backend unit tests using pytest:

```bash
cd backend
python -m pytest tests/ -v
```

### 2. API Integration Tests
Test the API endpoints directly:

```bash
# Using the test script
./test_api.sh

# Manual testing
curl http://localhost:8017/api/products/
curl http://localhost:8017/api/farms/
curl http://localhost:8017/api/categories/
```

### 3. Frontend Tests
```bash
cd frontend
npm test
```

### 4. End-to-End Tests
Full system tests using Playwright:

```bash
npx playwright test
```

## Test Coverage

| Endpoint | Method | Expected Response |
|----------|--------|-------------------|
| `/api/products/` | GET | 200 + product list |
| `/api/products/{id}` | GET | 200 + single product |
| `/api/farms/` | GET | 200 + farm list |
| `/api/categories/` | GET | 200 + category list |

## Running All Tests

```bash
# From project root
./run_tests.sh

# Or manually
./health_check.sh        # Service health
./test_api.sh           # API integration tests
cd frontend && npm test  # Frontend tests
```

## Debugging Failed Tests

1. Check service status: `./health_check.sh`
2. Check logs: `./logs.sh`
3. Verify backend: `curl http://localhost:8017/api/products/`
4. Verify frontend: `curl http://localhost:3017/`

## CI/CD Testing

In CI environments, tests run in this order:
1. Health check (services must be up)
2. API integration tests
3. Frontend build test
4. Optional: Playwright E2E tests
