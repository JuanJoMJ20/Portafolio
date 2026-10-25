"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Split from "./Split";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { useT } from "@/lib/i18n";

// Capítulo 00: nombre gigante, foto sobre un disco cian y, al bajar, el disco
// crece hasta cubrir la pantalla y deja el rol escrito en tinta sobre el color.
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const t = useT();

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top top", end: "+=170%", pin: true, scrub: true },
          })
          .to(".hero-meta", { opacity: 0, y: -30, duration: 0.2 }, 0)
          .to(".hero-name .split-item", { yPercent: -120, stagger: 0.02, duration: 0.35 }, 0)
          .to(".hero-photo", { yPercent: -6, scale: 1.04, duration: 0.4 }, 0)
          .to(".hero-disc", { scale: 5, duration: 0.5 }, 0.2)
          .to(".hero-photo", { opacity: 0, yPercent: -16, duration: 0.2 }, 0.45)
          .from(".hero-role .split-item", { yPercent: 115, stagger: 0.03, duration: 0.3 }, 0.6)
          .from(".hero-role-meta", { opacity: 0, duration: 0.1 }, 0.75)
          .to({}, { duration: 0.15 });

        // El rol arranca oculto en CSS para que no se vea antes de hidratar
        gsap.set(".hero-overlay", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section id="inicio" ref={root} className="relative h-svh overflow-hidden">
      {/* Disco cian detrás de la foto: es el que luego cubre la pantalla */}
      <div
        className="hero-disc absolute bottom-[-24vh] left-1/2 aspect-square w-[118vw] -translate-x-1/2 rounded-full bg-accent md:bottom-[-38vh] md:left-auto md:right-[2vw] md:w-[min(56vw,108svh)] md:translate-x-0"
        aria-hidden="true"
      />

      <div className="hero-photo absolute bottom-0 left-1/2 h-[50svh] w-auto -translate-x-1/2 md:left-auto md:right-[8vw] md:h-[80svh] md:translate-x-0">
        <Image
          src={profile.photo}
          alt={t(ui.hero.photoAlt)}
          width={982}
          height={1128}
          priority
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      <div className="relative flex h-full flex-col px-5 pb-6 pt-24 md:px-8 md:pb-8">
        <div className="hero-meta micro flex flex-wrap justify-between gap-3 text-fg/75">
          <span>({t(ui.hero.portfolio)})</span>
          <span className="hidden md:block">{profile.location}</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {t(ui.hero.available)}
          </span>
        </div>

        <h1 className="hero-name display mt-[4svh] select-none md:mt-[8svh]">
          <Split text={profile.firstLine} by="chars" className="block text-[19vw] md:text-[11.5vw]" />
          <Split text={profile.secondLine} by="chars" className="block text-[14vw] md:text-[8.6vw]" />
        </h1>

        <div className="hero-meta mt-auto grid max-w-md gap-5 max-md:hidden">
          <p className="text-lg font-medium leading-tight tracking-tight">{t(profile.role)}</p>
          <p className="text-sm leading-snug text-fg/75">{t(profile.tagline)}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-3 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-on-accent"
            >
              {t(ui.nav.cv)}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center rounded-full border border-fg/30 px-6 py-3.5 text-sm font-medium transition-colors hover:border-fg"
            >
              {t(ui.hero.seeProjects)}
            </a>
          </div>
        </div>

        {/* En móvil el CV va arriba de la foto para que se vea sin bajar */}
        <a
          href={profile.cv}
          download
          className="hero-meta mt-6 inline-flex items-center gap-3 self-start rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg md:hidden"
        >
          {t(ui.nav.cv)}
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {/* Lo que queda cuando el disco cubre la pantalla */}
      <div className="hero-overlay pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-on-accent opacity-0 motion-reduce:hidden md:px-8">
        <p className="hero-role-meta micro mb-6">(MJ Digital Lab)</p>
        <p className="display max-w-6xl text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.9]">
          <Split text={t(profile.role)} className="hero-role" />
        </p>
      </div>
    </section>
  );
}
