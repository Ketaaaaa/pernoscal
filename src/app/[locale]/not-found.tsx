"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tn = useTranslations("nav");

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.text}>{t("body")}</p>
      <Link href="/" className={styles.link}>
        {tn("home")}
      </Link>
    </div>
  );
}
