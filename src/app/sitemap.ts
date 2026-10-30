import type { MetadataRoute } from "next";
import { routing, type AppPathname } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

const pages: { href: AppPathname; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/impressum", priority: 0.2 },
  { href: "/datenschutz", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])) },
    })),
  );
}
