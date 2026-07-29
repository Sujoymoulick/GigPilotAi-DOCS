# Settings API

> **Overview**: The Settings API manages user preferences, AI provider defaults, API key configurations, theme settings, and email notification flags within GigPilot AI.

---

## Key Capabilities

- **Retrieve Preferences**: Access default AI provider configurations, theme preferences, and notification toggles.
- **Update Settings**: Save customized account configurations across all devices.

---

## Authentication

All settings endpoints require authentication via Bearer JWT token.

---

## Data Model

```json
{
  "defaultAiProvider": "openai",
  "theme": "dark",
  "emailNotifications": true,
  "proposalToneDefault": "Professional",
  "customAiApiKey": null,
  "timezone": "UTC"
}
```

---

## Endpoints

### `GET /api/settings`

Retrieves current account preferences for the authenticated user.

**Authentication**: Required

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "defaultAiProvider": "openai",
    "theme": "dark",
    "emailNotifications": true,
    "proposalToneDefault": "Professional",
    "updatedAt": "2026-07-30T01:00:00.000Z"
  }
}
```

**cURL Example**:

```bash
curl -X GET https://api.gigpilot.ai/api/settings \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

### `PUT /api/settings`

Updates account preferences and configurations.

**Authentication**: Required

**Request Body**:

```json
{
  "defaultAiProvider": "gemini",
  "theme": "dark",
  "emailNotifications": false,
  "proposalToneDefault": "Persuasive"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "defaultAiProvider": "gemini",
    "theme": "dark",
    "emailNotifications": false,
    "proposalToneDefault": "Persuasive",
    "updatedAt": "2026-07-30T02:15:00.000Z"
  }
}
```

---

## Alias Routes (v1 API)

- `GET /api/v1/settings`
- `PUT /api/v1/settings`

---

## Related Documentation

- [Users API](users.md)
- [Auth API](auth.md)
- [Environment Setup](../ENVIRONMENT_SETUP.md)
