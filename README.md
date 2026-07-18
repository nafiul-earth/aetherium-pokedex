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

## Images / static assets

Drop files under `public/assets/images/` (subfolders: `pokemon`, `ui`, `backgrounds`, `icons`). Vite copies them into the deploy as `/aetherium-pokedex/assets/...`.

```tsx
import { imageUrl } from "@/src/lib/assets";
<img src={imageUrl("pokemon/arceus.png")} alt="Arceus" />
```

See `public/assets/README.md` for folder layout tips.

## Pokémon catalog (JSON-driven)

Every Core entry is a file in `data/pokemon/`. The UI does **not** hardcode Pokémon — edit JSON, refresh, it updates.

| Path | Role |
|------|------|
| `data/pokemon/*.json` | One Pokémon each (stats, lore, ability, …) |
| `data/catalog.json` | `defaultTeamIds` for the synthesizer |
| `data/epochs.json` | Ancient Epochs timeline tab |
| `public/assets/pokemon/` | Optional local `image` / `cry` files |

See `data/pokemon/README.md` for the full field map.

