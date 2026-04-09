import styles from "./SectionTitle.module.css";

type Props = {
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  id?: string;
};

export function SectionTitle({
  title,
  subtitle,
  align = "start",
  id,
}: Props) {
  return (
    <header className={`${styles.wrap} ${styles[align]}`}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
