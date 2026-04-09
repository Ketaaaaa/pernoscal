"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { completedProjectIds } from "@/data/projects";
import styles from "./ProjectsShowcase.module.css";

export function ProjectsShowcase() {
  const t = useTranslations("projectsTeaser");
  const tp = useTranslations("projects");
  const tc = useTranslations("common");

  const ids = completedProjectIds;

  return (
    <section className={styles.section} aria-labelledby="projects-showcase-title">
      <div className={styles.head}>
        <SectionTitle
          id="projects-showcase-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <Link href="/projects" className={styles.allLink}>
          {tc("learnMore")}
        </Link>
      </div>
      <div className={styles.scroller}>
        {ids.map((id, i) => {
          const key = id === "psg-rec-35" ? "psgRec35" : "psgSro";
          return (
            <motion.article
              key={id}
              className={styles.card}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <span className={styles.code}>{tp(`${key}.code`)}</span>
              <h3 className={styles.cardTitle}>{tp(`${key}.title`)}</h3>
              <p className={styles.excerpt}>{tp(`${key}.problem`).slice(0, 140)}…</p>
              <Link href="/projects" className={styles.link}>
                {tc("readMore")}
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
