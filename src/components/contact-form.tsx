"use client";

import { Check, Send } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { inquiryTypes, type ContactErrors, type ContactResponse } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

type Props = {
  text: Record<string, string>;
  consent: React.ReactNode;
};

export function ContactForm({ text, consent }: Props) {
  const t = (key: string) => text[key] ?? key;
  const locale = useLocale();
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<"generic" | "rateLimit" | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrors({});
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          type: data.get("type"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          startedAt: startedAt.current,
          locale,
        }),
      });
      const result = (await response.json()) as ContactResponse;
      if (result.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (result.error === "validation") setErrors(result.fields);
      else setServerError(result.error === "rateLimit" ? "rateLimit" : "generic");
      setStatus("error");
    } catch {
      setServerError("generic");
      setStatus("error");
    }
  }

  function again() {
    startedAt.current = Date.now();
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div role="status" className="p-6 sm:p-8">
        <p className="flex items-center gap-2 font-mono text-accent">
          <Check className="size-5" aria-hidden="true" />
          {t("successTitle")}
        </p>
        <p className="mt-3 text-muted">{t("successText")}</p>
        <button type="button" onClick={again} className="btn mt-6">
          {t("again")}
        </button>
      </div>
    );
  }

  const error = (field: keyof ContactErrors) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-danger">
        {t(`errors.${errors[field]}`)}
      </p>
    ) : null;

  const describedBy = (field: keyof ContactErrors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-1.5 block font-mono text-sm">
          <span className="text-key">--</span>
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder={t("namePlaceholder")}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          className="field"
        />
        {error("name")}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block font-mono text-sm">
          <span className="text-key">--</span>
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          placeholder={t("emailPlaceholder")}
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email")}
          className="field"
        />
        {error("email")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="type" className="mb-1.5 block font-mono text-sm">
          <span className="text-key">--</span>
          {t("type")}
        </label>
        <select
          id="type"
          name="type"
          defaultValue="plugin"
          aria-invalid={!!errors.type}
          aria-describedby={describedBy("type")}
          className="field"
        >
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {t(`types.${type}`)}
            </option>
          ))}
        </select>
        {error("type")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block font-mono text-sm">
          <span className="text-key">--</span>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          className="field resize-y"
        />
        {error("message")}
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            name="consent"
            type="checkbox"
            required
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
          />
          <span>{consent}</span>
        </label>
        {error("consent")}
      </div>

      {serverError && (
        <p role="alert" className="border-l-2 border-danger px-3 py-2 text-sm text-danger sm:col-span-2">
          {t(`errors.${serverError}`)}
        </p>
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          <Send className="size-4" aria-hidden="true" />
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
