import React, { useState } from "react";
import { Pokemon, TeamResonance } from "../types";
import { analyzeTeamResonance } from "../lib/aethericApi";
import { Trash2, Sparkles, Loader2, Cpu, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TeamBuilderProps {
  team: Pokemon[];
  onRemoveFromTeam: (pokemonId: number) => void;
}

export default function TeamBuilder({ team, onRemoveFromTeam }: TeamBuilderProps) {
  const [resonance, setResonance] = useState<TeamResonance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeResonance = async () => {
    if (team.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeTeamResonance(team);
      setResonance(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Resonance matrix failed to harmonize. Procedural feedback detected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="team-builder-section" className="space-y-8 py-6 max-w-5xl mx-auto px-4 relative z-10">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-mono text-xs text-solar-gold tracking-[0.2em] uppercase block">
          Orbital Relic Array
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide uppercase">
          Aetheric Team Synthesizer
        </h2>
        <p className="text-sm text-gray-400">
          Synthesize up to six divine vectors into a unified constellation. The Aetherium Core AI will decode their spatial interference and unified frequency alignment.
        </p>
      </div>

      {/* Main Core Viewport: Hexagonal / Circular Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => {
          const slotPokemon = team[index];

          return (
            <AnimatePresence key={index} mode="wait">
              {slotPokemon ? (
                <motion.div
                  id={`team-slot-${slotPokemon.id}`}
                  className="relative group bg-void-light/30 backdrop-blur-xl border border-solar-gold/20 hover:border-solar-gold/50 rounded-xl p-4 flex flex-col justify-between items-center h-52 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  {/* Slot backing glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-nebula-purple/5 to-transparent pointer-events-none" />

                  {/* Top utility block */}
                  <div className="flex justify-between items-center w-full">
                    <span className="font-mono text-[9px] text-solar-gold/60">
                      SLOT // 0{index + 1}
                    </span>
                    <button
                      id={`remove-team-slot-${slotPokemon.id}`}
                      onClick={() => onRemoveFromTeam(slotPokemon.id)}
                      className="p-1 rounded text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="De-anchor vector"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Artwork floating */}
                  <div className="relative flex items-center justify-center h-28 w-28 overflow-visible">
                    <div className="absolute w-16 h-16 border border-white/5 rounded-full animate-orbit-slow" />
                    <motion.img
                      src={slotPokemon.sprite}
                      alt={slotPokemon.name}
                      className="w-20 h-20 object-contain relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                      referrerPolicy="no-referrer"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: index * 0.2 }}
                    />
                  </div>

                  {/* Details label */}
                  <div className="text-center w-full">
                    <span className="font-serif text-sm font-semibold text-white tracking-wide block truncate uppercase">
                      {slotPokemon.name}
                    </span>
                    <span className="font-mono text-[9px] text-aether-cyan uppercase block mt-0.5 truncate">
                      {slotPokemon.types.join(" // ")}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`empty-${index}`}
                  className="border border-dashed border-white/10 hover:border-solar-gold/20 rounded-xl p-4 flex flex-col justify-center items-center h-52 bg-white/[0.01] hover:bg-white/[0.02] transition-all relative group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Glowing core animation */}
                  <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center relative group-hover:border-solar-gold/30 transition-colors duration-300">
                    <div className="absolute w-8 h-8 border border-white/5 rounded-full animate-orbit-slow" />
                    <div className="w-2 h-2 bg-white/20 rounded-full group-hover:bg-solar-gold/40 group-hover:scale-125 transition-all duration-300" />
                  </div>

                  <span className="font-mono text-[9px] text-gray-500 tracking-wider uppercase mt-4 block text-center">
                    SLOT 0{index + 1} EMPTY
                  </span>
                  <span className="font-mono text-[8px] text-gray-600 uppercase block mt-1 text-center">
                    Ready for anchor
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Control Synthesizer Button */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {team.length === 0 ? (
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest text-center">
            Anchor at least one celestial vector from the library to initiate harmony analysis.
          </p>
        ) : (
          <button
            id="synthesize-resonance-btn"
            onClick={analyzeResonance}
            disabled={loading}
            className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-solar-gold to-aether-cyan text-void-navy rounded-lg font-mono text-sm tracking-widest uppercase font-bold shadow-[0_4px_24px_rgba(242,202,80,0.2)] hover:shadow-[0_4px_32px_rgba(0,228,238,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Measuring Interference...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Galactic Resonance
              </>
            )}
          </button>
        )}
      </div>

      {/* Resonance analysis report card */}
      <AnimatePresence>
        {resonance && !loading && (
          <motion.div
            id="resonance-analysis-report"
            className="bg-void-light/25 border border-solar-gold/30 rounded-2xl p-6 sm:p-8 relative shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top gold border gradient */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-solar-gold to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Score ring */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2 relative">
                {/* Orbital particles visual backing */}
                <div className="absolute w-44 h-44 border border-solar-gold/15 rounded-full animate-orbit-slow" />
                <div className="absolute w-36 h-36 border border-aether-cyan/15 rounded-full animate-orbit-fast" />

                <div className="relative z-10">
                  <span className="block text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                    Resonance Score
                  </span>
                  <span className="block font-serif text-6xl font-bold text-solar-gold mt-1">
                    {resonance.resonanceScore}%
                  </span>
                  <span className="block text-[9px] font-mono text-aether-cyan uppercase tracking-wider mt-1">
                    {resonance.frequencyAlignment}
                  </span>
                </div>
              </div>

              {/* Textual Lore & Synergistic Bonds */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <span className="font-mono text-xs text-solar-gold/70 uppercase tracking-widest block mb-1">
                    Decoded Constellation
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white uppercase tracking-wide">
                    {resonance.constellationName}
                  </h3>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {resonance.resonanceLore}
                </p>

                {/* Bonds row */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <span className="font-mono text-[10px] text-solar-gold/60 uppercase tracking-widest block">
                    Established Spatial Bonds
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {resonance.synergisticBonds.map((bond, idx) => (
                      <div id={`bond-${idx}`} key={idx} className="bg-void-dark/50 border border-aether-cyan/15 rounded-lg p-4 flex gap-3 items-start">
                        <Zap className="w-4 h-4 text-aether-cyan shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-mono text-xs font-semibold text-white uppercase">
                            {bond.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-1 leading-normal">
                            {bond.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && !loading && (
        <div className="bg-red-950/10 border border-red-500/20 rounded-xl p-4 text-center max-w-lg mx-auto">
          <p className="text-xs font-mono text-red-400 uppercase">
            {error}
          </p>
        </div>
      )}

    </div>
  );
}
