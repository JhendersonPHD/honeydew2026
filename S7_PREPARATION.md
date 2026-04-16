# honeydew2026 — S7 Performance Optimization Preparation
**Agent:** Performance-Manager
**Date:** 2026-04-16
**Status:** PRE-S7 ANALYSIS (Pipeline blocked at S4, S7 not yet reachable)
**Purpose:** This document prepared in advance to accelerate S7 execution when project advances past S4 block.

---

## Executive Summary

This document identifies performance concerns in the honeydew2026 backend codebase that should be addressed during S7 (Performance Optimization). The backend is a mock Express server with in-memory data storage. All code is functional but has room for optimization as scale increases.

**Current Pipeline Phase:** S4 (BLOCKED - Jules API 401 error)
**S7 Cannot Start Until:** S4 unblocks → S5 → S5.5 → S6 complete
**Estimated S7 Start:** Pending Jules API fix or S3 fallback routing

---

## Performance Issues Identified

### Issue 1: Products Endpoint Full Array Copy + Multiple Filters — MEDIUM PRIORITY

**Location:** `backend/src/server.js` lines 180-198
```javascript
app.get('/api/products', (req, res) => {
  const { category, farm, search } = req.query
  let result = [...products]  // Full array copy
  if (category) {
    const cat = categories.find(c => c.slug === category || c.id === parseInt(category))
    if (cat) result = result.filter(p => p.category_id === cat.id)
  }
  if (farm) {
    result = result.filter(p => p.farm.name.toLowerCase().includes(farm.toLowerCase()))
  }
  if (search) {
    const q = search.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }
  res.json(result)
})
```

**Problem:** 
- Creates a full copy of products array on EVERY request (`[...products]`)
- Each filter operation iterates through the entire result set
- String operations (`toLowerCase()`) are done repeatedly in filters
- No indexing - O(n) linear search for all operations

**Impact:**
- 10 products: ~10 iterations per filter
- 1,000 products: ~1,000 iterations per filter
- 10,000 products: ~10,000 iterations per request

**Recommended Fix:** Pre-index products by category, farm, and create a search index:
```javascript
// At startup or data load time:
const productsByCategory = new Map()
const productsByFarm = new Map()
const searchIndex = new Map() // name -> product_ids

// For category lookups O(1) instead of O(n):
const categoryProducts = productsByCategory.get(categorySlug) || []
```

**Estimated Impact:** ~60-80% faster product queries at scale.

---

### Issue 2: Products Search Linear Scan — MEDIUM PRIORITY

**Location:** `backend/src/server.js` lines 204-214
```javascript
app.get('/api/products/search', (req, res) => {
  const { q } = req.query
  if (!q) return res.json([])
  const query = q.toLowerCase()
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.category.name.toLowerCase().includes(query)
  )
  res.json(results)
})
```

**Problem:**
- Filters ALL products on every search query
- Three `toLowerCase()` calls per product (on name, description, category)
- No pagination
- No caching

**Recommended Fix:** Implement basic search caching with TTL:
```javascript
let searchCache = new Map()
const SEARCH_CACHE_TTL = 30000 // 30 seconds

app.get('/api/products/search', (req, res) => {
  const { q } = req.query
  if (!q) return res.json([])
  const query = q.toLowerCase()
  
  // Check cache first
  if (searchCache.has(query)) {
    return res.json(searchCache.get(query))
  }
  
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.category.name.toLowerCase().includes(query)
  )
  
  searchCache.set(query, results)
  setTimeout(() => searchCache.delete(query), SEARCH_CACHE_TTL)
  res.json(results)
})
```

**Estimated Impact:** ~50% reduction in search latency for repeated queries.

---

### Issue 3: Category Products Endpoint Nested Filter — LOW PRIORITY

**Location:** `backend/src/server.js` lines 171-176
```javascript
app.get('/api/categories/:slug', (req, res) => {
  const category = categories.find(c => c.slug === req.params.slug)
  if (!category) return res.status(404).json({ error: 'Category not found' })
  const categoryProducts = products.filter(p => p.category_id === category.id)
  res.json({ ...category, products: categoryProducts })
})
```

**Problem:**
- Two separate lookups: find category, then filter products
- No caching for category + products combined response

