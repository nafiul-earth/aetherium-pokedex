# Aetherium Pokédex

### Make your dreamy Pokémon.

Forge celestial legends, drop them into the catalog, and watch them light up the cosmos — no hardcoding, just your JSON, your art, and your name on the detail page.

**Live site:** https://nafiul-earth.github.io/aetherium-pokedex/

---

## Create one in minutes

1. Add a JSON file under `data/pokemon/`
2. Drop artwork in `public/assets/pokemon/`
3. Open a PR — reviewers approve, then it ships to the live site

Full guide: **[CONTRIBUTING.md](CONTRIBUTING.md)**

Credit yourself with `"author": "your-handle"` so the detail page shows **Authored by you**.

---

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Publish (GitHub Pages)

Every push to `main` builds and deploys to the **`gh-pages`** branch  
([`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)).

One-time: **Settings → Pages → Deploy from a branch → `gh-pages` / `/ (root)`**.

```bash
npm run build:pages
```

Dream it. Encode it. Materialize it.
