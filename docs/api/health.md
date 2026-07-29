# Health Check API

> **Overview**: The Health Check API provides system liveness and readiness monitoring endpoints for load balancers, container orchestrators (e.g., Render, Kubernetes), and uptime monitoring services.

---

## Key Features

- **Public Access**: Does not require API token authentication, allowing automated probes to check system health.
- **Subsystem Verification**: Verifies core database connectivity (Supabase PostgreSQL), Redis cache state, and external AI provider reachability.
- **Fast Execution**: Engineered for minimal latency (< 5ms response times) to handle high-frequency ping requests.

---

## Endpoints

### `GET /api/health`

Performs an immediate health check of the Fastify API server and dependent services.

**Authentication**: None required

**Success Response (200 OK)**:

```json
{
  "status": "ok",
  "timestamp": "2026-07-30T02:15:00.000Z",
  "version": "1.0.0",
  "uptime": 864200.45,
  "services": {
    "database": "connected",
    "redis": "connected",
    "aiProviderProxy": "ready"
  }
}
```

**Service Degraded Response (503 Service Unavailable)**:

```json
{
  "status": "degraded",
  "timestamp": "2026-07-30T02:15:00.000Z",
  "version": "1.0.0",
  "services": {
    "database": "disconnected",
    "redis": "connected",
    "aiProviderProxy": "ready"
  },
  "error": "PostgreSQL connection timeout"
}
```

**cURL Example**:

```bash
curl -X GET https://api.gigpilot.ai/api/health
```

---

### `GET /api/v1/health`

Alias route for consistency with versioned API client SDKs.

**Authentication**: None required

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-07-30T02:15:00.000Z",
    "environment": "production"
  }
}
```

---

## Infrastructure Probe Integration

### Render / Cloudflare Health Check Configuration

- **HTTP Path**: `/api/health`
- **Expected Status Code**: `200`
- **Check Interval**: Every 30 seconds
- **Timeout**: 5 seconds

---

## Related Documentation

- [API Reference](index.md)
- [Architecture Guide](../ARCHITECTURE.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
