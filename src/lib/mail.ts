import nodemailer, { type Transporter } from "nodemailer";
import type { Locale } from "@/i18n/routing";
import type { ContactInput } from "./contact-schema";
import { site } from "./site";

const typeLabels: Record<ContactInput["type"], string> = {
  plugin: "Minecraft-Plugin",
  bot: "Discord-Bot",
  "pixel-art": "Pixel Art / GUIs",
  hosting: "Website-Hosting",
  other: "Sonstiges",
};

let transporter: Transporter | null = null;

function getTransporter() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!transporter && user && pass) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      auth: { user, pass },
    });
  }
  if (!transporter && process.env.NODE_ENV !== "production") {
    transporter = nodemailer.createTransport({ jsonTransport: true });
  }
  if (!transporter) throw new Error("SMTP_USER / SMTP_PASS fehlen.");
  return { transporter, user: user ?? "dev@localhost", to: process.env.CONTACT_TO?.trim() || user || "dev@localhost" };
}

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function sendInquiry(input: ContactInput, locale: Locale) {
  const { transporter, user, to } = getTransporter();
  const type = typeLabels[input.type];
  const received = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
  const rows: [string, string][] = [
    ["Name", input.name],
    ["E-Mail", input.email],
    ["Anfragetyp", type],
    ["Sprache", locale.toUpperCase()],
    ["Eingegangen", received],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n") + `\n\nNachricht:\n${input.message}\n`;
  const html =
    '<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.5;color:#101511">' +
    '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">' +
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#5a625d;font-family:ui-monospace,monospace;font-size:13px">${escape(label)}</td><td style="padding:4px 0">${escape(value)}</td></tr>`,
      )
      .join("") +
    "</table>" +
    `<div style="padding:12px 14px;border:1px solid #e1e5e2;border-left:3px solid #22c55e;white-space:pre-wrap">${escape(input.message).replace(/\r?\n/g, "<br>")}</div></div>`;

  await transporter.sendMail({
    from: { name: `${site.name} Website`, address: user },
    to,
    replyTo: { name: input.name, address: input.email },
    subject: `[${site.domain}] ${type} – ${input.name}`,
    text,
    html,
  });
}
