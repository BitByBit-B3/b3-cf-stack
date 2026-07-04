# Contributing

Thanks for contributing!

## Setup

```bash
bun install
bun run cf:dev          # start the worker
bun run --filter @repo/web dev  # start the frontend
```

## Workflow

```bash
bun run typecheck       # tsc --noEmit
bun run test            # vitest
bun run lint            # biome check
bun run format          # biome check --write
bun run knip            # dead code analysis
```

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
