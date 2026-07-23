# Static assets (GitHub Pages)

Files here are copied into the site root as-is by Vite (`public/` → `dist/`).

```
public/assets/
  images/
    pokemon/       # artwork, sprites, portraits
    ui/            # buttons, frames, chrome
    backgrounds/   # full-bleed / section atmospheres
    icons/         # small glyphs
```

## Usage in React

```tsx
import { imageUrl, assetUrl } from "@/src/lib/assets";

<img src={imageUrl("pokemon/arceus.png")} alt="Arceus" />
<img src={assetUrl("images/ui/orbit-ring.svg")} alt="" />
```

On Pages this resolves to `/aetherium-pokedex/assets/images/...`.

## Tips for lots of images

- Prefer `.webp` (or compressed `.png`) to keep the Pages deploy small
- Name files stably (`493-arceus.webp`) so data can reference them by id
- Very large libraries: consider Git LFS, or host on a CDN and keep only key art here
- Do **not** put secrets or `.env` files in this tree
