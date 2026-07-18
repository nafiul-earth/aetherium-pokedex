import React from "react";
import { ANCIENT_EPOCHS } from "../data/curatedPokemon";
import { Scroll, Sparkles, Compass, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "motion/react";

export default function AncientEpochs() {
  return (
    <div id="ancient-epochs-section" className="space-y-8 py-6 max-w-4xl mx-auto px-4 relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-mono text-xs text-solar-gold tracking-[0.2em] uppercase block">
          Chrono-Spatial Archive
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide uppercase">
          Sacred Ancient Epochs
        </h2>
        <p className="text-sm text-gray-400">
          Behold the core timeline logs of the Universe. This historical scroll catalogs critical coordinate bifurcations and creation myths decoded from deep cosmic relics.
        </p>
      </div>

      {/* Timeline Scroll Stack */}
      <div className="relative border-l border-solar-gold/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 py-4">
        
        {ANCIENT_EPOCHS.map((epoch, index) => {
          return (
            <motion.div
              id={`epoch-node-${epoch.id}`}
              key={epoch.id}
              className="relative group bg-void-light/30 backdrop-blur-xl border border-white/5 hover:border-solar-gold/40 rounded-xl p-5 sm:p-6 transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              {/* Timeline dot / geometric anchor */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-solar-gold bg-void-navy flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                <div className="w-1.5 h-1.5 bg-aether-cyan rounded-full" />
              </div>

              {/* Backing gradient highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-solar-gold/[0.02] to-transparent pointer-events-none" />

              {/* Epoch header */}
              <div className="flex flex-wrap justify-between items-start gap-2 border-b border-white/5 pb-3">
                <div>
                  <span className="font-mono text-[9px] text-solar-gold tracking-widest uppercase block mb-0.5">
                    EPOCH REGISTERED // ERA 0{index + 1}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-solar-gold transition-colors duration-300">
                    {epoch.title}
                  </h3>
                </div>
                
                <div className="text-right">
                  <span className="font-mono text-[10px] text-aether-cyan block font-semibold uppercase">
                    {epoch.era}
                  </span>
                  <span className="font-mono text-[8px] text-gray-500 block uppercase tracking-wider mt-0.5">
                    Chronology Code
                  </span>
                </div>
              </div>

              {/* Lore Description */}
              <p className="text-sm text-gray-300 leading-relaxed font-sans mt-4">
                {epoch.description}
              </p>

              {/* Footer specs */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] font-mono text-gray-400 bg-void-dark/40 py-2 px-3 rounded border border-white/5">
                <span className="text-solar-gold uppercase">Primary Resonance Signatures:</span>
                <span className="text-white uppercase tracking-wider font-semibold">
                  {epoch.resonanceKey}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Callout quote card */}
      <div className="bg-void-light/10 border border-solar-gold/20 p-5 rounded-xl text-center relative max-w-xl mx-auto overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-solar-gold/5 rounded-full blur-3xl pointer-events-none" />
        <Scroll className="w-6 h-6 text-solar-gold mx-auto mb-2" />
        <p className="text-xs text-gray-400 italic leading-relaxed">
          "The cosmos is a tapestry woven from cellular and elemental codes. Those who learn the aetheric frequencies are granted passage to epochs forgotten by linear history."
        </p>
        <span className="block text-[8px] font-mono uppercase tracking-[0.15em] text-solar-gold/50 mt-2">
          — Excerpt from the Ancient Scribes of Spear Pillar
        </span>
      </div>

    </div>
  );
}
