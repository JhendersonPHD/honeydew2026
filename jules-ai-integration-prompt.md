# Jules Session Prompt: AI Integration for HoneyDew2026

## Project Context
**App:** HoneyDew2026 - Farm-to-Consumer E-Commerce Platform
**Tagline:** "Fresh From the Farm, Powered by AI"
**Repo:** /home/jonathon/VexPivot/projects/honeydew2026
**Target Branch:** feature/jules-ai-integration
**Base Branch:** main

## Domain: AI Integration

---

## Session Objective

Implement AI-powered features for the HoneyDew e-commerce platform that enhance product discovery, personalization, and user experience. All AI features should be highlighted with the **indigo accent color (#6366F1)** per the visual design system.

---

## Technical Stack
- **Frontend:** React 18 + Vite (Port 3016)
- **Backend:** FastAPI + SQLite (Port 8016)
- **API:** REST with JWT auth

---

## AI Integration Requirements

### 1. Smart Product Recommendations

**Description:** AI-powered product recommendations that suggest items based on:
- User's browsing history (stored in localStorage for guests, DB for logged-in users)
- Current cart contents (complementary products)
- Order history patterns
- Similar products to currently viewed item

**Implementation:**
- Create `backend/app/services/recommendation_engine.py`
  - `get_personalized_recommendations(user_id, limit=6)` - Returns personalized product suggestions
  - `get_cart_recommendations(cart_items, limit=4)` - "Complete your meal" suggestions
  - `get_similar_products(product_id, limit=6)` - "You might also like" suggestions
- Create `backend/app/routes/recommendations.py`
  - `GET /api/recommendations/personalized` - Requires auth
  - `GET /api/recommendations/cart` - Body: `{cart_items: [{product_id, quantity}]}`
  - `GET /api/recommendations/similar/{product_id}`
- Create `frontend/src/components/Recommendations.jsx`
  - Horizontal scrollable product carousel
  - Loading skeleton state
  - "AI-powered" badge with indigo accent

**Files to Create:**
- `backend/app/services/recommendation_engine.py`
- `backend/app/routes/recommendations.py`
- `frontend/src/components/Recommendations.jsx`
- `frontend/src/components/RecommendationCarousel.jsx`

**Files to Modify:**
- `backend/app/main.py` - Add recommendations router
- `frontend/src/pages/ProductDetail.jsx` - Add "Similar Products" section
- `frontend/src/pages/Cart.jsx` - Add "Complete Your Order" section
- `frontend/src/pages/Home.jsx` - Add personalized recommendations for logged-in users

---

### 2. AI-Powered Search Enhancement

**Description:** Enhanced search using Fuse.js for fuzzy matching with AI-like smart suggestions.

**Implementation:**
- Install `fuse.js` package
- Create `frontend/src/utils/smartSearch.js`
  - Fuzzy search with typo tolerance
  - Search suggestions dropdown (debounced 150ms)
  - Category-aware search results
- Modify `SearchBar.jsx` (create if not exists)
  - Add autocomplete dropdown
  - Show category badges on results
  - "Did you mean?" suggestions

**Files to Create:**
- `frontend/src/utils/smartSearch.js`

**Files to Modify:**
- `frontend/src/components/SearchBar.jsx` (create if needed)
- `frontend/package.json` - Add fuse.js dependency

---

### 3. Smart Personalization Engine

**Description:** AI-based user personalization that learns from behavior.

**Implementation:**
- Create `backend/app/services/personalization_engine.py`
  - Track user interactions (views, cart adds, purchases)
  - Build preference profile (favorite categories, farms, price range)
  - Generate personalized homepage sections
- Create `backend/app/routes/personalization.py`
  - `GET /api/personalization/profile` - Get user's preference profile
  - `POST /api/personalization/track` - Track user interaction
  - `GET /api/personalization/home-sections` - Get personalized homepage sections

**Files to Create:**
- `backend/app/services/personalization_engine.py`
- `backend/app/routes/personalization.py`

**Files to Modify:**
- `backend/app/main.py` - Add personalization router

---

### 4. Checkout AI Recommendations

**Description:** AI-powered upsell/cross-sell recommendations at checkout.

**Implementation:**
- Create `frontend/src/components/CheckoutRecommendations.jsx`
  - "Complete your order" suggestions
  - Based on cart contents
  - One-click add to cart
  - Indigo accent badge "AI Pick"
- Modify `frontend/src/pages/Checkout.jsx`
  - Add recommendation section before order confirmation

**Files to Create:**
- `frontend/src/components/CheckoutRecommendations.jsx`

**Files to Modify:**
- `frontend/src/pages/Checkout.jsx`

---

### 5. AI Features Backend Service

**Description:** Central AI service layer for all AI operations.

**Implementation:**
- Create `backend/app/services/ai_service.py`
  - Unified interface for all AI operations
  - Fallback to rule-based if AI unavailable
  - Logging for all AI decisions
- Create `backend/app/models/ai_models.py`
  - `UserPreferenceProfile` - Pydantic model for user preferences
  - `Recommendation` - Pydantic model for recommendations
  - `SearchSuggestion` - Pydantic model for search

**Files to Create:**
- `backend/app/services/ai_service.py`
- `backend/app/models/ai_models.py`

---

## Design Requirements

- **AI Feature Badge:** Use indigo (#6366F1) for all AI-related UI elements
- **AI Badge Text:** "AI-Powered" or "AI Pick" with sparkle icon
- **Loading States:** Use skeleton loaders for recommendation sections
- **Empty States:** Show "Discover more products" when no recommendations available
- **Warm Aesthetic:** Maintain the warm cream (#FFFBEB) background and honey (#F59E0B) accents

---

## Visual Design Tokens

```css
--color-ai-accent: #6366F1;      /* Indigo for AI features */
--color-primary: #F59E0B;        /* Amber - warmth */
--color-secondary: #10B981;      /* Emerald - health */
--color-background: #FFFBEB;     /* Warm cream */
--color-surface: #FFFFFF;        /* White cards */
--color-surface-alt: #FEF3C7;    /* Lighter cream */
--color-text-primary: #1F2937;   /* Dark gray */
--color-text-secondary: #6B7280; /* Medium gray */
```

---

## API Endpoints to Add

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/recommendations/personalized | Get personalized product recommendations |
| POST | /api/recommendations/cart | Get recommendations based on cart |
| GET | /api/recommendations/similar/{product_id} | Get similar products |
| GET | /api/personalization/profile | Get user preference profile |
| POST | /api/personalization/track | Track user interaction |
| GET | /api/personalization/home-sections | Get personalized homepage |

---

## Testing Requirements

- Test recommendations with and without user auth
- Test cart recommendations with various cart configurations
- Test search with typos and partial matches
- Verify indigo accent appears on all AI UI elements
- Verify warm cream background maintained throughout

---

## Success Criteria

1. ✅ AI-powered recommendations display on product detail, cart, and home pages
2. ✅ Smart search with fuzzy matching works with debounced autocomplete
3. ✅ User preference profile is created and used for personalization
4. ✅ Checkout recommendations appear before order confirmation
5. ✅ All AI features use indigo (#6366F1) accent color
6. ✅ No console errors on AI feature pages
7. ✅ Recommendations degrade gracefully if AI service unavailable

---

## Branch Naming
Branch to create: `feature/jules-ai-integration`

## Repo Location
/home/jonathon/VexPivot/projects/honeydew2026