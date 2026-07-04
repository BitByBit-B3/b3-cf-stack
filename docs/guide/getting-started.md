# Getting Started

## Prerequisites

- [Bun](https://bun.sh) >= 1.3
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)

## Create a project

```bash
bunx create-b3-cf-app
```

Follow the prompts:

1. **Project directory** — where to scaffold (e.g. `my-app`)
2. **Description** — optional project description
3. **bun install** — whether to install dependencies immediately
4. **git init** — whether to initialize a git repository

## Start developing

```bash
cd my-app

# Terminal 1: Hono API worker (Cloudflare dev)
bun run cf:dev

# Terminal 2: Vite dev server (proxies /api → worker)
bun run --filter @repo/web dev

# Or both at once:
bun run dev
```

Open [http://localhost:5173](http://localhost:5173). The home page calls `/api/rpc/hello` through the typed Hono RPC client.

## Deploy

```bash
bun run cf:deploy
```

This builds the SPA (`bun run --filter @repo/web build`) and deploys the Worker with assets to Cloudflare.
