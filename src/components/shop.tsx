import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { socials } from "@/data/socials";
import { BrandIcon } from "./brand-icon";
import { Window } from "./window";

export async function Shop() {
  const t = await getTranslations("shop");
  const builtbybit = socials.find((s) => s.id === "builtbybit")!;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Window file={t("file")}>
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <BrandIcon name={builtbybit.icon} size={56} className="shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{t("title")}</h2>
            <p className="mt-2 text-pretty text-muted">{t("text")}</p>
          </div>
          <a href={builtbybit.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0">
            <ExternalLink className="size-4" aria-hidden="true" />
            {t("cta")}
          </a>
        </div>
      </Window>
    </div>
  );
}
