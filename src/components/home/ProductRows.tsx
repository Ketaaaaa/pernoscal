"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import styles from "./ProductRows.module.css";

const productIds = [
  "pillarPress",
  "deepDrawing",
  "thermalPress",
  "verticalRecycling",
  "horizontalRecycling",
  "metalRecycling",
  "cylinders",
  "pistonRods",
  "honedTubes",
  "sealingSystems"
] as const;

const productImages: Record<string, string> = {
  pillarPress: "/images/products/pillar-press.png",
  deepDrawing: "/images/products/deep-drawing.png",
  thermalPress: "/images/products/thermal-press.png",
  verticalRecycling: "/images/products/vertical-recycling.png",
  horizontalRecycling: "/images/products/recycling.png",
  metalRecycling: "/images/products/metal-recycling.png",
  cylinders: "/images/products/cylinders.png",
  pistonRods: "/images/products/piston-rods.png",
  honedTubes: "/images/products/honed-tubes.png",
  sealingSystems: "/images/products/sealing-systems.png",
};

export function ProductRows() {
  const t = useTranslations("homeProducts");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {productIds.map((id, index) => (
          <div key={id} className={styles.row}>
            <motion.div 
              className={styles.imageContainer}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className={styles.badge}>{t(`${id}.badge`)}</span>
              <Image
                src={productImages[id]}
                alt={t(`${id}.title`)}
                width={600}
                height={450}
                className={styles.image}
                priority={index === 0}
              />
              {id === "pillarPress" && (
                <button type="button" className={styles.videoBtn} aria-label="Play video">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </button>
              )}
            </motion.div>

            <motion.div 
              className={styles.content}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className={styles.title}>{t(`${id}.title`)}</h2>
              <p className={styles.tagline}>{t(`${id}.tagline`)}</p>
              <p className={styles.description}>{t(`${id}.description`)}</p>
              
              <ul className={styles.features}>
                {[1, 2, 3, 4].map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <Check className={styles.featureIcon} />
                    <span>{t(`${id}.f${f}`)}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.buttons}>
                <Link href="/contact" className={styles.btnPrimary}>
                  {t("quote")}
                </Link>
                <Link href={`/products/${id}`} className={styles.btnOutline}>
                  {t("details")}
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
