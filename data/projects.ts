import type { Localized } from "@/lib/i18n";

export type Device = "laptop" | "phone" | "watch" | "screen";

export type Project = {
  slug: string;
  title: string;
  device: Device;
  platform: Localized;
  tagline: Localized;
  description: Localized;
  highlights: Localized[];
  tags: string[];
  github: string; // Vacío = "pronto"
  // Opcional: ficha técnica en public/fichas/ (se abre en otra pestaña)
  sheet?: string;
  // Link directo al instalador (.exe / .apk) en GitHub Releases. Vacío = "pronto".
  // Sin downloadLabel no se muestra botón de descarga.
  download?: string;
  downloadLabel?: Localized;
  // Capturas dentro del dispositivo. Sin capturas se muestra el estado "en camino".
  // La primera también sirve de portada mientras carga el video.
  // Con varias imágenes, el dispositivo las rota solo mientras está en pantalla y muestra su "label".
  images: { src: string; alt: Localized; label?: Localized }[];
  // Opcional: MP4 en H.264 que avanza con el scroll dentro del dispositivo
  video?: string;
  // Opcional: capturas extra que se muestran en una tira debajo del dispositivo
  gallery?: { src: string; alt: Localized }[];
};

export const projects: Project[] = [
  {
    slug: "devpulse",
    title: "DevPulse",
    device: "laptop",
    platform: { es: "App de escritorio · Windows", en: "Desktop app · Windows" },
    tagline: {
      es: "Un dashboard que se adapta a tu cansancio, no al revés.",
      en: "A dashboard that adapts to your fatigue, not the other way around.",
    },
    description: {
      es: "Estima la carga mental de un programador mientras trabaja y reorganiza la pantalla para protegerle el foco. Si la carga pasa de 70/100, oculta lo secundario y cierra las apps que distraen.",
      en: "Estimates a developer's mental load while they work and rearranges the screen to protect their focus. Above 70/100 it hides secondary panels and closes distracting apps.",
    },
    highlights: [
      {
        es: "IA que se entrena en el propio equipo: aprende qué señales predicen la fatiga de cada persona.",
        en: "AI trained on the user's own machine: it learns which signals predict each person's fatigue.",
      },
      {
        es: "Interfaz adaptativa: de 4 columnas a «Enfoque Absoluto», con transiciones sin saltos.",
        en: "Adaptive interface: from 4 columns to “Absolute Focus”, with seamless transitions.",
      },
      {
        es: "Privacidad total: nada sale del equipo y del teclado solo se mide el ritmo.",
        en: "Full privacy: nothing leaves the machine, and only typing rhythm is measured.",
      },
    ],
    tags: ["Electron", "React", "TypeScript", "Tailwind CSS", "Machine Learning"],
    github: "https://github.com/JuanJoMJ20/DevPulse",
    sheet: "/fichas/devpulse.html",
    download: "https://github.com/JuanJoMJ20/DevPulse/releases/download/v1/DevPulse.exe",
    downloadLabel: { es: "Descargar .exe · Windows", en: "Download .exe · Windows" },
    images: [
      {
        src: "/images/DevPulse/dashboard.webp",
        alt: { es: "Panel completo de DevPulse con carga baja", en: "DevPulse full dashboard at low load" },
      },
    ],
    gallery: [
      {
        src: "/images/DevPulse/login.webp",
        alt: { es: "Inicio de sesión local de DevPulse", en: "DevPulse local sign-in" },
      },
      {
        src: "/images/DevPulse/analitica.webp",
        alt: {
          es: "Bloqueador de apps, mapa de flujo profundo y lo que la IA aprendió del usuario",
          en: "App blocker, deep-flow map and what the AI learned about the user",
        },
      },
    ],
  },
  {
    slug: "reparia",
    title: "RepararIA",
    device: "phone",
    platform: { es: "App móvil · iOS y Android", en: "Mobile app · iOS & Android" },
    tagline: { es: "Un experto en reparaciones en tu bolsillo.", en: "A repair expert in your pocket." },
    description: {
      es: "Diagnostica averías del hogar con IA: fotografías la falla o grabas el ruido de un equipo y te dice si puedes arreglarla tú con pasos guiados o si debes alejarte y llamar a un técnico.",
      en: "Diagnoses home breakdowns with AI: snap the fault or record a device's noise, and it tells you whether you can fix it yourself with guided steps or should step away and call a technician.",
    },
    highlights: [
      {
        es: "Gemini analiza la foto real y responde en un JSON con el formato exacto de la interfaz.",
        en: "Gemini analyzes the real photo and replies with JSON in the interface's exact format.",
      },
      {
        es: "Modo crítico: ante un riesgo, toda la app cambia de azul a rojo en 600 ms.",
        en: "Critical mode: when there's danger, the whole app shifts from blue to red in 600 ms.",
      },
      {
        es: "Inicio de sesión real e historial privado con Supabase y Row Level Security.",
        en: "Real sign-in and private history with Supabase and Row Level Security.",
      },
    ],
    tags: ["React Native", "Expo", "Supabase", "Gemini"],
    github: "https://github.com/JuanJoMJ20/RepararIA",
    sheet: "/fichas/repararia.html",
    download: "https://github.com/JuanJoMJ20/RepararIA/releases/download/v1/RepararIA.apk",
    downloadLabel: { es: "Descargar .apk · Android", en: "Download .apk · Android" },
    video: "/images/RepararIA/demo.mp4",
    images: [
      {
