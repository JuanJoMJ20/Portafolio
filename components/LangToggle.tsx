"use client";

import { ui } from "@/data/ui";
import { setLang, useLang, useT } from "@/lib/i18n";

// Cambia todo el sitio entre español e inglés y recuerda la elección
export default function LangToggle() {
  const lang = useLang();
  const t = useT();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      aria-label={t(ui.nav.lang)}
      className="micro flex h-9 items-center gap-1.5 rounded-full border border-fg/25 px-3 transition-colors hover:border-fg"
    >
      <span className={lang === "es" ? "text-fg" : "text-fg/40"}>ES</span>
      <span className="text-fg/30" aria-hidden="true">
        /
      </span>
      <span className={lang === "en" ? "text-fg" : "text-fg/40"}>EN</span>
    </button>
  );
}
