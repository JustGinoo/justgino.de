import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { daysOnline, wildmine } from "@/data/wildmine";
import type { Locale } from "@/i18n/routing";
import { sections } from "@/lib/site";
import { BrandIcon } from "./brand-icon";
import { Section } from "./section";

function Signal() {
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[4, 7, 10, 13, 16].map((h) => (
        <span key={h} className="w-1 bg-[#55ff55]" style={{ height: h }} />
      ))}
    </span>
  );
}

export async function WildMine({ locale }: { locale: Locale }) {
  const t = await getTranslations("wildmine");
  const days = daysOnline();

  return (
    <Section id={sections.wildmine} index={4} eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div>
          <p className="text-lg text-pretty text-muted">{wildmine.text[locale]}</p>
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {[
              { value: wildmine.modes.length, label: t("modes") },
              { value: wildmine.plugins.length, label: t("plugins") },
              { value: days, label: t("days") },
            ].map((stat) => (
              <div key={stat.label} className="window p-4">
                <dt className="font-mono text-xs text-muted">{stat.label}</dt>
                <dd className="mt-1 font-mono text-3xl font-semibold text-num">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={wildmine.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink className="size-4" aria-hidden="true" />
              {t("website")}
            </a>
            <a href={wildmine.discord} target="_blank" rel="noopener noreferrer" className="btn">
              <BrandIcon name="discord" size={18} />
              {t("discord")}
            </a>
          </div>
        </div>

        <div className="space-y-4 bg-[#1b1b1b] p-3 font-mono text-sm text-[#e0e0e0] shadow-[6px_6px_0_0_var(--line)] sm:p-4">
          <div className="flex gap-3 border-2 border-[#808080] bg-black/40 p-2.5">
            <span
              className="grid size-14 shrink-0 place-items-center bg-[#2f7d32] text-2xl font-bold text-white shadow-[inset_-4px_-4px_0_0_rgb(0_0_0/0.3),inset_4px_4px_0_0_rgb(255_255_255/0.2)]"
              aria-hidden="true"
            >
              W
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">{wildmine.name}</p>
                <span className="flex items-center gap-2 text-xs text-[#a8a8a8]">
                  {t("online")}
                  <Signal />
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#55ff55]">{wildmine.motd[locale]}</p>
            </div>
          </div>

          <div className="bg-black/50 p-3 text-xs leading-relaxed sm:text-[13px]">
            <p className="text-[#a8a8a8]">&gt; /plugins</p>
            <p className="mt-1">
              <span className="text-white">{t("pluginsCommand", { count: wildmine.plugins.length })} </span>
              {wildmine.plugins.map((plugin, i) => (
                <span key={plugin}>
                  <span className="text-[#55ff55]">{plugin}</span>
                  {i < wildmine.plugins.length - 1 && <span className="text-white">, </span>}
                </span>
              ))}
            </p>
            <p className="mt-3 text-[#a8a8a8]">&gt; /server</p>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {wildmine.modes.map((mode) => (
                <li key={mode.name}>
                  <span className={mode.live ? "text-[#55ff55]" : "text-[#ffaa00]"}>■ </span>
                  <span className="text-white">{mode.name}</span>{" "}
                  <span className="text-[#a8a8a8]">{mode.live ? t("live") : t("building")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
