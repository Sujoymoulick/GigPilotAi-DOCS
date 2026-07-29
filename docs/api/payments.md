# Payments & Billing API

> **Overview**: The Payments & Billing API handles subscription plans, Razorpay payment processing, order creation, payment signature verification, credit top-ups, and coupon code redemptions for GigPilot AI.

---

## Subscription Plans & Pricing Matrix

| Plan Tier | Price (INR/USD) | Monthly Credits | Key Features |
|-----------|-----------------|-----------------|--------------|
| **Free** | ₹0 / $0 | 10 credits | Access to all basic AI generators |
| **Pro** | ₹999 / $15 | 500 credits | Unlimited manual tools, priority AI processing |
| **Agency** | ₹2,999 / $45 | 2,500 credits | Social Scheduler, Multi-account, Custom AI models |

---

## Key Capabilities

- **Retrieve Billing Details**: Fetch current active plan, credit balance, renewal date, and invoices.
- **Plan Upgrades**: Generate Razorpay orders for plan upgrades or credit top-up packages.
- **Coupons**: Apply discount codes (e.g. `LAUNCH20` for 20% off).

---

## Endpoints

### `GET /api/billing`

Retrieves subscription details, billing history, and credit usage status.

**Authentication**: Required

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "plan": "Pro",
    "status": "active",
    "creditsBalance": 358,
    "monthlyQuota": 500,
    "currentPeriodEnd": "2026-08-15T00:00:00.000Z",
    "razorpaySubscriptionId": "sub_K123456789",
    "invoices": [
      {
        "id": "inv_001",
        "amount": 99900,
        "currency": "INR",
        "status": "paid",
        "created_at": "2026-07-15T10:00:00.000Z"
      }
    ]
  }
}
```

---

### `POST /api/billing/upgrade`

Initiates an order for plan upgrade or additional credit purchase.

**Authentication**: Required

**Request Body**:

```json
{
  "targetPlan": "Pro",
  "couponCode": "LAUNCH20"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "orderId": "order_M987654321",
    "amount": 79900,
    "currency": "INR",
    "key": "rzp_live_xxxxxxxxxxxx",
    "plan": "Pro",
    "discountApplied": 20
  }
}
```

**cURL Example**:

```bash
curl -X POST https://api.gigpilot.ai/api/billing/upgrade \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targetPlan": "Pro",
    "couponCode": "LAUNCH20"
  }'
```

---

## Alias Routes (v1 API)

- `GET /api/v1/payments/billing`
- `POST /api/v1/payments/upgrade`

---

## Related Documentation

- [Webhooks Guide (Razorpay Webhooks)](../WEBHOOKS.md)
- [Users API](users.md)
- [Database Schema](../DATABASE.md)
