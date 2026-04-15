# HoneyDew2026 API Reference

**Base URL:** `http://localhost:8017/api`  
**Frontend Proxy:** `http://localhost:3021/api` (proxied through serve_spa.py)

---

## Authentication

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe"
}

Response: { "id": 1, "email": "user@example.com", "full_name": "John Doe" }
```

### Login
```
POST /api/auth/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=password123

Response: { "access_token": "eyJ...", "token_type": "bearer" }
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: { "id": 1, "email": "user@example.com", "full_name": "John Doe" }
```

---

## Products

### List Products
```
GET /api/products/

Query Parameters:
  - category_id: Filter by category
  - farm_id: Filter by farm
  - featured: true/false

Response: [
  {
    "id": 1,
    "farm_id": 1,
    "category_id": 1,
    "name": "Organic Tomatoes",
    "slug": "organic-tomatoes",
    "description": "Fresh Organic Tomatoes from our farm.",
    "price": 4.99,
    "unit": "lb",
    "images": ["https://..."],
    "is_featured": true,
    "is_active": true
  },
  ...
]
```

### Get Product
```
GET /api/products/{id}

Response: {
  "id": 1,
  "farm_id": 1,
  "category_id": 1,
  "name": "Organic Tomatoes",
  ...
}
```

---

## Farms

### List Farms
```
GET /api/farms/

Response: [
  {
    "id": 1,
    "name": "Sunny Acres Farm",
    "slug": "sunny-acres-farm",
    "description": "Family-owned organic farm...",
    "location": "Portland, OR",
    "rating": 4.8,
    "is_verified": true
  },
  ...
]
```

### Get Farm
```
GET /api/farms/{id}

Response: {
  "id": 1,
  "name": "Sunny Acres Farm",
  ...
}
```

---

## Categories

### List Categories
```
GET /api/categories/

Response: [
  { "id": 1, "name": "Produce", "slug": "produce" },
  { "id": 2, "name": "Dairy", "slug": "dairy" },
  { "id": 3, "name": "Fruits", "slug": "fruits" },
  { "id": 4, "name": "Vegetables", "slug": "vegetables" },
  { "id": 5, "name": "Eggs", "slug": "eggs" },
  { "id": 6, "name": "Honey", "slug": "honey" },
  { "id": 7, "name": "3D Printed Items", "slug": "3d-printed-items" }
]
```

---

## Cart

### Get Cart
```
GET /api/cart/
Authorization: Bearer <token>

Response: {
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "quantity": 2,
      "product": { ... }
    }
  ],
  "total": 9.98
}
```

### Add to Cart
```
POST /api/cart/
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}

Response: { "id": 1, "product_id": 1, "quantity": 2 }
```

### Update Cart Item
```
PATCH /api/cart/{item_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}

Response: { "id": 1, "product_id": 1, "quantity": 3 }
```

### Remove from Cart
```
DELETE /api/cart/{item_id}
Authorization: Bearer <token>

Response: { "success": true }
```

### Clear Cart
```
DELETE /api/cart/
Authorization: Bearer <token>

Response: { "success": true }
```

---

## Orders

### List Orders
```
GET /api/orders/
Authorization: Bearer <token>

Response: [
  {
    "id": 1,
    "status": "delivered",
    "total": 24.99,
    "created_at": "2026-04-13T12:00:00Z"
  },
  ...
]
```

### Create Order
```
POST /api/orders/
Authorization: Bearer <token>
Content-Type: application/json

{
  "shipping_address": {
    "street": "123 Main St",
    "city": "Portland",
    "state": "OR",
    "zip": "97201"
  },
  "payment_method": "card"
}

Response: {
  "id": 1,
  "status": "pending",
  "total": 24.99,
  ...
}
```

### Get Order
```
GET /api/orders/{id}
Authorization: Bearer <token>

Response: {
  "id": 1,
  "status": "delivered",
  "items": [...],
  "total": 24.99,
  ...
}
```

---

## Reviews

### Get Product Reviews
```
GET /api/reviews/product/{product_id}

Response: [
  {
    "id": 1,
    "product_id": 1,
    "user_id": 1,
    "rating": 5,
    "comment": "Great tomatoes!",
    "created_at": "2026-04-10T..."
  },
  ...
]
```

### Create Review
```
POST /api/reviews/
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 1,
  "rating": 5,
  "comment": "Great tomatoes!"
}

Response: { "id": 1, ... }
```

---

## Error Responses

All endpoints may return these error responses:

### 401 Unauthorized
```json
{ "detail": "Not authenticated" }
```

### 404 Not Found
```json
{ "detail": "Item not found" }
```

### 422 Validation Error
```json
{
  "detail": [
    { "loc": ["body", "email"], "msg": "field required", "type": "value_error" }
  ]
}
```

---

## Rate Limits

No rate limits are currently enforced.

---

## CORS

All endpoints support CORS with `Access-Control-Allow-Origin: *`
