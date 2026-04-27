"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductSlug } from "@/data/products";
import styles from "./ProductsTeaser.module.css";

export function ProductsTeaser() {
  const t = useTranslations("productsTeaser");
  const th = useTranslations("homeProducts");

  const items: ProductSlug[] = ["pillarPress", "metalRecycling", "cylinders"];

  return (
    <section className={styles.section} aria-labelledby="products-teaser-title">
      <div className={styles.inner}>
        <SectionTitle
          id="products-teaser-title"
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />
        <div className={styles.grid}>
          {items.map((slug, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <ProductCard
                slug={slug}
                title={th(`${slug}.title`)}
                short={th(`${slug}.tagline`)}
                category={th(`${slug}.badge`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
