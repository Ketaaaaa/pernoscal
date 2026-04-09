"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/3d/ParticleField";
import styles from "./HeroSection.module.css";

const HERO_GIF = "/images/hero/Injection-Molding-Process-thriam.gif";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.particles}>
        <ParticleField />
      </div>
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.badge}>{t("badge")}</span>
          <h1 id="hero-title" className={styles.title}>
            {t("title")}
          </h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <div className={styles.ctas}>
            <Button href="/products" variant="primary">
              {t("ctaPrimary")}
            </Button>
            <Button href="/contact" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </div>
        </motion.div>
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <div className={styles.mediaWrap}>
            <Image
              src={HERO_GIF}
              alt={t("gifAlt")}
              width={640}
              height={400}
              className={styles.heroGif}
              unoptimized
              priority
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
