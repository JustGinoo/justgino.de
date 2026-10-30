import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = "/" | "/impressum" | "/datenschutz";
