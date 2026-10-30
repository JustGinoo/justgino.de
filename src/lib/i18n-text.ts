import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T> | T, locale: Locale): T {
  if (value && typeof value === "object" && "de" in value && "en" in value) {
    return (value as Localized<T>)[locale];
  }
  return value as T;
}
