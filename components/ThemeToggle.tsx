"use client";

import { Moon, Sun } from "lucide-react";
import { ui } from "@/data/ui";
import { useT } from "@/lib/i18n";

// Cambia entre tema claro (predeterminado) y oscuro, y avisa a la escena 3D
export default function ThemeToggle() {
  const t = useT();

  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    window.dispatchEvent(new Event("themechange"));
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Si el navegador bloquea el almacenamiento, el cambio aplica solo a esta visita
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(ui.nav.theme)}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-fg/25 transition-colors hover:border-fg"
    >
      {/* El ícono visible depende de la clase .dark, así no hay parpadeo al hidratar.
          En claro se ofrece la luna (pasar a oscuro); en oscuro, el sol. */}
      <Moon className="h-4 w-4 dark:hidden" strokeWidth={1.5} aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
