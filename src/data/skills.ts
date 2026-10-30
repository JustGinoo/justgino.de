import type { Localized } from "@/lib/i18n-text";

export type SkillKind = "code" | "web" | "infra" | "design" | "tool";

export type Skill = {
  name: string | Localized;
  icon: string;
  kind: SkillKind;
  themed?: boolean;
};

export const inventory: Skill[] = [
  { name: "Java", icon: "java", kind: "code" },
  { name: "Kotlin", icon: "kotlin", kind: "code", themed: true },
  { name: "Python", icon: "py", kind: "code" },
  { name: "PHP", icon: "php", kind: "code" },
  { name: "MySQL", icon: "mysql", kind: "code", themed: true },
  { name: "SQLite", icon: "sqlite", kind: "code" },
  { name: "Gradle", icon: "gradle", kind: "code", themed: true },
  { name: "Maven", icon: "maven", kind: "code", themed: true },
  { name: "Discord.js", icon: "discordjs", kind: "code", themed: true },
  { name: "JavaScript", icon: "js", kind: "web" },
  { name: "TypeScript", icon: "ts", kind: "web" },
  { name: "HTML", icon: "html", kind: "web" },
  { name: "CSS", icon: "css", kind: "web" },
  { name: "Next.js", icon: "nextjs", kind: "web", themed: true },
  { name: "Tailwind CSS", icon: "tailwind", kind: "web", themed: true },
  { name: "Docker", icon: "docker", kind: "infra" },
  { name: "nginx", icon: "nginx", kind: "infra" },
  { name: "Debian", icon: "debian", kind: "infra", themed: true },
  { name: "Google Cloud", icon: "gcp", kind: "infra", themed: true },
  { name: { de: "Pixel Art", en: "Pixel art" }, icon: "pixelart", kind: "design", themed: true },
  { name: "Figma", icon: "figma", kind: "design" },
  { name: "Notion", icon: "notion", kind: "tool", themed: true },
];

export const hotbar: Skill[] = [
  { name: "IntelliJ IDEA", icon: "idea", kind: "tool", themed: true },
  { name: "GitHub", icon: "github", kind: "tool", themed: true },
  { name: "Discord", icon: "discord", kind: "tool" },
  { name: "Aseprite", icon: "aseprite", kind: "design" },
  { name: "Cloudflare", icon: "cloudflare", kind: "infra" },
  { name: "Gmail", icon: "gmail", kind: "tool", themed: true },
];
