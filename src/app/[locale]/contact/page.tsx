import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { COMPANY_EMAIL, COMPANY_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("contactPage");

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.h1}>{t("title")}</h1>
          <p className={styles.intro}>{t("subtitle")}</p>
          <div className={styles.card}>
            <h2 className={styles.h2}>{t("infoTitle")}</h2>
            <p>
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </p>
            <p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {COMPANY_PHONE_DISPLAY}
              </a>
            </p>
            <p className={styles.muted}>
              <strong>{t("addressLabel")}:</strong> {t("address")}
            </p>
            <p className={styles.muted}>{t("hours")}</p>
            <p className={styles.mapNote}>{t("mapPlaceholder")}</p>
          </div>
        </div>
        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
