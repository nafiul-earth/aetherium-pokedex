export interface PokemonStat {
  name: string;
  value: number;
  max: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  sprite: string;
  height: number;
  weight: number;
  description: string;
  divineTier?: string; // e.g. "Primeval Genesis", "Dimensional Archon", etc.
}

export interface AethericLore {
  originEpoch: string;
  celestialConcordance: string;
  aethericFrequency: string;
  resonanceRating: string;
  quantumResonators: Array<{ name: string; description: string }>;
  divineTier: string;
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
