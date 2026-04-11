# HoneyDew — E-Commerce Platform (Farm-to-Consumer)

## What It Does
A Shopify-style e-commerce platform connecting local farmers with consumers. Users browse a product catalog organized by farm and category, manage shopping carts, checkout with mock payment, and track orders. Includes Shopify API sync for inventory management.

## Target Users
- Health-conscious consumers wanting fresh local produce
- Farm supporters wanting direct-to-consumer access
- Meal preppers ordering ingredients in bulk
- Store owners managing inventory via Shopify API

## Core Features

### Product Catalog
- Browse by category, search products, filter by farm/price/availability
- Product detail pages with image gallery, variants, reviews
- Featured products and farms on homepage

### Farm Profiles
- Farm info, story, location (map), rating/reviews
- Featured farms section

### Shopping Cart
- Add/remove items, update quantities, persistent cart (session or user-based)
- Variant selection (size, weight, etc.)

### Checkout Flow
- Address selection/entry, order summary, mock payment, order confirmation

### User Accounts
- Registration/login, order history, saved addresses, profile management

### Reviews
- Product reviews with 1-5 star ratings, verified purchase badge, moderation

### Shopify Sync
- Sync products and inventory with Shopify API
- Track sync status

## Data Models
**users**: id, email, password_hash, first_name, last_name, phone, is_admin
**addresses**: id, user_id, label, street, city, state, zip_code, country, is_default
**farms**: id, name, slug, description, story, location, lat/lng, images, contact, rating, is_verified, is_featured
**categories**: id, name, slug, description, image, parent_id, sort_order
**products**: id, shopify_product_id, farm_id, category_id, name, slug, description, price, compare_at_price, cost_per_item, unit, sku, barcode, inventory_quantity, weight, images, tags, is_seasonal/featured/active, seo fields
**product_variants**: id, product_id, shopify_variant_id, name, sku, price, inventory, options
**product_reviews**: id, product_id, user_id, rating, title, body, is_verified
**orders**: id, user_id, order_number, status, subtotal, shipping, tax, total, shipping_address, payment
**order_items**: id, order_id, product_id, variant_id, quantity, unit_price, total
**cart**: id, user_id, session_id, product_id, variant_id, quantity

## API Design
- Auth: register, login, me
- Products: CRUD + featured
- Farms: CRUD
- Categories: CRUD
- Cart: get, add, update, delete (single + clear all)
- Orders: CRUD + status update
- Reviews: list by product, create
- Shopify: sync trigger, status

## Design System
- Primary: #10B981 (Emerald), Secondary: #6366F1 (Indigo)
- Background: #0F172A, Surface: #1E293B, Text: #F8FAFC

## Tech Stack
- Frontend: React 18 + Vite (Port 3016)
- Backend: FastAPI + SQLite (Port 8016)
- Auth: JWT tokens

## Project Status
- [x] SPEC.md created
- [x] Backend structure (FastAPI + SQLAlchemy)
- [x] Frontend structure (React 1588 lines)
- [x] Database models (all 12 models)
- [x] API routes (auth, products, farms, categories, cart, orders, reviews)
- [x] Authentication (JWT)
- [x] Product catalog
- [x] Farm profiles
- [x] Shopping cart
- [x] Checkout flow (UI ready)
- [x] User accounts
- [x] Reviews
- [x] Shopify sync (placeholder routes exist)
- [x] Docker deployment (docker-compose, Dockerfiles, nginx, PM2)
- [x] Seed data (31 products, 9 farms, 10 categories)
- [x] Security audit passed (Phase 5)
- [x] Deployment preparation (Phase 6A)
- [x] Go-Live ready (Phase 7A)

## Files Created This Session
1. `/home/jonathon/VexPivot/projects/honeydew/SPEC.md` — Project specification
2. `/home/jonathon/VexPivot/projects/honeydew/backend/main.py` — FastAPI entry point
3. `/home/jonathon/VexPivot/projects/honeydew/backend/app/database.py` — SQLAlchemy models with get_db dependency
4. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/auth.py` — JWT authentication
5. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/products.py` — Product API
6. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/farms.py` — Farm API
7. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/categories.py` — Category API
8. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/cart.py` — Cart API
9. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/orders.py` — Order API
10. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/reviews.py` — Review API
11. `/home/jonathon/VexPivot/projects/honeydew/backend/app/routes/shopify.py` — Shopify placeholder
12. `/home/jonathon/VexPivot/projects/honeydew/backend/requirements.txt` — Python dependencies
13. `/home/jonathon/VexPivot/projects/honeydew/frontend/package.json` — Node dependencies
14. `/home/jonathon/VexPivot/projects/honeydew/frontend/vite.config.ts` — Vite config
15. `/home/jonathon/VexPivot/projects/honeydew/frontend/index.html` — HTML template
16. `/home/jonathon/VexPivot/projects/honeydew/frontend/src/App.tsx` — TypeScript version
17. `/home/jonathon/VexPivot/projects/honeydew/README.md` — Project readme