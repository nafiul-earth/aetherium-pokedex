import { Pokemon } from "../types";

export const CURATED_POKEMON: Pokemon[] = [
  {
    id: 493,
    name: "Arceus",
    types: ["normal"],
    stats: [
      { name: "HP", value: 120, max: 255 },
      { name: "Attack", value: 120, max: 255 },
      { name: "Defense", value: 120, max: 255 },
      { name: "Sp. Atk", value: 120, max: 255 },
      { name: "Sp. Def", value: 120, max: 255 },
      { name: "Speed", value: 120, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",
    height: 32,
    weight: 3200,
    description: "It is described in mythology as the Pokémon that shaped the universe with its 1,000 arms. Born from a cosmic egg before existence was codified.",
    divineTier: "Origin Genesis"
  },
  {
    id: 483,
    name: "Dialga",
    types: ["steel", "dragon"],
    stats: [
      { name: "HP", value: 100, max: 255 },
      { name: "Attack", value: 120, max: 255 },
      { name: "Defense", value: 120, max: 255 },
      { name: "Sp. Atk", value: 150, max: 255 },
      { name: "Sp. Def", value: 100, max: 255 },
      { name: "Speed", value: 90, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png",
    height: 54,
    weight: 6830,
    description: "It has the power to control time. It is spoken of in Sinnoh myths as a deity that began moving when Dialga was born.",
    divineTier: "Temporal Sovereign"
  },
  {
    id: 484,
    name: "Palkia",
    types: ["water", "dragon"],
    stats: [
      { name: "HP", value: 90, max: 255 },
      { name: "Attack", value: 120, max: 255 },
      { name: "Defense", value: 100, max: 255 },
      { name: "Sp. Atk", value: 150, max: 255 },
      { name: "Sp. Def", value: 120, max: 255 },
      { name: "Speed", value: 100, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/484.png",
    height: 42,
    weight: 3360,
    description: "It has the ability to distort space. It is described as a deity in Sinnoh-region mythology. Its breath stabilizes the dimensions.",
    divineTier: "Spatial Sovereign"
  },
  {
    id: 487,
    name: "Giratina",
    types: ["ghost", "dragon"],
    stats: [
      { name: "HP", value: 150, max: 255 },
      { name: "Attack", value: 100, max: 255 },
      { name: "Defense", value: 120, max: 255 },
      { name: "Sp. Atk", value: 100, max: 255 },
      { name: "Sp. Def", value: 120, max: 255 },
      { name: "Speed", value: 90, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/487.png",
    height: 45,
    weight: 7500,
    description: "It was banished for its violence. It silently gazed upon the old world from the Distortion World, where knowledge and physics are reversed.",
    divineTier: "Void Archon"
  },
  {
    id: 384,
    name: "Rayquaza",
    types: ["dragon", "flying"],
    stats: [
      { name: "HP", value: 105, max: 255 },
      { name: "Attack", value: 150, max: 255 },
      { name: "Defense", value: 90, max: 255 },
      { name: "Sp. Atk", value: 150, max: 255 },
      { name: "Sp. Def", value: 90, max: 255 },
      { name: "Speed", value: 95, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png",
    height: 70,
    weight: 2065,
    description: "It flies endlessly through the ozone layer, consuming meteoroids. The precious minerals in meteoroids fuel its internal mega-reactors.",
    divineTier: "Ozone Sentinel"
  },
  {
    id: 386,
    name: "Deoxys",
    types: ["psychic"],
    stats: [
      { name: "HP", value: 50, max: 255 },
      { name: "Attack", value: 150, max: 255 },
      { name: "Defense", value: 50, max: 255 },
      { name: "Sp. Atk", value: 150, max: 255 },
      { name: "Sp. Def", value: 50, max: 255 },
      { name: "Speed", value: 150, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/386.png",
    height: 17,
    weight: 608,
    description: "An alien virus that fell to Earth on a meteor underwent a cellular mutation upon exposure to a high-energy laser beam, emerging as a psychic god.",
    divineTier: "Mutated Singularity"
  },
  {
    id: 800,
    name: "Necrozma",
    types: ["psychic"],
    stats: [
      { name: "HP", value: 97, max: 255 },
      { name: "Attack", value: 107, max: 255 },
      { name: "Defense", value: 101, max: 255 },
      { name: "Sp. Atk", value: 127, max: 255 },
      { name: "Sp. Def", value: 89, max: 255 },
      { name: "Speed", value: 79, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/800.png",
    height: 24,
    weight: 2300,
    description: "An ancient creature that resembles black prism glass. It is said to have come from another world in search of light to fuel its hollow matrix.",
    divineTier: "Refractive Prism"
  },
  {
    id: 150,
    name: "Mewtwo",
    types: ["psychic"],
    stats: [
      { name: "HP", value: 106, max: 255 },
      { name: "Attack", value: 110, max: 255 },
      { name: "Defense", value: 90, max: 255 },
      { name: "Sp. Atk", value: 154, max: 255 },
      { name: "Sp. Def", value: 90, max: 255 },
      { name: "Speed", value: 130, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    height: 20,
    weight: 1220,
    description: "A Pokémon created by recombining Mew's genes. It's said to have the most savage heart among all Pokémon, built entirely for spatial domination.",
    divineTier: "Gene-Spliced Tyrant"
  },
  {
    id: 1008,
    name: "Miraidon",
    types: ["electric", "dragon"],
    stats: [
      { name: "HP", value: 100, max: 255 },
      { name: "Attack", value: 85, max: 255 },
      { name: "Defense", value: 100, max: 255 },
      { name: "Sp. Atk", value: 135, max: 255 },
      { name: "Sp. Def", value: 115, max: 255 },
      { name: "Speed", value: 135, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1008.png",
    height: 28,
    weight: 2400,
    description: "An futuristic electro-relic observed in the Great Crater of Paldea. Its carbon-fiber skin glows with artificial stellar energy.",
    divineTier: "Chronal Future-Relic"
  },
  {
    id: 1007,
    name: "Koraidon",
    types: ["fighting", "dragon"],
    stats: [
      { name: "HP", value: 100, max: 255 },
      { name: "Attack", value: 135, max: 255 },
      { name: "Defense", value: 115, max: 255 },
      { name: "Sp. Atk", value: 85, max: 255 },
      { name: "Sp. Def", value: 100, max: 255 },
      { name: "Speed", value: 135, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1007.png",
    height: 25,
    weight: 2900,
    description: "A prehistoric entity of fierce primordial power. Its brute strength is augmented by raw solar vibrations channeled through its scales.",
    divineTier: "Chronal Past-Relic"
  },
  {
    id: 251,
    name: "Celebi",
    types: ["psychic", "grass"],
    stats: [
      { name: "HP", value: 100, max: 255 },
      { name: "Attack", value: 100, max: 255 },
      { name: "Defense", value: 100, max: 255 },
      { name: "Sp. Atk", value: 100, max: 255 },
      { name: "Sp. Def", value: 100, max: 255 },
      { name: "Speed", value: 100, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/251.png",
    height: 6,
    weight: 50,
    description: "This Pokémon came from the future by crossing over time. It is thought that so long as Celebi appears, a bright and shining future awaits.",
    divineTier: "Chronal Sprite"
  },
  {
    id: 789,
    name: "Cosmog",
    types: ["psychic"],
    stats: [
      { name: "HP", value: 43, max: 255 },
      { name: "Attack", value: 29, max: 255 },
      { name: "Defense", value: 31, max: 255 },
      { name: "Sp. Atk", value: 29, max: 255 },
      { name: "Sp. Def", value: 31, max: 255 },
      { name: "Speed", value: 37, max: 255 }
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/789.png",
    height: 2,
    weight: 1,
    description: "Its body is made of a gaseous nebula material. It gathers dust from space to grow, slowly condensing stellar matter in its core.",
    divineTier: "Cosmic Seed"
  }
];

export const ANCIENT_EPOCHS = [
  {
    id: "genesis",
    title: "Epoch of Genesis",
    era: "0.00e+00 Earth-Years",
    resonanceKey: "Arceus (Creation Prime)",
    description: "Before physical dimensions, matter was compressed in a singular divine kernel. The original frequency was birthed here, codifying the cosmic registry."
  },
  {
    id: "chronos",
    title: "Chronal Bifurcation",
    era: "-4.6 Billion Earth-Years",
    resonanceKey: "Dialga & Celebi Harmony",
    description: "The crystallization of temporal flows. Time transitioned from a fluid multidimensional storm into a linear vector, enabling entropy and evolutionary progress."
  },
  {
    id: "spatial",
    title: "Prismatic Inflation",
    era: "-3.8 Billion Earth-Years",
    resonanceKey: "Palkia (Sovereign Array)",
    description: "Space expanded exponentially. Stars ignited, and raw dimensional folds stabilized into the 3D grid layout. Void zones like the Distortion Realm were partitioned."
  },
  {
    id: "mutation",
    title: "Extraterrestrial Splicing",
    era: "Modern Tech Epoch",
    resonanceKey: "Deoxys & Mewtwo Engines",
    description: "A merger of alien genetic virus material and high-tech human bio-splicing. Represents the hyper-advanced technological layer blending with organic divinity."
  }
];

// Helper to map type to specific colors matching the theme or standard pokemon types but with a luminous high-tech glow
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
  fairy: { bg: "rgba(238, 153, 172, 0.2)", border: "rgba(238, 153, 172, 0.5)", text: "#EE99AC", glow: "rgba(238, 153, 172, 0.4)" }
};

export const getTierForId = (id: number): string => {
  if (id === 493) return "Primeval Genesis";
  if ([483, 484, 487].includes(id)) return "Dimensional Sovereign";
  if ([384, 800, 150].includes(id)) return "Quantum Archon";
  if ([1007, 1008].includes(id)) return "Temporal Paradox";
  if (id > 900) return "Aetheric Hybrid";
  if (id > 600) return "Stellar Entity";
  return "Cosmic Relic";
};
