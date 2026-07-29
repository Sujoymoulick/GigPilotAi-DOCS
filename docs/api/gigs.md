# Gigs API

> **Overview**: The Gigs API manages freelancer gig listings, stored drafts, and AI-powered gig generation. It enables users to retrieve existing gigs, generate complete Fiverr gig packages (titles, SEO descriptions, pricing tiers, tags, FAQs), update listing details, and delete old drafts.

---

## Key Capabilities

- **Listing Gigs**: Retrieve all created gig listings and drafts for an account.
- **AI Gig Generation**: Produce full Fiverr-ready gig content including packages and SEO tags.
- **Gig Editing & Lifecycle**: Update gig drafts, adjust pricing tiers, or purge listings.

---

## Authentication & Credits

- **Authentication**: Required for all endpoints via Bearer JWT token.
- **Credit Consumption**:
  - `POST /api/gig/generate` consumes **2 credits** per generation.
  - `GET`, `PUT`, `DELETE` operations consume **0 credits**.

---

## Endpoints

### `GET /api/gigs`

List all gig listings created by the authenticated user.

**Authentication**: Required

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | `integer` | `1` | Page number |
| `limit` | `integer` | `10` | Records per page (max 50) |
| `status` | `string` | `all` | Filter by status (`draft`, `published`, `archived`) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "I will design modern responsive website UI UX in Figma",
      "category": "Graphics & Design",
      "subCategory": "Website Design",
      "status": "draft",
      "content": {
        "title": "I will design modern responsive website UI UX in Figma",
        "description": "Are you looking for a clean, modern website UI/UX design...",
        "tags": ["figma", "website design", "ui ux", "landing page", "web design"],
        "packages": {
          "basic": { "name": "Basic Layout", "price": 50, "deliveryDays": 2 },
          "standard": { "name": "Standard App/Web", "price": 120, "deliveryDays": 4 },
          "premium": { "name": "Complete Design System", "price": 250, "deliveryDays": 7 }
        },
        "faqs": [
          { "question": "What tools do you use?", "answer": "I use Figma for all UI/UX designs." }
        ]
      },
      "created_at": "2026-07-30T01:00:00.000Z"
    }
  ]
}
```

**cURL Example**:

```bash
curl -X GET "https://api.gigpilot.ai/api/gigs?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

### `POST /api/gig/generate`

Generates a complete, structured Fiverr gig listing using AI models.

**Authentication**: Required | **Credit Cost**: 2 Credits

**Request Body**:

```json
{
  "service": "Mobile app design for iOS and Android",
  "category": "Graphics & Design",
  "provider": "openai"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "id": "e4a78b9c-1234-5678-9abc-def012345678",
    "title": "I will design high converting mobile app UI UX for iOS and Android",
    "category": "Graphics & Design",
    "tags": ["mobile app", "ui ux design", "ios app", "android app", "figma"],
    "description": "Transform your mobile app idea into a sleek, user-friendly interface...",
    "packages": {
      "basic": { "title": "1 Screen Wireframe", "price": 30, "revisions": 2 },
      "standard": { "title": "5 Screens UI UX Design", "price": 100, "revisions": 5 },
      "premium": { "title": "Full App 12 Screens + Prototype", "price": 250, "revisions": "Unlimited" }
    },
    "faqs": [
      { "question": "Do you provide source files?", "answer": "Yes, complete Figma source files are included." }
    ],
    "creditsRemaining": 248
  }
}
```

---

### `PUT /api/gigs/:id`

Updates an existing gig listing or draft.

**Authentication**: Required

**Path Parameters**:

| Param | Type | Description |
|-------|------|-------------|
| `id` | `string` | Gig UUID |

**Request Body**:

```json
{
  "title": "I will design top rated mobile app UI UX for iOS and Android",
  "status": "published",
  "content": {
    "tags": ["mobile app design", "ui ux", "figma expert", "ios ui"]
  }
}
```

---

### `DELETE /api/gigs/:id`

Permanently removes a gig listing record.

**Authentication**: Required

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "id": "e4a78b9c-1234-5678-9abc-def012345678",
    "deleted": true
  }
}
```

---

## Alias Routes (v1 API)

- `GET /api/v1/gigs` -> `GET /api/gigs`
- `POST /api/v1/gigs/generate` -> `POST /api/gig/generate`

---

## Related Documentation

- [AI API](ai.md)
- [Projects API](projects.md)
- [Storage API](storage.md)
- [Database Schema](../DATABASE.md)
