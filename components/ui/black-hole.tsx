"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; phase: number; speed: number };
type DiskParticle = {
  r: number;
  theta: number;
  speed: number;
  size: number;
  color: [number, number, number];
  alpha: number;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Disk color ramp: white-hot near the horizon, cooling to deep orange/red at the outer edge.
function diskColor(frac: number): [number, number, number] {
  const stops: [number, number, number][] = [
    [255, 246, 214], // near horizon — white/gold
    [255, 191, 120], // amber
    [255, 122, 61], // orange
    [201, 58, 42], // outer edge — deep red
  ];
  const t = Math.min(0.999, Math.max(0, frac)) * (stops.length - 1);
  const i = Math.floor(t);
  const f = t - i;
  const a = stops[i];
  const b = stops[Math.min(i + 1, stops.length - 1)];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

export type BlackHoleProps = {
  className?: string;
};

/**
 * An animated black hole with a Kepler-orbiting accretion disk, a photon-ring
 * glow, and a twinkling starfield — rendered on a single canvas, no
 * dependencies. Freezes to a single frame under prefers-reduced-motion.
 */
export function BlackHole({ className }: BlackHoleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const wrap = canvas.parentElement;
    if (!wrap) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0,
      H = 0,
      cx = 0,
      cy = 0,
      horizonR = 0,
      diskOuterR = 0,
      squash = 0.34,
      raf = 0;
    let stars: Star[] = [];
    let disk: DiskParticle[] = [];
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;

    function build() {
      const rect = wrap!.getBoundingClientRect();
      W = rect.width || 800;
      H = rect.height || 300;
      canvas!.width = Math.round(W * DPR);
      canvas!.height = Math.round(H * DPR);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);

      cx = W * 0.5;
      cy = H * 0.54;
      const minDim = Math.min(W, H);
      horizonR = minDim * 0.135;
      diskOuterR = Math.min(W * 0.46, minDim * 0.62);
      squash = 0.34;

      stars = [];
      const starCount = Math.round((W * H) / 3200);
      for (let s = 0; s < starCount; s++) {
        stars.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(0.4, 1.4),
          phase: rand(0, Math.PI * 2),
          speed: rand(0.01, 0.03),
        });
      }

      disk = [];
      const count = Math.round(minDim * 0.9);
      for (let i = 0; i < count; i++) {
        const r = rand(horizonR * 1.18, diskOuterR);
        const frac = (r - horizonR) / (diskOuterR - horizonR);
        disk.push({
          r,
          theta: rand(0, Math.PI * 2),
          speed: 0.55 / Math.pow(r / horizonR, 1.5),
          size: rand(0.6, 1.8) * (1 - frac * 0.4),
          color: diskColor(frac),
          alpha: rand(0.5, 1),
        });
      }
    }

    function drawDiskParticles(list: DiskParticle[]) {
      for (const p of list) {
        const x = cx + Math.cos(p.theta) * p.r;
        const y = cy + Math.sin(p.theta) * p.r * squash;
        const c = p.color;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${p.alpha.toFixed(3)})`;
        ctx!.arc(x, y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function drawFrame(dt: number) {
      // Slight trailing fade instead of a hard clear — gives the disk motion a soft glow trail.
      ctx!.fillStyle = "rgba(2,1,4,0.28)";
      ctx!.fillRect(0, 0, W, H);

      for (const st of stars) {
        const tw = 0.55 + 0.45 * Math.sin(st.phase);
        if (!reduceMotion) st.phase += st.speed;
        ctx!.fillStyle = `rgba(255,255,255,${(tw * 0.8).toFixed(3)})`;
        ctx!.fillRect(st.x, st.y, st.r, st.r);
      }

      const glow = ctx!.createRadialGradient(
        cx,
        cy,
        horizonR * 0.8,
        cx,
        cy,
        diskOuterR * 1.15,
      );
      glow.addColorStop(0, "rgba(255,170,90,0.16)");
      glow.addColorStop(1, "rgba(255,170,90,0)");
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.ellipse(
        cx,
        cy,
        diskOuterR * 1.15,
        diskOuterR * 1.15 * squash * 1.4,
        0,
        0,
        Math.PI * 2,
      );
      ctx!.fill();

      const back: DiskParticle[] = [];
      const front: DiskParticle[] = [];
      for (const p of disk) {
        if (!reduceMotion) p.theta += p.speed * dt;
        (Math.sin(p.theta) < 0 ? back : front).push(p);
      }
      drawDiskParticles(back);

      const ring = ctx!.createRadialGradient(
        cx,
        cy,
        horizonR * 0.7,
        cx,
        cy,
        horizonR * 1.35,
      );
      ring.addColorStop(0, "rgba(0,0,0,0)");
      ring.addColorStop(0.62, "rgba(255,214,150,0.9)");
      ring.addColorStop(0.78, "rgba(255,150,70,0.35)");
      ring.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = ring;
      ctx!.beginPath();
      ctx!.arc(cx, cy, horizonR * 1.35, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.beginPath();
      ctx!.fillStyle = "#000";
      ctx!.arc(cx, cy, horizonR, 0, Math.PI * 2);
      ctx!.fill();

      drawDiskParticles(front);
    }

    function step() {
      drawFrame(1);
      raf = requestAnimationFrame(step);
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (disposed) return;
        cancelAnimationFrame(raf);
        build();
        step();
      }, 200);
    }

    try {
      build();
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      if (reduceMotion) {
        drawFrame(0);
      } else {
        step();
        window.addEventListener("resize", handleResize);
      }
    } catch {
      // Fail quietly — the black background alone still reads as a finished hero.
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}

export default BlackHole;
