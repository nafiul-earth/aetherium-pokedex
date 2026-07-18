import type { AncientEpoch, Pokemon } from "../types";
import { CATALOG_POKEMON } from "./loadPokemonCatalog";
import epochsJson from "../../data/epochs.json";
import catalogMeta from "../../data/catalog.json";

/** Pokémon catalog — exclusively from `data/pokemon/*.json`. */
export const CURATED_POKEMON: Pokemon[] = CATALOG_POKEMON;

export const ANCIENT_EPOCHS = epochsJson as AncientEpoch[];

export const DEFAULT_TEAM_IDS: number[] = catalogMeta.defaultTeamIds ?? [];

/** Resolve default orbit team from catalog ids in `data/catalog.json`. */
export function getDefaultTeam(): Pokemon[] {
  return DEFAULT_TEAM_IDS.map((id) => CURATED_POKEMON.find((p) => p.id === id)).filter(
    (p): p is Pokemon => Boolean(p),
  );
}

/** Divine tier comes from JSON (`divineTier` or `lore.divineTier`) — no per-id hardcoding. */
export function resolveDivineTier(pokemon: Pick<Pokemon, "divineTier" | "lore">): string {
  return pokemon.divineTier || pokemon.lore?.divineTier || "Cosmic Relic";
}

/** Theme colors only (not Pokémon content). */
export const TYPE_GLOWS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  normal: { bg: "rgba(168, 167, 122, 0.2)", border: "rgba(168, 167, 122, 0.5)", text: "#C6C6A7", glow: "rgba(168, 167, 122, 0.4)" },
  fire: { bg: "rgba(240, 128, 48, 0.2)", border: "rgba(240, 128, 48, 0.5)", text: "#F08030", glow: "rgba(240, 128, 48, 0.4)" },
  water: { bg: "rgba(104, 144, 240, 0.2)", border: "rgba(104, 144, 240, 0.5)", text: "#6890F0", glow: "rgba(104, 144, 240, 0.4)" },
  electric: { bg: "rgba(248, 208, 48, 0.2)", border: "rgba(248, 208, 48, 0.5)", text: "#F8D030", glow: "rgba(248, 208, 48, 0.4)" },
  grass: { bg: "rgba(120, 200, 80, 0.2)", border: "rgba(120, 200, 80, 0.5)", text: "#78C050", glow: "rgba(120, 200, 80, 0.4)" },
  ice: { bg: "rgba(152, 216, 216, 0.2)", border: "rgba(152, 216, 216, 0.5)", text: "#98D8D8", glow: "rgba(152, 216, 216, 0.4)" },
  fighting: { bg: "rgba(192, 48, 40, 0.2)", border: "rgba(192, 48, 40, 0.5)", text: "#C03028", glow: "rgba(192, 48, 40, 0.4)" },
  poison: { bg: "rgba(160, 64, 160, 0.2)", border: "rgba(160, 64, 160, 0.5)", text: "#A040A0", glow: "rgba(160, 64, 160, 0.4)" },
  ground: { bg: "rgba(224, 192, 104, 0.2)", border: "rgba(224, 192, 104, 0.5)", text: "#E0C068", glow: "rgba(224, 192, 104, 0.4)" },
  flying: { bg: "rgba(168, 144, 240, 0.2)", border: "rgba(168, 144, 240, 0.5)", text: "#A890F0", glow: "rgba(168, 144, 240, 0.4)" },
  psychic: { bg: "rgba(248, 88, 136, 0.2)", border: "rgba(248, 88, 136, 0.5)", text: "#F85888", glow: "rgba(248, 88, 136, 0.4)" },
  bug: { bg: "rgba(168, 184, 32, 0.2)", border: "rgba(168, 184, 32, 0.5)", text: "#A8B820", glow: "rgba(168, 184, 32, 0.4)" },
  rock: { bg: "rgba(184, 160, 56, 0.2)", border: "rgba(184, 160, 56, 0.5)", text: "#B8A038", glow: "rgba(184, 160, 56, 0.4)" },
  ghost: { bg: "rgba(112, 88, 152, 0.2)", border: "rgba(112, 88, 152, 0.5)", text: "#705898", glow: "rgba(112, 88, 152, 0.4)" },
  dragon: { bg: "rgba(112, 56, 248, 0.2)", border: "rgba(112, 56, 248, 0.5)", text: "#7038F8", glow: "rgba(112, 56, 248, 0.4)" },
  dark: { bg: "rgba(112, 88, 72, 0.2)", border: "rgba(112, 88, 72, 0.5)", text: "#705848", glow: "rgba(112, 88, 72, 0.4)" },
  steel: { bg: "rgba(184, 184, 208, 0.2)", border: "rgba(184, 184, 208, 0.5)", text: "#B8B8D0", glow: "rgba(184, 184, 208, 0.4)" },
  fairy: { bg: "rgba(238, 153, 172, 0.2)", border: "rgba(238, 153, 172, 0.5)", text: "#EE99AC", glow: "rgba(238, 153, 172, 0.4)" },
  divine: { bg: "rgba(0, 228, 238, 0.2)", border: "rgba(0, 228, 238, 0.5)", text: "#00E4EE", glow: "rgba(0, 228, 238, 0.4)" },
};
