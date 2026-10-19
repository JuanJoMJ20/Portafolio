import type { Localized } from "@/lib/i18n";

export type ExperienceItem = {
  type: "academica" | "laboral";
  title: Localized;
  place: string;
  date: Localized;
  description: Localized;
  // Logros concretos (del CV). Si existen, se muestran como lista en lugar de la descripción.
  highlights?: Localized[];
};

// Ordenado de lo más reciente a lo más antiguo
export const experience: ExperienceItem[] = [
  {
    type: "academica",
    title: { es: "Ingeniería de Software", en: "Software Engineering" },
    place: "Universidad Cooperativa de Colombia, sede Pasto",
    date: { es: "En curso · 5.° semestre", en: "In progress · 5th semester" },
    description: {
      es: "Formación en arquitectura de software, calidad, economía de proyectos y desarrollo full stack.",
      en: "Training in software architecture, quality, project economics and full stack development.",
    },
  },
  {
    type: "academica",
    title: {
      es: "Tecnología en Análisis y Desarrollo de Software (ADSO)",
      en: "Software Analysis and Development Technologist (ADSO)",
    },
    place: "SENA, Centro ASTIN",
    date: { es: "En curso", en: "In progress" },
    description: {
      es: "Análisis de requerimientos, modelado de bases de datos y construcción de aplicaciones web.",
      en: "Requirements analysis, database modeling and web application development.",
    },
  },
  {
    type: "laboral",
    title: { es: "Fundador y CEO", en: "Founder & CEO" },
    place: "MJ Digital Lab · Software & IA",
    date: { es: "Ene 2026 – Presente", en: "Jan 2026 – Present" },
    description: {
      es: "Agencia de software e IA para empresas de Nariño y Cauca.",
      en: "Software and AI agency for businesses in Nariño and Cauca.",
    },
    highlights: [
      {
        es: "Presencia digital para Ferretería Pasto Plaza: posicionamiento en Google y atención por WhatsApp.",
        en: "Digital presence for Ferretería Pasto Plaza: Google positioning and a WhatsApp support channel.",
      },
      {
        es: "Páginas web optimizadas para conversión, con foco en UX/UI e identidad visual corporativa.",
        en: "Conversion-focused websites built around UX/UI and corporate visual identity.",
      },
      {
        es: "Video oficial con IA del torneo «Luis Sinisterra» para el Club Colo Colo (Caloto, Cauca).",
        en: "Official AI-made teaser for the “Luis Sinisterra” tournament for Club Colo Colo (Caloto, Cauca).",
      },
    ],
  },
  {
    type: "laboral",
    title: { es: "Desarrollador web", en: "Web developer" },
    place: "Tink+U Lab",
    date: { es: "Mar 2026 – Presente", en: "Mar 2026 – Present" },
    description: {
      es: "Sitio institucional tinkulab.com.co y su ecosistema de landing pages.",
      en: "The tinkulab.com.co institutional site and its landing page ecosystem.",
    },
    highlights: [
      {
        es: "Diseño, desarrollo y despliegue de tinkulab.com.co en HTML, CSS y JavaScript puro, administrado en cPanel.",
        en: "Designed, built and deployed tinkulab.com.co in plain HTML, CSS and JavaScript, managed on cPanel.",
      },
      {
        es: "Optimización de la velocidad de carga y estructura semántica pensada para SEO.",
        en: "Load-time optimization and semantic structure built for SEO.",
      },
      {
        es: "Landing pages modulares para varias líneas de negocio con un sistema de diseño centralizado.",
        en: "Modular landing pages for several business lines on a centralized design system.",
      },
    ],
  },
  {
    type: "laboral",
    title: { es: "Desarrollador web", en: "Web developer" },
    place: "GISA · Grupo Integral de Soluciones Avanzadas S.A.S.",
    date: { es: "Oct 2026", en: "Oct 2026" },
    description: {
      es: "Sitio web corporativo de la empresa, de la propuesta al desarrollo.",
      en: "The company's corporate website, from proposal to development.",
    },
    highlights: [
      {
        es: "Propuesta comercial y brief técnico para definir alcance, contenidos y estructura.",
        en: "Commercial proposal and technical brief to define scope, content and structure.",
      },
      {
        es: "Diseño y desarrollo del sitio corporativo con identidad visual de la marca.",
        en: "Design and development of the corporate site in the brand's visual identity.",
      },
    ],
  },
  {
    type: "laboral",
    title: { es: "Marketing digital y tecnología", en: "Digital marketing & technology" },
    place: "Ferretería J. Alberto S.A.S.",
    date: { es: "2024 – Presente", en: "2024 – Present" },
    description: {
      es: "Herramientas web y automatizaciones para agilizar las cotizaciones de la ferretería.",
      en: "Web tools and automations that speed up the hardware store's quotes.",
    },
    highlights: [
      {
        es: "Dos herramientas web propias: la calculadora de materiales J.MAS y una de alquiler de andamios.",
        en: "Two in-house web tools: the J.MAS materials calculator and a scaffolding rental calculator.",
      },
      {
        es: "Cotizaciones automáticas por WhatsApp con Meta WhatsApp Cloud API y n8n (en desarrollo).",
        en: "Automated WhatsApp quotes with the Meta WhatsApp Cloud API and n8n (in progress).",
      },
      {
        es: "Videos de producto con IA y banco de imágenes alineado con la marca J.MAS.",
        en: "AI product videos and an image library aligned with the J.MAS brand.",
      },
    ],
  },
];
