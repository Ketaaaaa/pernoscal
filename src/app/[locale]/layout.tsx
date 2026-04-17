import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Cairo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLdOrganization } from "@/components/seo/JsonLdOrganization";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://pernoscal.com";

  return {
    metadataBase: new URL(base),
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon-light.ico", sizes: "any", media: "(prefers-color-scheme: light)" },
        { url: "/favicon-dark.ico", sizes: "any", media: "(prefers-color-scheme: dark)" },
        { url: "/favicon.ico", sizes: "any" },
      ],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: `${base}/ar`,
        en: `${base}/en`,
        "x-default": `${base}/ar`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      siteName: "Pernoscal",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Script
        id="theme-init"
        strategy="beforeInteractive"
      >{`(() => {
  try {
    const key = "theme";
    const saved = localStorage.getItem(key);
    const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = (saved === "light" || saved === "dark") ? saved : (systemDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`}</Script>
      <body className={`${cairo.variable} ${inter.variable}`} dir={locale === "ar" ? "rtl" : "ltr"}>
        <JsonLdOrganization locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
