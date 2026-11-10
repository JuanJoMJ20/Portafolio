"use client";

import SectionHead from "./SectionHead";
import Split from "./Split";
import { testimonials } from "@/data/testimonials";
import { ui } from "@/data/ui";
import { useT } from "@/lib/i18n";

// Capítulo 03. Con el arreglo vacío se muestra el estado "en recopilación".
export default function Testimonials() {
  const t = useT();

  return (
    <section id="testimonios" data-dim="0.2" className="relative px-5 py-[18vh] md:px-8">
      <SectionHead index="03" label={t(ui.nav.testimonials)} />

      {testimonials.length === 0 ? (
        <div className="mt-[8vh] grid gap-10 md:grid-cols-12 md:items-end">
          <h2 data-reveal="split" data-end="top 35%" className="display text-[clamp(3rem,8vw,8.5rem)] md:col-span-8">
            <Split text={t(ui.testimonials.title1)} />
            <br />
            <Split text={t(ui.testimonials.title2)} className="outline-text" />
          </h2>
          <div data-reveal="rise" className="rounded-[2rem] bg-accent p-7 text-on-accent md:col-span-4">
            <p className="micro">{t(ui.testimonials.status)}</p>
            <p className="mt-4 text-lg font-medium leading-snug">{t(ui.testimonials.body)}</p>
          </div>
        </div>
      ) : (
        <>
        <h2 data-reveal="split" data-end="top 35%" className="display mt-[8vh] text-[clamp(3rem,8vw,8.5rem)]">
          <Split text={t(ui.testimonials.heading)} />
        </h2>
        <div className="mt-[6vh] grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              data-reveal="rise"
              className="flex flex-col justify-between gap-8 rounded-[2rem] border border-fg/15 bg-bg p-7 first:bg-accent first:text-on-accent"
            >
              <blockquote className="text-lg font-medium leading-snug tracking-tight">“{t(item.text)}”</blockquote>
              <figcaption className="flex items-center gap-3">
                {item.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photo} alt="" className="h-11 w-11 rounded-full object-cover" />
                )}
                <span>
                  <span className="block font-medium">{item.name}</span>
                  <span className="micro block opacity-70">{t(item.role)}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        </>
      )}
    </section>
  );
}
