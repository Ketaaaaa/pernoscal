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
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" dir="ltr">
                {COMPANY_PHONE_DISPLAY}
              </a>
            </p>
            <p className={styles.muted}>
              <strong>{t("addressLabel")}:</strong> {t("address")}
            </p>
            <p className={styles.muted}>{t("hours")}</p>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220414.055809102!2d31.7058986!3d30.3233819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f8075f7c0ecadb%3A0xc54596c9cf9f7c82!2s10th%20of%20Ramadan%20City%2C%20Al-Sharqia%20Governorate!5e0!3m2!1sen!2seg!4v1776283373063!5m2!1sen!2seg"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
