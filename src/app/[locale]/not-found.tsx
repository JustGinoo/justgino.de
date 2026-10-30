import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-5 py-28 sm:px-8">
      <p className="font-mono text-sm text-danger">Error: ENOENT</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("text")}</p>
      <Link href="/" className="btn btn-primary mt-10">
        {t("back")}
      </Link>
    </div>
  );
}
