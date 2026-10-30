import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";
import { geist, geistMono } from "@/lib/fonts";
import { site } from "@/lib/site";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: "%s · JustGino" },
    description: t("description"),
    applicationName: site.name,
    authors: [{ name: "Gino Wild", url: site.url }],
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      title: t("title"),
      description: t("description"),
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    formatDetection: { email: false, telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#090d0a" },
  ],
};

const greeting = `console.log("%c~/justgino", "color:#3ddc84;font:600 16px monospace", "\\nNeugierig? Der Code liegt auf GitHub: https://github.com/JustGinoo/justgino.de");`;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("a11y");

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-accent-ink"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider messages={{}}>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
        <script dangerouslySetInnerHTML={{ __html: greeting }} />
      </body>
    </html>
  );
}
