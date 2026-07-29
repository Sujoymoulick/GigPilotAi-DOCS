# Storage API

> **Overview**: The Storage API handles media file uploads, portfolio asset uploads, and social media image storage powered by Cloudflare R2 / Supabase Storage.

---

## Key Capabilities

- **File Uploads**: Upload images, portfolio screenshots, and document attachments up to 10MB.
- **Bucket Management**: Automatically routing public assets (gig thumbnails, portfolio) and private user documents.
- **Presigned URLs**: Secure public URL generation for immediate client rendering.

---

## Authentication & Authorization

- **Authentication**: Required via Bearer JWT token.
- **Quota / Limit Enforcement**: Maximum 10MB per file payload. Allowed mime types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `application/pdf`.

---

## Endpoints

### `POST /api/storage/upload`

Uploads a multipart form file or base64 image asset to object storage.

**Authentication**: Required

**Request Format**: `multipart/form-data`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `binary` | Yes | Target file payload |
| `bucket` | `string` | No | Storage bucket (`public-assets`, `media-library`, `portfolios`). Default: `media-library` |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "fileId": "98765432-abcd-ef01-2345-6789abcdef01",
    "filename": "portfolio_thumbnail.png",
    "url": "https://storage.gigpilot.ai/media-library/123e4567/portfolio_thumbnail.png",
    "sizeBytes": 458200,
    "mimeType": "image/png",
    "created_at": "2026-07-30T02:14:00.000Z"
  }
}
```

**cURL Example**:

```bash
curl -X POST https://api.gigpilot.ai/api/storage/upload \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@/path/to/image.png" \
  -F "bucket=media-library"
```

---

## Alias Routes (v1 API)

- `POST /api/v1/storage/upload`

---

## Related Documentation

- [Storage Architecture Guide](../STORAGE.md)
- [Social API](social.md)
- [Supabase Setup Guide](../SUPABASE.md)
