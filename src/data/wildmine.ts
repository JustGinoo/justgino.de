import type { Localized } from "@/lib/i18n-text";

export const wildmine = {
  name: "WildMine.net",
  website: "https://wildmine.net",
  discord: "https://discord.gg/wildmine",
  launchedAt: "2025-06-18T18:00:00.000Z",
  motd: {
    de: "Mehrere Spielmodi hinter einem Velocity-Proxy – komplett mit eigenen Plugins.",
    en: "Several game modes behind a Velocity proxy – all running on my own plugins.",
  } satisfies Localized,
  text: {
    de: "Seit dem Start im Juni 2025 bin ich Entwickler und Serverleitung in einer Person: Plugins, Website, Discord-Bot und alles, was dazwischen liegt.",
    en: "Since launching in June 2025 I have been developer and server lead in one: plugins, website, Discord bot and everything in between.",
  } satisfies Localized,
  modes: [
    { name: "WildBlock", live: true },
    { name: "WildSMP", live: true },
    { name: "WildAttack", live: true },
    { name: "WildCity", live: false },
  ],
  plugins: 9,
};

export function daysOnline(now = Date.now()) {
  return Math.floor((now - Date.parse(wildmine.launchedAt)) / 86_400_000);
}
