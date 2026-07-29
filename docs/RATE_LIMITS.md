# Rate Limits Specification

> **Overview**: GigPilot AI enforces rate limits on API traffic using `@fastify/rate-limit` with an Upstash Redis backing store. Rate limits protect system availability, mitigate denial-of-service attempts, and ensure fair resource allocation across user subscription tiers.

---

## Tier-Based Limits Matrix

Rate limits are evaluated based on user account tier and authenticated API token. Unauthenticated traffic defaults to IP-based rate limiting.

| Account Tier / Context | Window Size | Max Requests | Storage Engine | Key Strategy |
|------------------------|-------------|--------------|----------------|--------------|
| **Public / Unauthenticated** | 1 Minute | 60 requests | Redis | Client IP (`req.ip`) |
| **Free Plan Users** | 1 Minute | 100 requests | Redis | User ID (`req.user.id`) |
| **Pro Plan Users** | 1 Minute | 300 requests | Redis | User ID (`req.user.id`) |
| **Agency Plan Users** | 1 Minute | 1,000 requests | Redis | User ID (`req.user.id`) |
| **Background Scheduler** | Unlimited | No limit | N/A | `X-Cron-Secret` bypass |

---

## HTTP Rate Limit Headers

Every HTTP response includes standard rate limit headers indicating window allowance and remaining requests:

```http
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1722470460
Retry-After: 45
```

| Header | Description |
|--------|-------------|
| `RateLimit-Limit` | Maximum allowed requests in the current 60-second window |
| `RateLimit-Remaining` | Remaining requests allowed within the current window |
| `RateLimit-Reset` | Unix timestamp (seconds) when the current window resets |
| `Retry-After` | Seconds to wait before making another request (sent on `429` errors) |

---

## Rate Limit Failure Response (HTTP 429)

When a client exceeds their allocated quota within the time window, the server returns an `HTTP 429 Too Many Requests` error:

```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. You have sent too many requests in a short period. Please try again in 45 seconds.",
  "retryAfterSeconds": 45
}
```

---

## Client-Side Retry Implementation

Clients should implement exponential backoff with jitter when encountering `429` status codes:

```typescript
async function fetchWithExponentialBackoff(
  url: string,
  options: RequestInit,
  maxRetries = 4
): Promise<Response> {
  let attempt = 0;

  while (attempt < maxRetries) {
    const response = await fetch(url, options);

    if (response.status !== 429) {
      return response;
    }

    attempt++;
    const retryAfterHeader = response.headers.get('Retry-After');
    const delaySeconds = retryAfterHeader 
      ? parseInt(retryAfterHeader, 10) 
      : Math.pow(2, attempt) + Math.random();

    console.warn(`[429 Rate Limited] Retrying attempt ${attempt}/${maxRetries} after ${delaySeconds}s`);
    await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
  }

  throw new Error(`Request failed after ${maxRetries} rate limit retries.`);
}
```

---

## Related Documentation

- [Error Handling](ERROR_HANDLING.md)
- [Authentication Guide](AUTHENTICATION.md)
- [API Reference](API_REFERENCE.md)
