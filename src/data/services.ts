import type { Localized } from "@/lib/i18n-text";

export type Service = {
  id: string;
  file: string;
  title: Localized;
  text: Localized;
  tags: string[];
};

export const services: Service[] = [
  {
    id: "plugins",
    file: "Plugin.java",
    title: { de: "Minecraft-Plugins", en: "Minecraft plugins" },
    text: {
      de: "Plugins in Java für Paper, Folia und Velocity. Vom Konzept über die Datenbank bis zum laufenden Server.",
      en: "Java plugins for Paper, Folia and Velocity. From concept and database design to the running server.",
    },
    tags: ["Java", "Paper", "Folia", "Velocity"],
  },
  {
    id: "bots",
    file: "bot.js",
    title: { de: "Discord-Bots", en: "Discord bots" },
    text: {
      de: "Bots mit Discord.js, zugeschnitten auf eure Community: Tickets, Rollen, Automatisierung und Anbindung an eure Server-Daten.",
      en: "Discord.js bots tailored to your community: tickets, roles, automation and integration with your server data.",
    },
    tags: ["Discord.js", "Node.js", "MySQL"],
  },
  {
    id: "guis",
    file: "menu.ase",
    title: { de: "Pixel-Art-GUIs", en: "Pixel art GUIs" },
    text: {
      de: "Von Hand gepixelte Menüs, Icons und Interfaces als Resource Pack, passend zum Stil eures Servers.",
      en: "Hand-pixelled menus, icons and interfaces as a resource pack, matched to your server's style.",
    },
    tags: ["Aseprite", "Resource Pack"],
  },
  {
    id: "hosting",
    file: "hosting.conf",
    title: { de: "Website-Hosting", en: "Website hosting" },
    text: {
      de: "Ich betreibe deine Seite auf meinem eigenen Server: Einrichtung, HTTPS-Zertifikat, Updates und ein Auge darauf, dass sie läuft.",
      en: "I run your site on my own server: setup, HTTPS certificate, updates and an eye on it staying up.",
    },
    tags: ["nginx", "HTTPS", "Debian"],
  },
];
