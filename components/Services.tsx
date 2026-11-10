"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";
import Split from "./Split";
import { services } from "@/data/services";
import { ui } from "@/data/ui";
import { useT } from "@/lib/i18n";

// Capítulo 07 · sección adicional: lo que ofrezco a través de MJ Digital Lab
export default function Services() {
  const t = useT();

  return (
    <section id="servicios" data-scene="4" data-dim="0.15" className="relative px-5 py-[16vh] md:px-8">
      <SectionHead index="07" label={t(ui.services.label)} />
      <h2 data-reveal="split" data-end="top 40%" className="display mt-10 text-[clamp(3rem,8vw,8.5rem)]">
        <Split text={t(ui.services.title)} />
      </h2>

      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {services.map((service, i) => (
          <li
            key={service.title.es}
            data-reveal="rise"
            data-end="top 65%"
            className="group flex flex-col justify-between gap-10 rounded-[2rem] border border-fg/15 p-7 transition-colors hover:border-accent hover:bg-accent hover:text-on-accent md:p-9"
          >
            <span className="micro flex h-9 w-9 items-center justify-center rounded-full bg-accent text-on-accent group-hover:bg-on-accent group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1] tracking-[-0.035em]">
                {t(service.title)}
              </h3>
              <p className="mt-3 max-w-md leading-snug opacity-75">{t(service.description)}</p>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium text-on-accent transition-colors hover:bg-fg hover:text-bg"
      >
        {t(ui.services.cta)}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
