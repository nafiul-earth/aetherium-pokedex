import React from "react";
import { Compass, Orbit, Scan, Scroll } from "lucide-react";
import { motion } from "motion/react";

interface OrbitMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function OrbitMenu({ activeTab, setActiveTab }: OrbitMenuProps) {
  const menuItems = [
    { id: "core", label: "Aether Core", icon: Compass, color: "text-solar-gold" },
    { id: "synthesizer", label: "Synthesizer", icon: Orbit, color: "text-nebula-purple" },
    { id: "transmitter", label: "Transmitter", icon: Scan, color: "text-aether-cyan" },
    { id: "lore", label: "Ancient Lore", icon: Scroll, color: "text-solar-gold" }
  ];

  return (
    <div id="orbit-menu-container" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto">
      {/* Curved glass dock */}
      <motion.div 
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-void-dark/80 backdrop-blur-2xl border border-solar-gold/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              id={`orbit-menu-btn-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative group p-3 sm:p-4 rounded-full transition-all duration-300 flex flex-col items-center justify-center focus:outline-none"
              title={item.label}
            >
              {/* Active backing glow */}
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-white/5 rounded-full border border-solar-gold/40 shadow-[0_0_15px_rgba(242,202,80,0.25)]"
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                />
              )}

              {/* Hover backing glow */}
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 border border-transparent group-hover:border-white/10 transition-all duration-300" />

              {/* Icon */}
              <Icon 
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 relative z-10 ${
                  isActive 
                    ? "text-solar-gold scale-110 drop-shadow-[0_0_8px_rgba(242,202,80,0.6)]" 
                    : "text-gray-400 group-hover:text-white"
                }`}
              />

              {/* Floating label */}
              <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-void-dark border border-solar-gold/20 text-[10px] font-mono tracking-widest text-solar-gold uppercase px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
