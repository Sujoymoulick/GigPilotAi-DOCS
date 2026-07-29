# Quick Start Guide

> **Overview**: Get up and running with GigPilot AI in less than 5 minutes. This guide covers repository cloning, environment configuration, database bootstrapping, starting backend and frontend services, and running your first AI gig generation request.

---

## Prerequisites

Before starting, ensure your system has the following dependencies installed:

- **Node.js**: `v22.12.0` or higher
- **Package Manager**: `npm` (v10+) or `pnpm` (v9+)
- **Database Service**: A [Supabase](https://supabase.com) project (free tier fully supported)
- **AI Model Key**: At least one valid API key from OpenAI, Google Gemini, Anthropic Claude, or Groq.

---

## Step 1: Clone Repository & Install Dependencies

Clone the official repository and install required packages:

```bash
git clone https://github.com/anomalyco/gigpilotai.git
cd gigpilotai
npm install
```

---

## Step 2: Configure Environment Variables

Copy the sample environment file to `.env.local`:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your database keys and AI provider API credentials:

```txt
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT Authentication Secret
JWT_SECRET=super-secret-32-character-random-string

# AI Model Provider Credentials (At least one required)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIzaSyXxxxxxxxxxxxxxxxxxxxxxxx

# Application URLs
FRONTEND_URL=http://localhost:4321
API_URL=http://localhost:3000
```

---

## Step 3: Launch Local Servers

### Option A: Run Full Stack Simultaneously

```bash
npm run dev
```

### Option B: Run Services Separately

**Backend API Service (Fastify - Port 3000)**:
```bash
cd apps/backend
npm run dev
```

**Frontend Application (Astro - Port 4321)**:
```bash
cd apps/frontend
npm run dev
```

---

## Step 4: Verify Server Health

Perform a GET request to the health endpoint to confirm the API server is online:

```bash
curl -X GET http://localhost:3000/api/health
```

**Expected Health Check Output**:

```json
{
  "status": "ok",
  "timestamp": "2026-07-30T02:15:00.000Z",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "redis": "connected",
    "aiProxy": "ready"
  }
}
```

---

## Step 5: Authenticate & Make First API Call

### 1. Authenticate & Obtain JWT Token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "developer@example.com", "fullName": "Jane Developer"}'
```

Extract the `token` from the JSON response:

```json
{
  "success": true,
  "data": {
    "token": "eyJ1c2VySWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAi...",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "developer@example.com",
      "role": "Pro",
      "credits": 500
    }
  }
}
```

### 2. Generate Your First Freelance Proposal

Use the `token` in the `Authorization` header to call the proposal generator:

```bash
curl -X POST http://localhost:3000/api/proposal/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "jobDescription": "We need a fullstack developer to build a high-performance Astro documentation portal with custom search.",
    "myService": "Fullstack Astro & Node.js Developer",
    "tone": "Professional & Technical"
  }'
```

---

## Subscription Plans Summary

| Plan Tier | Monthly Credits | Price | Best For |
|-----------|-----------------|-------|----------|
| **Free** | 10 credits | $0 | Testing & evaluation |
| **Pro** | 500 credits | $15/month | Active individual freelancers |
| **Agency** | 2,500 credits | $45/month | Agencies & multi-account managers |

> **Promo Note**: Use discount code `LAUNCH20` at checkout for 20% off Pro & Agency tiers.

---

## Common Troubleshooting Tips

- **401 Unauthorized**: Ensure your `Authorization` header includes the `Bearer ` prefix before the JWT token string.
- **AI Request Timeout**: Verify your `OPENAI_API_KEY` or `GEMINI_API_KEY` is valid and active.
- **CORS Error**: Check that `FRONTEND_URL` in `.env.local` matches the exact port where your frontend is running.

---

## Next Steps

- [Authentication Guide](AUTHENTICATION.md)
- [API Index](API_INDEX.md)
- [Architecture Guide](ARCHITECTURE.md)
- [Developer Guide](DEVELOPER_GUIDE.md)
