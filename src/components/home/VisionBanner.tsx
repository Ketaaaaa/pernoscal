"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./VisionBanner.module.css";

export function VisionBanner() {
  const t = useTranslations("vision");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={styles.wrap}>
      <motion.div className={styles.bg} style={{ y }} aria-hidden />
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.banner}>{t("banner")}</p>
        <p className={styles.body}>{t("body")}</p>
      </motion.div>
    </div>
  );
}
