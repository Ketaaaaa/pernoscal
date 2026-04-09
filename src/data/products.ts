export type ProductSlug =
  | "four-column-press"
  | "recycling-press"
  | "hydraulic-cylinders";

export const productSlugs: ProductSlug[] = [
  "four-column-press",
  "recycling-press",
  "hydraulic-cylinders",
];

export const productCatalogue: Partial<Record<ProductSlug, string>> = {
  "four-column-press": "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  "recycling-press": "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  "hydraulic-cylinders": "/catalogues/Pernoscal-Hydrualic-Cylinders-Catalogue.pdf",
};
