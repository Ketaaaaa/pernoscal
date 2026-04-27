import type { ProductSlug } from "./products";

export type ProductCategory = "all" | "presses" | "recycling" | "hydraulics";

export const productCategoryMap: Record<ProductSlug, Exclude<ProductCategory, "all">> = {
  pillarPress: "presses",
  deepDrawing: "presses",
  thermalPress: "presses",
  verticalRecycling: "recycling",
  horizontalRecycling: "recycling",
  metalRecycling: "recycling",
  cylinders: "hydraulics",
  pistonRods: "hydraulics",
  honedTubes: "hydraulics",
  sealingSystems: "hydraulics",
};
