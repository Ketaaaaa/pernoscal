"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import styles from "./CTASection.module.css";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <h2 id="cta-title" className={styles.title}>
          {t("title")}
        </h2>
        <p className={styles.sub}>{t("subtitle")}</p>
        <Button href="/contact" variant="primary">
          {t("button")}
        </Button>
      </motion.div>
    </section>
  );
}
