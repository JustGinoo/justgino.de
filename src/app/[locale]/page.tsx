import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";
import { WildMine } from "@/components/wildmine";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates("/", locale) };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Hero locale={locale} />
      <Services locale={locale} />
      <About locale={locale} />
      <Skills locale={locale} />
      <WildMine locale={locale} />
      <Timeline locale={locale} />
      <Contact />
    </>
  );
}
