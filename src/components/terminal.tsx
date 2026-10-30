"use client";

import { useEffect, useState } from "react";

export type TerminalLine = { cmd: string; out: string; highlight?: boolean };

type Props = {
  title: string;
  lines: TerminalLine[];
};

type Progress = { line: number; chars: number; output: boolean };

function Prompt() {
  return (
    <span aria-hidden="true">
      <span className="text-accent">gino@justgino</span>
      <span className="text-faint">:</span>
      <span className="text-fn">~</span>
      <span className="text-faint">$ </span>
    </span>
  );
}

export function Terminal({ title, lines }: Props) {
  const [progress, setProgress] = useState<Progress>({ line: 0, chars: 0, output: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current: Progress = { line: 0, chars: 0, output: false };
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (reduced) {
        setProgress({ line: lines.length, chars: 0, output: false });
        return;
      }
      if (current.line >= lines.length) return;
      const command = lines[current.line].cmd;
      let delay = 35 + Math.random() * 55;
      if (current.chars < command.length) {
        current = { ...current, chars: current.chars + 1 };
      } else if (!current.output) {
        current = { ...current, output: true };
        delay = 420;
      } else {
        current = { line: current.line + 1, chars: 0, output: false };
        delay = 260;
      }
      setProgress(current);
      timer = setTimeout(step, delay);
    };

    timer = setTimeout(step, reduced ? 0 : 700);
    return () => clearTimeout(timer);
  }, [lines]);

  const done = progress.line >= lines.length;

  return (
    <div className="window relative w-full">
      <div className="window-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ml-1">{title}</span>
      </div>
      <div className="sr-only">
        {lines.map((line) => (
          <p key={line.cmd}>
            $ {line.cmd}: {line.out}
          </p>
        ))}
      </div>
      <div aria-hidden="true" className="min-h-72 space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {lines.slice(0, Math.min(progress.line + 1, lines.length)).map((line, i) => {
          const typing = i === progress.line;
          return (
            <div key={line.cmd}>
              <p>
                <Prompt />
                <span>{typing ? line.cmd.slice(0, progress.chars) : line.cmd}</span>
                {typing && !progress.output && <span className="cursor" />}
              </p>
              {(!typing || progress.output) && (
                <p className={line.highlight ? "text-accent" : "text-muted"}>{line.out}</p>
              )}
            </div>
          );
        })}
        {done && (
          <p>
            <Prompt />
            <span className="cursor" />
          </p>
        )}
      </div>
    </div>
  );
}
