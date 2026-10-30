export const inquiryTypes = ["plugin", "bot", "pixel-art", "hosting", "other"] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const MIN_FILL_TIME_MS = 3000;

export type ContactField = "name" | "email" | "type" | "message" | "consent" | "website" | "startedAt";
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: "validation"; fields: ContactErrors }
  | { ok: false; error: "rateLimit" | "generic" | "invalid" };
