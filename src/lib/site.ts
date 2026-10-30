export const site = {
  name: "JustGino",
  domain: "justgino.de",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://justgino.de").replace(/\/+$/, ""),
};

export const sections = {
  services: "leistungen",
  about: "ueber-mich",
  skills: "skills",
  wildmine: "wildmine",
  log: "werdegang",
  contact: "kontakt",
} as const;
