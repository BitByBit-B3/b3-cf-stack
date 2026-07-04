# Project Structure

## Root

| File | Purpose |
|---|---|
| `package.json` | Workspace root — scripts, dev deps (Biome, Turbo, Wrangler, Knip, Lefthook) |
| `biome.json` | Linter + formatter config |
| `tsconfig.base.json` | Shared TS config extended by all packages |
| `turbo.json` | Task orchestration (dev, build, test, typecheck) |
| `wrangler.jsonc` | Cloudflare Worker config — D1, R2, Images bindings |
| `knip.json` | Dead code analysis config |
| `lefthook.yml` | Git hooks |
| `.dev.vars.example` | Environment variable template |
| `.gitignore` | Standard ignores (node_modules, dist, .wrangler) |
| `.github/workflows/` | CI + deploy GitHub Actions |

## `apps/api`

Hono Worker serving the RPC API.

```
src/
├── index.ts          # Worker entry — exports default app
├── app.ts            # Router — mounts auth + all RPC routes
├── lib/
│   ├── context.ts    # Middleware — injects DB + user session
│   ├── types.ts      # Env type (Bindings + Variables)
│   └── on-error.ts   # Global error handler
└── routes/           # Route modules (example: hello.ts)
test/
├── hello.test.ts
└── setup/
```

## `apps/web`

React SPA built with Vite.

```
src/
├── main.tsx          # Entry — mounts App, imports globals.css
├── app.tsx           # Router + providers (QueryClient, Toaster)
├── globals.css       # Tailwind v4 + theme variables
├── lib/
│   ├── rpc.ts        # Typed Hono RPC client + unwrap()
│   ├── query-client.ts
│   └── utils.ts      # cn() helper
├── components/       # Shared UI components
└── routes/           # Page components (example: home/)
```

## `packages/core`

Shared business logic, database, and auth.

```
src/
├── index.ts          # Barrel exports
├── db/schema.ts      # Drizzle schema (user, session, account, verification)
└── lib/
    ├── db-client.ts  # D1 database client factory
    ├── auth/         # Better Auth instance + session helpers
    ├── errors.ts     # AppError class
    └── pagination.ts # Pagination utilities
```

## `packages/ui`

Radix-based UI component library (shadcn-style).

```
src/
├── button.tsx
├── card.tsx
├── badge.tsx
├── input.tsx
├── label.tsx
├── spinner.tsx
├── sonner.tsx
└── utils.ts          # cn() helper
```
