import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'create-b3-cf-app',
  description: 'Scaffold a Bun + Hono + Cloudflare Workers + React monorepo in seconds',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/BitByBit-B3/b3-cf-stack' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Architecture', link: '/guide/architecture' },
          { text: 'Usage', link: '/guide/usage' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'CLI', link: '/reference/cli' },
          { text: 'Project Structure', link: '/reference/template' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BitByBit-B3/b3-cf-stack' },
    ],
  },
})
