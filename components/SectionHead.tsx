type SectionHeadProps = { index: string; label: string };

// Rótulo de capítulo: número, nombre y una línea que se dibuja con el scroll
export default function SectionHead({ index, label }: SectionHeadProps) {
  return (
    <div className="micro flex items-center gap-4 text-fg/75">
      <span className="rounded-full bg-accent px-2 py-0.5 text-on-accent">{index}</span>
      <span>{label}</span>
      <span data-reveal="line" className="h-px flex-1 bg-fg/20" aria-hidden="true" />
    </div>
  );
}
