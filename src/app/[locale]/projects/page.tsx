import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  completedProjectIds,
  developmentProjectIds,
} from "@/data/projects";
import styles from "./page.module.css";

function projectKey(id: (typeof completedProjectIds)[number]) {
  return id === "psg-rec-35" ? "psgRec35" : "psgSro";
}

function devKey(id: (typeof developmentProjectIds)[number]) {
  return id === "psg-hp4c" ? "psgHp4c" : "psgRec3";
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta.projects" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("projectsPage");
  const tp = await getTranslations("projects");
  const tc = await getTranslations("common");

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{t("title")}</h1>
        <p className={styles.intro}>{t("intro")}</p>

        <h2 className={styles.h2}>{t("completedTitle")}</h2>
        <ul className={styles.list}>
          {completedProjectIds.map((id) => {
            const k = projectKey(id);
            return (
              <li key={id} className={styles.card}>
                <span className={styles.badge}>{tc("completed")}</span>
                <p className={styles.code}>{tp(`${k}.code`)}</p>
                <h3 className={styles.cardTitle}>{tp(`${k}.title`)}</h3>
                <p className={styles.meta}>{tp(`${k}.client`)}</p>
                <p className={styles.block}>
                  <strong>{t("problem")} — </strong>
                  {tp(`${k}.problem`)}
                </p>
                <p className={styles.block}>
                  <strong>{t("approach")} — </strong>
                  {tp(`${k}.solution`)}
                </p>
              </li>
            );
          })}
        </ul>

        <h2 className={styles.h2}>{t("developmentTitle")}</h2>
        <ul className={styles.list}>
          {developmentProjectIds.map((id) => {
            const k = devKey(id);
            return (
              <li key={id} className={styles.card}>
                <span className={styles.badgeDev}>{tc("inDevelopment")}</span>
                <p className={styles.code}>{tp(`${k}.code`)}</p>
                <h3 className={styles.cardTitle}>{tp(`${k}.title`)}</h3>
                <p className={styles.meta}>{tp(`${k}.client`)}</p>
                <p className={styles.block}>
                  <strong>{t("requirements")} — </strong>
                  {tp(`${k}.problem`)}
                </p>
                <p className={styles.block}>
                  <strong>{t("status")} — </strong>
                  {tp(`${k}.solution`)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
