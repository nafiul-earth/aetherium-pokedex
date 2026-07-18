import type { AethericLore, Pokemon, PokemonStat } from "../types";
import { pokemonAssetUrl } from "../lib/assets";

/** Shape of one file in `data/pokemon/*.json` (matches Detail View UI). */
export interface PokemonRecord {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  /** Local artwork under `public/assets/pokemon/` (e.g. `0493-arceus.png`). */
  image?: string;
  /** Local cry under `public/assets/pokemon/` (e.g. `0493-arceus.ogg`). */
  cry?: string;
  /** Remote artwork fallback when `image` is omitted. */
  sprite?: string;
  height: number;
  weight: number;
  /** Short Temporal Registry text. */
  description: string;
  /** Longer Origin Lore panel. */
  originLore?: string;
  /** Signature ability shown in detail UI. */
  ability?: string;
  nature?: string;
  divineTier?: string;
  /** Static Gemini Aetheric Revelation block (optional). */
  lore?: AethericLore;
}

function resolveSprite(record: PokemonRecord): string {
  if (record.image?.trim()) {
    return pokemonAssetUrl(record.image.trim());
  }
  if (record.sprite?.trim()) {
    return record.sprite.trim();
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${record.id}.png`;
}

function resolveCry(record: PokemonRecord): string | undefined {
  if (record.cry?.trim()) {
    return pokemonAssetUrl(record.cry.trim());
  }
  return undefined;
}

export function normalizePokemonRecord(record: PokemonRecord): Pokemon {
  return {
    id: record.id,
    name: record.name,
    types: record.types.map((t) => t.toLowerCase()),
    stats: record.stats,
    sprite: resolveSprite(record),
    cry: resolveCry(record),
    height: record.height,
    weight: record.weight,
    description: record.description,
    originLore: record.originLore,
    ability: record.ability,
    nature: record.nature,
    divineTier: record.divineTier,
    lore: record.lore,
  };
}

/**
 * Eagerly load every `data/pokemon/*.json` (skips `_schema.json`).
 * Add a new file → rebuild → it appears in the UI.
 */
const modules = import.meta.glob("../../data/pokemon/*.json", {
  eager: true,
  import: "default",
}) as Record<string, PokemonRecord>;

export const CATALOG_POKEMON: Pokemon[] = Object.entries(modules)
  .filter(([filePath]) => !filePath.includes("_schema"))
  .map(([filePath, record]) => {
    if (!record || typeof record.id !== "number" || !record.name) {
      console.warn(`[pokemon catalog] Skipping invalid file: ${filePath}`);
      return null;
    }
    return normalizePokemonRecord(record);
  })
  .filter((p): p is Pokemon => p !== null)
  .sort((a, b) => a.id - b.id);
