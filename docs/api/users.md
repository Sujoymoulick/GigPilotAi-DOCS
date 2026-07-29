# Users API

> **Overview**: The Users API manages user profiles, account metadata, subscription tiers, and credit balance information within GigPilot AI. It provides endpoints for retrieving profile details, managing account settings, and checking usage quotas.

---

## Authentication & Security

All Users API endpoints require authentication using a valid Supabase Bearer JWT token in the `Authorization` header.

```http
Authorization: Bearer <your_jwt_token>
```

---

## Key Capabilities

- **Profile Retrieval**: Fetch user identity, email, avatar, and full name.
- **Quota & Balance Inspection**: Inspect remaining AI generation credits and subscription status.
- **Account Preferences**: Retrieve and update user-level preferences (theme, default AI provider, notifications).

---

## Data Models

### User Profile Object

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "fullName": "Jane Doe",
  "avatarUrl": "https://example.com/avatar.jpg",
  "role": "Pro",
  "credits": 250,
  "createdAt": "2026-01-15T08:30:00.000Z",
  "updatedAt": "2026-07-30T02:00:00.000Z"
}
```

---

## Endpoints

### `GET /api/v1/auth/me`

Retrieves the currently authenticated user's profile and account state.

**Authentication**: Required (Bearer Token)

**Request Headers**:

| Header | Type | Description |
|--------|------|-------------|
| `Authorization` | `string` | Bearer JWT Token |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "jane@example.com",
    "fullName": "Jane Doe",
    "role": "Pro",
    "credits": 250,
    "createdAt": "2026-01-15T08:30:00.000Z"
  }
}
```

**cURL Example**:

```bash
curl -X GET https://api.gigpilot.ai/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

### `PUT /api/v1/settings`

Updates profile details and system preferences for the current user.

**Authentication**: Required (Bearer Token)

**Request Body**:

```json
{
  "fullName": "Jane Smith",
  "defaultAiProvider": "openai",
  "emailNotifications": true,
  "theme": "dark"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "fullName": "Jane Smith",
    "defaultAiProvider": "openai",
    "emailNotifications": true,
    "theme": "dark",
    "updatedAt": "2026-07-30T02:15:00.000Z"
  }
}
```

---

### `GET /api/v1/analytics`

Returns usage statistics, total credits consumed, and words generated for the user's account.

**Authentication**: Required (Bearer Token)

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "totalGigsGenerated": 12,
    "totalProposalsGenerated": 45,
    "creditsUsed30Days": 69,
    "wordsGenerated": 18450,
    "timeSavedHours": 14.5
  }
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| `401` | Unauthorized | Missing or expired JWT token |
| `404` | User Not Found | User profile record missing in database |
| `500` | Internal Server Error | Database failure |

---

## Related Documentation

- [Auth API](auth.md)
- [Settings API](settings.md)
- [Authentication Guide](../AUTHENTICATION.md)
- [Database Guide](../DATABASE.md)
