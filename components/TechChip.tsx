import { techIcons } from "./tech-icons";

type TechChipProps = { name: string; className?: string };

// Etiqueta de tecnología con su logo monocromo (toma el color del texto)
export default function TechChip({ name, className = "" }: TechChipProps) {
  const path = techIcons[name];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-current/20 px-3.5 py-1.5 text-sm ${className}`}>
      {path && (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
          <path d={path} />
        </svg>
      )}
      {name}
    </span>
  );
}
