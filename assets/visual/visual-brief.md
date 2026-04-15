# HoneyDew 2026 — Visual Brief

**App:** HoneyDew 2026
**Tagline:** "Fresh From the Farm, Powered by AI"
**Visual Preparation:** R1 — Generated via ComfyUI (z_image_turbo)
**Date:** 2026-04-13

---

## Concept & Visual Direction

HoneyDew 2026 is a farm-to-consumer e-commerce platform with a **warm, light aesthetic**. The visual language conveys trustworthiness, freshness, and community — like walking into a high-end farmers market with the convenience of online shopping.

**Mood Keywords:** Fresh | Trustworthy | Community-driven | Organic | Warm

---

## Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#F59E0B` | Amber/Honey — warmth, freshness, appetite |
| Secondary | `#10B981` | Emerald — health, organic, verified |
| Accent | `#6366F1` | Indigo — AI features, premium |
| Background | `#FFFBEB` | Warm Cream — main background |
| Surface | `#FFFFFF` | White — cards, modals |
| Surface Alt | `#FEF3C7` | Lighter Cream — hover, subtle bg |
| Text Primary | `#1F2937` | Dark Gray |
| Text Secondary | `#6B7280` | Medium Gray |

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** Inter 700
- **Body:** Inter 400/500
- **Price/Stats:** JetBrains Mono 500

### Icon Style
- **Style:** Clean, warm, organic icons
- **Primary:** Amber/honey tones for branding
- **Organic elements:** Emerald green for farm/natural feel
- **AI elements:** Indigo accent for AI features

### Theme: LIGHT
This app uses a **warm cream background** (not dark theme like other apps in the VexPivot pipeline).

---

## Generated Assets

### App Icons
| File | Description | Theme |
|------|-------------|-------|
| `app-icon-honeydew.png` | Primary app icon | Honey hexagon + emerald leaf |

### UI Components
| File | Description | Usage |
|------|-------------|-------|
| `component-product-card.png` | Product listing card | Image, price, add to cart |
| `component-farm-card.png` | Farm profile card | Farm image, name, verified badge |
| `component-cart-item.png` | Cart item row | Thumbnail, qty, price |
| `component-checkout-button.png` | Checkout CTA | Amber button with cart icon |
| `empty-state-cart.png` | Empty cart state | Inviting, warm illustration |

---

## E-Commerce Features

### Product Catalog
- Browse by category, search, filter by farm/price/availability
- Product detail pages with image gallery
- Featured products on homepage

### Farm Profiles
- Farm info, story, location, ratings
- Verified farm badge (emerald checkmark)
- Featured farms section

### Shopping Cart
- Add/remove items, update quantities
- Persistent cart (session-based)
- Cart total with shipping estimate

### Checkout
- Address selection/entry
- Order summary
- AI-powered recommendations

---

## Technical Notes

- All assets generated at 512x512px via ComfyUI z_image_turbo
- **LIGHT THEME** — warm cream background throughout
- PNG format for all generated assets
- Designed for mobile-first (375px width baseline)

---

## S5.5 Visual Polish Notes

For S5.5 (Visual Polish Pass), the polish agent should:
1. Use the color tokens from `design-tokens.css`
2. Reference generated PNGs as style guides for SVG recreation
3. Apply amber/honey as primary, emerald as secondary
4. Ensure AI features are highlighted with indigo accent
5. Maintain warm, inviting light theme throughout
6. Note: Honey/amber buttons may have shadow-honey glow effect
