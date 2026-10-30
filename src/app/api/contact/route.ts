import { NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { MIN_FILL_TIME_MS, type ContactResponse } from "@/lib/contact";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";
import { sendInquiry } from "@/lib/mail";
import { anonymizeIp, clientIp, createRateLimiter } from "@/lib/rate-limit";

const limit = createRateLimiter(5, 60 * 60 * 1000);

const reply = (body: ContactResponse, status = 200) => NextResponse.json(body, { status });

function fromOwnSite(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!fromOwnSite(request)) return reply({ ok: false, error: "invalid" }, 400);

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
    if (!raw || typeof raw !== "object") throw new Error();
  } catch {
    return reply({ ok: false, error: "invalid" }, 400);
  }

  if (typeof raw.website === "string" && raw.website.trim()) return reply({ ok: true });
  const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : 0;
  if (!startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) return reply({ ok: true });

  const ip = clientIp(request);
  if (!limit(ip)) {
    console.info(`[contact] rate limit ${anonymizeIp(ip)}`);
    return reply({ ok: false, error: "rateLimit" }, 429);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return reply({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, 400);

  const locale = hasLocale(routing.locales, raw.locale) ? raw.locale : routing.defaultLocale;
  try {
    await sendInquiry(parsed.data, locale);
    return reply({ ok: true });
  } catch (error) {
    console.error("[contact] send failed:", error);
    return reply({ ok: false, error: "generic" }, 500);
  }
}
