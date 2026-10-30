import { getMessages, getTranslations } from "next-intl/server";
import { profile } from "@/data/profile";
import { Link } from "@/i18n/navigation";
import { sections } from "@/lib/site";
import { BrandIcon } from "./brand-icon";
import { ContactForm } from "./contact-form";
import { CopyButton } from "./copy-button";
import { Section } from "./section";
import { Window } from "./window";

function flatten(value: unknown, prefix = ""): Record<string, string> {
  if (typeof value === "string") return { [prefix]: value };
  return Object.entries(value as Record<string, unknown>).reduce(
    (all, [key, child]) => ({ ...all, ...flatten(child, prefix ? `${prefix}.${key}` : key) }),
    {},
  );
}

export async function Contact() {
  const t = await getTranslations("contact");
  const messages = (await getMessages()) as { contact: { form: Record<string, unknown> } };
  const consent = t.rich("form.consent", {
    link: (chunks) => (
      <Link href="/datenschutz" className="text-accent underline underline-offset-2">
        {chunks}
      </Link>
    ),
  });

  return (
    <Section id={sections.contact} index={6} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Window file={t("form.file")}>
          <ContactForm text={flatten(messages.contact.form)} consent={consent} />
        </Window>

        <aside className="window p-6">
          <h3 className="font-mono text-sm text-muted">{t("direct")}</h3>
          <ul className="mt-5 space-y-5">
            <li className="flex items-center gap-4">
              <BrandIcon name="gmail" themed size={36} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-faint">{t("email")}</p>
                <a href={`mailto:${profile.email}`} className="block font-medium break-all hover:text-accent">
                  {profile.email}
                </a>
              </div>
              <CopyButton value={profile.email} label={t("copy")} done={t("copied")} />
            </li>
            <li className="flex items-center gap-4">
              <BrandIcon name="discord" size={36} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-faint">{t("discord")}</p>
                <p className="truncate font-medium">@{profile.discord}</p>
              </div>
              <CopyButton value={profile.discord} label={t("copy")} done={t("copied")} />
            </li>
          </ul>
        </aside>
      </div>
    </Section>
  );
}
