import type { Localized } from "@/lib/i18n";

export const profile = {
  name: "Juan José Muñoz Jurado",
  firstLine: "Juan José",
  secondLine: "Muñoz Jurado",
  initials: "JM",
  role: {
    es: "Desarrollador Full Stack y fundador de MJ Digital Lab",
    en: "Full Stack Developer and founder of MJ Digital Lab",
  } as Localized,
  tagline: {
    es: "Transformo necesidades de negocio en soluciones digitales escalables, combinando software moderno con inteligencia artificial.",
    en: "I turn business needs into scalable digital products, combining modern software with artificial intelligence.",
  } as Localized,
  bio: {
    es: "Soy desarrollador Full Stack en Pasto, Nariño. Trabajo el ciclo completo del software: diseño UX/UI, desarrollo y despliegue de plataformas web impulsadas por IA que mejoran la conversión y la experiencia de quien las usa.",
    en: "I'm a Full Stack developer based in Pasto, Colombia. I work across the whole software cycle: UX/UI design, development and deployment of AI-powered web platforms that improve conversion and user experience.",
  } as Localized,
  // Foto sin fondo (PNG/WebP con transparencia)
  photo: "/images/perfil.webp",
  cv: "/cv.pdf",
  // URL /exec del Apps Script que guarda los mensajes en Google Sheets (google-apps-script/Contacto.gs).
  // Vacía = el formulario muestra el aviso para escribir directo al correo.
  contactEndpoint:
    "https://script.google.com/macros/s/AKfycbwpTWd5Azx2xu3imzLz7H-QT4ojRR--fUPG4G7CHwXDrbey1kd1su44xx-JTxFrPeOyrg/exec",
  location: "Pasto, Nariño, Colombia",
  facts: [
    { label: { es: "Ubicación", en: "Location" }, value: { es: "Pasto, Nariño", en: "Pasto, Colombia" } },
    {
      label: { es: "Universidad", en: "University" },
      value: { es: "Ingeniería de Software, 5.° semestre", en: "Software Engineering, 5th semester" },
    },
    {
      label: { es: "SENA", en: "SENA" },
      value: { es: "Tecnología en Análisis y Desarrollo de Software (ADSO)", en: "Software Development Technologist (ADSO)" },
    },
    {
      label: { es: "Intereses", en: "Interests" },
      value: {
        es: "Arquitectura de software, IA e identidad visual",
        en: "Software architecture, AI and visual identity",
      },
    },
  ] as { label: Localized; value: Localized }[],
  // Cada nombre debe existir en components/tech-icons.ts para mostrar su ícono
  skills: [
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "React",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Kotlin",
    "Electron",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Supabase",
  ],
  contact: {
    email: "juanjomunozjurado@gmail.com",
    linkedin: "https://www.linkedin.com/in/juan-jo-mu%C3%B1oz-j-652903401",
    github: "https://github.com/JuanJoMJ20",
    whatsapp: "https://wa.me/573182021180",
    whatsappLabel: "+57 318 202 1180",
  },
};
