import React, { useState } from "react";
import { Pokemon } from "../types";
import { Search, Loader2, Compass, Orbit, Zap, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getTierForId } from "../data/curatedPokemon";

interface TransmitterProps {
  onAddToLibrary: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
  isInTeam: (pokemonId: number) => boolean;
}

export default function Transmitter({ onAddToLibrary, onAddToTeam, isInTeam }: TransmitterProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedPokemon, setScannedPokemon] = useState<Pokemon | null>(null);

  const SUGGESTIONS = [
    { id: 151, name: "Mew" },
    { id: 382, name: "Kyogre" },
    { id: 383, name: "Groudon" },
    { id: 488, name: "Cresselia" },
    { id: 491, name: "Darkrai" },
    { id: 1000, name: "Gimmighoul" }
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setScannedPokemon(null);

    try {
      const formattedQuery = searchQuery.trim().toLowerCase();
      // Fetch Pokemon data
      const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedQuery}`);
      if (!pokemonRes.ok) {
        throw new Error("Target coordinates not found in PokeAPI mainframe.");
      }

      const pokemonData = await pokemonRes.json();

      // Fetch species data for description (optional, handles error fallback gracefully)
      let description = "Uncoded celestial entity. Harnessing temporal vectors to map matrix signatures.";
      try {
        const speciesRes = await fetch(pokemonData.species.url);
        if (speciesRes.ok) {
          const speciesData = await speciesRes.json();
          const englishFlavor = speciesData.flavor_text_entries.find(
            (entry: any) => entry.language.name === "en"
          );
          if (englishFlavor) {
            description = englishFlavor.flavor_text
              .replace(/\f/g, " ")
              .replace(/\n/g, " ")
              .replace(/\r/g, " ");
          }
        }
      } catch (e) {
        console.warn("Failed to fetch Pokemon description species, using fallback:", e);
      }

      // Convert stats format
      const statsMap: Record<string, string> = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Sp. Atk",
        "special-defense": "Sp. Def",
        speed: "Speed"
      };

      const stats = pokemonData.stats.map((s: any) => ({
        name: statsMap[s.stat.name] || s.stat.name,
        value: s.base_stat,
        max: 255
      }));

      const sprite = pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default;

      const scanned: Pokemon = {
        id: pokemonData.id,
        name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
        types: pokemonData.types.map((t: any) => t.type.name),
        stats,
        sprite,
        height: pokemonData.height,
        weight: pokemonData.weight,
        description,
        divineTier: getTierForId(pokemonData.id)
      };

      setScannedPokemon(scanned);
    } catch (err: any) {
      console.error(err);
      setError("Coordinate breakdown. Unable to materialize entity from search parameters.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="transmitter-section" className="space-y-8 py-6 max-w-4xl mx-auto px-4 relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-mono text-xs text-aether-cyan tracking-[0.2em] uppercase block">
          Astral Transmitter
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide uppercase">
          Cosmos Scanning Terminal
        </h2>
        <p className="text-sm text-gray-400">
          Tune the Aetheric Transmitter to any PokeAPI identifier or coordinate name (e.g. "Arceus" or "25") to materialize and synthesize raw celestial attributes.
        </p>
      </div>

      {/* Input Terminal: Bottom-border only */}
      <div className="max-w-xl mx-auto">
        <form
          id="transmitter-search-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative flex items-center justify-between border-b border-solar-gold/40 hover:border-solar-gold focus-within:border-aether-cyan transition-colors duration-300 py-2.5"
        >
          <div className="flex-1 mr-4">
            <span className="block font-mono text-[10px] tracking-widest text-solar-gold uppercase mb-0.5">
              Input Coordinates (Name or ID)
            </span>
            <input
              id="transmitter-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. groudon, deoxys, 151..."
              className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder-gray-600 font-sans text-lg tracking-wide uppercase mt-1"
            />
          </div>

          <button
            id="transmitter-search-submit"
            type="submit"
            disabled={loading}
            className="p-3 bg-solar-gold/15 hover:bg-solar-gold hover:text-void-navy text-solar-gold rounded-full border border-solar-gold/40 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </form>

        {/* Suggestions badge bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="font-mono text-[9px] text-gray-500 uppercase mr-1">Tuning presets:</span>
          {SUGGESTIONS.map((preset) => (
            <button
              id={`preset-btn-${preset.id}`}
              key={preset.id}
              onClick={() => {
                setQuery(preset.name);
                handleSearch(preset.name);
              }}
              className="px-2.5 py-1 rounded bg-void-light/40 hover:bg-white/5 border border-white/5 hover:border-solar-gold/30 text-[10px] font-mono text-solar-gold uppercase transition-all"
            >
              #{preset.id} {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Materialization Viewport */}
      <div className="min-h-[350px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* Loading Materializer state */}
          {loading && (
            <motion.div
              key="materializing-loading"
              className="flex flex-col items-center space-y-4 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 border border-aether-cyan/35 rounded-full animate-ping" />
                <div className="absolute w-16 h-16 border-2 border-t-solar-gold border-r-transparent border-b-aether-cyan border-l-transparent rounded-full animate-spin" />
                <Zap className="w-6 h-6 text-solar-gold animate-bounce" />
              </div>
              <span className="font-mono text-xs text-solar-gold tracking-widest uppercase animate-pulse">
                Materializing Matrix signature...
              </span>
            </motion.div>
          )}

          {/* Success scan viewport */}
          {scannedPokemon && !loading && (
            <motion.div
              id="transmitter-materialized-card"
              key="materialized-card"
              className="w-full max-w-2xl bg-void-light/35 backdrop-blur-2xl border border-solar-gold/35 rounded-2xl p-6 relative shadow-2xl overflow-visible"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-solar-gold" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-solar-gold" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-solar-gold" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-solar-gold" />

              {/* Scanline glow effect */}
              <div className="absolute inset-x-0 h-0.5 bg-aether-cyan/40 shadow-[0_0_10px_#00e4ee] top-0 pointer-events-none animate-scan-line" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Immersive core sprite display */}
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 bg-void-dark/60 border border-white/5 rounded-xl flex items-center justify-center overflow-visible">
                    <div className="absolute w-36 h-36 border border-solar-gold/10 rounded-full animate-orbit-slow" />
                    <img
                      src={scannedPokemon.sprite}
                      alt={scannedPokemon.name}
                      className="w-40 h-40 object-contain relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-4">
                    <button
                      id="save-to-library-btn"
                      onClick={() => {
                        onAddToLibrary(scannedPokemon);
                        alert(`Synthesized ${scannedPokemon.name} into Aether Core!`);
                      }}
                      className="py-2 px-3 border border-solar-gold/40 hover:border-solar-gold text-solar-gold font-mono text-[10px] tracking-wider uppercase rounded bg-solar-gold/5 hover:bg-solar-gold/10 transition-all flex items-center justify-center gap-1"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      Save Core
                    </button>
                    <button
                      id="save-to-team-btn"
                      onClick={() => {
                        onAddToTeam(scannedPokemon);
                      }}
                      disabled={isInTeam(scannedPokemon.id)}
                      className={`py-2 px-3 font-mono text-[10px] tracking-wider uppercase rounded transition-all flex items-center justify-center gap-1 ${
                        isInTeam(scannedPokemon.id)
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-950/20 cursor-default"
                          : "border-aether-cyan/40 hover:border-aether-cyan text-aether-cyan bg-aether-cyan/5 hover:bg-aether-cyan/10"
                      }`}
                    >
                      <Orbit className="w-3.5 h-3.5" />
                      {isInTeam(scannedPokemon.id) ? "Anchored" : "Anchor Team"}
                    </button>
                  </div>
                </div>

                {/* Right specs column */}
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[10px] text-solar-gold/60 uppercase tracking-widest block">
                      COSMIC VECTORS RESOLVED // #{scannedPokemon.id}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-white uppercase tracking-wide">
                      {scannedPokemon.name}
                    </h3>
                    <span className="text-[10px] font-mono text-aether-cyan uppercase tracking-wider block mt-1">
                      {scannedPokemon.divineTier}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {scannedPokemon.description}
                  </p>

                  {/* Attributes badges list */}
                  <div className="flex flex-wrap gap-2">
                    {scannedPokemon.types.map((type) => (
                      <span
                        key={type}
                        className="px-2.5 py-0.5 rounded border border-white/10 text-[10px] font-mono uppercase tracking-widest text-gray-300 bg-white/5 shadow-inner"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Stats list mini-panel */}
                  <div className="bg-void-dark/40 border border-white/5 rounded p-3 space-y-2">
                    <span className="block text-[8px] font-mono text-solar-gold/60 uppercase tracking-widest">Spectral Stats</span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {scannedPokemon.stats.slice(0, 4).map((stat) => (
                        <div key={stat.name} className="flex justify-between items-center text-[11px] font-mono text-gray-400 border-b border-white/[0.03] pb-1">
                          <span>{stat.name}</span>
                          <span className="text-white font-semibold">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Empty materializing dock state */}
          {!scannedPokemon && !loading && !error && (
            <motion.div
              key="materializer-empty"
              className="text-center p-8 bg-void-light/10 border border-white/5 rounded-2xl max-w-lg space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="w-10 h-10 text-gray-600 mx-auto" />
              <h4 className="font-serif text-lg font-semibold text-white uppercase tracking-wide">
                Transmitter Offline
              </h4>
              <p className="text-xs text-gray-400">
                Input coordinate names or identifiers above, then ignite the search array to lock space-time channels and materialize Pokemon nodes directly from the PokeAPI.
              </p>
            </motion.div>
          )}

          {/* Error materialized state */}
          {error && !loading && (
            <motion.div
              key="materializing-error"
              className="text-center p-8 bg-red-950/10 border border-red-500/25 rounded-2xl max-w-lg space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertTriangle className="w-10 h-10 text-red-500 mx-auto animate-pulse" />
              <h4 className="font-mono text-sm font-semibold text-red-400 uppercase tracking-wider">
                Coordinate Loss // Core Error
              </h4>
              <p className="text-xs text-gray-400">
                The coordinates inputted do not resolve to any known cosmic entities in the regional PokeAPI matrix. Please calibrate spellings (e.g., 'mew', 'rayquaza') or ID bounds (e.g. 1 to 1025).
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
