"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  value: string;
  label: string;
  done: string;
};

export function CopyButton({ value, label, done }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={copied ? done : label}
      className="grid size-9 shrink-0 place-items-center border border-line-strong text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? (
        <Check className="size-4 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? done : label}
      </span>
    </button>
  );
}
