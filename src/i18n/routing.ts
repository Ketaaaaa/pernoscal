import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
  /** Arabic is the site default; do not redirect to `/en` from Accept-Language alone. */
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
