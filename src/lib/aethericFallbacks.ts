import type { AethericLore, Pokemon, PokemonStat, TeamResonance } from "../types";

export function getFallbackLore(input: {
  name: string;
  id?: number;
  types?: string[];
  stats?: PokemonStat[];
}): AethericLore {
  const { name, id = 1, types, stats } = input;
  const formattedTypes = types?.length ? types.join(" & ") : "Unknown";
  const freq = (100 + id * 37.3) % 900 + 100;
  const resonance =
    (70 + (stats?.reduce((acc, curr) => acc + (curr.value || 0), 0) || 300) * 0.05) % 30 + 70;

  return {
    originEpoch: `Epoch Delta-${id * 7} (Ancient Timeline)`,
    celestialConcordance: `When the cosmic gates align with ${name}, a burst of ${formattedTypes} energy ripples across the celestial fabrics. Legend says this entity commands the core structures of reality.`,
    aethericFrequency: `${freq.toFixed(1)} Hz`,
    resonanceRating: `${resonance.toFixed(1)}%`,
    quantumResonators: [
      {
        name: "Sovereign Aura",
        description: "Projects a high-frequency field that pacifies local chronal distortions.",
      },
      {
        name: "Aetherial Synthesis",
        description: `Harnesses pure ${formattedTypes} energy to transmute spatial coordinates.`,
      },
    ],
    divineTier: id > 400 ? "Cosmic Archon" : "Primal Relic",
  };
}

export function getFallbackResonance(team: Pokemon[]): TeamResonance {
  const totalStats = team.reduce(
    (sum, p) => sum + (p.stats?.reduce((acc, s) => acc + s.value, 0) || 300),
    0,
  );
  const score = (totalStats % 30) + 70;

  return {
    resonanceScore: Math.round(score),
    constellationName: `Constellation of ${team[0]?.name || "the Ancients"}`,
    resonanceLore: `This alignment of ${team.length} celestial vectors bridges separate dimensional nodes. Their frequencies converge to generate a localized hyper-harmonic field capable of tearing spatial coordinates.`,
    frequencyAlignment: `${(500 + team.length * 43).toFixed(1)} MHz`,
    synergisticBonds: [
      {
        title: "Temporal Lock",
        description:
          "Binds the timeline variables of the team members to maximize cooperative kinetic response.",
      },
      {
        title: "Aether Convergence",
        description:
          "Channels overlapping type signatures into a single resonant lattice that amplifies sovereign pressure.",
      },
    ],
  };
}
