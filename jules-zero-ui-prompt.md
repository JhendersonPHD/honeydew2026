# Jules Session Prompt: Zero-UI Conversational for HoneyDew2026

## Project Context
**App:** HoneyDew2026 - Farm-to-Consumer E-Commerce Platform
**Tagline:** "Fresh From the Farm, Powered by AI"
**Repo:** /home/jonathon/VexPivot/projects/honeydew2026
**Target Branch:** feature/jules-zero-ui

## Domain: Zero-UI Conversational

Build a conversational AI interface (chatbot) that allows users to interact with the HoneyDew e-commerce platform through natural language - with minimal traditional UI elements.

## Design System (from visual-brief.md)
- **Primary:** #F59E0B (Amber/Honey)
- **Secondary:** #10B981 (Emerald)
- **Accent:** #6366F1 (Indigo - for AI features)
- **Background:** #FFFBEB (Warm Cream)
- **Surface:** #FFFFFF (White)
- **Text Primary:** #1F2937 (Dark Gray)
- **Light Theme Only** - warm, inviting aesthetic

## Existing API (Base URL: http://localhost:8017/api)
- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Products: GET /api/products/, GET /api/products/{id}
- Farms: GET /api/farms/, GET /api/farms/{id}
- Categories: GET /api/categories/
- Cart: GET /api/cart/, POST /api/cart/, PATCH /api/cart/{item_id}, DELETE /api/cart/{item_id}
- Orders: GET /api/orders/, POST /api/orders/, GET /api/orders/{id}
- Reviews: GET /api/reviews/product/{product_id}, POST /api/reviews/

## Zero-UI Conversational Features

### 1. Conversational Product Search
- Natural language product queries: "Show me organic tomatoes" → queries /api/products/
- Filter by farm, category, price range through conversation
- Voice input support with speech-to-text

### 2. Conversational Cart Management
- "Add 2 lbs of tomatoes to my cart" → POST /api/cart/
- "Update my cart to have 3 items" → PATCH /api/cart/{item_id}
- "Remove the tomatoes from my cart" → DELETE /api/cart/{item_id}
- "What's in my cart?" → GET /api/cart/

### 3. Conversational Checkout Flow
- Guide user through checkout via chat
- "I want to checkout" → shows order summary
- Address collection through conversation
- Order confirmation via chat

### 4. Conversational Order Tracking
- "Where's my order?" → GET /api/orders/
- Status updates via chat
- Order history in natural language

### 5. Conversational Farm Discovery
- "Tell me about Sunny Acres Farm" → GET /api/farms/{id}
- Farm recommendations based on user preferences
- Seasonal availability queries

### 6. Conversational Reviews
- "Show me reviews for tomatoes" → GET /api/reviews/product/{product_id}
- Submit reviews via chat

## Technical Requirements

### Minimal UI Principles
- Chat interface as primary interaction method
- Use rich message types (cards, buttons, carousels) sparingly
- Mobile-first, responsive design
- Fast, lightweight - minimal DOM manipulation

### Message UI Components
- Text bubbles (user vs bot)
- Product cards (inline with chat)
- Quick reply buttons
- Typing indicators
- Voice message support (UI only, backend integration optional)

### State Management
- Conversation context (cart state, current product, user session)
- Message history persistence
- Session-based cart awareness

### API Integration
- All existing HoneyDew API endpoints
- Error handling for API failures
- Loading states during API calls
- Mock auth for demo (guest shopping supported)

## Deliverables
1. React component for chat interface
2. Message types: text, product-card, cart-summary, order-status, farm-info
3. Quick reply components
4. Voice input toggle (UI only)
5. Conversational flow logic
6. Integration with existing HoneyDew API
7. Warm cream/amber theme matching HoneyDew branding

## Code Standards
- Use TypeScript for type safety
- Follow existing HoneyDew code patterns
- Minimal dependencies - vanilla React preferred
- No external chatbot SDK - custom simple implementation
- Mobile-first responsive design
- Proper error handling and edge cases