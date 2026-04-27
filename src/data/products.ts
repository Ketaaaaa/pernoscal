export type ProductSlug =
  | "pillarPress"
  | "deepDrawing"
  | "thermalPress"
  | "verticalRecycling"
  | "horizontalRecycling"
  | "metalRecycling"
  | "cylinders"
  | "pistonRods"
  | "honedTubes"
  | "sealingSystems";

export const productSlugs: ProductSlug[] = [
  "pillarPress",
  "deepDrawing",
  "thermalPress",
  "verticalRecycling",
  "horizontalRecycling",
  "metalRecycling",
  "cylinders",
  "pistonRods",
  "honedTubes",
  "sealingSystems",
];

export const productCatalogue: Partial<Record<ProductSlug, string>> = {
  pillarPress: "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  deepDrawing: "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  thermalPress: "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  verticalRecycling: "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  horizontalRecycling: "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  metalRecycling: "/catalogues/Pernoscal-Hydrualic-Press-Catalogue.pdf",
  cylinders: "/catalogues/Pernoscal-Hydrualic-Cylinders-Catalogue.pdf",
  pistonRods: "/catalogues/Pernoscal-Hydrualic-Cylinders-Catalogue.pdf",
  honedTubes: "/catalogues/Pernoscal-Hydrualic-Cylinders-Catalogue.pdf",
  sealingSystems: "/catalogues/Pernoscal-Hydrualic-Cylinders-Catalogue.pdf",
};
