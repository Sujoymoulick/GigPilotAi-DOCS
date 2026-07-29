# Webhooks Specification

> **Overview**: Webhooks in GigPilot AI enable real-time asynchronous communication for external events (e.g. Razorpay payment notifications) and outgoing platform event delivery (e.g., social media publishing status updates and AI batch generation completions).

---

## Active & Supported Webhooks

### 1. Inbound Razorpay Payment Webhook

GigPilot AI listens for inbound webhooks from Razorpay to process payment updates and credit allocations in real-time.

- **Endpoint**: `POST /api/webhooks/razorpay`
- **Authentication**: HMAC-SHA256 Signature Header (`X-Razorpay-Signature`)

#### Handled Inbound Events

| Event Type | Trigger Condition | System Action |
|------------|-------------------|---------------|
| `order.paid` | Successful payment for plan upgrade | Grants subscription tier & credits to user account |
| `subscription.charged` | Recurring monthly subscription payment | Replenishes monthly credit quota |
| `payment.failed` | Failed payment attempt | Notifies user via in-app notification |

#### HMAC Signature Verification Example

```typescript
import crypto from 'node:crypto';

export function verifyRazorpaySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
}
```

---

## Outgoing Webhooks System (Planned Roadmap)

For outgoing event delivery to third-party integrations, GigPilot AI is developing an outgoing webhook subscription engine.

---

## Planned Event Catalog

### AI & Resource Events

| Event Identifier | Description | Payload Data |
|------------------|-------------|--------------|
| `generation.completed` | AI generation task finished | Output text, token counts, execution duration |
| `generation.failed` | AI model error or failure | Error message, failed prompt payload |
| `credits.depleted` | Account credit balance reaches zero | User ID, remaining credits count |

### Social Media Hub Events

| Event Identifier | Description | Payload Data |
|------------------|-------------|--------------|
| `post.published` | Social post published to target platform | Platform, post URL, published timestamp |
| `post.failed` | Social post broadcast failed | Error details, retry count, target account ID |
| `post.scheduled` | Post queued in social scheduler | Schedule ID, target platforms, scheduled timestamp |

---

## Outgoing Webhook Payload Envelope

All outgoing webhook dispatches follow a uniform JSON structure:

```json
{
  "id": "evt_9876543210",
  "event": "post.published",
  "created_at": "2026-07-30T02:15:00.000Z",
  "data": {
    "postId": "sub_123456",
    "platform": "linkedin",
    "status": "published",
    "postUrl": "https://linkedin.com/posts/activity-123456789"
  },
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "freelancer@example.com"
  }
}
```

---

## Webhook Security Best Practices

1. **Verify Signatures**: Always validate the `X-GigPilot-Signature` HMAC header against your endpoint secret.
2. **Idempotency Handling**: Store the event `id` to handle duplicate webhook deliveries safely.
3. **Response Timeout**: Respond within 5 seconds with an `HTTP 200 OK` status to prevent retries.

---

## Current Polling Alternatives

While outgoing client webhooks are in beta, clients can obtain status updates by:

- **Polling List Endpoints**: Call `GET /api/social/posts` or `GET /api/notifications` periodically.
- **WebSocket Feeds**: Listen for live state changes in web clients.

---

## Related Documentation

- [Payments & Billing API](api/payments.md)
- [Social API](api/social.md)
- [Architecture Guide](ARCHITECTURE.md)
