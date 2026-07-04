# Contributing

Thanks for contributing to `create-b3-cf-app`.

## Setup

```bash
git clone https://github.com/BitByBit-B3/b3-cf-stack
cd b3-cf-stack
bun install
```

## Project structure

```
create-b3-cf-app/
├── src/              # CLI source (TypeScript)
│   ├── index.ts      # Entry — prompts, flow
│   └── scaffold.ts   # File generation (template → target)
├── template/         # The scaffolded project template
│   ├── apps/         # Hono API + React SPA
│   ├── packages/     # Core (DB/auth) + UI (Radix)
│   ├── biome.json
│   ├── wrangler.jsonc
│   └── ...
├── docs/             # VitePress documentation
└── package.json
```

## Workflow

```bash
bun run build        # tsc — compile src/ → dist/
bun run typecheck    # tsc --noEmit
bunx biome check .   # lint
```

## Testing the CLI locally

```bash
bun run src/index.ts
# or after build:
node dist/index.js
```

## Pull request guidelines

- Keep changes focused — one concern per PR.
- Update `CHANGELOG.md` with the change under `## Unreleased`.
- Update `docs/` if the change affects user-facing behaviour.
- `bun run build` must pass before opening.

## Release

Publishing is handled by CI on push to `main`. The version bump is automatic:

- `git commit -m "fix: ..."` → patch bump (0.0.x)
- `git commit -m "feat: ..."` → minor bump (0.x.0)
- `git commit -m "major: ..."` → major bump (x.0.0)

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
