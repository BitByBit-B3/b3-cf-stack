# create-b3-cf-app

Scaffold a **Bun + Hono + Cloudflare Workers + React** monorepo in seconds.

## Usage

```bash
bunx create-b3-cf-app
```

Or with npm:

```bash
npx create-b3-cf-app
```

Follow the prompts — it'll ask for a project name, description, and whether to install dependencies and init git.

## What you get

```
my-app/
├── apps/
│   ├── api/              # Hono API — runs on Cloudflare Workers
│   │   ├── src/
│   │   │   ├── app.ts          # RPC router + Better Auth
│   │   │   ├── index.ts        # Worker entry
│   │   │   ├── lib/            # Context, error handling, types
│   │   │   └── routes/         # Example routes
│   │   ├── test/
│   │   └── vitest.config.ts
│   └── web/              # React SPA — Vite + Tailwind v4
│       ├── src/
│       │   ├── app.tsx         # Router + providers
│       │   ├── lib/rpc.ts      # Typed Hono RPC client
│       │   └── routes/         # Example pages
│       ├── index.html
│       └── vite.config.ts
├── packages/
│   ├── core/             # Shared DB (Drizzle + D1), auth, utils
│   └── ui/               # Radix UI component library
├── biome.json            # Lint + format
├── turbo.json            # Task runner
├── wrangler.jsonc        # Cloudflare Workers config
├── knip.json             # Dead code analysis
└── lefthook.yml          # Git hooks
```

## Stack

| Layer | Choice |
|---|---|
| Runtime | Bun |
| API framework | Hono |
| Frontend | React 19 + react-router-dom v7 |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Database | Drizzle ORM + Cloudflare D1 |
| Auth | Better Auth |
| UI library | Radix primitives + class-variance-authority |
| Data fetching | TanStack React Query |
| Serialization | Superjson |
| Monorepo | Turborepo |
| Lint/format | Biome |
| Testing | Vitest |
| Deployment | Cloudflare Workers (single Worker serves API + SPA) |

## Development

```bash
cd my-app

# Terminal 1: Start the API worker
bun run cf:dev

# Terminal 2: Start the Vite dev server
bun run --filter @repo/web dev

# Or run both with Turborepo
bun run dev
```

Open http://localhost:5173 — the Vite dev server proxies `/api/*` to your Worker.

## Deployment

```bash
bun run cf:deploy
```

This builds the SPA (`bun run --filter @repo/web build`) and deploys the Worker with assets.

## License

MIT
