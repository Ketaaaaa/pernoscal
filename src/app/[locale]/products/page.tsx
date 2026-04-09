import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta.products" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("productsPage");

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{t("title")}</h1>
        <p className={styles.intro}>{t("intro")}</p>
        <ProductsGrid />
      </div>
    </div>
  );
}