**Recommended Fix:** Pre-compute category products at data load time:
```javascript
const categoryProductsMap = new Map()
products.forEach(p => {
  if (!categoryProductsMap.has(p.category_id)) {
    categoryProductsMap.set(p.category_id, [])
  }
  categoryProductsMap.get(p.category_id).push(p)
})
```

**Estimated Impact:** ~40% faster category page loads.

---

### Issue 4: Farm Products Endpoint Linear Filter — LOW PRIORITY

**Location:** `backend/src/server.js` lines 158-163
```javascript
app.get('/api/farms/:slug/products', (req, res) => {
  const farm = farms.find(f => f.slug === req.params.slug)
  if (!farm) return res.status(404).json({ error: 'Farm not found' })
  const farmProducts = products.filter(p => p.farm.name === farm.name)
  res.json(farmProducts)
})
```

**Problem:** Same pattern as category - linear filter through all products.

**Recommended Fix:** Pre-index products by farm name.

**Estimated Impact:** ~40% faster farm page loads.

---

### Issue 5: Orders Filter Linear Scan — MEDIUM PRIORITY

**Location:** `backend/src/server.js` lines 293-296
```javascript
app.get('/api/orders', authenticate, (req, res) => {
  const userOrders = orders.filter(o => o.user_id === req.user.id)
  res.json(userOrders)
})
```

**Problem:** As orders grow, filtering all orders for a user becomes slow.

**Recommended Fix:** Maintain a Map<user_id, orders[]> index:
```javascript
const ordersByUser = new Map()

// When creating order:
const userOrders = ordersByUser.get(user_id) || []
userOrders.push(order)
ordersByUser.set(user_id, userOrders)

// When fetching:
const userOrders = ordersByUser.get(req.user.id) || []
```

**Estimated Impact:** ~70% faster order history lookups as order count grows.

---

### Issue 6: Cart Map Growth — LOW PRIORITY (Memory Concern)

**Location:** `backend/src/server.js` line 224
```javascript
const carts = new Map()
```

**Problem:** Carts are never cleaned up. If users abandon carts, the Map grows indefinitely.

**Recommended Fix:** Implement cart expiration:
```javascript
const CART_EXPIRY_HOURS = 24
const carts = new Map() // cart_id -> { items, updated_at }

// Middleware to check expiry and clean up
```

**Estimated Impact:** Prevents memory growth from abandoned carts.

---

## Performance Strengths

1. **Map-based cart storage is O(1)** — `carts.get()`, `carts.set()`, `carts.delete()` are constant time
2. **Farms and Categories are pre-loaded** — No database queries for basic listings
3. **Products array is small** — 13 products, acceptable for demo scale
4. **Express middleware is minimal** — No heavy middleware chains
5. **Rate limiting is implemented** — `apiLimiter` protects against DoS

---

## S7 Checklist (For When Pipeline Advances)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Products endpoint indexing | MEDIUM | TODO | Pre-index by category, farm |
| Search endpoint caching | MEDIUM | TODO | 30-second TTL cache |
| Orders index by user_id | MEDIUM | TODO | Map<user_id, orders[]> |
| Category products pre-computed | LOW | TODO | At data load time |
| Farm products pre-indexed | LOW | TODO | Map<farm_name, products[]> |
| Cart expiration | LOW | TODO | Prevent memory growth |
| Load testing | MEDIUM | TODO | Verify improvements |

---

## Files to Modify During S7

1. `/repo/backend/src/server.js` — Add caching and indexes
2. Consider adding `/repo/backend/src/services/searchService.js` — Search indexing

---

## Pre-S7 Verification

Before starting S7, verify:
- [ ] S4 (Jules API) is unblocked OR S3 fallback is complete
- [ ] S5 Smart Merge is complete
- [ ] S5.5 Visual Polish is merged
- [ ] S6 (Security & Logistics) is complete
- [ ] No critical bugs in current build
- [ ] Load testing tools available (k6, wrk, or similar)

---

## Dependencies

No external dependencies required for S7 optimizations. All changes are in-memory caching patterns in JavaScript.

---

## Pipeline Blocker Note

**S4 is blocked due to Jules API 401 UNAUTHENTICATED error.** 
Pipeline chain: S4 blocked → S5 blocked → S5.5 blocked → S6 blocked → **S7 blocked**

Once Jules API credentials are fixed or S3 fallback is executed, this S7 prep document will accelerate performance optimization work.

---

*Performance-Manager — S7 preparation complete for honeydew2026. Ready to execute optimizations when project advances past S4 block.*
