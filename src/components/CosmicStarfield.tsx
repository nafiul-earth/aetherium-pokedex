import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function CosmicStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Setup stars
    const stars: Array<{ x: number; y: number; size: number; speed: number; alpha: number; dAlpha: number }> = [];
    const starCount = 120;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random(),
        dAlpha: Math.random() * 0.02 + 0.005
      });
    }

    // Handle resize safely using a ResizeObserver or simple handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Draw Loop
    const draw = () => {
      ctx.fillStyle = "#10131f"; // Void Navy base
      ctx.fillRect(0, 0, width, height);

      // Render cosmic background glows
      const gradient1 = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.3, height * 0.3, width * 0.5);
      gradient1.addColorStop(0, "rgba(220, 184, 255, 0.07)"); // Nebula Purple
      gradient1.addColorStop(1, "rgba(16, 19, 31, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(width * 0.7, height * 0.7, 0, width * 0.7, height * 0.7, width * 0.4);
      gradient2.addColorStop(0, "rgba(0, 228, 238, 0.05)"); // Aether Cyan
      gradient2.addColorStop(1, "rgba(16, 19, 31, 0)");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      const gradient3 = ctx.createRadialGradient(width * 0.5, 0, 0, width * 0.5, 0, width * 0.3);
      gradient3.addColorStop(0, "rgba(242, 202, 80, 0.06)"); // Divine Solar Gold
      gradient3.addColorStop(1, "rgba(16, 19, 31, 0)");
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      ctx.fillStyle = "#e0e1f3";
      for (let i = 0; i < starCount; i++) {
        const s = stars[i];
        s.alpha += s.dAlpha;
        if (s.alpha > 1 || s.alpha < 0) {
          s.dAlpha = -s.dAlpha;
        }
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="cosmic-starfield-container" className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* Sacred Geometry Concentric Rings in the Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-solar-gold/5 rounded-full pointer-events-none animate-orbit-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-aether-cyan/5 rounded-full pointer-events-none animate-orbit-fast" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-nebula-purple/5 rounded-full pointer-events-none animate-orbit-slow" />
      
      {/* Top-Down Divine Highlight */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-solar-gold/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
