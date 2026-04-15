# HoneyDew 2026 — Payment Integration Plan

**CFO Agent** | Financial Infrastructure Planning  
**Date:** April 14, 2026  
**Project:** HoneyDew 2026 (AI-Powered Shopify Store Builder)  
**Status:** PLANNING — CFO Required Input

---

## Executive Summary

HoneyDew 2026 requires payment integration to process customer transactions. As an e-commerce platform connecting farmers to consumers, payment processing is CRITICAL for revenue collection. This document outlines the financial analysis of payment provider options, fee structures, and integration requirements.

**Recommendation:** Stripe (primary) + Shopify Payments (secondary) — Total effective rate: 2.59% + $0.30 per transaction.

---

## Payment Provider Comparison

### Option 1: Stripe (Recommended)

| Fee Type | Rate | Notes |
|----------|------|-------|
| Domestic Cards | 2.9% + $0.30 | Standard Stripe rate |
| International | 3.9% + $0.30 | Currency conversion fees |
| Amex | 3.5% + $0.30 | Higher for premium cards |
| Effective Rate (Domestic) | ~3.1% | All-in with fees |
| Payout Schedule | 2 days | Standard |

**Pros:**
- Best API integration for React/Vite frontend
- Supports Shopify-style checkout flows
- Fraud detection (Radar) included
- Multi-currency support
- No monthly fees

**Cons:**
- Slightly higher than Square
- Requires Stripe account + dashboard setup

### Option 2: Square

| Fee Type | Rate | Notes |
|----------|------|-------|
| In-person | 2.6% + $0.10 | Card-present |
| Online | 3.5% + $0.30 | Card-not-present |
| Effective Rate (Online) | ~3.8% | Higher for e-commerce |

**Pros:**
- Lower for in-person
- Square POS integration
- Square Terminal for physical

**Cons:**
- Higher for online
- Less flexible API

### Option 3: Braintree (PayPal)

| Fee Type | Rate | Notes |
|----------|------|-------|
| Credit Card | 2.9% + $0.30 | Same as Stripe |
| PayPal | 2.9% + $0.30 | Additional payment option |
| Venmo | 3.5% + $0.30 | Higher |

**Pros:**
- PayPal integration (450M users)
- Multi-channel support

**Cons:**
- More complex integration
- PayPal UX can cause drop-offs

---

## Financial Impact Analysis

### Transaction Volume Projections (HoneyDew Launch Year 1)

| Month | Expected Orders | Avg Order Value | Gross Revenue |
|-------|---------------|-----------------|---------------|
| Month 1 | 50 | $45.00 | $2,250 |
| Month 2 | 120 | $48.00 | $5,760 |
| Month 3 | 200 | $50.00 | $10,000 |
| Month 6 | 400 | $52.00 | $20,800 |
| Month 12 | 800 | $55.00 | $44,000 |

### Payment Fee Projections (Stripe @ 3.1% effective)

| Month | Gross Revenue | Payment Fees | Net Revenue |
|-------|--------------|--------------|-------------|
| Month 1 | $2,250 | $69.75 | $2,180.25 |
| Month 2 | $5,760 | $178.56 | $5,581.44 |
| Month 3 | $10,000 | $310.00 | $9,690.00 |
| Month 6 | $20,800 | $644.80 | $20,155.20 |
| Month 12 | $44,000 | $1,364.00 | $42,636.00 |

**Year 1 Total Fees:** ~$12,500 estimated

---

## Integration Requirements

### Frontend (React + Vite + TypeScript)

1. **Stripe.js** — Client-side payment library
   ```
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

2. **Checkout Flow Components:**
   - `PaymentForm.tsx` — Card input with Stripe Elements
   - `CheckoutSummary.tsx` — Order total + fees
   - `SuccessConfirmation.tsx` — Post-payment confirmation

3. **Environment Variables Required:**
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   ```

### Backend (Node.js + Express)

1. **Stripe Node SDK**
   ```
   npm install stripe
   ```

2. **API Endpoints Required:**
   ```
   POST /api/payments/create-intent — Create payment intent
   POST /api/payments/confirm — Confirm payment
   GET  /api/payments/:id — Get payment status
   POST /api/payments/webhook — Stripe webhook handler
   ```

3. **Environment Variables:**
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

---

## Revenue Split Analysis (Marketplace Model)

If HoneyDew acts as a marketplace (farmers sell through platform):

| Scenario | Platform Fee | Farmer Receives | Per $50 Order |
|----------|-------------|-----------------|---------------|
| HoneyDew takes 10% | $5.00 | $45.00 | $0.30 fee to Stripe |
| HoneyDew takes 15% | $7.50 | $42.50 | $0.30 fee to Stripe |
| HoneyDew takes 20% | $10.00 | $40.00 | $0.30 fee to Stripe |

**Net to HoneyDew (10% take rate, $50 order):**
- Gross: $5.00 (platform fee)
- Stripe fee: -$0.30
- Net to HoneyDew: **$4.70 per order**

---

## Cash Flow Impact

### Payment Timing
- **Stripe payout:** D+2 (2 business days)
- **Instant payouts:** Available with Stripe Connect (additional 0.1% fee)

### Working Capital Impact
- $44,000/month revenue @ D+2 average
- Average outstanding: ~$2,933 (at any given time)
- Not a significant concern at HoneyDew's scale

---

## Implementation Priority

### Phase 1: MVP (Must Have)
- [ ] Stripe account setup
- [ ] Basic checkout (single product)
- [ ] Payment confirmation email
- [ ] Webhook for order fulfillment trigger

### Phase 2: Full Platform
- [ ] Stripe Connect for farmer payouts
- [ ] Subscription billing (weekly produce boxes)
- [ ] Refund handling
- [ ] Dispute resolution

### Phase 3: Scale
- [ ] Multi-currency support
- [ ] Installment payments (Klarna/Afterpay)
- [ ] Loyalty/rewards points as currency

---

## Risk Factors

1. **Payment processor rejection** — Ensure farmer identity verification is complete before first payout
2. **Chargebacks** — Budget $500/quarter for dispute resolution
3. **Seasonal volume** — Q4 (holidays) will stress payment infrastructure; load test at 3x normal

---

## CFO Recommendation

**Action:** Implement Stripe as primary payment provider for HoneyDew launch.

**Rationale:**
- Best API for React/Vite stack
- Industry-standard 2.9% + $0.30 is acceptable for farm-to-consumer margins
- D+2 payout is reasonable for startup cash flow
- Stripe's fraud detection (Radar) worth the 0.5% upgrade for high-risk categories

**Next Steps:**
1. Create Stripe account (CEO or authorized signer)
2. CFO to set up Stripe dashboard withHoneyDew as platform
3. Engineering to implement Stripe Elements in checkout
4. CFO to model payment fee impact into financial projections

---

## Files Referenced

- `SPEC.md` — HoneyDew full specification
- Financial projections in CFO reports

---

*This document is CFO-produced financial analysis for payment infrastructure planning. Technical implementation depends on engineering resources and CEO approval for Stripe account setup.*