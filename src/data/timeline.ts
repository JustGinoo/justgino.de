import type { Localized } from "@/lib/i18n-text";

export type Commit = {
  hash: string;
  date: Localized;
  title: Localized;
  head?: boolean;
};

export const timeline: Commit[] = [
  {
    hash: "a7f3c91",
    head: true,
    date: { de: "seit 2026", en: "since 2026" },
    title: { de: "Selbstständigkeit", en: "Self-employment" },
  },
  {
    hash: "5e20b4d",
    date: { de: "2026", en: "2026" },
    title: {
      de: "Ausbildung: Elektroniker für Energie- und Gebäudetechnik",
      en: "Apprenticeship: electronics technician for energy & building technology",
    },
  },
  {
    hash: "3c9d2aa",
    date: { de: "2022", en: "2022" },
    title: { de: "Fachabitur (Wirtschaft)", en: "Fachabitur (business)" },
  },
  {
    hash: "0e1f5b4",
    date: { de: "2020", en: "2020" },
    title: { de: "Realschulabschluss", en: "Secondary school certificate" },
  },
];
