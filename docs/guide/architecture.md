# Architecture

## Overview

The scaffolded project is a single Cloudflare Worker that serves both the API and the SPA.
In development, Vite proxies `/api/*` requests to the Worker.

```
┌─────────────┐     /api/rpc/*     ┌──────────────┐
│  React SPA  │ ──────────────────→ │  Hono Worker │
│  (Vite)     │                     │  (Wrangler)  │
│             │ ←────────────────── │              │
│  :5173      │     JSON/superjson  │  :8787       │
└─────────────┘                     └──────┬───────┘
                                           │
                                    ┌──────┴───────┐
                                    │   D1 (SQLite) │
                                    │   R2 (Storage)│
                                    │   Images      │
                                    └──────────────┘
```

## Monorepo layout

```
apps/
├── api/          # Hono API — routes, lib, tests
└── web/          # React SPA — pages, components, hooks
packages/
├── core/         # Shared DB schema, auth, utilities, services
└── ui/           # Radix UI components (Button, Card, Badge, etc.)
```

## Key decisions

| Concern | Choice |
|---|---|
| API framework | [Hono](https://hono.dev) — lightweight, fast, CF Worker-native |
| Frontend | [React 19](https://react.dev) + [react-router-dom v7](https://reactrouter.com) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [tw-animate-css](https://github.com/tailwindlabs/tailwindcss-animate) |
| Database | [Drizzle ORM](https://orm.drizzle.team) + Cloudflare [D1](https://developers.cloudflare.com/d1/) |
| Auth | [Better Auth](https://better-auth.com) — Drizzle adapter, email/password |
| UI components | [Radix primitives](https://www.radix-ui.com) + [class-variance-authority](https://cva.style) |
| Data fetching | [TanStack Query](https://tanstack.com/query) |
| Serialization | [Superjson](https://github.com/blitz-js/superjson) — Date, Map, Set survive RPC |
| Monorepo | [Turborepo](https://turbo.build/repo) |
| Lint/format | [Biome](https://biomejs.dev) |
| Testing | [Vitest](https://vitest.dev) |
| Deployment | [Cloudflare Workers](https://workers.cloudflare.com) — single Worker, API + SPA |
