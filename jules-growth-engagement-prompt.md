# Jules Session Prompt: Growth & Engagement for HoneyDew2026

## Project Context
**App:** HoneyDew2026 - Farm-to-Consumer E-Commerce Platform
**Tagline:** "Fresh From the Farm, Powered by AI"
**Repo:** /home/jonathon/VexPivot/projects/honeydew2026
**Target Branch:** feature/jules-growth-engagement
**API Base URL:** http://localhost:8017/api

## Domain: Growth & Engagement

Implement features that drive user acquisition, retention, and engagement for the HoneyDew e-commerce platform.

## Design System (from visual-brief.md)
- **Primary:** #F59E0B (Amber/Honey)
- **Secondary:** #10B981 (Emerald)
- **Accent:** #6366F1 (Indigo - for AI features)
- **Background:** #FFFBEB (Warm Cream)
- **Surface:** #FFFFFF (White)
- **Surface Alt:** #FEF3C7 (Lighter Cream)
- **Text Primary:** #1F2937 (Dark Gray)
- **Text Secondary:** #6B7280 (Medium Gray)
- **Font Family:** Inter (Google Fonts)
- **Light Theme Only** - warm, inviting aesthetic

## Existing API Endpoints
- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Products: GET /api/products/, GET /api/products/{id}
- Farms: GET /api/farms/, GET /api/farms/{id}
- Categories: GET /api/categories/
- Cart: GET /api/cart/, POST /api/cart/, PATCH /api/cart/{item_id}, DELETE /api/cart/{item_id}
- Orders: GET /api/orders/, POST /api/orders/, GET /api/orders/{id}
- Reviews: GET /api/reviews/product/{product_id}, POST /api/reviews/

## Growth & Engagement Features

### 1. Email Marketing Integration
- Newsletter signup form with email validation
- Email preference center (product updates, farm news, seasonal alerts)
- Welcome email trigger on new user registration
- Abandoned cart email notification (mock implementation)
- Store email templates in frontend for future backend integration

### 2. Referral Program
- "Refer a Friend" feature - display unique referral code per user
- Referral URL generator: /?ref=CODE
- Referral stats display (referrals made, rewards earned)
- Share buttons (copy link, email, social media)
- Referral reward explanation page

### 3. Loyalty & Rewards System
- Points system: Earn 1 point per $1 spent
- Points balance display in user dashboard
- Points history/transactions list
- Redeem points at checkout (10 points = $1 discount)
- Points milestone badges (100, 500, 1000 points)
- VIP tier display (Bronze, Silver, Gold based on lifetime spend)

### 4. Social Sharing
- Share product pages on social media (Facebook, Twitter/X, Pinterest)
- Share farm pages
- "Share and get $5" campaign integration
- Social proof badges ("120 people bought this this week")
- Share buttons on product cards and detail pages

### 5. Push Notification Permission UI
- Web push notification signup prompt (bellemoji Bell icon in navbar)
- Notification preference toggles (order updates, promotions, farm news)
- Push notification permission request flow with clear value proposition

### 6. Onboarding Experience
- First-time user welcome modal with farm discovery
- Product recommendation carousel on first visit
- "How it works" explainer for farm-to-consumer model
- Quick category shortcuts on homepage for new users

### 7. Customer Feedback Loops
- Post-purchase feedback form (order confirmation page)
- Product review invitation after delivery
- "Rate your experience" NPS survey (simple 1-10 scale)
- Feedback thank you modal with discount incentive

### 8. Retargeting & Abandoned Cart
- "You left something behind" banner for abandoned carts
- Recently viewed products section
- "Back in stock" notification signup for out-of-stock items
- Price drop alerts for wishlisted items

## Backend API Extensions Required

### New Endpoints (backend/app/routes/)
Create new route files or extend existing ones:

**referrals.py:**
- GET /api/referrals/stats - get user's referral code, count, rewards
- POST /api/referrals/apply - apply referral code at registration

**rewards.py:**
- GET /api/rewards/balance - get user's points balance
- GET /api/rewards/history - get points transaction history
- GET /api/rewards/tiers - get VIP tier definitions

**feedback.py:**
- POST /api/feedback/nps - submit NPS score
- POST /api/feedback/product - submit product feedback
- GET /api/feedback/types - get feedback type definitions

**notifications.py:**
- GET /api/notifications/preferences - get user notification prefs
- PUT /api/notifications/preferences - update notification prefs
- POST /api/notifications/stock-alert - signup for back-in-stock alert

### Database Models (backend/app/database.py)
Add new models:
- **referrals:** id, referrer_id, referred_id, referral_code, reward_earned, created_at
- **reward_points:** id, user_id, points, transaction_type (earned/redeemed), order_id, description, created_at
- **notification_preferences:** id, user_id, order_updates, promotions, farm_news, back_in_stock
- **nps_feedback:** id, user_id, score, comments, created_at
- **stock_alerts:** id, user_id, product_id, email, notified, created_at

## Frontend Pages/Components to Create

### Pages (frontend/src/app/)
- /rewards - points balance, history, tiers
- /referrals - referral program, share tools
- /notifications - notification preferences

### Components (frontend/src/components/)
- ReferralShare.tsx - share buttons and referral code display
- PointsBalance.tsx - current points with tier badge
- PointsHistory.tsx - transaction list
- LoyaltyCard.tsx - VIP tier card
- EmailSignup.tsx - newsletter signup form
- FeedbackForm.tsx - NPS and product feedback
- StockAlertSignup.tsx - back-in-stock notification
- SocialShareButtons.tsx - social media share buttons
- WelcomeModal.tsx - first-time user onboarding
- AbandonedCartBanner.tsx - retargeting banner

### Modals/Overlays
- ReferralRewardModal.tsx - show when referral rewards earned
- PointsRedemptionModal.tsx - apply points at checkout

## Technical Requirements

### State Management
- User rewards state in AuthContext
- Cart abandonment tracking in localStorage
- Notification preferences in user profile

### Styling
- All components use Tailwind CSS
- Match HoneyDew design system (amber primary, emerald secondary)
- Mobile-first responsive design
- Warm cream backgrounds, white cards

### Error Handling
- Graceful API failure fallbacks
- Loading states for all async operations
- Empty states for new users (no points, no referrals)

### Performance
- Lazy load reward/referral components
- Optimize referral code generation
- Cache VIP tier calculations

## Deliverables
1. Backend: New API routes for referrals, rewards, feedback, notifications
2. Backend: New database models with proper relationships
3. Frontend: New pages for rewards, referrals, notifications
4. Frontend: Reusable components for all Growth & Engagement features
5. Frontend: Integration with existing auth and cart systems
6. All code follows HoneyDew coding standards and design system
