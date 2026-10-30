import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { site } from "./site";

export function absoluteUrl(href: AppPathname, locale: Locale) {
  return site.url + getPathname({ href, locale });
}

export function alternates(href: AppPathname, locale: Locale): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(href, locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])),
      "x-default": absoluteUrl(href, routing.defaultLocale),
    },
  };
}
