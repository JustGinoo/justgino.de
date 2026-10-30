import { getTranslations } from "next-intl/server";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { sections } from "@/lib/site";
import { Section } from "./section";
import { Window } from "./window";

export async function Services({ locale }: { locale: Locale }) {
  const t = await getTranslations("services");

  return (
    <Section id={sections.services} index={1} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <ul className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <li key={service.id} className="transition-transform duration-150 hover:-translate-y-1">
            <Window file={service.file} className="h-full">
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{service.title[locale]}</h3>
                <p className="mt-3 flex-1 text-pretty text-muted">{service.text[locale]}</p>
                <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
                  {service.tags.map((tag) => (
                    <li key={tag} className="border border-line px-2 py-1 text-fn">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Window>
          </li>
        ))}
      </ul>
    </Section>
  );
}
