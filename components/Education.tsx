"use client";

import { GraduationCap } from "lucide-react";
import SectionHead from "./SectionHead";
import Split from "./Split";
import { experience } from "@/data/experience";
import { ui } from "@/data/ui";
import { useT } from "@/lib/i18n";

// Capítulo 04: formación académica en tarjetas grandes
export default function Education() {
  const t = useT();
  const items = experience.filter((e) => e.type === "academica");

  return (
    <section id="formacion" data-scene="3" data-dim="0.15" className="relative px-5 py-[16vh] md:px-8">
      <SectionHead index="04" label={t(ui.nav.education)} />
      <h2 data-reveal="split" data-end="top 40%" className="display mt-10 text-[clamp(3.5rem,11vw,11rem)]">
        <Split text={t(ui.education.title)} by="chars" />
      </h2>

      <ol className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={item.place}
            data-reveal="rise"
            data-end="top 60%"
            className={`flex flex-col justify-between gap-12 rounded-[2rem] p-7 md:p-10 ${
              i === 0 ? "bg-accent text-on-accent" : "border border-fg/15"
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              <p className="micro">{t(item.date)}</p>
              <GraduationCap className="h-7 w-7 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1] tracking-[-0.035em]">
                {t(item.title)}
              </h3>
              <p className="mt-4 font-medium">{item.place}</p>
              <p className="mt-2 leading-snug opacity-75">{t(item.description)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
