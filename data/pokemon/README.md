# Pokémon data (`data/pokemon/`)

One JSON file per Pokémon. The Core library and Detail View load **every** `*.json` here (except `_schema.json`).

## Files to add

| What | Where |
|------|--------|
| Details JSON | `data/pokemon/NNNN-slug.json` |
| Image (optional) | `public/assets/pokemon/NNNN-slug.png` |
| Cry (optional) | `public/assets/pokemon/NNNN-slug.ogg` |

## Full schema (matches Detail UI)

```json
{
  "id": 493,
  "name": "Arceus",
  "types": ["normal"],
  "stats": [
    { "name": "HP", "value": 120, "max": 255 },
    { "name": "Attack", "value": 120, "max": 255 },
    { "name": "Defense", "value": 120, "max": 255 },
    { "name": "Sp. Atk", "value": 120, "max": 255 },
    { "name": "Sp. Def", "value": 120, "max": 255 },
    { "name": "Speed", "value": 120, "max": 255 }
  ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",
  "image": "0493-arceus.png",
  "cry": "0493-arceus.ogg",
  "height": 32,
  "weight": 3200,
  "description": "Short Temporal Registry blurb.",
  "originLore": "Longer Origin Lore panel text.",
  "ability": "Multitype",
  "nature": "Eternal",
  "divineTier": "Origin Genesis",
  "lore": {
    "originEpoch": "Epoch Delta-3451 (Ancient Timeline)",
    "celestialConcordance": "Prophecy / concordance quote.",
    "aethericFrequency": "588.9 Hz",
    "resonanceRating": "86.0%",
    "divineTier": "Cosmic Archon",
    "quantumResonators": [
      { "name": "Sovereign Aura", "description": "Ability engine description." },
      { "name": "Aetherial Synthesis", "description": "Second engine description." }
    ]
  }
}
```

## Field → UI

| JSON field | Detail UI |
|------------|-----------|
| `name`, `types`, `sprite`/`image` | Header + artwork |
| `cry` | Play Cry |
| `height`, `weight` | Height / Weight meters |
| `ability`, `nature` | Ability / Nature meters |
| `description` | Temporal Registry |
| `originLore` | Origin Lore panel |
| `stats` | Quantum Frequencies bars |
| `lore.*` | Gemini Aetheric Revelation (static; skips Gemini when set) |
| `divineTier` | Card / header tier label |

`height` / `weight` use PokeAPI units (decimetres / hectograms). UI shows `height/10` m and `weight/10` kg.
