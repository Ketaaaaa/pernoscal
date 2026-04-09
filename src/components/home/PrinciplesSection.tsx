"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Cog,
  Layers,
  Award,
  Factory,
  HeartHandshake,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import styles from "./PrinciplesSection.module.css";

const icons = [Cog, Layers, Award, Factory, HeartHandshake];
const keys = ["p1", "p2", "p3", "p4", "p5"] as const;

export function PrinciplesSection() {
  const t = useTranslations("principles");

  return (
    <section className={styles.section} aria-labelledby="principles-title">
      <div className={styles.inner}>
        <SectionTitle
          id="principles-title"
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />
        <ul className={styles.grid}>
          {keys.map((k, i) => {
            const Icon = icons[i];
            return (
              <motion.li
                key={k}
                className={styles.card}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <span className={styles.iconWrap} aria-hidden>
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <h3 className={styles.cardTitle}>{t(`${k}Title`)}</h3>
                <p className={styles.cardBody}>{t(`${k}Body`)}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
