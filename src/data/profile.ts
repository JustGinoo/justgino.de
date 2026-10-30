import type { Localized } from "@/lib/i18n-text";

export const profile = {
  name: "Gino Wild",
  brand: "JustGino",
  handle: "justgino",
  email: "business.justgino@gmail.com",
  discord: "just_gino",
  available: true,
  role: {
    de: "Plugin- & Bot-Entwickler · Pixel-Art-Artist",
    en: "Plugin & Bot Developer · Pixel Artist",
  } satisfies Localized,
  tagline: {
    de: "Ich entwickle Minecraft-Plugins und Discord-Bots – und pixele die Interfaces gleich selbst dazu.",
    en: "I build Minecraft plugins and Discord bots – and pixel the interfaces myself.",
  } satisfies Localized,
  bio: {
    de: [
      "Ich habe zuerst das Fachabitur gemacht und danach eine Ausbildung zum Elektroniker für Energie- und Gebäudetechnik abgeschlossen.",
      "Heute bin ich selbstständig. Ich programmiere Minecraft-Plugins, Discord-Bots und Websites und leite mit WildMine ein eigenes Minecraft-Netzwerk.",
      "Die Menüs und Interfaces für meine Projekte pixele ich selbst. So passen Technik und Optik zusammen.",
      "Ich arbeite viel mit KI: beim Entwerfen, beim Gegenlesen und wenn es schnell gehen muss. Verantworten muss ich den Code trotzdem selbst – was bei mir rausgeht, kann ich erklären, und was ich nicht verstehe, kommt nicht rein.",
    ],
    en: [
      "I first earned my Fachabitur (advanced technical college entrance qualification), then completed an apprenticeship as an electronics technician for energy and building technology.",
      "Today I work self-employed. I build Minecraft plugins, Discord bots and websites, and I run WildMine, my own Minecraft network.",
      "I pixel the menus and interfaces for my projects myself, so the tech and the look fit together.",
      "I work with AI a lot: for drafting, for a second pair of eyes and when things need to move fast. The code is still mine to answer for – I can explain anything I ship, and what I do not understand does not go in.",
    ],
  } satisfies Localized<string[]>,
  facts: [
    { key: "name", value: { de: "Gino Wild", en: "Gino Wild" } },
    {
      key: "training",
      value: {
        de: "Elektroniker für Energie- und Gebäudetechnik",
        en: "Electronics technician, energy & building technology",
      },
    },
    { key: "degree", value: { de: "Fachabitur", en: "Fachabitur" } },
    { key: "now", value: { de: "Selbstständig", en: "Self-employed" } },
    { key: "languages", value: { de: ["Deutsch", "Englisch"], en: ["German", "English"] } },
  ] as const,
};
