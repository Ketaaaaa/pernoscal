"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProductSlug } from "@/data/products";
import styles from "./ProductCard.module.css";

type Props = {
  slug: ProductSlug;
  title: string;
  short: string;
  category: string;
};

export function ProductCard({ slug, title, short, category }: Props) {
  const tc = useTranslations("common");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 260, damping: 24 });
  const ry = useSpring(my, { stiffness: 260, damping: 24 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const href = `/products/${slug}` as const;

  return (
    <motion.article
      className={styles.card}
      style={{ transform }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        const py = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        mx.set(-px * 6);
        my.set(py * 8);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className={styles.glow} aria-hidden />
      <span className={styles.cat}>{category}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.short}>{short}</p>
      <Link href={href} className={styles.link}>
        {tc("learnMore")}
      </Link>
    </motion.article>
  );
}
