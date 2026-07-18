/**
 * Resolve a path under `public/assets/` with the Vite base
 * (e.g. `/aetherium-pokedex/` on GitHub Pages).
 *
 * Drop files in `public/assets/…` then:
 *   assetUrl('pokemon/0025-pikachu.png')
 *   → '/aetherium-pokedex/assets/pokemon/0025-pikachu.png'
 */
export function assetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const clean = relativePath.replace(/^\/+/, "").replace(/^assets\//, "");
  return `${base}assets/${clean}`;
}

/** Files under `public/assets/images/`. */
export function imageUrl(relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, "").replace(/^images\//, "");
  return assetUrl(`images/${clean}`);
}

/**
 * Pokémon media under `public/assets/pokemon/`
 * (artwork `.png`/`.webp` and cries `.ogg`/`.mp3`).
 */
export function pokemonAssetUrl(relativePath: string): string {
  const clean = relativePath
    .replace(/^\/+/, "")
    .replace(/^pokemon\//, "")
    .replace(/^assets\/pokemon\//, "");
  return assetUrl(`pokemon/${clean}`);
}
