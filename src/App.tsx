import React, { useState, useEffect } from "react";
import CosmicStarfield from "./components/CosmicStarfield";
import OrbitMenu from "./components/OrbitMenu";
import PokemonCard from "./components/PokemonCard";
import DetailView from "./components/DetailView";
import TeamBuilder from "./components/TeamBuilder";
import Transmitter from "./components/Transmitter";
import AncientEpochs from "./components/AncientEpochs";
import { CURATED_POKEMON, getDefaultTeam, resolveDivineTier } from "./data/curatedPokemon";
import { Pokemon } from "./types";
import { Sparkles, ShieldCheck, Database, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState("core");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  
  // Catalog JSON is source of truth; localStorage only keeps Transmitter extras
  const [library, setLibrary] = useState<Pokemon[]>(() => {
    const catalogById = new Map(CURATED_POKEMON.map((p) => [p.id, p]));
    let extras: Pokemon[] = [];
    try {
      const savedExtras = localStorage.getItem("aether_library_extras_v3");
      extras = savedExtras ? JSON.parse(savedExtras) : [];
      if (!Array.isArray(extras)) extras = [];
    } catch {
      extras = [];
    }
    const uniqueExtras = extras.filter((p) => p && !catalogById.has(p.id));
    // Always prefer live JSON catalog entries over anything cached
    return [...CURATED_POKEMON, ...uniqueExtras];
  });

  // Pre-populate the team from data/catalog.json defaultTeamIds
  const [team, setTeam] = useState<Pokemon[]>(() => {
    try {
      const saved = localStorage.getItem("aether_team_v3");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Rehydrate catalog members from JSON so UI fields stay current
          return parsed.map((p: Pokemon) => {
            const fresh = CURATED_POKEMON.find((c) => c.id === p.id);
            return fresh ?? p;
          });
        }
      }
    } catch {
      // ignore corrupt storage
    }
    return getDefaultTeam();
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");

  // Persist only Pokémon not already defined in data/pokemon/*.json
  useEffect(() => {
    const catalogIds = new Set(CURATED_POKEMON.map((p) => p.id));
    const extras = library.filter((p) => !catalogIds.has(p.id));
    localStorage.setItem("aether_library_extras_v3", JSON.stringify(extras));
  }, [library]);

  useEffect(() => {
    localStorage.setItem("aether_team_v3", JSON.stringify(team));
  }, [team]);

  // Add a newly scanned Pokemon to the local library catalog
  const addToLibrary = (pokemon: Pokemon) => {
    if (library.some((p) => p.id === pokemon.id)) return;
    setLibrary((prev) => [...prev, pokemon]);
  };

  // Add a Pokemon to the orbital 6-member team
  const addToTeam = (pokemon: Pokemon) => {
    if (team.some((p) => p.id === pokemon.id)) return;
    if (team.length >= 6) {
      alert("Orbital bounds reached! Maximum of 6 celestial vectors can be synchronized.");
      return;
    }
    setTeam((prev) => [...prev, pokemon]);
  };

  // Remove from team
  const removeFromTeam = (pokemonId: number) => {
    setTeam((prev) => prev.filter((p) => p.id !== pokemonId));
  };

  // Helper check
  const isPokemonInTeam = (pokemonId: number) => {
    return team.some((p) => p.id === pokemonId);
  };

  // Extract all unique types available in library for filtering dropdown
  const allAvailableTypes = Array.from(
    new Set(library.flatMap((p) => p.types))
  ).sort() as string[];

  // Extract unique divine tiers
  const allAvailableTiers = Array.from(
    new Set(library.map((p) => resolveDivineTier(p)))
  ).sort() as string[];

  // Filter the library list
  const filteredLibrary = library.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          String(p.id).includes(searchQuery);
    const matchesType = selectedType === "all" || p.types.includes(selectedType);
    const matchesTier = selectedTier === "all" || resolveDivineTier(p) === selectedTier;
    return matchesSearch && matchesType && matchesTier;
  });

  return (
    <div className="relative min-h-screen text-[#e0e1f3] select-none pb-28">
      
      {/* 1. Immersive Canvas & Geometry Background */}
      <CosmicStarfield />

      {/* 2. Primary Navigation Header Frame */}
      <header id="main-header" className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Divine Logotype with precise serif & mono pairings */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-solar-gold rounded-full" />
            <span className="font-mono text-[9px] tracking-[0.4em] text-solar-gold uppercase">
              CELESTIAL CATALOG // REGENCY SYSTEM
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wide text-white mt-1 uppercase flex items-center gap-3">
            Aetherium <span className="font-mono font-light text-solar-gold text-lg sm:text-xl tracking-widest block bg-white/5 px-2.5 py-0.5 rounded border border-white/5 select-none">Pokedex</span>
          </h1>
        </div>

        {/* Diagnostic Telemetry Stats Bar */}
        <div className="flex items-center gap-4 bg-void-light/35 backdrop-blur-md border border-white/5 py-2.5 px-4 rounded-xl text-xs font-mono">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-aether-cyan" />
            <div>
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Indexed Vectors</span>
              <span className="text-white font-semibold">{library.length} Core Nodes</span>
            </div>
          </div>
          <div className="h-6 w-[1.5px] bg-white/10" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-nebula-purple" />
            <div>
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Team Orbit</span>
              <span className="text-white font-semibold">{team.length} // 6 Active</span>
            </div>
          </div>
        </div>

      </header>

      {/* 3. Main Views router */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Main Core Library Grid */}
          {activeTab === "core" && (
            <motion.div
              key="core-tab"
              className="space-y-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Search & Filters Controls Bar */}
              <div className="bg-void-light/20 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Search query box (Bottom-border styled) */}
                <div className="w-full md:w-80 border-b border-solar-gold/30 focus-within:border-solar-gold transition-colors duration-300 py-1">
                  <span className="block font-mono text-[8px] text-solar-gold tracking-widest uppercase">
                    Filter by Key identifier
                  </span>
                  <input
                    id="local-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Input Pokemon name or ID..."
                    className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-xs uppercase font-sans tracking-wide mt-1 placeholder-gray-600"
                  />
                </div>

                {/* Dropdowns filters */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  
                  {/* Select type */}
                  <div className="w-full sm:w-44 border-b border-white/10 focus-within:border-solar-gold transition-colors duration-300 py-1 flex flex-col">
                    <label className="font-mono text-[8px] text-gray-400 tracking-widest uppercase">
                      Elemental Filter
                    </label>
                    <select
                      id="type-filter-select"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="bg-void-dark/80 text-xs text-white border-none focus:outline-none focus:ring-0 uppercase font-mono tracking-wider mt-1 rounded py-1 px-1 cursor-pointer"
                    >
                      <option value="all">ALL ELEMENTS</option>
                      {allAvailableTypes.map((type) => (
                        <option key={type} value={type}>{type.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select tier */}
                  <div className="w-full sm:w-44 border-b border-white/10 focus-within:border-solar-gold transition-colors duration-300 py-1 flex flex-col">
                    <label className="font-mono text-[8px] text-gray-400 tracking-widest uppercase">
                      Divine Tier Class
                    </label>
                    <select
                      id="tier-filter-select"
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="bg-void-dark/80 text-xs text-white border-none focus:outline-none focus:ring-0 uppercase font-mono tracking-wider mt-1 rounded py-1 px-1 cursor-pointer"
                    >
                      <option value="all">ALL DIVINE CLASSES</option>
                      {allAvailableTiers.map((tier) => (
                        <option key={tier} value={tier}>{tier.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  {/* Reset button */}
                  {(selectedType !== "all" || selectedTier !== "all" || searchQuery !== "") && (
                    <button
                      id="clear-filters-btn"
                      onClick={() => {
                        setSelectedType("all");
                        setSelectedTier("all");
                        setSearchQuery("");
                      }}
                      className="w-full sm:w-auto text-[10px] font-mono text-solar-gold/70 hover:text-solar-gold uppercase tracking-wider py-1.5 px-3 border border-solar-gold/20 hover:border-solar-gold/50 rounded transition-all"
                    >
                      Reset Core
                    </button>
                  )}

                </div>
              </div>

              {/* Grid content */}
              {filteredLibrary.length > 0 ? (
                <div id="pokemon-catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-visible">
                  {filteredLibrary.map((pokemon, idx) => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      onSelect={(p) => {
                        const fresh = CURATED_POKEMON.find((c) => c.id === p.id) ?? p;
                        setSelectedPokemon(fresh);
                      }}
                      index={idx}
                    />
                  ))}
                </div>
              ) : (
                <div id="catalog-empty-state" className="text-center py-20 bg-void-light/10 border border-white/5 rounded-2xl max-w-xl mx-auto space-y-3">
                  <SlidersHorizontal className="w-10 h-10 text-gray-600 mx-auto" />
                  <h4 className="font-serif text-lg font-semibold text-white uppercase tracking-wide">
                    Interference Detected
                  </h4>
                  <p className="text-xs text-gray-400">
                    No active coordinates in the local core library match your current filter matrix. Reset inputs or access the Transmitter dock below to materialize new cosmic entity nodes.
                  </p>
                  <button
                    id="empty-action-switch-tab-btn"
                    onClick={() => setActiveTab("transmitter")}
                    className="mt-4 px-4 py-2 bg-solar-gold/10 hover:bg-solar-gold/20 border border-solar-gold/40 text-solar-gold rounded font-mono text-xs uppercase tracking-wider transition-all"
                  >
                    Open Scanning Transmitter
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: Team Synthesizer */}
          {activeTab === "synthesizer" && (
            <motion.div
              key="synthesizer-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <TeamBuilder
                team={team}
                onRemoveFromTeam={removeFromTeam}
              />
            </motion.div>
          )}

          {/* TAB 3: Search / Transmitter Terminal */}
          {activeTab === "transmitter" && (
            <motion.div
              key="transmitter-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <Transmitter
                onAddToLibrary={addToLibrary}
                onAddToTeam={addToTeam}
                isInTeam={isPokemonInTeam}
              />
            </motion.div>
          )}

          {/* TAB 4: Ancient Lore Timeline */}
          {activeTab === "lore" && (
            <motion.div
              key="lore-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <AncientEpochs />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. Full Detail Card Revelation Overlay */}
      <AnimatePresence>
        {selectedPokemon && (
          <DetailView
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            onAddToTeam={addToTeam}
            isInTeam={isPokemonInTeam(selectedPokemon.id)}
          />
        )}
      </AnimatePresence>

      {/* 5. Centralized Floating Dock Menu (Orbiting) */}
      <OrbitMenu
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto close detail overlay if open
          setSelectedPokemon(null);
        }}
      />

    </div>
  );
}
