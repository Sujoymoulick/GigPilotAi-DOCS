# Notifications API

> **Overview**: The Notifications API manages in-app notifications, system alerts, billing updates, AI generation completion notices, and social post publishing status alerts for GigPilot AI users.

---

## Key Capabilities

- **Retrieve Notifications**: List unread and read notifications with pagination.
- **Unread Count**: Quickly check pending unread notifications for badge rendering in UI.
- **Batch Mark as Read**: Mark all pending notifications as read in a single call.
- **Notification Deletion**: Remove individual notification items.

---

## Authentication

All notification endpoints require authentication via a valid Bearer JWT token in the `Authorization` header.

---

## Notification Types & Categories

| Category | Type Identifier | Description |
|----------|-----------------|-------------|
| **System** | `system_alert` | System updates, scheduled maintenance warnings |
| **Billing** | `payment_success` / `plan_upgrade` | Invoice payments, credit replenishment, plan upgrades |
| **AI Generation** | `ai_complete` / `ai_failed` | Long-running gig or proposal batch generation status |
| **Social Hub** | `post_published` / `post_failed` | Automated social media post publishing results |

---

## Endpoints

### `GET /api/notifications`

Retrieves a paginated list of user notifications.

**Authentication**: Required

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | `integer` | `1` | Page number |
| `limit` | `integer` | `20` | Items per page (max 50) |
| `read` | `boolean` | `all` | Filter by read status (`true`, `false`) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "7a3f89e2-4567-89ab-cdef-0123456789ab",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Post Published Successfully",
      "message": "Your scheduled post to LinkedIn has been published.",
      "category": "Social Hub",
      "type": "post_published",
      "read": false,
      "metadata": {
        "postId": "sub_12345",
        "platform": "linkedin"
      },
      "created_at": "2026-07-30T02:10:00.000Z"
    }
  ]
}
```

**cURL Example**:

```bash
curl -X GET "https://api.gigpilot.ai/api/notifications?read=false" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

### `GET /api/notifications/unread`

Returns the total count of unread notifications for badge counters.

**Authentication**: Required

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "unreadCount": 3
  }
}
```

---

### `POST /api/notifications/read-all`

Marks all pending unread notifications as read.

**Authentication**: Required

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "updatedCount": 3,
    "message": "All notifications marked as read."
  }
}
```

---

### `DELETE /api/notifications/:id`

Deletes a specific notification record by ID.

**Authentication**: Required

**Path Parameters**:

| Param | Description |
|-------|-------------|
| `id` | Notification UUID |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "id": "7a3f89e2-4567-89ab-cdef-0123456789ab",
    "deleted": true
  }
}
```

---

## Alias Routes (v1 API)

- `GET /api/v1/notifications`
- `GET /api/v1/notifications/unread`
- `POST /api/v1/notifications/read-all`
- `DELETE /api/v1/notifications/:id`

---

## Related Documentation

- [Social API](social.md)
- [Payments API](payments.md)
- [Database Schema](../DATABASE.md)
