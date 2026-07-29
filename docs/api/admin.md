# Admin API

> **Overview**: The Admin API provides system management capabilities for platform administrators, including user management, system metrics monitoring, content moderation, and AI model quota adjustments.

---

## Current Status & Roadmap

Status: **Planned / Tiered Access Enforcement**

The GigPilot AI role hierarchy includes an `Admin` tier. Dedicated `/api/admin/*` endpoints are defined in the system specification and scheduled for upcoming platform releases.

---

## Role & Authorization Hierarchy

Access to administrative endpoints requires a user account with the `Admin` role flag (`role = 'Admin'`).

```typescript
export type UserRole = 'Free' | 'Pro' | 'Agency' | 'Admin';
```

| Role | Access Level | Description & Capabilities |
|------|--------------|----------------------------|
| `Free` | Level 0 | Basic features, 10 monthly credits |
| `Pro` | Level 1 | Unlimited manual tools, 500 monthly credits |
| `Agency` | Level 2 | Team access, 2500 monthly credits, Social Scheduler |
| `Admin` | Level 3 | Complete administrative privileges & system metrics |

---

## Planned Endpoint Specification

### User Management

#### `GET /api/v1/admin/users`
Lists all registered platform users with pagination and filtering by plan or status.

```bash
curl -X GET "https://api.gigpilot.ai/api/v1/admin/users?page=1&limit=20" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

#### `GET /api/v1/admin/users/:id`
Retrieves granular account details, credit log, and payment history for a specific user ID.

#### `PUT /api/v1/admin/users/:id`
Updates a user's role (`Free`, `Pro`, `Agency`, `Admin`) or manually adjusts credit balances.

```json
{
  "role": "Agency",
  "creditAdjustment": +500,
  "reason": "Customer support upgrade bonus"
}
```

---

### System Monitoring & Metrics

#### `GET /api/v1/admin/stats`
Returns system-wide aggregated metrics across all active users.

**Response Example**:

```json
{
  "success": true,
  "data": {
    "totalUsers": 1420,
    "activeSubscriptions": 380,
    "totalGigsGenerated": 8450,
    "totalProposalsGenerated": 23100,
    "aiProviderUsage": {
      "openai": "65%",
      "gemini": "20%",
      "claude": "15%"
    },
    "monthlyRecurringRevenue": "$4,250.00"
  }
}
```

#### `GET /api/v1/admin/health`
Detailed infrastructure health metrics (Database connections pool, Redis latency, AI provider response times).

---

### AI Quota & Rate Limit Management

#### `PUT /api/v1/admin/ai/limits`
Dynamically adjusts global rate limits and default credit costs per tool.

```json
{
  "gig_generator_cost": 2,
  "proposal_generator_cost": 1,
  "max_requests_per_min": 60
}
```

---

## Security Requirements

- **Header Authentication**: `Authorization: Bearer <token>`
- **Role Verification Middleware**: `requireRole('Admin')` returns HTTP `403 Forbidden` if user is not an Admin.

---

## Related Documentation

- [Auth API](auth.md)
- [Users API](users.md)
- [Architecture Overview](../ARCHITECTURE.md)
- [Security Guide](../SECURITY.md)
