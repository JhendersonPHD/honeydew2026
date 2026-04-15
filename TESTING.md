# Testing Guide

## Overview

HoneyDew2026 uses Playwright for end-to-end testing and pytest for backend API testing.

## Prerequisites

```bash
cd frontend
npm install
npx playwright install chromium
```

## Running Tests

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
cd frontend
npx playwright test
```

### All Tests
```bash
make test        # Run all tests
make test-api    # Backend API tests only
make test-e2e    # E2E tests only
```

## Writing Tests

### Backend API Test Example

```python
import pytest
import sys
sys.path.insert(0, '.')
from main import app

def test_products_endpoint():
    # Test products API returns valid response
    pass
```

### Frontend Component Test Example

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders product list', () => {
  render(<App />);
  expect(screen.getByText('Products')).toBeInTheDocument();
});
```

### E2E Test Example

```javascript
import { test, expect } from '@playwright/test';

test('user can browse products', async ({ page }) => {
  await page.goto('http://localhost:3021');
  await expect(page.locator('text=Products')).toBeVisible();
});
```

## CI/CD Testing

In CI, tests run automatically:
1. Lint check (ESLint, Pylint)
2. Unit tests
3. Integration tests
4. E2E tests

## Debugging Failed Tests

```bash
# Backend verbose
pytest tests/ -v -s

# Frontend with debug
npm test -- --watch

# Playwright UI mode
npx playwright test --ui
```

## Coverage

```bash
# Backend coverage
pytest --cov=. --cov-report=html

# Frontend coverage
npm test -- --coverage
```