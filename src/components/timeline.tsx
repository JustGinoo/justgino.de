import { getTranslations } from "next-intl/server";
import { timeline } from "@/data/timeline";
import type { Locale } from "@/i18n/routing";
import { sections } from "@/lib/site";
import { Section } from "./section";

export async function Timeline({ locale }: { locale: Locale }) {
  const t = await getTranslations("log");

  return (
    <Section id={sections.log} index={5} eyebrow={t("eyebrow")} title={t("title")}>
      <ol className="relative max-w-3xl border-l-2 border-line-strong">
        {timeline.map((commit) => (
          <li key={commit.hash} className="relative pb-10 pl-8 last:pb-0">
            <span
              className={`absolute top-1.5 -left-[7px] size-3 ${commit.head ? "bg-accent" : "bg-line-strong"}`}
              aria-hidden="true"
            />
            <p className="font-mono text-sm">
              <span className="text-str">{commit.hash}</span>
              {commit.head && <span className="text-key"> (HEAD -&gt; main)</span>}
              <span className="text-faint"> · {commit.date[locale]}</span>
            </p>
            <h3 className="mt-1.5 text-lg font-semibold">{commit.title[locale]}</h3>
            <p className="mt-1 text-muted">{commit.text[locale]}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
