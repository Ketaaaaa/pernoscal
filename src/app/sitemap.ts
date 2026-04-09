import type { MetadataRoute } from "next";
import { productSlugs } from "@/data/products";
import { routing } from "@/i18n/routing";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://pernoscal.com";

const staticPaths = [
  "",
  "/about",
  "/products",
  "/projects",
  "/services",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${base}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${p}`]),
          ),
        },
      });
    }

    for (const slug of productSlugs) {
      const path = `/products/${slug}`;
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
