"use client";

import Split from "./Split";
import { experience } from "@/data/experience";
import { ui } from "@/data/ui";
import { useT } from "@/lib/i18n";

// Capítulo 05: experiencia laboral en un bloque de color invertido para que no pase desapercibida
export default function Experience() {
  const t = useT();
  const items = experience.filter((e) => e.type === "laboral");

  return (
    <section id="experiencia" className="relative rounded-[2.5rem] bg-fg px-5 py-[14vh] text-bg md:mx-3 md:px-8">
      <div className="micro flex items-center gap-4">
        <span className="rounded-full bg-accent px-2 py-0.5 text-on-accent">05</span>
        <span>{t(ui.nav.work)}</span>
        <span data-reveal="line" className="h-px flex-1 bg-bg/25" aria-hidden="true" />
      </div>
      <h2 data-reveal="split" data-end="top 40%" className="display mt-10 text-[clamp(3rem,9vw,9.5rem)]">
        <Split text={t(ui.work.title)} />
      </h2>

      <ol className="mt-12">
        {items.map((item) => (
          <li
            key={`${item.place}-${item.date.es}`}
            className="relative grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <span data-reveal="line" data-end="top 70%" className="absolute inset-x-0 top-0 h-px bg-bg/20" aria-hidden="true" />
            <p className="micro text-accent dark:text-bg/70 md:col-span-3">{t(item.date)}</p>
            <div className="md:col-span-5">
              <h3
                data-reveal="split"
                data-end="top 60%"
                className="text-[clamp(1.75rem,3.4vw,3.2rem)] font-medium leading-[0.95] tracking-[-0.04em]"
              >
                <Split text={t(item.title)} />
              </h3>
              <p className="mt-2 font-medium text-bg/80">{item.place}</p>
            </div>
            <div data-reveal="rise" data-end="top 65%" className="leading-snug text-bg/75 md:col-span-4">
              <p>{t(item.description)}</p>
              {item.highlights && (
                <ul className="mt-4 grid gap-2 text-sm">
                  {item.highlights.map((h) => (
                    <li key={h.es} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {t(h)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
