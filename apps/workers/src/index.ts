/**
 * Aurora Control — Cloudflare Workers entry.
 * Phase 1 will add /webhooks/github and queue producer.
 */

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === "/webhooks/github") {
      return new Response("GitHub webhook endpoint (Phase 1)", { status: 200 })
    }
    return new Response("Aurora Control Workers", { status: 200 })
  },
}

interface Env {
  // GITHUB_WEBHOOK_SECRET?: string
  // GITHUB_EVENTS?: Queue
}
