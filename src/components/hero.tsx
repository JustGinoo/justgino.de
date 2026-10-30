import { ArrowDown, Send } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import type { Locale } from "@/i18n/routing";
import { sections } from "@/lib/site";
import { BrandIcon } from "./brand-icon";
import { Terminal } from "./terminal";

const pixels = [
  { top: "12%", left: "4%", delay: "0s", opacity: 0.7 },
  { top: "68%", left: "1%", delay: "1.2s", opacity: 0.4 },
  { top: "8%", left: "56%", delay: "2.1s", opacity: 0.5 },
  { top: "86%", left: "48%", delay: "0.6s", opacity: 0.35 },
  { top: "22%", left: "97%", delay: "1.7s", opacity: 0.6 },
];

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations("hero");

  const lines = [
    { cmd: "whoami", out: t("terminal.whoami") },
    { cmd: "cat stack.txt", out: t("terminal.stack") },
    { cmd: "wildmine --status", out: t("terminal.server"), highlight: true },
    { cmd: "echo $MOOD", out: t("terminal.coffee") },
  ];

  return (
    <section className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-20 lg:pb-16">
      {pixels.map((p) => (
        <span
          key={p.top + p.left}
          className="pixel hidden sm:block"
          style={{ top: p.top, left: p.left, animationDelay: p.delay, opacity: p.opacity }}
          aria-hidden="true"
        />
      ))}

      <div className="relative">
        {profile.available && (
          <p className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
            <span className="size-2 animate-pulse bg-accent" aria-hidden="true" />
            {t("status")}
          </p>
        )}
        <p className="mt-8 font-mono text-muted">{t("hello")}</p>
        <h1 className="mt-1 text-5xl font-semibold tracking-tight sm:text-7xl">
          {profile.name}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-5 font-mono text-[clamp(0.55rem,2.3vw,0.875rem)] whitespace-nowrap">
          <span className="text-key">const</span> <span className="text-fn">role</span>{" "}
          <span className="text-faint">=</span> <span className="text-str">&quot;{profile.role[locale]}&quot;</span>
          <span className="text-faint">;</span>
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a href={`#${sections.contact}`} className="btn btn-primary">
            <Send className="size-4" aria-hidden="true" />
            {t("contact")}
          </a>
          <a href={`#${sections.about}`} className="btn">
            <ArrowDown className="size-4" aria-hidden="true" />
            {t("about")}
          </a>
        </div>

        <ul aria-label={t("socials")} className="mt-9 flex gap-3">
          {socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${s.label} ${s.handle}`}
                className="block transition-transform hover:-translate-y-1"
              >
                <BrandIcon name={s.icon} themed={s.themed} size={36} />
                <span className="sr-only">
                  {s.label} {s.handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <Terminal title={t("terminal.title")} lines={lines} />
      </div>
    </section>
  );
}
