export interface PokemonStat {
  name: string;
  value: number;
  max: number;
}

/** Authored aetheric block — same shape as Gemini revelation UI. */
export interface AethericLore {
  originEpoch: string;
  celestialConcordance: string;
  aethericFrequency: string;
  resonanceRating: string;
  quantumResonators: Array<{ name: string; description: string }>;
  divineTier: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  sprite: string;
  /** Local or remote cry URL; DetailView prefers this over PokeAPI. */
  cry?: string;
  height: number;
  weight: number;
  /** Short blurb — Temporal Registry. */
  description: string;
  /** Longer Origin Lore panel. */
  originLore?: string;
  /** Signature ability (e.g. Time Shield). */
  ability?: string;
  /** Nature / disposition (e.g. Eternal). */
  nature?: string;
  divineTier?: string;
  /** Optional static revelation; skips Gemini when present. */
  lore?: AethericLore;
}

export interface TeamResonance {
  resonanceScore: number;
  constellationName: string;
  resonanceLore: string;
  frequencyAlignment: string;
  synergisticBonds: Array<{ title: string; description: string }>;
}

export interface AncientEpoch {
  id: string;
  title: string;
  description: string;
  era: string;
  resonanceKey: string;
}
