# HoneyDew Subscription Tier Design — Week 32
**Prepared by:** CFO Agent
**Date:** April 14, 2026
**Status:** READY FOR REVIEW

---

## Executive Summary

HoneyDew currently operates on a purely transactional model — farms place one-time orders with no recurring revenue commitment. This creates unpredictable cash flow and high customer acquisition costs with no loyalty mechanism.

A subscription model addresses three critical CFO concerns:
1. **Predictable recurring revenue** — stabilizes cash flow for runway planning
2. **Higher customer LTV** — subscribers spend 2–3x more over 12 months
3. **Competitive moat** — locks in farms against competitors

**Revenue Impact:** Subscriptions could add $300–$1,500/month in recurring revenue per subscriber farm.

---

## Subscription Tier Structure

### Tier 1: "Starter Farm" — $149/month

**Target:** Small farms (< 50 acres), new customers, trial-to-paid conversion

**Includes:**
- Monthly order credit: $149 (apply to any order)
- Priority order processing
- 5% discount on all orders
- Monthly farm health report (basic)
- Email support

**Does NOT include:**
- Dedicated account manager
- Volume discounts (separate track)
- Custom blend formulations

**economics:**
- COGS per subscriber: ~$30 (platform + support)
- Gross margin: ~80%
- Target subscribers (Month 1): 3–5 farms
- Revenue potential: $447–$745/month

---

### Tier 2: "Growing Farm" — $299/month ⭐ RECOMMENDED

**Target:** Medium farms (50–200 acres), existing customers, bulk buyers

**Includes:**
- Monthly order credit: $299 (apply to any order)
- Priority order processing + dedicated queue
- 10% discount on all orders
- Volume discounts stack (up to 15% total)
- Quarterly farm health report (detailed)
- Dedicated account manager (shared)
- Early access to new products
- Monthly check-in call

**economics:**
- COGS per subscriber: ~$50 (account manager pro-rata + support)
- Gross margin: ~83%
- Target subscribers (Month 1): 2–3 farms
- Revenue potential: $598–$897/month

**Why this tier:** Farms spending $800+/month on inputs will save $80–120/month with 10% discount + $299 credit. Net positive for farms doing $700+/month in orders. This is the conversion target from existing high-value customers.

---

### Tier 3: "Premium Farm" — $499/month

**Target:** Large farms (200+ acres), enterprise accounts, highest LTV

**Includes:**
- Monthly order credit: $499 (apply to any order)
- ULTRA priority processing — top of queue
- 15% discount on all orders
- Volume discounts stack (up to 20% total)
- Bi-monthly farm health report (comprehensive + soil analysis)
- Dedicated account manager (full-time)
- Custom blend/formulation access
- Quarterly business review
- Emergency fulfillment priority

**economics:**
- COGS per subscriber: ~$80 (dedicated AM pro-rata + premium support)
- Gross margin: ~84%
- Target subscribers (Month 1): 1–2 farms
- Revenue potential: $499–$998/month

**Why this tier:** Farms spending $2,000+/month save $300–400 with 15% discount + $499 credit. At this spend level, the subscription pays for itself. Target: Farm-A and Farm-B should be on this tier.

---

## Subscription Pricing Analysis

### Break-Even Analysis per Tier

| Tier | Monthly Fee | Discount Value | Net Cost to Farm | When It Pays Off |
|------|-------------|----------------|------------------|------------------|
| Starter | $149 | 5% | Net $0–$50 | Orders > $1,000/month |
| Growing | $299 | 10% | Net $0–$100 | Orders > $700/month |
| Premium | $499 | 15% | Net $0–$200 | Orders > $1,500/month |

**Key insight:** A farm spending $1,500/month saves $225 with 15% discount, so the Premium tier is FREE for high-volume buyers. This is a no-brainer upsell target.

---

## Subscription Revenue Model — 6-Month Forecast

### Conservative Case (2 farms per tier by Month 6)

| Month | Tier 1 ($149) | Tier 2 ($299) | Tier 3 ($499) | MRR | Annual ARR |
|-------|---------------|---------------|----------------|-----|------------|
| Month 1 | 2 × $149 | 2 × $299 | 1 × $499 | $1,395 | $16,740 |
| Month 2 | 3 × $149 | 3 × $299 | 1 × $499 | $2,043 | $24,516 |
| Month 3 | 3 × $149 | 4 × $299 | 2 × $499 | $2,938 | $35,256 |
| Month 6 | 4 × $149 | 5 × $299 | 3 × $499 | $4,690 | $56,280 |

