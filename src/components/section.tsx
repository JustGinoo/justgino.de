type Props = {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

export function Section({ id, index, eyebrow, title, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="mb-10 max-w-2xl">
        <p className="font-mono text-sm">
          <span className="text-faint">{String(index).padStart(2, "0")} </span>
          <span className="text-accent">~/{eyebrow}</span>
        </p>
        <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg text-pretty text-muted">{intro}</p>}
      </header>
      {children}
    </section>
  );
}
