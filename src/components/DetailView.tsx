import React, { useState, useEffect } from "react";
import { Pokemon, AethericLore } from "../types";
import { TYPE_GLOWS, resolveDivineTier } from "../data/curatedPokemon";
import { analyzePokemon } from "../lib/aethericApi";
import { X, Play, Loader2, Sparkles, Shield, Cpu, Activity, Ruler, Weight, Zap, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PokemonImageZoom, { ZoomTriggerButton } from "./PokemonImageZoom";

interface DetailViewProps {
  pokemon: Pokemon;
  onClose: () => void;
  onAddToTeam?: (pokemon: Pokemon) => void;
  isInTeam?: boolean;
}

export default function DetailView({ pokemon, onClose, onAddToTeam, isInTeam = false }: DetailViewProps) {
  const [lore, setLore] = useState<AethericLore | null>(null);
  const [loadingLore, setLoadingLore] = useState(false);
  const [isPlayingCry, setIsPlayingCry] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageZoomOpen, setImageZoomOpen] = useState(false);

  const primaryType = pokemon.types[0]?.toLowerCase() || "normal";
  const typeStyle = TYPE_GLOWS[primaryType] || TYPE_GLOWS.normal;
  const tierLabel = resolveDivineTier(pokemon);

  // Play cry: local asset from JSON first, then PokeAPI, then synth fallback
  const playCry = () => {
    if (isPlayingCry) return;
    setIsPlayingCry(true);

    const playSynthFallback = () => {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(300 + pokemon.id * 0.8, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.8);

        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);

        setTimeout(() => setIsPlayingCry(false), 800);
      } catch {
        setIsPlayingCry(false);
      }
    };

    const tryPlay = (url: string, onFail: () => void) => {
      const audio = new Audio(url);
      audio.volume = 0.4;
      audio.play()
        .then(() => {
          const done = () => setIsPlayingCry(false);
          audio.onended = done;
          setTimeout(done, 4000);
        })
        .catch(onFail);
    };

    if (pokemon.cry) {
      tryPlay(pokemon.cry, () => {
        console.warn("Local cry failed, trying PokeAPI:", pokemon.cry);
        tryPlay(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/cries/${pokemon.id}.ogg`,
          playSynthFallback,
        );
      });
      return;
    }

    tryPlay(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/cries/${pokemon.id}.ogg`,
      playSynthFallback,
    );
  };

  // Prefer authored JSON lore; otherwise channel Gemini / procedural fallback
  const channelAethericRevelation = async () => {
    if (pokemon.lore) {
      setLore(pokemon.lore);
      setLoadingLore(false);
      setError(null);
      return;
    }
    setLoadingLore(true);
    setError(null);
    try {
      const data = await analyzePokemon({
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.types,
        stats: pokemon.stats,
      });
      setLore(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Unable to establish link with the Gemini Core. Procedural static received.");
    } finally {
      setLoadingLore(false);
    }
  };

  // Auto-channel on open (uses JSON lore instantly when present)
  useEffect(() => {
    setImageZoomOpen(false);
    channelAethericRevelation();
  }, [pokemon.id]);

  return (
    <motion.div
      id="detail-view-modal"
      className="fixed inset-0 z-40 overflow-y-auto bg-void-dark/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Container Card */}
      <motion.div
        id="detail-container-card"
        className="relative w-full max-w-4xl bg-void-navy/95 border border-solar-gold/30 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.8)] overflow-hidden"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
      >
        {/* Background Radial Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] blur-[120px] opacity-15 pointer-events-none -z-10"
          style={{ background: `radial-gradient(circle, ${typeStyle.glow} 0%, transparent 70%)` }}
        />

        {/* Header Border Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-solar-gold to-transparent" />

        {/* Top bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-solar-gold tracking-widest uppercase">
              DETECTION CORE // RESOLVING VECTORS
            </span>
            <div className="w-1.5 h-1.5 bg-aether-cyan rounded-full animate-pulse" />
          </div>
          <button
            id="close-detail-btn"
            onClick={onClose}
            className="p-1.5 rounded-full border border-white/10 hover:border-solar-gold/50 text-gray-400 hover:text-white transition-all bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 max-h-[80vh] overflow-y-auto">
          
          {/* LEFT SIDE: Visual Core & Core Specs */}
          <div className="md:col-span-5 flex flex-col items-center">
            
            {/* The Image Viewport - Overflow / Break Container */}
            <div className="relative w-full h-64 bg-void-light/30 border border-white/5 rounded-xl flex items-center justify-center overflow-visible shadow-inner">
              
              {/* Radar Grid Backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#1c223c_1px,transparent_1px)] [background-size:16px_16px] opacity-40 rounded-xl" />
              
              {/* Circular sacred gears */}
              <div className="absolute w-44 h-44 border border-solar-gold/10 rounded-full animate-orbit-slow" />
              <div className="absolute w-36 h-36 border border-aether-cyan/10 rounded-full animate-orbit-fast" />
              
              {/* Pokemon official artwork — click to zoom */}
              <motion.img
                id={`detail-pokemon-img-${pokemon.id}`}
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-48 h-48 object-contain relative z-20 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] cursor-zoom-in"
                referrerPolicy="no-referrer"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                onClick={() => setImageZoomOpen(true)}
                title="Click to zoom"
              />

              <ZoomTriggerButton onClick={() => setImageZoomOpen(true)} />

              {/* Sound activator badge */}
              <button
                id="play-cry-btn"
                onClick={playCry}
                className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-void-dark/85 border border-solar-gold/40 hover:border-solar-gold hover:bg-void-dark transition-all rounded text-[10px] font-mono tracking-widest text-solar-gold uppercase z-30 ${isPlayingCry ? "shadow-[0_0_12px_rgba(242,202,80,0.4)]" : ""}`}
              >
                <Play className={`w-3 h-3 ${isPlayingCry ? "animate-ping text-aether-cyan" : ""}`} />
                {isPlayingCry ? "Resonating..." : "Play Cry"}
              </button>
            </div>

            {/* Core Metadata Indicators */}
            <div className="w-full mt-4 grid grid-cols-2 gap-3">
              <div className="bg-void-light/20 border border-white/5 p-3 rounded-lg flex items-center gap-2.5">
                <Ruler className="w-4 h-4 text-aether-cyan" />
                <div>
                  <span className="block text-[9px] font-mono text-gray-400 tracking-wider uppercase">Height</span>
                  <span className="block text-sm font-semibold text-white font-mono">{pokemon.height / 10} m</span>
                </div>
              </div>
              <div className="bg-void-light/20 border border-white/5 p-3 rounded-lg flex items-center gap-2.5">
                <Weight className="w-4 h-4 text-solar-gold" />
                <div>
                  <span className="block text-[9px] font-mono text-gray-400 tracking-wider uppercase">Weight</span>
                  <span className="block text-sm font-semibold text-white font-mono">{pokemon.weight / 10} kg</span>
                </div>
              </div>
              {pokemon.ability && (
                <div className="bg-void-light/20 border border-white/5 p-3 rounded-lg flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-nebula-purple" />
                  <div>
                    <span className="block text-[9px] font-mono text-gray-400 tracking-wider uppercase">Ability</span>
                    <span className="block text-sm font-semibold text-white font-mono">{pokemon.ability}</span>
                  </div>
                </div>
              )}
              {pokemon.nature && (
                <div className="bg-void-light/20 border border-white/5 p-3 rounded-lg flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-aether-cyan" />
                  <div>
                    <span className="block text-[9px] font-mono text-gray-400 tracking-wider uppercase">Nature</span>
                    <span className="block text-sm font-semibold text-white font-mono">{pokemon.nature}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Basic Lore Box */}
            <div className="w-full mt-4 bg-void-light/10 border border-white/5 p-4 rounded-xl relative">
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-void-navy px-2 text-[9px] font-mono text-solar-gold tracking-widest uppercase">
                Temporal Registry
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans mt-1">
                {pokemon.description}
              </p>
            </div>

            {/* Origin Lore */}
            {pokemon.originLore && (
              <div className="w-full mt-4 bg-void-light/10 border border-solar-gold/15 p-4 rounded-xl relative">
                <div className="absolute top-0 left-4 -translate-y-1/2 bg-void-navy px-2 text-[9px] font-mono text-aether-cyan tracking-widest uppercase flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Origin Lore
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans mt-1">
                  {pokemon.originLore}
                </p>
              </div>
            )}

            {/* Team management button */}
            {onAddToTeam && (
              <button
                id="add-to-team-btn"
                onClick={() => onAddToTeam(pokemon)}
                disabled={isInTeam}
                className={`w-full mt-4 py-2.5 px-4 font-mono text-xs uppercase tracking-widest rounded-lg border transition-all duration-300 ${
                  isInTeam
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-400 cursor-default"
                    : "bg-gradient-to-r from-aether-cyan/20 to-nebula-purple/20 border-solar-gold/40 hover:border-solar-gold text-solar-gold hover:shadow-[0_0_15px_rgba(242,202,80,0.25)]"
                }`}
              >
                {isInTeam ? "✓ Active in Orbit Team" : "+ Anchor to Orbit Team"}
              </button>
            )}
          </div>

          {/* RIGHT SIDE: Technical Stats & Gemini Revelation */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            
            {/* Core Stats Radar Array */}
            <div className="bg-void-light/10 border border-white/5 rounded-xl p-5 relative">
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-void-navy px-2 text-[9px] font-mono text-aether-cyan tracking-widest uppercase">
                Quantum Frequencies (Stats)
              </div>
              
              <div className="space-y-3 mt-1">
                {pokemon.stats.map((stat) => {
                  const percent = Math.min((stat.value / stat.max) * 100, 100);
                  return (
                    <div id={`stat-bar-${stat.name}`} key={stat.name} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-gray-400">
                        <span>{stat.name}</span>
                        <span className="text-white font-semibold">{stat.value} // {stat.max}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                        {/* Shimmer track background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                        
                        {/* Core glow progress track */}
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-aether-cyan to-solar-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{
                            boxShadow: "0 0 8px rgba(0, 228, 238, 0.4)"
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Custom Lore: Aetheric Revelation */}
            <div className="bg-void-light/20 border border-solar-gold/15 hover:border-solar-gold/30 rounded-xl p-5 relative min-h-[220px] flex flex-col justify-between">
              
              {/* Header Label */}
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-void-navy px-2 text-[9px] font-mono text-solar-gold tracking-widest uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Gemini Aetheric Revelation
              </div>

              {/* Loader */}
              {loadingLore && (
                <div id="revelation-loader" className="flex flex-col items-center justify-center py-12 flex-1 space-y-3">
                  <Loader2 className="w-8 h-8 text-solar-gold animate-spin" />
                  <span className="text-[10px] font-mono text-solar-gold tracking-widest uppercase animate-pulse">
                    Synchronizing Celestial Core...
                  </span>
                </div>
              )}

              {/* Main Revelation content */}
              {!loadingLore && lore && (
                <motion.div
                  id="revelation-content"
                  className="space-y-4 flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/5 pb-3">
                    <div>
                      <span className="block text-[8px] font-mono text-gray-400 tracking-wider uppercase">Divine Rank</span>
                      <span className="text-xs font-semibold font-mono text-solar-gold uppercase">{lore.divineTier}</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/5" />
                    <div>
                      <span className="block text-[8px] font-mono text-gray-400 tracking-wider uppercase">Aetheric Frequency</span>
                      <span className="text-xs font-semibold font-mono text-aether-cyan uppercase">{lore.aethericFrequency}</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/5" />
                    <div>
                      <span className="block text-[8px] font-mono text-gray-400 tracking-wider uppercase">Resonance Rating</span>
                      <span className="text-xs font-semibold font-mono text-nebula-purple uppercase">{lore.resonanceRating}</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[9px] font-mono text-solar-gold/60 tracking-widest uppercase mb-1">Origin Epoch</span>
                    <p className="text-xs font-semibold text-white font-mono uppercase bg-void-dark/50 py-1 px-2.5 rounded border border-white/5 inline-block">
                      {lore.originEpoch}
                    </p>
                  </div>

                  <div>
                    <span className="block text-[9px] font-mono text-solar-gold/60 tracking-widest uppercase mb-1">Celestial Concordance (Prophecy)</span>
                    <p className="text-xs text-gray-200 italic leading-relaxed font-sans">
                      "{lore.celestialConcordance}"
                    </p>
                  </div>

                  {/* Quantum Resonators (Specific items/abilities) */}
                  <div>
                    <span className="block text-[9px] font-mono text-solar-gold/60 tracking-widest uppercase mb-2">Activated Quantum Engines</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {lore.quantumResonators.map((resonator, i) => (
                        <div id={`resonator-${i}`} key={i} className="bg-void-dark/40 border border-aether-cyan/15 rounded p-3">
                          <span className="block text-[11px] font-semibold text-aether-cyan font-mono uppercase mb-1">
                            // {resonator.name}
                          </span>
                          <p className="text-[10px] text-gray-400 leading-normal">
                            {resonator.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Empty state when no lore is loaded or error */}
              {!loadingLore && !lore && (
                <div id="revelation-empty" className="flex flex-col items-center justify-center py-12 flex-1 space-y-3">
                  <Cpu className="w-8 h-8 text-gray-500" />
                  <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest text-center">
                    {error || "Press the activator to channel Gemini's Aetheric reading."}
                  </p>
                  <button
                    id="trigger-revelation-btn"
                    onClick={channelAethericRevelation}
                    className="flex items-center gap-1.5 px-4 py-2 bg-solar-gold/10 hover:bg-solar-gold/20 border border-solar-gold/40 text-solar-gold rounded text-xs font-mono tracking-widest uppercase transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Channel Revelation
                  </button>
                </div>
              )}

              {/* Force trigger only when lore is Gemini-generated (no authored JSON lore) */}
              {lore && !loadingLore && !pokemon.lore && (
                <div className="flex justify-end mt-4 pt-3 border-t border-white/5">
                  <button
                    id="re-synthesize-btn"
                    onClick={channelAethericRevelation}
                    className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider text-solar-gold/60 hover:text-solar-gold uppercase"
                  >
                    <Sparkles className="w-3 h-3" />
                    Re-Synthesize Epochs
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </motion.div>

      <AnimatePresence>
        {imageZoomOpen && (
          <PokemonImageZoom
            src={pokemon.sprite}
            name={pokemon.name}
            open={imageZoomOpen}
            onClose={() => setImageZoomOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
