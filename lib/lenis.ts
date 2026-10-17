import type Lenis from "lenis";

// Instancia única de Lenis para que el menú y el pie de página puedan desplazarse con ella
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToTarget(target: string | number) {
  if (instance) {
    instance.start();
    instance.scrollTo(target, { duration: 1.6 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    document.querySelector(target)?.scrollIntoView();
  }
}

export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
}

// Salto instantáneo, sin animación (por ejemplo, para volver al mismo punto tras cambiar de idioma)
export function jumpTo(y: number) {
  // Lenis puede creer que ya está en y (su valor no se entera del salto a 0 del navegador),
  // así que primero se mueve la página nativa y después se sincroniza Lenis
  window.scrollTo({ top: y });
  instance?.scrollTo(y, { immediate: true, force: true });
}
