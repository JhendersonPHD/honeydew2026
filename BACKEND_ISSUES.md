# HoneyDew 2026 — Backend Issues Found

**Date:** 2026-04-14  
**Reviewer:** Technical-Director

---

## Critical Issues Preventing Backend Startup

### Issue 1: Missing JWT_SECRET_KEY Environment Variable

**File:** `backend/app/routes/auth.py` (lines 25-31)

**Error:**
```
RuntimeError: FATAL: JWT_SECRET_KEY environment variable is not set.
Cannot start server without a secure secret key.
Set JWT_SECRET_KEY to a cryptographically random value (e.g., openssl rand -hex 32)
```

**Fix Required:**
```bash
export JWT_SECRET_KEY=$(openssl rand -hex 32)
python main.py
```

---

### Issue 2: Missing Invoice Model Import

**File:** `backend/app/routes/invoices.py` (line 15)

**Error:**
```
ImportError: cannot import name 'Invoice' from 'app.database'
```

**Problem:** The invoices.py imports `Invoice as InvoiceModel` from `app.database`, but database.py only exports: User, Product, Farm, Category, ProductVariant, ProductReview, Order, OrderItem, CartItem, ShopifySync, Address.

Invoice model is missing from both database.py exports and models/models.py.

**Impact:** Backend fails to start. Invoice generation feature is broken.

---

## Models Defined in database.py

```python
from app.models.models import User, Product, Farm, Category, ProductVariant, ProductReview, Order, OrderItem, CartItem, ShopifySync, Address
```

## Missing Model

- `Invoice` — referenced in invoices.py but not defined in models or exported from database.py

---

## Root Cause Analysis

The honeydew2026 backend was copied from parent honeydew project but contains:
1. References to models that don't exist (Invoice)
2. Strict JWT_SECRET_KEY enforcement that was added after initial copy
3. Import errors that prevent startup

---

## Required Fixes

### Fix 1: Add Invoice Model

Need to add `Invoice` model to `backend/app/models/models.py` and export it from `backend/app/database.py`.

### Fix 2: Ensure JWT_SECRET_KEY is Set

Either:
- Modify auth.py to allow a fallback dev secret (NOT recommended for production)
- Document the requirement clearly (done in backend/README.md and .env.example)

### Fix 3: Verify Seed Data

Current database has wrong data (3D printed items instead of farm produce). Run `seed.py` to fix.

---

## Current Status

| Component | Status |
|-----------|--------|
| Backend | NOT STARTING |
| Frontend | Unknown (not tested this session) |
| Database | Contains wrong seed data |
| JWT_SECRET_KEY | Missing — crashes on startup |

---

*Technical-Director — 2026-04-14 09:45 UTC*