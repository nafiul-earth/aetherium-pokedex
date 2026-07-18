# Aetherium Pokédex

Celestial Pokédex UI — curated relics, PokeAPI transmitter, and aetheric team synthesis.

**Live site:** https://nafiul-earth.github.io/aetherium-pokedex/

**Repo:** https://github.com/nafiul-earth/aetherium-pokedex

## Run locally (with Gemini proxy)

1. `npm install`
2. Copy `.env.example` → `.env.local` and set `GEMINI_API_KEY`
3. `npm run dev` → http://localhost:3000

## Static / GitHub Pages

Pages hosts the Vite client only (no Express). Lore and team resonance use procedural fallbacks when `/api/gemini/*` is unavailable. PokeAPI searches still work.

```bash
npm run build:pages
npm run preview
```

### Deploy checklist

1. Push this app to `nafiul-earth/aetherium-pokedex` on the `main` branch
2. Repo **Settings → Pages → Source: GitHub Actions**
3. The workflow `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`
4. Site URL: `https://nafiul-earth.github.io/aetherium-pokedex/`

Vite `base` is set to `/aetherium-pokedex/` for the project Pages path.
