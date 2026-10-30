# justgino.de

Persönliche Landingpage von Gino Wild (JustGino): Minecraft-Plugins, Discord-Bots und Pixel Art.

**Live:** [justgino.de](https://justgino.de)

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · next-intl (DE/EN) · Nodemailer

## Starten

```bash
npm install
cp .env.example .env.local
npm run dev
```

Für das Kontaktformular in `.env.local` ein Gmail-Konto mit App-Passwort eintragen (`SMTP_USER`, `SMTP_PASS`, optional `CONTACT_TO`). Ohne Zugangsdaten werden Anfragen im Entwicklungsmodus nur in der Konsole ausgegeben.

```bash
npm run build
npm start
```

## Aufbau

```
legal/          Impressum und Datenschutz (Markdown)
messages/       Oberflächentexte de/en
public/icons/   Skill- und Social-Icons
src/
  app/          Seiten, API-Route /api/contact, Sitemap, robots, Manifest
  components/   Abschnitte und UI-Bausteine
  data/         Inhalte: Profil, Leistungen, Skills, Werdegang, WildMine
  fonts/        Geist und Geist Mono
  i18n/         Sprachen und Routing
  lib/          Kontakt, Mailversand, Rate-Limit, SEO
```

Inhalte ändern sich in `src/data/` und `messages/`, das Design in `src/app/globals.css`.

## Lizenz

Code: MIT. Logo, Favicons und eigene Grafiken sind nicht im Repository enthalten und nicht freigegeben. Nachweise der Icons: [`public/icons/CREDITS.md`](public/icons/CREDITS.md), Schriften: [`src/fonts/LICENSE.txt`](src/fonts/LICENSE.txt).
