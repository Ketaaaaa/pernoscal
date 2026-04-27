import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Check, Download, Send } from "lucide-react";
import { productCatalogue, productSlugs, type ProductSlug } from "@/data/products";
import { Inquiry } from "@/components/home/Inquiry";
import styles from "./page.module.css";

// Image mapping to match ProductRows
const productImages: Record<string, string> = {
  pillarPress: "/images/products/pillar-press.png",
  deepDrawing: "/images/products/deep-drawing.png",
  thermalPress: "/images/products/thermal-press.png",
  verticalRecycling: "/images/products/vertical-recycling.png",
  horizontalRecycling: "/images/products/recycling.png",
  metalRecycling: "/images/products/metal-recycling.png",
  cylinders: "/images/products/cylinders.png",
  pistonRods: "/images/products/piston-rods.png",
  honedTubes: "/images/products/honed-tubes.png",
  sealingSystems: "/images/products/sealing-systems.png",
};

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!productSlugs.includes(slug as ProductSlug)) return {};
  
  const t = await getTranslations({ locale, namespace: "homeProducts" });
  const tm = await getTranslations({ locale, namespace: "meta.productDetail" });
  const title = t(`${slug}.title`);
  
  return {
    title: tm("title", { product: title }),
    description: tm("description", { product: title }),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  if (!productSlugs.includes(slug as ProductSlug)) notFound();
  
  setRequestLocale(locale);
  const s = slug as ProductSlug;
  const t = await getTranslations("homeProducts");
  const tc = await getTranslations("common");
  const catalogue = productCatalogue[s];

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <Link href="/products" className={styles.backBtn}>
            <ArrowLeft size={18} />
            {tc("backToProducts")}
          </Link>

          <div className={styles.mainGrid}>
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                <Image
                  src={productImages[s]}
                  alt={t(`${s}.title`)}
                  fill
                  className={styles.image}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className={styles.contentSection}>
              <span className={styles.badge}>{t(`${s}.badge`)}</span>
              <h1 className={styles.title}>{t(`${s}.title`)}</h1>
              <p className={styles.tagline}>{t(`${s}.tagline`)}</p>
              <p className={styles.description}>{t(`${s}.description`)}</p>

              <div className={styles.featureGrid}>
                {[1, 2, 3, 4].map((f) => (
                  <div key={f} className={styles.featureItem}>
                    <Check className={styles.featureIcon} size={20} />
                    <span className={styles.featureText}>{t(`${s}.f${f}`)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                <a href="#inquiry" className={styles.btnPrimary}>
                  <Send size={18} style={{ marginInlineEnd: '0.5rem' }} />
                  {t("quote")}
                </a>
                {catalogue && (
                  <a href={catalogue} target="_blank" rel="noopener noreferrer" className={styles.btnOutline}>
                    <Download size={18} style={{ marginInlineEnd: '0.5rem' }} />
                    {tc("downloadCatalogue")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.specsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Technical Specifications</h2>
          <div className={styles.specsTableWrapper}>
            <table className={styles.specsTable}>
              <tbody>
                <tr>
                  <td className={styles.specLabel}>Series Code</td>
                  <td className={styles.specValue}>PSG-{s.substring(0, 3).toUpperCase()}</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Operation Mode</td>
                  <td className={styles.specValue}>Hydraulic / Fully Automated</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Country of Origin</td>
                  <td className={styles.specValue}>Egypt (Pernoscal Engineering)</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Warranty</td>
                  <td className={styles.specValue}>3 Years (Full Coverage)</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Safety Standards</td>
                  <td className={styles.specValue}>ISO 9001:2015 Compliant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="inquiry" className={styles.inquirySection}>
        <Inquiry />
      </section>
    </main>
  );
}
