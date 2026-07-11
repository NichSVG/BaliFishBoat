# AGENTS.md

## Lint & Typecheck
- `npm run lint` — ESLint
- `npx tsc --noEmit` — TypeScript typecheck

## Build
- `npm run build` — Next.js production build

## Dev
- `npm run dev` — Local dev server

## Seed Sanity
- `npm run seed` — Full seed: import charter-seed-data.json into Sanity (requires SANITY_API_TOKEN)
- `npm run patch-pricing` — Targeted patch: update only pricing fields without overwriting other data

## Data Sync Rule
Sanity is the source of truth for CMS content. `charter-seed-data.json` is the source of truth for pricing/structure.
After changing prices in the JSON, run `npm run patch-pricing` to sync to Sanity without overwriting manual edits.
