# Web App (Aurora Control)

Next.js control plane for Aurora Control. Provides the UI for managing merge freezes, overrides, and CI settings.

## Run locally

```bash
pnpm dev
```

From the repo root:

```bash
pnpm --filter web dev
```

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui (via `@workspace/ui`)

## Structure

- `app/` — App Router pages and layouts
- `components/` — App-specific components (e.g. theme provider)

Shared UI components live in `packages/ui`.
