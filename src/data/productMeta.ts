import type { ProductSlug } from "./products";

export type ProductCategory = "all" | "presses" | "recycling" | "cylinders";

export const productCategoryMap: Record<ProductSlug, Exclude<ProductCategory, "all">> = {
  "four-column-press": "presses",
  "recycling-press": "recycling",
  "hydraulic-cylinders": "cylinders",
};
