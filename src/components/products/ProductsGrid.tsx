"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { productSlugs } from "@/data/products";
import {
  productCategoryMap,
  type ProductCategory,
} from "@/data/productMeta";
import { ProductFilter } from "./ProductFilter";
import { ProductCard } from "./ProductCard";
import styles from "./ProductsGrid.module.css";

export function ProductsGrid() {
  const [filter, setFilter] = useState<ProductCategory>("all");
  const t = useTranslations("homeProducts");

  const slugs = useMemo(() => {
    if (filter === "all") return productSlugs;
    return productSlugs.filter((s) => productCategoryMap[s] === filter);
  }, [filter]);

  return (
    <>
      <ProductFilter value={filter} onChange={setFilter} />
      <div className={styles.grid}>
        {slugs.map((slug) => {
          return (
            <ProductCard
              key={slug}
              slug={slug}
              title={t(`${slug}.title`)}
              short={t(`${slug}.tagline`)}
              category={t(`${slug}.badge`)}
            />
          );
        })}
      </div>
    </>
  );
}
