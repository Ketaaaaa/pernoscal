"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";

const faqIds = [
  "calculation",
  "models",
  "accuracy",
  "materials",
  "delivery",
  "warranty",
  "installation",
  "customization",
  "safety",
  "oil",
  "support",
  "automation"
] as const;

export function FAQ() {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{t("label")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.faqList}>
          {faqIds.map((id) => (
            <div 
              key={id} 
              className={`${styles.faqItem} ${openId === id ? styles.active : ""}`}
            >
              <button 
                className={styles.questionBtn} 
                onClick={() => toggle(id)}
                aria-expanded={openId === id}
              >
                <span className={styles.questionText}>{t(`items.${id}.question`)}</span>
                <ChevronDown 
                  className={styles.icon} 
                  style={{ transform: openId === id ? "rotate(180deg)" : "rotate(0deg)" }} 
                />
              </button>
              
              <AnimatePresence>
                {openId === id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={styles.answerWrapper}
                  >
                    <div 
                      className={styles.answerContent}
                      dangerouslySetInnerHTML={{ __html: t.raw(`items.${id}.answer`) }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
