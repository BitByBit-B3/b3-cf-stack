# Changelog

## 0.1.2 (2026-07-04)

- Add deploy workflow to template
- Update template CI
- Fix ESM import: add `.js` extension for Node runtime

## 0.1.1 (2026-07-04)

- Fix ESM module resolution (`.js` extension in imports)
- Add `.gitignore` for root project

## 0.1.0 (2026-07-04)

- Initial release
- Interactive CLI prompts
- Scaffolds full monorepo: apps/api, apps/web, packages/core, packages/ui
- Pre-configured: Biome, Turbo, Wrangler, Knip, Lefthook, Vitest
- Better Auth + Drizzle ORM + D1
- Example Hono RPC route + React home page
- GitHub Actions CI
