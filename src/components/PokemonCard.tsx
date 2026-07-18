import React from "react";
import { Pokemon } from "../types";
import { TYPE_GLOWS, getTierForId } from "../data/curatedPokemon";
import { motion } from "motion/react";

interface PokemonCardProps {
  key?: any;
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
  index: number;
}

export default function PokemonCard({ pokemon, onSelect, index }: PokemonCardProps) {
  // Find primary type glow setting
  const primaryType = pokemon.types[0]?.toLowerCase() || "normal";
  const typeStyle = TYPE_GLOWS[primaryType] || TYPE_GLOWS.normal;
  const tierLabel = pokemon.divineTier || getTierForId(pokemon.id);

  return (
    <motion.div
      id={`pokemon-card-${pokemon.id}`}
      onClick={() => onSelect(pokemon)}
      className="relative group cursor-pointer h-[320px] w-full flex flex-col justify-between bg-void-light/30 backdrop-blur-2xl border border-white/5 hover:border-solar-gold/30 rounded-xl p-5 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,228,238,0.15)] overflow-visible"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      {/* Background glow radiating primary type color */}
      <div 
        className="absolute inset-0 rounded-xl transition-all duration-500 opacity-20 group-hover:opacity-45 blur-2xl -z-10"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${typeStyle.glow} 0%, transparent 70%)`
        }}
      />

      {/* Decorative Golden Corner Accents (Ancient Relic theme) */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-solar-gold/20 group-hover:border-solar-gold/70 transition-colors duration-300 rounded-tl" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-solar-gold/20 group-hover:border-solar-gold/70 transition-colors duration-300 rounded-tr" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-solar-gold/20 group-hover:border-solar-gold/70 transition-colors duration-300 rounded-bl" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-solar-gold/20 group-hover:border-solar-gold/70 transition-colors duration-300 rounded-br" />

      {/* Header: ID & Divine Tier with 45-degree angle banner */}
      <div className="flex justify-between items-start w-full relative z-10">
        <div>
          <span className="font-mono text-xs text-solar-gold/60 tracking-widest block uppercase">
            ID // #{String(pokemon.id).padStart(3, "0")}
          </span>
          <span className="font-mono text-[9px] text-aether-cyan tracking-wider block uppercase mt-0.5">
            {tierLabel}
          </span>
        </div>
        
        {/* Sacred Geometry Mini-Diamond Accent */}
        <div className="w-2.5 h-2.5 border border-solar-gold rotate-45 flex items-center justify-center">
          <div className="w-1 h-1 bg-aether-cyan" />
        </div>
      </div>

      {/* Visual Content Section: Image breaks the container, overflowing top */}
      <div className="relative flex justify-center items-center h-40 w-full overflow-visible">
        {/* Concentric rotating radar backing */}
        <div className="absolute w-28 h-28 border border-white/5 rounded-full animate-orbit-slow group-hover:border-aether-cyan/15 transition-colors duration-300" />
        <div className="absolute w-20 h-20 border border-white/5 rounded-full animate-orbit-fast group-hover:border-solar-gold/15 transition-colors duration-300" />
        
        {/* Core Image (Breaks container on hover / shifts scale) */}
        <motion.img
          id={`pokemon-sprite-${pokemon.id}`}
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-32 h-32 object-contain relative z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.15, y: -12 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />
      </div>

      {/* Footer: Name & Type Chips */}
      <div className="w-full relative z-10">
        <h3 className="font-serif text-xl font-semibold text-white tracking-wide uppercase transition-colors duration-300 group-hover:text-solar-gold mb-2">
          {pokemon.name}
        </h3>
        
        <div className="flex flex-wrap gap-1.5">
          {pokemon.types.map((type) => {
            const glowStyle = TYPE_GLOWS[type.toLowerCase()] || TYPE_GLOWS.normal;
            return (
              <span
                id={`badge-${pokemon.id}-${type}`}
                key={type}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border font-medium transition-all duration-300"
                style={{
                  backgroundColor: glowStyle.bg,
                  borderColor: glowStyle.border,
                  color: glowStyle.text,
                  boxShadow: `0 0 8px ${glowStyle.glow}`
                }}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
