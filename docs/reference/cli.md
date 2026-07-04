# CLI Reference

## `create-b3-cf-app`

Scaffolds a new project by walking you through interactive prompts.

### Options

No CLI flags currently — just run it and follow the prompts.

### Prompts

| Prompt | Default | Description |
|---|---|---|
| Project directory | `./my-cf-app` | Where to create the project |
| Description | `A Cloudflare Workers + React application` | Short project description |
| Run bun install? | Yes | Install dependencies after scaffolding |
| Init git? | Yes | Initialize a git repository |

### Output

```
my-app/
├── apps/
│   ├── api/          # Hono API — edge Worker
│   └── web/          # React SPA — Vite + Tailwind
├── packages/
│   ├── core/         # Shared DB, auth, utilities
│   └── ui/           # Radix component library
├── biome.json        # Lint + format
├── wrangler.jsonc    # Worker config
├── turbo.json        # Monorepo task runner
├── knip.json         # Dead code analysis
├── lefthook.yml      # Git hooks
└── .github/          # CI + deploy workflows
```
