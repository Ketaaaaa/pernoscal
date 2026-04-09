"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import styles from "./AboutTeaser.module.css";

export function AboutTeaser() {
  const t = useTranslations("aboutTeaser");
  const ts = useTranslations("stats");
  const tc = useTranslations("common");

  return (
    <section className={styles.section} aria-labelledby="about-teaser-title">
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle title={t("title")} id="about-teaser-title" />
          <p className={styles.body}>{t("body")}</p>
          <Button href="/about" variant="ghost">
            {tc("learnMore")}
          </Button>
        </motion.div>
        <div className={styles.stats}>
          <AnimatedCounter value={5} suffix="+" label={ts("years")} />
          <AnimatedCounter value={3} label={ts("lines")} />
          <AnimatedCounter value={5} label={ts("values")} />
          <AnimatedCounter value={2} suffix="+" label={ts("markets")} />
        </div>
      </div>
    </section>
  );
}
