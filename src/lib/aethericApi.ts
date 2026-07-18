import type { AethericLore, Pokemon, PokemonStat, TeamResonance } from "../types";
import { getFallbackLore, getFallbackResonance } from "./aethericFallbacks";

/**
 * Calls the Express Gemini proxy when available (local/dev).
 * On GitHub Pages there is no backend — procedural fallbacks keep the UI alive.
 */
export async function analyzePokemon(input: {
  name: string;
  id?: number;
  types?: string[];
  stats?: PokemonStat[];
}): Promise<AethericLore> {
  try {
    const response = await fetch("/api/gemini/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      return getFallbackLore(input);
    }
    return (await response.json()) as AethericLore;
  } catch {
    return getFallbackLore(input);
  }
}

export async function analyzeTeamResonance(team: Pokemon[]): Promise<TeamResonance> {
  try {
    const response = await fetch("/api/gemini/team-resonance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team }),
    });
    if (!response.ok) {
      return getFallbackResonance(team);
    }
    return (await response.json()) as TeamResonance;
  } catch {
    return getFallbackResonance(team);
  }
}
