import { getTranslations } from "next-intl/server";
import { skillGroups } from "@/data/skills";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/i18n-text";
import { sections } from "@/lib/site";
import { BrandIcon } from "./brand-icon";
import { Section } from "./section";
import { Window } from "./window";

export async function Skills({ locale }: { locale: Locale }) {
  const t = await getTranslations("skills");

  return (
    <Section id={sections.skills} index={3} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <Window file={t("file")}>
        <dl className="divide-y divide-line">
          {skillGroups.map((group) => (
            <div key={group.id} className="grid gap-3 px-5 py-5 sm:grid-cols-[13rem_1fr] sm:items-center sm:px-6">
              <dt className="font-mono text-sm">
                <span className="text-fn">{group.label[locale]}</span>
                <span className="text-faint">:</span>
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill.icon}
                      className="inline-flex items-center gap-2 border border-line bg-bg py-1.5 pr-3 pl-1.5 text-sm transition-colors hover:border-accent"
                    >
                      <BrandIcon name={skill.icon} themed={skill.themed} size={22} />
                      {pick(skill.name, locale)}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Window>
    </Section>
  );
}
