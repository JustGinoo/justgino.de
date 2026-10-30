import type { Localized } from "@/lib/i18n-text";

export type Commit = {
  hash: string;
  date: Localized;
  title: Localized;
  text: Localized;
  head?: boolean;
};

export const timeline: Commit[] = [
  {
    hash: "a7f3c91",
    head: true,
    date: { de: "seit 2026", en: "since 2026" },
    title: { de: "Selbstständigkeit", en: "Self-employment" },
    text: {
      de: "Plugins, Bots und Websites programmieren und den eigenen Gameserver leiten.",
      en: "Programming plugins, bots and websites and running my own game server.",
    },
  },
  {
    hash: "5e20b4d",
    date: { de: "2026", en: "2026" },
    title: {
      de: "Ausbildung: Elektroniker für Energie- und Gebäudetechnik",
      en: "Apprenticeship: electronics technician for energy & building technology",
    },
    text: { de: "Abgeschlossene Berufsausbildung.", en: "Completed vocational training." },
  },
  {
    hash: "3c9d2aa",
    date: { de: "2022", en: "2022" },
    title: { de: "Fachabitur (Wirtschaft)", en: "Fachabitur (business)" },
    text: {
      de: "Fachhochschulreife.",
      en: "Advanced technical college entrance qualification.",
    },
  },
  {
    hash: "0e1f5b4",
    date: { de: "2020", en: "2020" },
    title: { de: "Realschulabschluss", en: "Secondary school certificate" },
    text: { de: "Mittlere Reife.", en: "German Realschule leaving certificate." },
  },
];
