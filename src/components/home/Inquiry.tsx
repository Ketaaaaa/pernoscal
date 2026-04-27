"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./Inquiry.module.css";
import { motion } from "framer-motion";

export const Inquiry = () => {
  const t = useTranslations("inquiry");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section className={styles.section} id="inquiry">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{t("label")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.formWrapper}>
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.successMessage}
            >
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>{t("successTitle")}</h3>
              <p>{t("successDesc")}</p>
              <button onClick={() => setStatus("idle")} className={styles.backBtn}>
                {t("backBtn")}
              </button>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <div className={styles.fieldGroup}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder={t("placeholders.name")} 
                    required 
                    className={styles.input}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder={t("placeholders.email")} 
                    required 
                    className={styles.input}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder={t("placeholders.company")} 
                    className={styles.input}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <input 
                    type="tel" 
                    name="whatsapp" 
                    placeholder={t("placeholders.whatsapp")} 
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                  <textarea 
                    name="message" 
                    placeholder={t("placeholders.message")} 
                    rows={5} 
                    required 
                    className={styles.textarea}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className={styles.loader}></span>
                ) : (
                  <>
                    <span>{t("submitBtn")}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
