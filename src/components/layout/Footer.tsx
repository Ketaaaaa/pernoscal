import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  COMPANY_EMAIL,
  COMPANY_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/constants";
import styles from "./Footer.module.css";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tp = await getTranslations("products");
  const ts = await getTranslations("servicesPage");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <Image
            src="/images/logo/Pernoscal Logo black 2.png"
            alt="Pernoscal"
            width={180}
            height={45}
            style={{ objectFit: 'contain' }}
            priority
          />
          <p className={styles.tagline}>{t("tagline")}</p>
          <div className={styles.contactList}>
            <a href={`mailto:${COMPANY_EMAIL}`} className={styles.contactLink}>
              <strong>{t("email")}:</strong> {COMPANY_EMAIL}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              <strong>{t("phone")}:</strong> <span dir="ltr">{COMPANY_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("productsLabel")}</h3>
          <nav className={styles.links} aria-label="Products">
            <Link href="/products#presses">{tp("fourColumn.title")}</Link>
            <Link href="/products#recycling">{tp("recycling.title")}</Link>
            <Link href="/products#cylinders">{tp("cylinders.title")}</Link>
          </nav>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("servicesLabel")}</h3>
          <nav className={styles.links} aria-label="Services">
            <Link href="/services#maintenance">{ts("maintenanceTitle")}</Link>
            <Link href="/services#design">{ts("designTitle")}</Link>
            <Link href="/services#consulting">{ts("consultTitle")}</Link>
            <Link href="/services#support">{ts("supportTitle")}</Link>
          </nav>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("linksLabel")}</h3>
          <nav className={styles.links} aria-label="Company">
            <Link href="/">{tn("home")}</Link>
            <Link href="/about">{tn("about")}</Link>
            <Link href="/projects">{tn("projects")}</Link>
            <Link href="/contact">{tn("contact")}</Link>
          </nav>
        </div>
      </div>
      <div className={styles.bottom}>{t("rights", { year })}</div>
    </footer>
  );
}
