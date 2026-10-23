"use client";

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Coreografía declarativa: cualquier elemento con data-reveal se anima ligado al scroll.
//   split  → letras o palabras suben desde su máscara
//   fade   → palabras pasan de apagadas a encendidas
//   line   → una línea se dibuja de izquierda a derecha
//   rise   → el bloque sube y aparece
//   clip   → el bloque se destapa de abajo hacia arriba
//   drift  → desplazamiento horizontal (data-from / data-to en xPercent)
// Se monta después de las secciones con pin para medir con su espacio ya creado.
export default function Reveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const scrollTrigger = {
          trigger: el,
          start: el.dataset.start ?? "top 90%",
          end: el.dataset.end ?? "top 50%",
          scrub: true,
        };

        switch (el.dataset.reveal) {
          case "split":
            gsap.from(el.querySelectorAll(".split-item"), {
              yPercent: 115,
              ease: "none",
              stagger: 0.03,
              scrollTrigger,
            });
            break;
          case "fade":
            gsap.fromTo(
              el.querySelectorAll(".split-item"),
              { opacity: 0.12 },
              { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger },
            );
            break;
          case "line":
            gsap.from(el, { scaleX: 0, transformOrigin: "left center", ease: "none", scrollTrigger });
            break;
          case "rise":
            gsap.from(el, { y: 80, opacity: 0, ease: "none", scrollTrigger });
            break;
          case "clip":
            gsap.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger },
            );
            break;
          case "drift":
            gsap.fromTo(
              el,
              { xPercent: Number(el.dataset.from ?? 0) },
              {
                xPercent: Number(el.dataset.to ?? -30),
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
            break;
        }
      });
    });
  });

  return null;
}
