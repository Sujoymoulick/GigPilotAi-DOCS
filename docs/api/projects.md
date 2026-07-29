# Projects & Proposals API

> **Overview**: The Projects & Proposals API enables freelancers to track client requests, generate AI-tailored freelance proposals, update proposal statuses, and manage project histories across Fiverr, Upwork, and direct clients.

---

## Key Capabilities

- **Proposal Generation**: Generate tailored proposals for buyer requests based on service descriptions and preferred communication tone.
- **Proposal Lifecycle Management**: Track proposal statuses (`draft`, `sent`, `accepted`, `declined`).
- **History & Filtering**: Search and filter past proposal submissions by date or status.

---

## Authentication & Credits

- **Authentication**: Required for all endpoints via Bearer JWT.
- **Credit Cost**:
  - `POST /api/proposal/generate` consumes **1 credit**.
  - `GET`, `PUT`, `DELETE` operations consume **0 credits**.

---

## Endpoints

### `GET /api/proposals`

List all proposal records created by the authenticated user.

**Authentication**: Required

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | `integer` | `1` | Page number |
| `limit` | `integer` | `10` | Records per page |
| `status` | `string` | `all` | Filter by status (`draft`, `sent`, `accepted`, `declined`) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "c3b2a109-8765-4321-fedc-ba9876543210",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "jobDescription": "Looking for a React developer to build an Astro dashboard...",
      "myService": "Fullstack Web Development",
      "proposalText": "Hi there! I would love to assist you in building your Astro dashboard...",
      "tone": "Professional",
      "status": "sent",
      "created_at": "2026-07-30T01:30:00.000Z"
    }
  ]
}
```

---

### `POST /api/proposal/generate`

Generates a customized freelance job proposal using AI.

**Authentication**: Required | **Credit Cost**: 1 Credit

**Request Body**:

```json
{
  "jobDescription": "We need an experienced designer to create a 5-page Figma wireframe for an e-commerce platform.",
  "myService": "UI/UX Figma Design",
  "tone": "Persuasive & Professional",
  "provider": "openai"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "id": "f8e7d6c5-4321-9876-0123-456789abcdef",
    "proposalText": "Dear Client,\n\nI noticed your requirement for a 5-page Figma wireframe...",
    "keyHighlights": [
      "5 years experience in e-commerce UI UX",
      "Turnaround in 3 days",
      "Includes complete interactive Figma prototype"
    ],
    "creditsRemaining": 249
  }
}
```

**cURL Example**:

```bash
curl -X POST https://api.gigpilot.ai/api/proposal/generate \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Build a REST API in Node.js Fastify",
    "myService": "Node.js Backend Developer",
    "tone": "Confident"
  }'
```

---

### `PUT /api/proposals/:id`

Updates the status or text of an existing proposal record.

**Authentication**: Required

**Request Body**:

```json
{
  "status": "accepted",
  "notes": "Client accepted offer at $250 total budget."
}
```

---

### `DELETE /api/proposals/:id`

Removes a proposal record.

**Authentication**: Required

---

## Alias Routes (v1 API)

- `GET /api/v1/projects/proposals`
- `POST /api/v1/projects/proposals/generate`
- `DELETE /api/v1/projects/proposals/:id`

---

## Related Documentation

- [AI API](ai.md)
- [Gigs API](gigs.md)
- [Database Schema](../DATABASE.md)
