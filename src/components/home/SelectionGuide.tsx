import { useTranslations } from "next-intl";
import Image from "next/image";
import { Check, Info, Calculator, Play } from "lucide-react";
import styles from "./SelectionGuide.module.css";

export function SelectionGuide() {
  const t = useTranslations("selectionGuide");

  return (
    <section className={styles.section} id="selection-guide">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{t("label")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.guideGrid}>
          {/* Cylinder Calculation */}
          <div className={styles.guideCard}>
            <h3 className={styles.cardTitle}>{t("calculation.title")}</h3>
            <p className={styles.cardText}>{t("calculation.desc")}</p>
            
            <div className={styles.formulaBox}>
              <h4 className={styles.formulaTitle}>{t("calculation.formulaTitle")}</h4>
              <code className={styles.formulaCode}>D = √(4F / πP)</code>
              <div className={styles.formulaLegend}>
                <div><strong>D</strong> = {t("calculation.legend.d")}</div>
                <div><strong>F</strong> = {t("calculation.legend.f")}</div>
                <div><strong>P</strong> = {t("calculation.legend.p")}</div>
                <div><strong>π</strong> = 3.14159</div>
              </div>
            </div>

            <div className={styles.exampleBox}>
              <h4 className={styles.exampleTitle}>
                <Calculator size={18} />
                {t("calculation.example.title")}
              </h4>
              <p className={styles.exampleText} dangerouslySetInnerHTML={{ __html: t.raw("calculation.example.desc") }} />
            </div>

            <button className={styles.primaryBtn}>
              <Calculator size={18} />
              {t("calculation.btn")}
            </button>
          </div>

          {/* System Pressure */}
          <div className={styles.guideCard}>
            <h3 className={styles.cardTitle}>{t("pressure.title")}</h3>
            <p className={styles.cardText}>{t("pressure.desc")}</p>

            <div className={styles.pressureGrid}>
              {[
                { range: "16-20", label: t("pressure.types.light") },
                { range: "25-31.5", label: t("pressure.types.standard") },
                { range: "31.5-40", label: t("pressure.types.heavy") },
                { range: "40-63", label: t("pressure.types.high") },
              ].map((item, idx) => (
                <div key={idx} className={styles.pressureItem}>
                  <span className={styles.pressureRange}>{item.range}</span>
                  <span className={styles.pressureLabel}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.safetyBox}>
              <h4 className={styles.safetyTitle}>{t("pressure.safety.title")}</h4>
              <p className={styles.safetyText}>{t("pressure.safety.desc")}</p>
            </div>

            <div className={styles.tipBox}>
              <p>
                <Info size={16} />
                <strong>Tip:</strong> {t("pressure.tip")}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className={styles.comparisonSection}>
          <h3 className={styles.comparisonTitle}>{t("comparison.title")}</h3>
          <p className={styles.comparisonSubtitle}>{t("comparison.subtitle")}</p>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t("comparison.table.header.feature")}</th>
                  <th>{t("comparison.table.header.y32")}</th>
                  <th>{t("comparison.table.header.y27")}</th>
                  <th>{t("comparison.table.header.y41")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "structure", "application", "space", "control", "force", "bestFor", "automation", "price"
                ].map((row) => (
                  <tr key={row}>
                    <td className={styles.featureCell}>{t(`comparison.table.rows.${row}.label`)}</td>
                    <td>{t(`comparison.table.rows.${row}.y32`)}</td>
                    <td>{t(`comparison.table.rows.${row}.y27`)}</td>
                    <td>{t(`comparison.table.rows.${row}.y41`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Automation Section */}
        <div className={styles.automationRow}>
          <div className={styles.automationImageContainer}>
            <div className={styles.videoPlaceholder}>
              <Image 
                src="/images/automation-line.png" 
                alt="Automated Production Line" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
              <div className={styles.overlay}>
                <button className={styles.playBtn}>
                  <Play fill="white" size={30} />
                </button>
              </div>
            </div>
            <p className={styles.caption}>{t("automation.caption")}</p>
          </div>

          <div className={styles.automationContent}>
            <h3 className={styles.automationTitle}>{t("automation.title")}</h3>
            <p className={styles.automationDesc}>{t("automation.desc")}</p>
            
            <ul className={styles.automationList}>
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i}>
                  <Check size={18} />
                  {t(`automation.features.f${i}`)}
                </li>
              ))}
            </ul>

            <button className={styles.primaryBtn}>{t("automation.btn")}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
