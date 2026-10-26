"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import DeviceFrame from "./DeviceFrame";
import Split from "./Split";
import TechChip from "./TechChip";
import { projects, type Project } from "@/data/projects";
import { ui } from "@/data/ui";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { useT } from "@/lib/i18n";

type LinkProps = { href: string; label: string; primary?: boolean; download?: boolean };

// Si el link está vacío, se muestra como "pronto" y no es clicable
function ProjectLink({ href, label, primary, download }: LinkProps) {
  const t = useT();
  if (!href) {
    return (
      <span aria-disabled="true" className="inline-flex items-center rounded-full border border-dashed border-fg/30 px-5 py-3 text-sm text-fg/55">
        {label} · {t(ui.projects.soon)}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${
        primary ? "bg-fg text-bg hover:bg-accent hover:text-on-accent" : "border border-fg/30 hover:border-fg"
      }`}
    >
      {label}
      {download ? (
        <Download className="h-4 w-4" aria-hidden="true" />
      ) : (
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      )}
    </a>
  );
}

// Avisa cuando el elemento entra o sale de la pantalla (al menos un 35 % visible)
function useInView(ref: React.RefObject<HTMLElement | null>, onChange: (visible: boolean) => void) {
  const cb = useRef(onChange);
  useEffect(() => {
    cb.current = onChange;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => cb.current(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Video de la app: se reproduce en bucle mientras se ve y se pausa al salir de pantalla
function ProjectVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useInView(ref, (visible) => {
    const video = ref.current;
    if (!video) return;
    if (visible && !reducedMotion()) video.play().catch(() => {});
    else video.pause();
  });
  return (
    <video
      ref={ref}
      className="h-full w-full object-cover object-top"
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

// Varias pantallas: rotan solas mientras el dispositivo está a la vista
function Slideshow({ project }: { project: Project }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [current, setCurrent] = useState(0);
  const { images } = project;

  useInView(ref, (visible) => {
    window.clearInterval(timer.current);
    if (visible && !reducedMotion()) {
      timer.current = window.setInterval(() => setCurrent((n) => (n + 1) % images.length), 2600);
    }
  });
  useEffect(() => () => window.clearInterval(timer.current), []);

  return (
    <div ref={ref}>
      <DeviceFrame device={project.device}>
        {images.map((img, k) => (
          <Image
            key={img.src}
            src={img.src}
            alt={t(img.alt)}
            fill
            sizes="(min-width: 768px) 30vw, 70vw"
            aria-hidden={k !== current}
            className={`object-cover transition-opacity duration-700 ${k === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </DeviceFrame>
      <div className="mt-6 flex flex-col items-center gap-3">
        <p className="micro" aria-live="polite">
          {images[current].label ? t(images[current].label) : ""}
        </p>
        <div className="flex gap-2" role="tablist" aria-label={project.title}>
          {images.map((img, k) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={k === current}
              aria-label={img.label ? t(img.label) : t(img.alt)}
              onClick={() => setCurrent(k)}
              className={`h-2 rounded-full bg-on-accent transition-all ${k === current ? "w-6" : "w-2 opacity-35"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Screen({ project }: { project: Project }) {
  const t = useT();

