# Analytics API

> **Overview**: The Analytics API provides aggregated performance metrics, usage statistics, credit consumption history, words generated, estimated time saved, and tool breakdown data for the freelancer dashboard.

---

## Key Capabilities

- **Dashboard Aggregates**: Retrieve high-level statistics across all GigPilot AI tools.
- **Usage History**: 30-day breakdown of AI requests and credit spending.
- **Productivity Tracking**: Calculate generated word counts and estimated hours saved.

---

## Authentication

All analytics endpoints require authentication using a valid Bearer JWT token.

---

## Data Model

```json
{
  "totalGigs": 14,
  "totalProposals": 52,
  "totalKeywordsSearched": 89,
  "creditsUsedMonth": 142,
  "wordsGenerated": 42150,
  "timeSavedHours": 32.5,
  "favoriteTools": [
    { "tool": "Proposal Generator", "usageCount": 52 },
    { "tool": "Gig Generator", "usageCount": 14 }
  ],
  "dailyUsage": [
    { "date": "2026-07-29", "credits": 8, "requests": 6 },
    { "date": "2026-07-30", "credits": 12, "requests": 9 }
  ]
}
```

---

## Endpoints

### `GET /api/analytics`

Retrieves system analytics and usage totals for the authenticated user.

**Authentication**: Required

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `period` | `string` | `30d` | Time window (`7d`, `30d`, `90d`, `1y`, `all`) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "summary": {
      "creditsBalance": 250,
      "creditsUsed": 142,
      "wordsGenerated": 42150,
      "timeSavedHours": 32.5
    },
    "toolBreakdown": {
      "gigs": 14,
      "proposals": 52,
      "keywords": 89,
      "pricing": 12,
      "healthChecks": 8,
      "portfolio": 5,
      "socialPosts": 34
    }
  }
}
```

**cURL Example**:

```bash
curl -X GET "https://api.gigpilot.ai/api/analytics?period=30d" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Alias Routes (v1 API)

- `GET /api/v1/analytics`

---

## Related Documentation

- [Users API](users.md)
- [AI API](ai.md)
- [Social API](social.md)
