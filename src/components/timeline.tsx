import { getTranslations } from "next-intl/server";
import { timeline } from "@/data/timeline";
import type { Locale } from "@/i18n/routing";
import { sections } from "@/lib/site";
import { Window } from "./window";

export async function Timeline({ locale }: { locale: Locale }) {
  const t = await getTranslations("log");

  return (
    <section
      id={sections.log}
      aria-labelledby={`${sections.log}-title`}
      className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20"
    >
      <h2 id={`${sections.log}-title`} className="mb-4 font-mono text-sm">
        <span className="text-faint">{t("eyebrow")} </span>
        <span className="text-accent">$ {t("title")}</span>
      </h2>
      <Window file={t("file")}>
        <ol className="divide-y divide-line font-mono text-[13px]">
          {timeline.map((commit) => (
            <li key={commit.hash} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3">
              <span className="text-str">{commit.hash}</span>
              <span className="w-20 shrink-0 text-faint">{commit.date[locale]}</span>
              <span className="min-w-0 flex-1 font-sans text-sm text-fg">
                {commit.title[locale]}
                {commit.head && <span className="ml-2 font-mono text-xs text-key">(HEAD)</span>}
              </span>
            </li>
          ))}
        </ol>
      </Window>
    </section>
  );
}
