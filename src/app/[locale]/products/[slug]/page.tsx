import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  productCatalogue,
  productSlugs,
  type ProductSlug,
} from "@/data/products";
import styles from "./page.module.css";

const slugToNs: Record<ProductSlug, "fourColumn" | "recycling" | "cylinders"> = {
  "four-column-press": "fourColumn",
  "recycling-press": "recycling",
  "hydraulic-cylinders": "cylinders",
};

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!productSlugs.includes(slug as ProductSlug)) {
    return {};
  }
  const ns = slugToNs[slug as ProductSlug];
  const t = await getTranslations({ locale, namespace: "products" });
  const tm = await getTranslations({ locale, namespace: "meta.productDetail" });
  const title = t(`${ns}.title`);
  return {
    title: tm("title", { product: title }),
    description: tm("description", { product: title }),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  if (!productSlugs.includes(slug as ProductSlug)) {
    notFound();
  }
  setRequestLocale(locale);
  const s = slug as ProductSlug;
  const ns = slugToNs[s];
  const t = await getTranslations("products");
  const tc = await getTranslations("common");

  const cat = productCatalogue[s];

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <Link href="/products" className={styles.back}>
          ← {tc("backToProducts")}
        </Link>
        <p className={styles.cat}>{t(`${ns}.category`)}</p>
        <h1 className={styles.h1}>{t(`${ns}.title`)}</h1>
        <p className={styles.lead}>{t(`${ns}.short`)}</p>
        <div className={styles.visual} aria-hidden>
          <div className={styles.mesh} />
        </div>
        <p className={styles.body}>{t(`${ns}.body`)}</p>
        {cat ? (
          <a
            href={cat}
            className={styles.download}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tc("downloadCatalogue")}
          </a>
        ) : null}
      </div>
    </article>
  );
}
