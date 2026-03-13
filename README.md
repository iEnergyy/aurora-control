# Aurora Control

Aurora Control is a developer infrastructure platform that gives engineering teams **control over merges, deployments, and CI costs** for GitHub repositories.

It integrates with GitHub to provide:

* Merge freeze management
* Deployment-aware merge control
* CI batching and optimization
* Merge queue intelligence

The system is designed to reduce production incidents and **drastically lower CI/CD costs** for teams using GitHub.

Aurora Control uses a **modern event-driven architecture** combining edge processing with a web control plane.

---

# Vision

Engineering teams often struggle with:

* merges happening during deployments
* emergency incidents requiring merge stops
* expensive CI pipelines triggered repeatedly
* merge queues triggering redundant CI runs

Aurora Control solves this by acting as an **intelligent control layer on top of GitHub**.

The long-term vision is to evolve Aurora Control into a **Merge Queue Intelligence and CI Optimization Platform**.

---

# Core Features

## Merge Freeze

Temporarily block pull request merges into protected branches.

Typical use cases:

* production deployments
* database migrations
* incident response
* coordinated releases

Aurora Control sends a **failing GitHub status check** when repositories are frozen, which prevents merges via branch protection rules.

---

## Scheduled Freeze Windows

Automatically freeze merges during defined windows.

Examples:

* freeze during business hours
* weekend freeze
* release windows

---

## PR Override

Allow specific pull requests to bypass a freeze.

Useful for:

* hotfixes
* emergency patches

---

## Deployment Awareness

Automatically freeze merges when deployments start.

Integrations can include:

* CI pipelines
* Kubernetes deployments
* ECS deployments

---

## CI Cost Killer (CI Batching)

Aurora Control introduces **CI batching for merge queues**.

Example scenario:

Queue contains:

PR1
PR2
PR3

Traditional CI behavior:

PR1 → run CI
PR1 + PR2 → run CI
PR1 + PR2 + PR3 → run CI

Result: **3 CI runs**

Aurora Control behavior:

Collect PRs within a batching window.

PR1
PR2
PR3

Run CI once.

Result: **1 CI run**

This can save organizations **thousands of CI minutes per month**.

---

## CI Skip Rules

CI can be skipped when pull requests only change non-critical files:

* documentation
* markdown
* configuration

---

## CI Analytics

Aurora Control will provide visibility into CI efficiency:

* CI runs avoided
* CI minutes saved
* estimated cost savings
* merge queue behavior

---

# Architecture

Aurora Control follows an **event-driven architecture**.

GitHub Webhooks
→ Cloudflare Worker (webhook ingestion)
→ Cloudflare Queue
→ Worker Consumer (event processing)
→ PostgreSQL database
→ Next.js web app (Vercel)

The web app (apps/web) acts as the **control plane**, while Workers act as the **event processing layer**.

---

# Technology Stack

## Monorepo

* Turbo monorepo
* pnpm workspaces

---

## Web App (apps/web)

* Next.js
* React
* TypeScript
* Tailwind
* shadcn/ui

Deployment target:

* Vercel

---

## Event Processing

* Cloudflare Workers
* Cloudflare Queues

Workers handle:

* GitHub webhook ingestion
* event processing
* CI batching logic
* merge freeze enforcement

---

## Database

* PostgreSQL
* Drizzle ORM
* Drizzle migrations

Recommended providers:

* Neon
* Supabase

---

## GitHub Integration

Aurora Control integrates via a **GitHub App**.

Required permissions:

Pull Requests → read
Checks → write
Metadata → read

Webhook events:

pull_request
merge_group
check_suite
installation

---

# Repository Structure

This project uses a **Turbo monorepo**.

```
aurora-control
│
├── apps
│   ├── web              # Next.js web app (control plane)
│   └── workers          # Cloudflare Workers
│
├── packages
│   ├── core             # shared business logic
│   ├── database         # Drizzle ORM schema + client
│   └── github-client    # GitHub API wrapper
│
├── infra
│   ├── migrations
│   └── cloudflare
│
├── README.md
├── ROADMAP.md
└── turbo.json
```

---

# Requirements

Node.js (LTS)

pnpm

Cloudflare account

GitHub account

PostgreSQL database

Optional but recommended:

* Neon or Supabase for serverless Postgres
* Vercel for web app deployment

---

# Local Development

Install dependencies:

```bash
pnpm install
```

Run web app (Next.js):

```bash
pnpm --filter web dev
```

Run workers locally (when added in Phase 1):

```bash
pnpm --filter workers dev
```

Run database migrations:

```bash
pnpm db:migrate
```

---

# Environment Variables

Create `.env.local`.

Required variables:

* DATABASE_URL
* GITHUB_APP_ID
* GITHUB_PRIVATE_KEY
* GITHUB_WEBHOOK_SECRET

---

# Development Phases

Aurora Control is built incrementally through phases and micro-phases. See **[ROADMAP.md](./ROADMAP.md)** for the detailed development phases (Phase 0 through Phase 9) and long-term vision.
