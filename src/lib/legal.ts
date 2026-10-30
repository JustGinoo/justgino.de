import { readFileSync } from "node:fs";
import path from "node:path";

export type LegalKind = "impressum" | "datenschutz";

export function loadLegal(kind: LegalKind) {
  const raw = readFileSync(path.join(process.cwd(), "legal", `${kind}.md`), "utf8");
  const updated = raw.match(/^Stand:\s*(.+)$/m)?.[1]?.trim() ?? null;
  const body = raw
    .replace(/^#\s+.+\n+/, "")
    .replace(/\n---\n+Stand:.*$/s, "")
    .trim();
  return { body, updated };
}
