import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sections } from "@/lib/site";
import { LanguageSwitch } from "./language-switch";

const tabs = ["services", "about", "skills", "wildmine", "log", "contact"] as const;

export async function SiteHeader() {
  const t = await getTranslations();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>justgino
          <span className="cursor" aria-hidden="true" />
        </Link>
        <LanguageSwitch label={t("locale.label")} names={{ de: t("locale.de"), en: t("locale.en") }} />
      </div>
      <nav aria-label={t("nav.label")} className="border-t border-line">
        <ul className="mx-auto flex max-w-6xl overflow-x-auto px-5 font-mono text-xs [scrollbar-width:none] sm:px-8">
          {tabs.map((tab) => (
            <li key={tab} className="shrink-0">
              <Link
                href={{ pathname: "/", hash: sections[tab] }}
                className="block border-r border-line px-4 py-2.5 text-muted transition-colors first:border-l hover:bg-panel hover:text-accent"
              >
                {t(`nav.${tab}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
