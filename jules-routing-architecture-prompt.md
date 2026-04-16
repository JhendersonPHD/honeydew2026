# Jules Session: Routing & Architecture — HoneyDew 2026

## Context
**Issue:** 36dbedc8-36bc-407d-993d-d96f5dadc283
**Parent Issue:** VEX-833
**Target Branch:** feature/jules-routing-architecture
**Domain:** Routing & Architecture (S4.1 — Session 1 of 5)

## Project Overview
HoneyDew 2026 is a farm-to-consumer e-commerce platform. The current state:
- **Backend:** Express.js API on port 8018 with mock data (farms, products, categories, cart, orders)
- **Frontend:** Built SPA (dist folder exists) but **source code is missing** (src/pages and src/components are empty)
- **Tech Stack:** React 18, Vite, Express.js, JWT auth
- **Design:** Warm light theme (amber #F59E0B primary, emerald #10B981 secondary, cream #FFFBEB background)

## Current Architecture Issues

### Backend (Express.js)
- Single server.js file (~350 lines) with all routes inline
- No modular router structure
- Mock data in-memory (farms, products, categories, users, orders)
- No database (SQLite or otherwise)
- Cart stored in Map (not persistent)

### Frontend (CRITICAL)
- Source code is **MISSING** - src/pages and src/components are empty
- dist folder has compiled assets but no source
- References `/src/main.jsx` which doesn't exist
- No React Router setup
- No component architecture

## Jules Task: Rebuild Frontend Architecture with Proper Routing

### Required Deliverables

1. **Project Structure Setup**
```
frontend/src/
├── components/          # Reusable UI components
│   ├── layout/          # Header, Footer, Navbar
│   ├── product/         # ProductCard, ProductGrid, ProductDetail
│   ├── farm/            # FarmCard, FarmList
│   ├── cart/            # CartItem, CartSummary, CartBadge
│   ├── checkout/        # AddressForm, PaymentForm, OrderSummary
│   └── ui/              # Button, Input, Modal, Toast, Skeleton
├── pages/               # Route pages
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Farms.jsx
│   ├── FarmDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderConfirmation.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   └── Orders.jsx
├── contexts/            # React Context providers
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ToastContext.jsx
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   ├── useCart.js
│   └── useToast.js
├── services/            # API service layer
│   ├── api.js           # Base axios instance
│   ├── auth.js
│   ├── products.js
│   ├── farms.js
│   ├── cart.js
│   └── orders.js
├── utils/               # Utility functions
│   └── helpers.js
├── App.jsx              # Main app with React Router
├── main.jsx             # Entry point
└── index.css            # Global styles
```

2. **React Router Setup**
- Install react-router-dom v6
- Configure routes with nested layouts
- Protected routes for authenticated pages (checkout, orders, profile)
- Route transitions/animations

3. **API Service Layer**
- Create base axios instance with interceptors
- JWT token injection
- Error handling
- Request/response logging

4. **State Management**
- AuthContext for user authentication state
- CartContext for shopping cart (sync with backend)
- ToastContext for notifications

5. **Component Library**
- Design system per visual-brief.md (amber/emerald/cream theme)
- Responsive mobile-first components
- Loading skeletons
- Empty states

## Backend Enhancement (Minimal)

Since the backend works but is monolithic, Jules should:
1. Extract routes into proper router modules (not critical if frontend is priority)
2. Add better error handling middleware
3. Add request logging

## Visual Design Reference
- Colors: Primary #F59E0B (amber), Secondary #10B981 (emerald), Background #FFFBEB (cream)
- Font: Inter
- See `/assets/visual/visual-brief.md` for full design system

## Success Criteria
- [ ] Frontend has proper React Router setup
- [ ] All pages have working implementations
- [ ] API calls properly structured in services layer
- [ ] Auth flow works (login, register, protected routes)
- [ ] Cart operations work end-to-end
- [ ] Checkout flow completes order
- [ ] Responsive design works on mobile
- [ ] App builds without errors
- [ ] PR created to feature/jules-routing-architecture branch

## Files to Create
- All frontend source files per structure above
- No backend changes required (backend works)

## Important Notes
- The backend API is working at http://localhost:8018
- Frontend dev server runs at http://localhost:3016
- API proxy configured in vite.config.js
- Do NOT modify the backend (it's working)
- Focus purely on frontend architecture and routing