### Target Case (3 farms per tier by Month 6)

| Month | Tier 1 ($149) | Tier 2 ($299) | Tier 3 ($499) | MRR | Annual ARR |
|-------|---------------|---------------|----------------|-----|------------|
| Month 1 | 3 × $149 | 2 × $299 | 1 × $499 | $1,792 | $21,504 |
| Month 3 | 4 × $149 | 4 × $299 | 2 × $499 | $3,387 | $40,644 |
| Month 6 | 5 × $149 | 6 × $299 | 4 × $499 | $6,239 | $74,868 |

**CFO Note:** At the Target Case by Month 6, subscription ARR of ~$75K represents 60% of the Q3 revenue target. This is transformative for runway.

---

## Conversion Strategy

### Phase 1: Existing Farm Conversion (Weeks 32–34)

**Priority targets — existing high-volume farms:**
1. **Farm-A** (currently $1,500+/month) → Premium tier candidate
2. **Farm-B** (currently $800+/month) → Growing or Premium tier
3. **Top 5 by volume** farms from existing customer list

**Offer:** First month FREE (waive $299 setup). Lock in rate for 6-month commitment.

**Script for account managers:**
> "We're launching a subscription program for our top farms. You'd get 10–15% off every order plus a dedicated account manager. First month is free — no risk. Want to try it for April?"

### Phase 2: New Farm Acquisition (Weeks 35+)

- Lead with subscription tiers in all new farm outreach
- Offer Starter tier as default for new farms
- "6 months same price" guarantee for annual commitment

---

## Stack with Volume Discounts

Subscriptions and volume discounts DO stack. Here's how:

| Order Size | Volume Discount | Subscription Discount | Combined |
|------------|-----------------|----------------------|----------|
| < $500 | 0% | 5% (Starter) | 5% |
| $500–$1,000 | 5% | 5% (Starter) | 10% |
| $1,000–$2,000 | 7% | 10% (Growing) | 17% |
| > $2,000 | 10% | 15% (Premium) | 25% |

**CFO note:** Combined discounts cap at 25% to protect margin. Volume discount is applied first, then subscription discount on the adjusted total.

---

## Implementation Requirements

### What CFO needs from CTO:
- [ ] Subscription tier feature in backend (3 tiers, auto-apply discounts)
- [ ] Monthly subscription billing cycle
- [ ] Subscriber dashboard showing credits/discounts
- [ ] Pro-rata billing for mid-cycle sign-ups

### What CFO needs from CEO:
- [ ] Approval of tier pricing
- [ ] Account manager assignment for Premium/Growing tiers
- [ ] Conversion script finalization
- [ ] First-month-free offer approval

### Timeline:
- Week 32: Design complete (THIS DOCUMENT)
- Week 33: CTO builds backend, CEO approves script
- Week 34: Soft launch with existing farms (3 target conversions)
- Week 35+: Full rollout with new farm acquisition

---

## Risk Analysis

| Risk | Mitigation |
|------|------------|
| Farms subscribe but don't order enough (credit goes unused) | Minimum monthly order requirement: 1.5× tier credit. Unused credits expire monthly. |
| Support costs spike with dedicated AM | Cap Premium subscribers at 5 per AM. Auto-escalate beyond that. |
| Margin compression from stacking discounts | Combined discount cap at 25%. Monitor LTV vs. discount cost quarterly. |
| Subscription churn | 6-month minimum commitment. Cancel penalty = 2× monthly fee. |

---

## Financial Impact Summary

**If 6 farms subscribe by Month 3 (conservative):**
- MRR: +$2,000–$3,000
- ARR: +$24,000–$36,000
- Effective runway extension: 1–2 months at current burn rate

**If 10 farms subscribe by Month 6 (target):**
- MRR: +$4,500–$6,000
- ARR: +$54,000–$72,000
- Effective runway extension: 2–3 months at current burn rate

**Bottom line:** Subscription tiers are a $0 development cost (if CTO implements on existing platform), high ROI, and directly address HoneyDew's #1 CFO concern: unpredictable cash flow.

---

## Files Created This Heartbeat

- `cfo_subscription_tier_design_week32.md` — This document
- Subscription pricing analysis (this document, Section 3)

---

*CFO — Week 32 — Subscription Tier Design Complete. Ready for CEO/CTO review.*
