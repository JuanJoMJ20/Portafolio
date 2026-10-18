"use client";

import { Fragment, useEffect, useSyncExternalStore } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { jumpTo } from "@/lib/lenis";

export type Lang = "es" | "en";
/** Texto en los dos idiomas del sitio */
export type Localized<T = string> = { es: T; en: T };

const KEY = "lang";
const EVENT = "langchange";

// Posición del scroll al pedir el cambio, para volver a ella cuando el contenido se monte de nuevo
let pendingScroll: number | null = null;

// El idioma vive en localStorage y se comparte con useSyncExternalStore:
// el prerender sale en español y el navegador cambia al guardado sin desajustes de hidratación.
function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function read(): Lang {
  try {
    return localStorage.getItem(KEY) === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

export function setLang(lang: Lang) {
  pendingScroll = window.scrollY;
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // Sin almacenamiento el cambio dura solo esta visita
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "es");
}

/** Devuelve una función que elige la versión del idioma activo */
export function useT() {
  const lang = useLang();
  return <T,>(value: Localized<T>) => value[lang];
}

// Al cambiar de idioma se vuelve a montar el contenido: así cada animación con scroll
// se mide de nuevo con los textos nuevos, que tienen otro largo.
export function LangKeyed({ children }: { children: React.ReactNode }) {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
    if (pendingScroll === null) return;
    const y = pendingScroll;
    pendingScroll = null;
    // Al remontar, la página se queda sin alto un instante y el navegador vuelve a 0.
    // ScrollTrigger recalcula y restaura esa posición, así que el salto se hace cuando termina.
    const restore = () => {
      ScrollTrigger.removeEventListener("refresh", restore);
      jumpTo(y);
    };
    ScrollTrigger.addEventListener("refresh", restore);
    window.setTimeout(() => ScrollTrigger.refresh(), 50);
  }, [lang]);
  return <Fragment key={lang}>{children}</Fragment>;
}
