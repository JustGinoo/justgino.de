import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";

export function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.brand,
    url: site.url,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role[locale],
    description: profile.tagline[locale],
    sameAs: socials.map((s) => s.url),
    knowsLanguage: ["de", "en"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
