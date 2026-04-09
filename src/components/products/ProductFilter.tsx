"use client";

import { useTranslations } from "next-intl";
import type { ProductCategory } from "@/data/productMeta";
import styles from "./ProductFilter.module.css";

type Props = {
  value: ProductCategory;
  onChange: (v: ProductCategory) => void;
};

const keys: { id: ProductCategory; labelKey: string }[] = [
  { id: "all", labelKey: "filterAll" },
  { id: "presses", labelKey: "filterPresses" },
  { id: "recycling", labelKey: "filterRecycling" },
  { id: "cylinders", labelKey: "filterCylinders" },
];

export function ProductFilter({ value, onChange }: Props) {
  const t = useTranslations("productsPage");

  return (
    <div className={styles.wrap} role="tablist" aria-label={t("title")}>
      {keys.map(({ id, labelKey }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          className={value === id ? styles.active : styles.tab}
          onClick={() => onChange(id)}
        >
          {t(labelKey)}
        </button>
      ))}
    </div>
  );
}
