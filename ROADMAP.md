# Development Phases

Aurora Control is built incrementally through phases and micro-phases.

---

# Phase 0 — Foundation

Goal: establish repository structure and development environment.

## 0.1 Monorepo Setup

- [x] Initialize Turbo monorepo.
- [x] Create directories:
  - [x] apps/web
  - [x] apps/workers
  - [x] packages/core
  - [x] packages/database
  - [x] packages/github-client

---

## 0.2 Package Manager

- [x] Configure pnpm workspace.
- [x] Add pnpm-workspace.yaml.

---

## 0.3 Tooling

- [x] Configure:
  - [x] TypeScript
  - [x] ESLint
  - [x] Prettier
- [x] Create shared tsconfig.

---

## 0.4 shadcn UI Setup

- [x] Initialize shadcn in web app.
- [x] Configure Tailwind.

---

## 0.5 Environment Management

- [x] Create `.env.example`.
- [x] Define required variables.

---

# Phase 1 — GitHub App Integration

Goal: receive GitHub events.

---

## 1.1 Create GitHub App

- [ ] Register GitHub App.
- [ ] Configure:
  - [ ] permissions
  - [ ] webhook URL
  - [ ] events

---

## 1.2 Worker Setup

- [ ] Create Cloudflare Worker project.
- [ ] Create endpoint:
  - [ ] /webhooks/github

---

## 1.3 Webhook Signature Verification

- [ ] Validate GitHub webhook signature.
- [ ] Reject invalid requests.

---

## 1.4 Queue Infrastructure

- [ ] Create Cloudflare Queue:
  - [ ] github-events
- [ ] Worker pushes all events to queue.

---

## 1.5 Queue Consumer Worker

- [ ] Consumer processes events.
- [ ] Initially logs events for validation.

---

# Phase 2 — Database Layer

Goal: persist repository state.

---

## 2.1 PostgreSQL Setup

- [ ] Provision database.

---

## 2.2 Drizzle ORM Setup

- [ ] Install drizzle-orm and drizzle-kit.
- [ ] Create schema directory.

---

## 2.3 Schema Definition

- [ ] Define tables:
  - [ ] organizations
  - [ ] repositories
  - [ ] freeze_states
  - [ ] overrides
  - [ ] ci_batches

---

## 2.4 Migration System

- [ ] Generate migrations using drizzle-kit.

---

## 2.5 Database Package

- [ ] Expose database client for workers and web app.

---

# Phase 3 — Freeze Engine

Goal: enforce merge freezes.

---

## 3.1 GitHub Client

- [ ] Create shared GitHub API wrapper using Octokit.

---

## 3.2 Freeze State Model

- [ ] Add freeze state to repositories.

---

## 3.3 PR Event Handler

- [ ] Process pull_request events.
- [ ] Check freeze state.

---

## 3.4 Status Check Integration

- [ ] Send GitHub status check when frozen.
- [ ] Status check context:
  - [ ] aurora-freeze

---

## 3.5 Branch Protection Setup

- [ ] Ensure repository requires status check.

---

# Phase 4 — Web App

Goal: provide user interface.

---

## 4.1 Next.js App

- [ ] Initialize web app (apps/web).

---

## 4.2 GitHub Installation Flow

- [ ] Allow users to install GitHub App.
- [ ] Store installation ID.

---

## 4.3 Repository Sync

- [ ] Fetch repositories from GitHub.
- [ ] Store them in database.

---

## 4.4 Web App UI

- [ ] Create pages:
  - [ ] /dashboard
  - [ ] /repos
- [ ] Show repository freeze status.

---

## 4.5 Freeze API

- [ ] Endpoint:
  - [ ] POST /api/freeze

---

## 4.6 Unfreeze API

- [ ] Endpoint:
  - [ ] POST /api/unfreeze

---

# Phase 5 — PR Overrides

Goal: allow selective merges during freeze.

---

## 5.1 Overrides Table

- [ ] Create overrides table.

---

## 5.2 Override Logic

- [ ] Worker checks overrides before enforcing freeze.

---

## 5.3 Web App UI

- [ ] Add override controls.

---

# Phase 6 — Scheduled Freezes

Goal: automate freeze windows.

---

## 6.1 Schedule Table

- [ ] Create schedules table.

---

## 6.2 Scheduler Worker

- [ ] Use Cloudflare cron triggers.

---

## 6.3 Freeze Evaluation

- [ ] Worker updates freeze state based on schedules.

---

# Phase 7 — CI Cost Killer

Goal: reduce CI cost for merge queues.

---

## 7.1 Merge Queue Events

- [ ] Capture merge_group events.

---

## 7.2 CI Batch Engine

- [ ] Group PRs within batching window.

---

## 7.3 CI Status Manager

- [ ] Trigger CI once per batch.

---

## 7.4 Artifact Reuse

- [ ] Reuse CI artifacts when possible.

---

## 7.5 CI Skip Rules

- [ ] Detect doc-only PRs.
- [ ] Skip CI.

---

## 7.6 CI Analytics

- [ ] Display metrics in web app.

---

# Phase 8 — Observability

Goal: reliability and debugging.

---

## 8.1 Structured Logging

- [ ] Log worker events.

---

## 8.2 Error Monitoring

- [ ] Add error tracking.

---

## 8.3 Audit Logs

- [ ] Track freeze/unfreeze/override actions.

---

# Phase 9 — Marketplace Launch

Goal: distribution.

---

## 9.1 GitHub Marketplace Listing

- [ ] Publish GitHub App.

---

## 9.2 Billing Integration

- [ ] Add subscription plans.

---

## 9.3 Documentation

- [ ] Publish installation and usage docs.

---

# Long Term Vision

Aurora Control evolves into a **CI Optimization Platform** providing:

* merge queue intelligence
* CI pipeline optimization
* test flakiness detection
* deployment coordination

This platform becomes a **control layer on top of GitHub CI/CD infrastructure**.
