# Pagination Specification

> **Overview**: This document defines the pagination architecture, query conventions, client-side pagination practices, and response envelope structures for list-based endpoints across the GigPilot AI platform.

---

## Current State & Pagination Standard

GigPilot AI uses a standardized page-and-limit query pattern (`?page=1&limit=20`) across core resource collection endpoints. For legacy compatibility, non-paginated queries return full array payloads scoped to the authenticated user ID.

---

## Query Parameters Convention

Collection list requests support standard URL query parameters:

| Parameter | Type | Default | Constraints | Description |
|-----------|------|---------|-------------|-------------|
| `page` | `integer` | `1` | Min: `1` | Target page index (1-based offset) |
| `limit` | `integer` | `20` | Min: `1`, Max: `100` | Maximum records per response page |
| `sort` | `string` | `created_at` | Field name | Ordering key |
| `order` | `string` | `desc` | `asc` \| `desc` | Sorting direction |

---

## Standard Pagination Response Envelope

List endpoints wrap response arrays in a standard data envelope with pagination metadata:

```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Fullstack Node.js Developer Proposal",
      "created_at": "2026-07-30T02:00:00.000Z"
    }
  ],
  "meta": {
    "total": 145,
    "page": 1,
    "limit": 20,
    "totalPages": 8,
    "hasMore": true
  }
}
```

---

## Endpoints Summary Matrix

| Endpoint | Supported Parameters | Default Page Size |
|----------|----------------------|-------------------|
| `GET /api/gigs` | `page`, `limit`, `status` | 10 |
| `GET /api/proposals` | `page`, `limit`, `status` | 10 |
| `GET /api/history` | `page`, `limit`, `tool` | 20 |
| `GET /api/notifications` | `page`, `limit`, `read` | 20 |
| `GET /api/social/posts` | `page`, `limit`, `platform` | 20 |

---

## Client-Side Pagination Example

When consuming list endpoints in TypeScript / React apps:

```typescript
interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}

async function fetchUserGigs(page = 1, limit = 10): Promise<PaginatedResponse<Gig>> {
  const res = await fetch(`https://api.gigpilot.ai/api/gigs?page=${page}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return res.json();
}
```

---

## Related Documentation

- [API Reference](API_REFERENCE.md)
- [API Index](API_INDEX.md)
- [Error Handling](ERROR_HANDLING.md)
