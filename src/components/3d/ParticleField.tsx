"use client";

import { useEffect, useRef } from "react";
import styles from "./ParticleField.module.css";

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const w = p.clientWidth;
      const h = p.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.8,
      s: 0.08 + Math.random() * 0.18,
      o: 0.12 + Math.random() * 0.35,
    }));

    const draw = (t: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const dx = p.x * w;
        const dy = (p.y * h + t * p.s * 0.02) % (h + 20) - 10;
        ctx.beginPath();
        ctx.arc(dx, dy, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 87, 216, ${p.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden />;
}
