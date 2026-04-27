"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Globe, MessageSquare, MapPin, Truck, Award } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const tabs = [
  { id: "warranty", icon: Shield },
  { id: "global", icon: Globe },
  { id: "multilingual", icon: MessageSquare },
  { id: "local", icon: MapPin },
  { id: "delivery", icon: Truck },
  { id: "experience", icon: Award },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  const [activeTab, setActiveTab] = useState<TabId>("warranty");

  return (
    <section className={styles.section} id="why-choose-us">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{t("label")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsNav}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabIcon}>
                  <tab.icon size={24} />
                </span>
                <div className={styles.tabText}>
                  <h4>{t(`tabs.${tab.id}.navTitle`)}</h4>
                  <span>{t(`tabs.${tab.id}.navSubtitle`)}</span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.tabsContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.tabPanel}
              >
                <div className={styles.panelHeaderTop}>
                  <span className={styles.advantageLabel}>
                    {t("advantage")} {tabs.findIndex((t) => t.id === activeTab) + 1}
                  </span>
                  <div className={styles.professionalTag}>
                    <Shield size={16} />
                    {t(`tabs.${activeTab}.tagline`)}
                  </div>
                </div>

                <h2 className={styles.panelTitle}>{t(`tabs.${activeTab}.navTitle`)}</h2>
                <p className={styles.panelQuote}>{t(`tabs.${activeTab}.quote`)}</p>

                <div className={styles.advantageGrid}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={styles.advantageBox}>
                      <h4>{t(`tabs.${activeTab}.features.f${i}.title`)}</h4>
                      <p>{t(`tabs.${activeTab}.features.f${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
