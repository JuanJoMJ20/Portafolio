import { ui } from "@/data/ui";

// Fuente única de enlaces: la usan el menú y el pie de página.
// El índice coincide con el número de capítulo que muestra cada sección.
export const navLinks = [
  { href: "#inicio", label: ui.nav.home, index: "00" },
  { href: "#sobre-mi", label: ui.nav.about, index: "01" },
  { href: "#proyectos", label: ui.nav.projects, index: "02" },
  { href: "#testimonios", label: ui.nav.testimonials, index: "03" },
  { href: "#formacion", label: ui.nav.education, index: "04" },
  { href: "#experiencia", label: ui.nav.work, index: "05" },
  { href: "#contacto", label: ui.nav.contact, index: "06" },
  { href: "#servicios", label: ui.nav.services, index: "07" },
];
