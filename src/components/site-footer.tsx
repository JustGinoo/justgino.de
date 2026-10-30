import { Check, GitBranch } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-line bg-panel font-mono text-xs text-muted">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-accent">
            <GitBranch className="size-3.5" aria-hidden="true" />
            {t("branch")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5" aria-hidden="true" />
            {t("problems")}
          </span>
          <span>© {year} Gino Wild</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/impressum" className="hover:text-accent">
            {t("imprint")}
          </Link>
          <Link href="/datenschutz" className="hover:text-accent">
            {t("privacy")}
          </Link>
          <span className="text-faint">{t("made")}</span>
        </div>
      </div>
    </footer>
  );
}
