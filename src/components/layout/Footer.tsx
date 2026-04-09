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
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <Image
            src="/images/logo/pernoscal-logo.svg"
            alt=""
            width={160}
            height={36}
          />
          <p className={styles.tagline}>{t("tagline")}</p>
          <div className={styles.contactRow}>
            <span>
              <strong>{t("email")}:</strong>{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </span>
            <span>
              <strong>{t("phone")}:</strong>{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {COMPANY_PHONE_DISPLAY}
              </a>
            </span>
          </div>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/">{tn("home")}</Link>
          <Link href="/about">{tn("about")}</Link>
          <Link href="/products">{tn("products")}</Link>
          <Link href="/projects">{tn("projects")}</Link>
          <Link href="/services">{tn("services")}</Link>
          <Link href="/contact">{tn("contact")}</Link>
        </nav>
      </div>
      <div className={styles.bottom}>{t("rights", { year })}</div>
    </footer>
  );
}
