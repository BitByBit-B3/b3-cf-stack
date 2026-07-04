# Usage

## Commands

| Command | Description |
|---|---|
| `bun run dev` | Run all workspaces in dev mode (Turbo) |
| `bun run build` | Build all workspaces |
| `bun run typecheck` | TypeScript check across all workspaces |
| `bun run lint` | Biome lint |
| `bun run format` | Biome format |
| `bun run test` | Run all tests |
| `bun run knip` | Dead code analysis |
| `bun run cf:dev` | Start the Worker locally |
| `bun run cf:deploy` | Build SPA + deploy Worker |
| `bun run db:generate` | Generate Drizzle migrations |
| `bun run db:migrate` | Apply migrations locally |
| `bun run db:migrate:remote` | Apply migrations to remote D1 |

## Adding a new API route

1. Create a route file in `apps/api/src/routes/`:
```ts
import { Hono } from 'hono'
import { superjson } from 'superjson'
import type { Env } from '../lib/types'

const items = new Hono<Env>()

items.get('/', (c) => {
  return c.json(superjson.serialize({ items: ['a', 'b', 'c'] }))
})

export { items as itemsRoutes }
```

2. Register it in `apps/api/src/app.ts`:
```ts
.route('/items', itemsRoutes)
```

3. Use it from the frontend:
```ts
import { client, unwrap } from '../../lib/rpc'
const data = await unwrap(client.items.$get())
```

## Adding a new page

1. Create a route directory and page:
```bash
mkdir apps/web/src/routes/about
```

2. Create `page.tsx`:
```tsx
export function AboutPage() {
  return <div><h1>About</h1></div>
}
```

3. Add to `apps/web/src/app.tsx`:
```tsx
<Route path="/about" element={<AboutPage />} />
```
