"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className={styles.wrap} role="group" aria-label="Language">
      <button
        type="button"
        className={locale === "ar" ? styles.active : ""}
        onClick={() => router.replace(pathname, { locale: "ar" })}
      >
        عربي
      </button>
      <button
        type="button"
        className={locale === "en" ? styles.active : ""}
        onClick={() => router.replace(pathname, { locale: "en" })}
      >
        EN
      </button>
    </div>
  );
}
