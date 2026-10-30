import { getTranslations } from "next-intl/server";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/routing";
import { sections } from "@/lib/site";
import { Section } from "./section";
import { Window } from "./window";

function JsonValue({ value }: { value: string | readonly string[] }) {
  if (typeof value === "string") return <span className="text-str">&quot;{value}&quot;</span>;
  return (
    <>
      <span className="text-faint">[</span>
      {value.map((item, i) => (
        <span key={item}>
          <span className="text-str">&quot;{item}&quot;</span>
          {i < value.length - 1 && <span className="text-faint">, </span>}
        </span>
      ))}
      <span className="text-faint">]</span>
    </>
  );
}

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations("about");
  const rows = profile.facts.map((fact) => ({ key: t(`keys.${fact.key}`), value: fact.value[locale] }));

  return (
    <Section id={sections.about} index={2} eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <Window file={t("readme")}>
          <div className="space-y-4 p-6 text-pretty text-muted sm:p-8">
            <p className="font-mono text-lg font-semibold text-fg">
              <span className="text-accent"># </span>
              {profile.name}
            </p>
            {profile.bio[locale].map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Window>

        <Window file={t("facts")}>
          <ol className="overflow-x-auto py-5 font-mono text-[13px] leading-7">
            {[
              <span key="open" className="text-faint">
                {"{"}
              </span>,
              ...rows.map((row, i) => (
                <span key={row.key} className="block pl-5">
                  <span className="text-fn">&quot;{row.key}&quot;</span>
                  <span className="text-faint">: </span>
                  <JsonValue value={row.value} />
                  {i < rows.length - 1 && <span className="text-faint">,</span>}
                </span>
              )),
              <span key="close" className="text-faint">
                {"}"}
              </span>,
            ].map((line, i) => (
              <li key={i} className="flex gap-4 pr-5">
                <span className="w-6 shrink-0 text-right text-faint select-none" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">{line}</span>
              </li>
            ))}
          </ol>
        </Window>
      </div>
    </Section>
  );
}
