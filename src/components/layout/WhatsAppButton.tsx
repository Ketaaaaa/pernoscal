"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import styles from "./WhatsAppButton.module.css";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
      aria-label={t("label")}
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
