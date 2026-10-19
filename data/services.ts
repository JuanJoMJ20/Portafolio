import type { Localized } from "@/lib/i18n";

export type Service = {
  title: Localized;
  description: Localized;
};

export const services: Service[] = [
  {
    title: { es: "Desarrollo web escalable", en: "Scalable web development" },
    description: {
      es: "Sitios corporativos y plataformas a la medida, rápidos, adaptables a cualquier pantalla y listos para crecer con tu negocio.",
      en: "Corporate sites and custom platforms that are fast, responsive and ready to grow with your business.",
    },
  },
  {
    title: { es: "Inteligencia artificial para negocios", en: "AI for business" },
    description: {
      es: "Asistentes, contenido y análisis con IA aplicados a tareas reales de tu empresa, sin que tengas que ser experto en tecnología.",
      en: "AI assistants, content and analytics applied to real tasks in your company, no tech expertise required.",
    },
  },
  {
    title: { es: "Automatización de procesos", en: "Process automation" },
    description: {
      es: "Flujos que responden, cotizan y registran por ti, por ejemplo cotizaciones automáticas por WhatsApp.",
      en: "Workflows that reply, quote and log for you, like automatic quotes over WhatsApp.",
    },
  },
  {
    title: { es: "Diseño UI/UX e identidad visual", en: "UI/UX design & visual identity" },
    description: {
      es: "Interfaces claras y marcas coherentes, desde el logo hasta la última pantalla de tu producto.",
      en: "Clear interfaces and consistent brands, from the logo to the last screen of your product.",
    },
  },
];
