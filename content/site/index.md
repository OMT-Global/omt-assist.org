# OMT Assist

OMT Assist is a private operations-oriented site shell for OMT Global. It keeps human-facing pages, machine-readable JSON, and deployment automation in one small Next.js repository.

- The repo mirrors the `jmcte.me` git shape: npm scripts, CI, static export, Cloudflare Pages deployment, and generated public data.
- Source content lives under `content/`; generated JSON and metadata live under `public/`.
- GitHub Actions run lint, typecheck, tests, and build on pull requests and pushes to `main`.
