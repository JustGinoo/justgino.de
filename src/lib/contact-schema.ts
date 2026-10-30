import { z } from "zod";
import { inquiryTypes, type ContactErrors, type ContactField } from "./contact";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name.min").max(100, "name.max"),
  email: z.email("email.invalid").max(200, "email.invalid"),
  type: z.enum(inquiryTypes, { error: "type.invalid" }),
  message: z.string().trim().min(20, "message.min").max(5000, "message.max"),
  consent: z.literal(true, { error: "consent.required" }),
  website: z.string().max(1000).optional(),
  startedAt: z.number().int().nonnegative(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrors(error: z.ZodError): ContactErrors {
  const result: ContactErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField;
    if (field && !result[field]) result[field] = issue.message.includes(".") ? issue.message : "invalid";
  }
  return result;
}
