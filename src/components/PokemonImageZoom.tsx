import React, { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { motion } from "motion/react";

interface PokemonImageZoomProps {
  src: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.35;

export default function PokemonImageZoom({ src, name, open, onClose }: PokemonImageZoomProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!open) return;
    setZoom(1.25);
    setOffset({ x: 0, y: 0 });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
      if (e.key === "-") setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
      if (e.key === "0") {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((z) => clampZoom(z + delta));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    dragging.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <motion.div
      id="pokemon-image-zoom-overlay"
      className="fixed inset-0 z-[60] bg-void-dark/92 backdrop-blur-md flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="font-mono text-[9px] text-solar-gold tracking-widest uppercase block">
            Optical Magnification Array
          </span>
          <span className="font-serif text-lg text-white uppercase tracking-wide">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="zoom-out-btn"
            type="button"
            onClick={() => setZoom((z) => clampZoom(z - ZOOM_STEP))}
            className="p-2 rounded border border-white/10 hover:border-solar-gold/50 text-gray-300 hover:text-solar-gold bg-white/5"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-aether-cyan w-14 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            id="zoom-in-btn"
            type="button"
            onClick={() => setZoom((z) => clampZoom(z + ZOOM_STEP))}
            className="p-2 rounded border border-white/10 hover:border-solar-gold/50 text-gray-300 hover:text-solar-gold bg-white/5"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="zoom-reset-btn"
            type="button"
            onClick={() => {
              setZoom(1);
              setOffset({ x: 0, y: 0 });
            }}
            className="px-2.5 py-2 rounded border border-white/10 hover:border-solar-gold/50 text-[10px] font-mono uppercase tracking-wider text-gray-300 hover:text-solar-gold bg-white/5"
          >
            Reset
          </button>
          <button
            id="close-zoom-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded border border-white/10 hover:border-solar-gold/50 text-gray-300 hover:text-white bg-white/5"
            aria-label="Close zoom"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className={`flex-1 relative overflow-hidden flex items-center justify-center ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => {
          if (zoom > 1) {
            setZoom(1);
            setOffset({ x: 0, y: 0 });
          } else {
            setZoom(2.2);
          }
        }}
      >
        <motion.img
          id="zoomed-pokemon-img"
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          className="max-w-[min(90vw,720px)] max-h-[75vh] object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transition: dragging.current ? "none" : "transform 0.15s ease-out",
          }}
          draggable={false}
        />
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-gray-500 tracking-widest uppercase pointer-events-none">
          Scroll to zoom · Drag to pan · Double-click toggle · Esc close
        </p>
      </div>
    </motion.div>
  );
}

/** Compact control to open the zoom overlay from detail view. */
export function ZoomTriggerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      id="open-image-zoom-btn"
      type="button"
      onClick={onClick}
      className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-void-dark/85 border border-aether-cyan/40 hover:border-aether-cyan hover:bg-void-dark transition-all rounded text-[10px] font-mono tracking-widest text-aether-cyan uppercase z-30"
      aria-label="Zoom image"
    >
      <Maximize2 className="w-3 h-3" />
      Zoom
    </button>
  );
}
