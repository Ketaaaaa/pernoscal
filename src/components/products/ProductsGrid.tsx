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

const slugToNs = {
  "four-column-press": "fourColumn",
  "recycling-press": "recycling",
  "hydraulic-cylinders": "cylinders",
} as const;

export function ProductsGrid() {
  const [filter, setFilter] = useState<ProductCategory>("all");
  const tp = useTranslations("products");

  const slugs = useMemo(() => {
    if (filter === "all") return productSlugs;
    return productSlugs.filter((s) => productCategoryMap[s] === filter);
  }, [filter]);

  return (
    <>
      <ProductFilter value={filter} onChange={setFilter} />
      <div className={styles.grid}>
        {slugs.map((slug) => {
          const ns = slugToNs[slug];
          return (
            <ProductCard
              key={slug}
              slug={slug}
              title={tp(`${ns}.title`)}
              short={tp(`${ns}.short`)}
              category={tp(`${ns}.category`)}
            />
          );
        })}
      </div>
    </>
  );
}
