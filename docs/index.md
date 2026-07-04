---
layout: home

title: create-b3-cf-app
titleTemplate: Scaffold a Bun + Hono + Cloudflare Workers + React monorepo

hero:
  name: create-b3-cf-app
  text: A full Cloudflare Workers stack, scaffolded in seconds
  tagline: Bun · Hono · React · Drizzle · D1 · Better Auth · Radix UI — all wired up with Turborepo, Biome, and CI.
  image:
    src: /stack-architecture.png
    alt: Stack architecture
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/BitByBit-B3/b3-cf-stack

features:
  - icon: ⚡
    title: Bun-native
    details: Fast package manager, runtime, and test runner. Monorepo with Turborepo.
  - icon: 🌐
    title: Hono + Cloudflare Workers
    details: Single Worker serves both API (RPC) and SPA assets. Edge-deployed.
  - icon: ⚛️
    title: React + Tailwind v4
    details: Vite SPA with TanStack Query, react-router-dom v7, and shadcn-style Radix UI.
  - icon: 🗄️
    title: Drizzle + D1
    details: Type-safe SQLite ORM. Schema, migrations, and local dev database baked in.
  - icon: 🔐
    title: Better Auth
    details: Email/password auth, session management, role guards — pre-integrated with D1.
  - icon: 🚀
    title: CI/CD ready
    details: GitHub Actions workflows for quality checks and Cloudflare Workers deployment.
---
