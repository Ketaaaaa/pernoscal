import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("aboutPage");

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{t("title")}</h1>
        <p className={styles.lead}>{t("intro")}</p>
        <p>{t("body1")}</p>
        <p>{t("body2")}</p>
        <p>{t("body3")}</p>
      </div>
    </article>
  );
}
