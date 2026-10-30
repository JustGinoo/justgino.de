import type { Localized } from "@/lib/i18n-text";

export type Skill = {
  name: string | Localized;
  icon: string;
  themed?: boolean;
};

export type SkillGroup = {
  id: string;
  label: Localized;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: { de: "sprachen", en: "languages" },
    items: [
      { name: "Java", icon: "java" },
      { name: "Kotlin", icon: "kotlin", themed: true },
      { name: "TypeScript", icon: "ts" },
      { name: "JavaScript", icon: "js" },
      { name: "Python", icon: "py" },
      { name: "PHP", icon: "php" },
    ],
  },
  {
    id: "web",
    label: { de: "web & bots", en: "web & bots" },
    items: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwind", themed: true },
      { name: "Discord.js", icon: "discordjs", themed: true },
    ],
  },
  {
    id: "data",
    label: { de: "daten & build", en: "data & build" },
    items: [
      { name: "MySQL", icon: "mysql", themed: true },
      { name: "SQLite", icon: "sqlite" },
      { name: "Maven", icon: "maven", themed: true },
    ],
  },
  {
    id: "infra",
    label: { de: "server & cloud", en: "servers & cloud" },
    items: [
      { name: "Docker", icon: "docker" },
      { name: "nginx", icon: "nginx" },
      { name: "Debian", icon: "debian", themed: true },
      { name: "Google Cloud", icon: "gcp", themed: true },
      { name: "Cloudflare", icon: "cloudflare" },
    ],
  },
  {
    id: "design",
    label: { de: "design", en: "design" },
    items: [
      { name: { de: "Pixel Art", en: "Pixel art" }, icon: "pixelart", themed: true },
      { name: "Aseprite", icon: "aseprite" },
      { name: "Figma", icon: "figma" },
    ],
  },
  {
    id: "tools",
    label: { de: "tools & plattformen", en: "tools & platforms" },
    items: [
      { name: "IntelliJ IDEA", icon: "idea", themed: true },
      { name: "GitHub", icon: "github", themed: true },
      { name: "Notion", icon: "notion", themed: true },
      { name: "Discord", icon: "discord" },
      { name: "Gmail", icon: "gmail", themed: true },
      { name: "Modrinth", icon: "modrinth" },
      { name: "BuiltByBit", icon: "builtbybit" },
      { name: "Spotify", icon: "spotify" },
    ],
  },
];
