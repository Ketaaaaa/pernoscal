import { getTranslations } from "next-intl/server";

const SAME_AS = ["https://wa.me/201208830492", "mailto:Info@pernoscal.com"];

export async function JsonLdOrganization({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "jsonLd" });
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://pernoscal.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pernoscal",
    alternateName:
      locale === "ar"
        ? "شركة برنوسكال للأنظمة الهيدروليك الصناعية"
        : "Pernoscal Industrial Hydraulic Systems",
    url: `${base}/${locale}`,
    logo: `${base}/images/logo/All%20Pernoscal%20Logo_page-0005.jpg`,
    description: t("orgDescription"),
    email: "Info@pernoscal.com",
    telephone: "+20-12-08830492",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    areaServed: ["EG", "SD", "SA", "AE", "Middle East", "Africa"],
    sameAs: SAME_AS,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
