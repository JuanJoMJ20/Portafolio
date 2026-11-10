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

  if (project.images.length === 0) {
    // Sin capturas todavía: portada tipográfica dentro de la pantalla
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-on-accent text-accent">
        <span className="display text-[clamp(2.5rem,6vw,5rem)]">{project.title}</span>
        <span className="micro text-accent/70">{t(ui.projects.shotsSoon)}</span>
      </div>
    );
  }

  const [first] = project.images;
  if (project.video) {
    return <ProjectVideo src={project.video} poster={first.src} label={t(first.alt)} />;
  }
  return (
    <Image src={first.src} alt={t(first.alt)} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover object-top" />
  );
}

// Capítulo 02: bloque cian a todo el ancho; cada proyecto es una ficha clara con su dispositivo al lado
export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const t = useT();

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
          gsap.fromTo(
            row.querySelector(".project-device"),
            { y: 90 },
            {
              y: -90,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="proyectos"
      ref={root}
      data-scene="2"
      className="relative rounded-t-[2.5rem] bg-accent px-5 py-[14vh] text-on-accent md:px-8"
    >
      <div className="micro flex items-center gap-4">
        <span className="rounded-full bg-on-accent px-2 py-0.5 text-accent">02</span>
        <span>{t(ui.nav.projects)}</span>
        <span data-reveal="line" className="h-px flex-1 bg-on-accent/30" aria-hidden="true" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 data-reveal="split" data-end="top 40%" className="display text-[clamp(4rem,13vw,13rem)] md:col-span-8">
          <Split text={t(ui.projects.title)} by="chars" />
        </h2>
        <p data-reveal="rise" className="max-w-sm text-lg leading-snug md:col-span-4">
          {t(ui.projects.intro)}
        </p>
      </div>

      <div className="mt-[10vh] grid gap-[12vh]">
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className="project-row grid items-center gap-10 md:grid-cols-12 md:gap-12"
          >
            <div
              data-reveal="rise"
              data-end="top 55%"
              className={`rounded-[2rem] bg-bg p-6 text-fg md:col-span-6 md:p-10 ${i % 2 ? "md:order-2" : ""}`}
            >
              <div className="micro flex justify-between gap-4 text-fg/65">
                <span>{t(project.platform)}</span>
                <span>
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className="display mt-6 text-[clamp(3rem,6.5vw,6.5rem)]">{project.title}</h3>
              <p className="mt-4 text-xl font-medium leading-tight tracking-tight">{t(project.tagline)}</p>
              <p className="mt-4 leading-snug text-fg/75">{t(project.description)}</p>

              <h4 className="micro mt-8 text-fg/65">{t(ui.projects.highlights)}</h4>
              <ul className="mt-3 grid gap-2">
                {project.highlights.map((h) => (
                  <li key={h.es} className="flex gap-3 text-sm leading-snug">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {t(h)}
                  </li>
                ))}
              </ul>

              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tecnologías">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <TechChip name={tag} className="text-fg/80" />
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <ProjectLink href={project.github} label={t(ui.projects.repo)} primary />
                {project.sheet && <ProjectLink href={project.sheet} label={t(ui.projects.sheet)} />}
                {project.downloadLabel && (
                  <ProjectLink href={project.download ?? ""} label={t(project.downloadLabel)} download />
                )}
              </div>
            </div>

            <div className={`project-device md:col-span-6 ${i % 2 ? "md:order-1" : ""}`}>
              {project.images.length > 1 && !project.video ? (
                <Slideshow project={project} />
              ) : (
                <DeviceFrame device={project.device}>
                  <Screen project={project} />
                </DeviceFrame>
              )}
              {project.gallery && (
                <ul className={`mt-4 grid gap-3 ${project.gallery.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {project.gallery.map((shot) => (
                    <li
                      key={shot.src}
                      className="relative aspect-video overflow-hidden rounded-xl border-[5px] border-on-accent bg-on-accent"
                    >
                      <Image src={shot.src} alt={t(shot.alt)} fill sizes="(min-width: 768px) 16vw, 30vw" className="object-cover" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
