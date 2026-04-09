"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedCounter.module.css";

type Props = {
  value: number;
  suffix?: string;
  label: string;
};

export function AnimatedCounter({ value, suffix = "", label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-32px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1100;
    let frame: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * p);
      setN(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className={styles.cell}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
    >
      <span className={styles.value}>
        {n}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </motion.div>
  );
}
