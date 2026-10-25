"use client";

import Image from "next/image";
import SectionHead from "./SectionHead";
import Split from "./Split";
import TechChip from "./TechChip";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { useT } from "@/lib/i18n";

// Capítulo 01: una composición densa en una sola pantalla: foto, bio, datos y tecnologías
export default function About() {
  const t = useT();

  return (
    <section id="sobre-mi" data-scene="1" data-dim="0.15" className="relative px-5 py-[16vh] md:px-8">
      <SectionHead index="01" label={t(ui.nav.about)} />

      <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
        {/* Retrato sobre bloque cian */}
        <figure
          data-reveal="clip"
          data-end="top 35%"
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-accent md:col-span-5 lg:col-span-4"
        >
          <Image
            src={profile.photo}
            alt={t(ui.hero.photoAlt)}
            fill
            sizes="(min-width: 768px) 35vw, 90vw"
            className="object-contain object-bottom"
          />
          <figcaption className="micro absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1.5 text-fg">
            {profile.location}
          </figcaption>
        </figure>

        <div className="flex flex-col gap-8 md:col-span-7 lg:col-span-8">
          <h2
            data-reveal="split"
            data-end="top 45%"
            className="display text-[clamp(2.4rem,5.2vw,5.6rem)] leading-[0.92]"
          >
            <Split text={t(ui.about.title)} />
          </h2>
          <p data-reveal="rise" data-end="top 65%" className="max-w-2xl text-lg leading-snug text-fg/80">
            {t(profile.bio)}
          </p>

          <dl className="grid gap-3 sm:grid-cols-2">
            {profile.facts.map((fact, i) => (
              <div
                key={fact.label.es}
                data-reveal="rise"
                data-end="top 70%"
                className="rounded-2xl border border-fg/15 p-5"
              >
                <dt className="micro flex justify-between text-fg/65">
                  {t(fact.label)}
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[0.6rem] text-on-accent">
                    {i + 1}
                  </span>
                </dt>
                <dd className="mt-3 text-lg font-medium leading-tight tracking-tight">{t(fact.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div data-reveal="rise" data-end="top 70%" className="mt-12 border-t border-fg/15 pt-8">
        <h3 className="micro mb-5 text-fg/65">{t(ui.about.stack)}</h3>
        <ul className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <li key={skill}>
              <TechChip name={skill} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
