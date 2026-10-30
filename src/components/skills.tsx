import { getTranslations } from "next-intl/server";
import { hotbar, inventory, type Skill, type SkillKind } from "@/data/skills";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/i18n-text";
import { sections } from "@/lib/site";
import { BrandIcon } from "./brand-icon";
import { Section } from "./section";

const rarity: Record<SkillKind, string> = {
  code: "#55ffff",
  web: "#ffff55",
  infra: "#55ff55",
  design: "#ff55ff",
  tool: "#ffffff",
};

const inventorySlot = "size-12 sm:size-14";
const hotbarSlot = "size-[30px] sm:size-14";

function Slot({
  skill,
  locale,
  kind,
  size,
  selected,
}: {
  skill: Skill;
  locale: Locale;
  kind: string;
  size: string;
  selected?: boolean;
}) {
  const name = pick(skill.name, locale);
  return (
    <li className={`slot ${size} ${selected ? "outline-2 outline-offset-1 outline-fg" : ""}`}>
      <BrandIcon name={skill.icon} themed={skill.themed} size={40} className="size-3/5" />
      <span className="sr-only">{name}</span>
      <span className="tooltip" aria-hidden="true">
        <span className="block" style={{ color: rarity[skill.kind] }}>
          {name}
        </span>
        <span className="block text-[#a8a8a8]">{kind}</span>
      </span>
    </li>
  );
}

export async function Skills({ locale }: { locale: Locale }) {
  const t = await getTranslations("skills");
  const empty = Math.max(0, 9 - hotbar.length);

  return (
    <Section id={sections.skills} index={3} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <div className="window p-4 sm:p-6">
        <h3 className="mb-3 text-center font-mono text-sm text-muted">{t("inventory")}</h3>
        <ul className="mx-auto grid w-fit grid-cols-5 gap-1.5 sm:grid-cols-10">
          {inventory.map((skill) => (
            <Slot key={skill.icon} skill={skill} locale={locale} kind={t(`kinds.${skill.kind}`)} size={inventorySlot} />
          ))}
        </ul>

        <h3 className="mt-8 mb-3 text-center font-mono text-sm text-muted">{t("hotbar")}</h3>
        <ul className="mx-auto grid w-fit grid-cols-9 gap-1 sm:gap-1.5">
          {hotbar.map((skill, i) => (
            <Slot
              key={skill.icon}
              skill={skill}
              locale={locale}
              kind={t(`kinds.${skill.kind}`)}
              size={hotbarSlot}
              selected={i === 0}
            />
          ))}
          {Array.from({ length: empty }, (_, i) => (
            <li key={i} className={`slot ${hotbarSlot}`} aria-hidden="true" />
          ))}
        </ul>
      </div>
    </Section>
  );
}
