import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { loadLegal, type LegalKind } from "@/lib/legal";
import { Window } from "./window";

type Props = {
  kind: LegalKind;
  title: string;
  locale: Locale;
};

export async function LegalPage({ kind, title, locale }: Props) {
  const t = await getTranslations("legal");
  const { body, updated } = loadLegal(kind);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("back")}
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">{title}</h1>
      {locale !== "de" && (
        <p lang="en" className="mt-4 border-l-2 border-accent pl-3 text-sm text-muted">
          {t("germanOnly")}
        </p>
      )}
      <Window file={`${kind}.md`} className="mt-10">
        <div lang="de" className="prose-legal p-6 sm:p-8">
          <ReactMarkdown>{body}</ReactMarkdown>
          {updated && (
            <p className="mt-8 font-mono text-xs text-faint">
              {t("updated")}: {updated}
            </p>
          )}
        </div>
      </Window>
    </div>
  );
}
