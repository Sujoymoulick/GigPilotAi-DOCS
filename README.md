# GigPilot AI Documentation Portal

> Enterprise-grade documentation portal for **GigPilot AI** — the AI-powered freelancer toolkit and API gateway. Statically compiled via Astro 5.x and Starlight.

---

## Overview

**GigPilot AI** automates high-value content generation, freelance proposal writing, Fiverr gig SEO optimization, market pricing analysis, and multi-channel social media management across 6 platforms (LinkedIn, Facebook, Instagram, Bluesky, Mastodon, Dev.to).

This repository contains the full developer documentation portal, covering:
- **41 Comprehensive Documentation Pages** detailing all core services and modules.
- **Master API Endpoint Index** for 50+ REST endpoints.
- **OpenAPI 3.0 Specifications** in YAML format.
- **Database Entity Schemas & RLS Policies** for Supabase PostgreSQL.
- **Architecture & Deployment Guides** for Render.com backend API & Cloudflare Pages frontend.

---

## 🚀 Tech Stack

- **Framework**: [Astro 5.x](https://astro.build) + [Starlight](https://starlight.astro.build)
- **UI Components**: React 19 + Tailwind CSS 3.4
- **Search Engine**: Pagefind local full-text search index
- **Deployment**: Cloudflare Pages / Workers

---

## 📁 Repository Structure

```txt
gigpilotaidocs/
├── docs/                       # Master Markdown documentation files (41 pages)
│   ├── api/                    # Granular REST API module specifications (14 files)
│   │   ├── admin.md
│   │   ├── ai.md
│   │   ├── analytics.md
│   │   ├── auth.md
│   │   ├── gigs.md
│   │   ├── health.md
│   │   ├── notifications.md
│   │   ├── payments.md
│   │   ├── projects.md
│   │   ├── scheduler.md
│   │   ├── settings.md
│   │   ├── social.md
│   │   ├── storage.md
│   │   └── users.md
│   ├── ARCHITECTURE.md
│   ├── AUTHENTICATION.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── DEVELOPER_GUIDE.md
│   ├── ENVIRONMENT_SETUP.md
│   ├── ERROR_HANDLING.md
│   ├── FOLDER_STRUCTURE.md
│   ├── INTRODUCTION.md
│   ├── OPENAPI.md
│   ├── QUICK_START.md
│   └── SECURITY.md
├── src/
│   ├── assets/                 # Brand logos and static images
│   ├── content/
│   │   └── docs/               # Starlight content directory (symlinked to docs/)
│   └── content.config.ts       # Custom Starlight content loader & title parser
├── astro.config.mjs            # Astro & Starlight sidebar configuration
├── tailwind.config.mjs         # Tailwind styling setup
└── package.json
```

---

## 🛠️ Local Development & Setup

### Prerequisites

- Node.js `>= 22.12.0`
- npm `>= 10.0.0`

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Sujoymoulick/GigPilotAi-DOCS.git
cd GigPilotAi-DOCS
npm install
```

### 2. Start Local Development Server

```bash
npm run dev
```

The documentation portal will be available locally at `http://localhost:4321`.

### 3. Build Production Bundle

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

This compiles the static HTML files to `./dist/` and generates the Pagefind search index.

---

## 📚 Documentation Sitemap

| Category | Guide / Reference | Description |
|:---|:---|:---|
| **Getting Started** | [Introduction](docs/INTRODUCTION.md) | Platform overview and core features |
| | [Quick Start Guide](docs/QUICK_START.md) | Setup, configuration, and first API requests |
| **Core Architecture** | [Architecture Guide](docs/ARCHITECTURE.md) | Backend Fastify Clean Architecture & multi-LLM proxy |
| | [Database Schema](docs/DATABASE.md) | PostgreSQL table schemas, relations, and RLS policies |
| | [Security & Audit](docs/SECURITY.md) | JWT auth, CORS headers, rate-limiting, and encryption |
| **API Reference** | [REST API Reference](docs/API_REFERENCE.md) | Response envelopes, status codes, and headers |
| | [Master API Index](docs/API_INDEX.md) | Inventory of all ~50 API endpoints |
| | [OpenAPI 3.0 Spec](docs/OPENAPI.md) | OpenAPI specification |
| | [SDK Examples](docs/SDK_EXAMPLES.md) | Client code examples in TypeScript, JS, and cURL |
| **Operations** | [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) | Production setup on Render.com & Cloudflare |
| | [Environment Setup](docs/ENVIRONMENT_SETUP.md) | Complete environment variable validation rules |

---

## 🔗 Related Repositories & Resources

- **Main Repository**: [GigPilot AI Codebase](https://github.com/anomalyco/gigpilotai)
- **API Production Endpoint**: `https://api.gigpilot.ai`
