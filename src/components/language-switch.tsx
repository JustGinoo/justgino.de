"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  label: string;
  names: Record<string, string>;
};

export function LanguageSwitch({ label, names }: Props) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex border border-line-strong font-mono text-xs">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          title={names[l]}
          className={`px-2.5 py-1.5 uppercase transition-colors ${
            l === locale ? "bg-accent text-accent-ink" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
