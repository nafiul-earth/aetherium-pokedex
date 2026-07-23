# Contributing to Aetherium Pokédex

Thanks for helping expand the celestial catalog. Anyone can add a **brand new Pokémon** by submitting:

1. A **JSON data file**
2. An **image** (artwork)

Optional: a cry (sound) file.

All additions go through a **pull request (PR)** and must be **reviewed** before merge.

---

## Quick start

1. Fork the repo (or create a branch if you have write access)
2. Add your files (see below)
3. Open a pull request against `main`
4. Wait for reviewer approval, then merge

After merge, GitHub Pages deploys automatically from `main`.

---

## What to submit

| Required | Path | Example |
|----------|------|---------|
| **JSON** | `data/pokemon/NNNN-slug.json` | `data/pokemon/9001-chronos-arceus.json` |
| **Image** | `public/assets/pokemon/NNNN-slug.png` | `public/assets/pokemon/9001-chronos-arceus.png` |

| Optional | Path | Example |
|----------|------|---------|
| **Cry** | `public/assets/pokemon/NNNN-slug.ogg` (or `.mp3`) | `public/assets/pokemon/9001-chronos-arceus.ogg` |

### Naming rules

- Use the same `NNNN-slug` for JSON, image, and cry
- `NNNN` = zero-padded id (4 digits preferred), e.g. `0025`, `0493`, `9001`
- `slug` = lowercase name with hyphens, e.g. `pikachu`, `chronos-arceus`
- **`id` must be unique** — do not reuse an existing national dex or catalog id
- For custom / fan / fusion entries, use ids **≥ 9000** to avoid clashing with PokeAPI (1–1025)

---

## JSON format

Copy this template into `data/pokemon/NNNN-slug.json` and fill it in.

```json
{
  "id": 9001,
  "name": "Chronos-Arceus",
  "types": ["divine", "steel"],
  "stats": [
    { "name": "HP", "value": 120, "max": 255 },
    { "name": "Attack", "value": 120, "max": 255 },
    { "name": "Defense", "value": 120, "max": 255 },
    { "name": "Sp. Atk", "value": 120, "max": 255 },
    { "name": "Sp. Def", "value": 120, "max": 255 },
    { "name": "Speed", "value": 120, "max": 255 }
  ],
  "image": "9001-chronos-arceus.png",
  "cry": "9001-chronos-arceus.ogg",
  "height": 48,
  "weight": 1200,
  "description": "Short blurb shown in Temporal Registry.",
  "originLore": "Longer Origin Lore panel text.",
  "ability": "Time Shield",
  "nature": "Eternal",
  "author": "your-github-handle",
  "divineTier": "Origin Genesis",
  "lore": {
    "originEpoch": "Epoch Delta-9001 (Fusion Timeline)",
    "celestialConcordance": "Prophecy / concordance quote (1–2 sentences).",
    "aethericFrequency": "999.0 Hz",
    "resonanceRating": "98.0%",
    "divineTier": "Cosmic Archon",
    "quantumResonators": [
      {
        "name": "Sovereign Aura",
        "description": "First quantum engine description."
      },
      {
        "name": "Aetherial Synthesis",
        "description": "Second quantum engine description."
      }
    ]
  }
}
```

### Field reference

| Field | Required | Notes |
|-------|----------|--------|
| `id` | **Yes** | Unique integer |
| `name` | **Yes** | Display name |
| `types` | **Yes** | Array of lowercase type strings |
| `stats` | **Yes** | Six `{ name, value, max }` entries |
| `description` | **Yes** | Short Temporal Registry text |
| `height` | **Yes** | PokeAPI units (decimetres). UI shows `height / 10` m |
| `weight` | **Yes** | PokeAPI units (hectograms). UI shows `weight / 10` kg |
| `image` | **Yes** for new entries | Filename under `public/assets/pokemon/` |
| `cry` | No | Filename under `public/assets/pokemon/` |
| `sprite` | No | Remote URL fallback if `image` is omitted |
| `originLore` | Recommended | Longer lore panel |
| `ability` | Recommended | e.g. `"Time Shield"` |
| `nature` | Recommended | e.g. `"Eternal"` |
| `author` | **Recommended** | Your name or GitHub handle — shown on the detail page |
| `divineTier` | Recommended | Card / tier label |
| `lore` | Recommended | Static Aetheric Revelation block |

Full schema: [`data/pokemon/_schema.json`](data/pokemon/_schema.json)  
More detail: [`data/pokemon/README.md`](data/pokemon/README.md)

### Image guidelines

- Prefer **PNG** or **WebP**
- Transparent background when possible
- Reasonable size (e.g. under ~1–2 MB)
- Filename must match the `image` field in JSON exactly

---

## Local check (recommended)

```bash
npm install
npm run dev
```

1. Open http://localhost:3000
2. Confirm the new Pokémon appears in the **Core** catalog
3. Open its detail card (image, ability, origin lore, etc.)
4. Search for it in the **Transmitter** by name or id

```bash
npm run lint
```

---

## Pull request process

1. **Branch** from `main`  
   Example: `add-pokemon-9001-chronos-arceus`

2. **Commit** only related files  
   - `data/pokemon/NNNN-slug.json`  
   - `public/assets/pokemon/NNNN-slug.png`  
   - optional cry file  

3. **Open a PR** to `main` with:
   - Title: `Add Pokémon: <Name> (#id)`
   - Body checklist (copy/paste):

```markdown
## New Pokémon

- [ ] JSON added under `data/pokemon/`
- [ ] Image added under `public/assets/pokemon/`
- [ ] `author` set to your name / GitHub handle
- [ ] `id` is unique
- [ ] Filenames match (`NNNN-slug`)
- [ ] Checked locally in Core + Detail (+ Transmitter search)

### Notes for reviewers
<!-- anything special: fusion lore, custom types, etc. -->
```

4. **Reviewers**  
   - Request review from at least **one maintainer / code owner**
   - Do **not** merge your own PR without approval unless you are a maintainer and the change is trivial
   - Address review comments, then wait for **approval** before merge

5. **After merge**  
   - Pages rebuilds from `main` → `gh-pages`
   - New entry appears on https://nafiul-earth.github.io/aetherium-pokedex/

---

## Reviewer checklist

Reviewers should verify:

- [ ] JSON is valid and matches the schema
- [ ] `id` / filename do not collide with existing entries
- [ ] Image exists and path in JSON is correct
- [ ] No secrets or unrelated files in the PR
- [ ] Content is appropriate for the project tone (celestial / aetheric theme)
- [ ] App still builds (`npm run build:pages` or CI)

---

## What not to change in a Pokémon PR

Unless the PR is specifically about app code:

- Do not refactor React components, workflows, or unrelated data
- Do not bump unrelated dependencies
- Do not commit `.env`, API keys, or `node_modules`

Questions? Open an issue or ask in the PR discussion.
