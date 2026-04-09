import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Wrench, PenTool, Lightbulb, Headphones } from "lucide-react";
import styles from "./page.module.css";

const icons = [Wrench, PenTool, Lightbulb, Headphones] as const;
const keys = ["maintenance", "design", "consult", "support"] as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("servicesPage");

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{t("title")}</h1>
        <p className={styles.intro}>{t("intro")}</p>
        <ul className={styles.grid}>
          {keys.map((k, i) => {
            const Icon = icons[i];
            return (
              <li key={k} className={styles.card}>
                <span className={styles.icon} aria-hidden>
                  <Icon size={28} strokeWidth={1.65} />
                </span>
                <h2 className={styles.cardTitle}>{t(`${k}Title`)}</h2>
                <p className={styles.cardBody}>{t(`${k}Body`)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
