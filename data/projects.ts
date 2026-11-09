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
        src: "/images/RepararIA/portada.webp",
        alt: { es: "Recorrido por RepararIA: inicio, captura y diagnóstico", en: "RepararIA walkthrough: home, capture and diagnosis" },
      },
    ],
  },
  {
    slug: "calmwrist",
    title: "CalmWrist",
    device: "watch",
    platform: { es: "App para smartwatch · Wear OS", en: "Smartwatch app · Wear OS" },
    tagline: { es: "Intervención proactiva para crisis de ansiedad.", en: "Proactive help for anxiety attacks." },
    description: {
      es: "Detecta en el pulso cuándo empieza una crisis de ansiedad y actúa antes de que escale, sin que la persona tenga que tocar nada en el peor momento.",
      en: "Detects from the heart rate when an anxiety attack is starting and acts before it escalates, without the person having to touch anything at the worst moment.",
    },
    highlights: [
      {
        es: "Respiración guiada con vibraciones sincronizadas que arranca sola.",
        en: "Guided breathing with synced haptics that starts on its own.",
      },
      {
        es: "Mensajes de apoyo generados con Gemini según el contexto de cada persona.",
        en: "Supportive messages generated with Gemini for each person's context.",
      },
      {
        es: "Historial y carta mensual para ver patrones, también junto al terapeuta.",
        en: "History and a monthly letter to spot patterns, also alongside a therapist.",
      },
    ],
    tags: ["Kotlin", "Jetpack Compose", "Wear OS", "Gemini"],
    github: "https://github.com/JuanJoMJ20/CalmWrist",
    sheet: "/fichas/calmwrist.html",
    download: "https://github.com/JuanJoMJ20/CalmWrist/releases/download/v1/CalmWrist.apk",
    downloadLabel: { es: "Descargar .apk · Wear OS", en: "Download .apk · Wear OS" },
    images: [
      {
        src: "/images/CalmWrist/calma.webp",
        alt: { es: "CalmWrist en reposo: tu ritmo está estable", en: "CalmWrist at rest: your heart rate is steady" },
        label: { es: "Calma", en: "Calm" },
      },
      {
        src: "/images/CalmWrist/crisis-guia.webp",
        alt: { es: "CalmWrist guiando la respiración en una crisis", en: "CalmWrist guiding breathing during an attack" },
        label: { es: "Crisis · respiración guiada", en: "Attack · guided breathing" },
      },
      {
        src: "/images/CalmWrist/resuelto.webp",
        alt: { es: "CalmWrist confirma que el episodio pasó", en: "CalmWrist confirms the episode is over" },
        label: { es: "Episodio superado", en: "Episode over" },
      },
      {
        src: "/images/CalmWrist/historial.webp",
        alt: { es: "Historial de episodios y su tendencia", en: "Episode history and its trend" },
        label: { es: "Historial", en: "History" },
      },
      {
        src: "/images/CalmWrist/carta.webp",
        alt: { es: "Carta mensual generada con Gemini", en: "Monthly letter generated with Gemini" },
        label: { es: "Carta mensual", en: "Monthly letter" },
      },
    ],
  },
  {
    slug: "dead-echo",
    title: "Dead Echo",
    device: "screen",
    platform: { es: "Videojuego", en: "Video game" },
    tagline: { es: "Survival horror en primera persona.", en: "First-person survival horror." },
    description: {
      es: "Eres Leon y llegas a Valdeoscuro, un pueblo perdido en la niebla donde los aldeanos, los Ganados, vienen a por ti en oleadas. Sobrevives, encuentras documentos, recibes llamadas de Ingrid y hablas con Tomás, un superviviente: así se cuenta el Capítulo 1.",
      en: "You're Leon, arriving in Valdeoscuro, a fog-bound village where the villagers, the Ganados, come at you in waves. You survive, find documents, get radio calls from Ingrid and talk to Tomás, a survivor: that's how Chapter 1 unfolds.",
    },
    highlights: [
      {
        es: "NPC con diálogo por IA: Tomás responde con Gemini y voz TTS, con diálogos escritos si no hay conexión.",
        en: "AI-driven NPC dialogue: Tomás replies with Gemini and a TTS voice, with written lines when offline.",
      },
      {
        es: "Combate completo: 8 tipos de arma, cuchillo con parry que se desgasta y un Tyrant como jefe final.",
        en: "Full combat: 8 weapon types, a parry knife that wears down and a Tyrant as the final boss.",
      },
      {
        es: "Supervivencia: maletín por cuadrícula, fabricación, mercader con pesetas y guardado con 3 ranuras.",
        en: "Survival: grid briefcase inventory, crafting, a merchant that trades in pesetas and 3-slot saves.",
      },
      {
        es: "Ambiente: niebla, tormentas, noches con linterna, música a medida y voces en español.",
        en: "Atmosphere: fog, storms, flashlight nights, a custom score and Spanish voice acting.",
      },
    ],
    tags: ["Unity", "C#", "Gemini"],
    github: "https://github.com/Vasquezjuan7/Game-type-resident-evil-4",
    video: "/images/DeadEcho/intro.mp4",
    images: [
      {
        src: "/images/DeadEcho/portada.webp",
        alt: { es: "Intro de Dead Echo: el expediente de la hija del Presidente", en: "Dead Echo intro: the President's daughter's file" },
      },
    ],
    gallery: [
      {
        src: "/images/DeadEcho/menu.webp",
        alt: { es: "Menú principal de Dead Echo entre la niebla", en: "Dead Echo main menu in the fog" },
      },
      {
        src: "/images/DeadEcho/capitulo.webp",
        alt: { es: "Capítulo 1: llegada al pueblo de Valdeoscuro", en: "Chapter 1: arriving in Valdeoscuro" },
      },
      {
        src: "/images/DeadEcho/oleada.webp",
        alt: { es: "Una oleada de aldeanos avanza durante el asedio", en: "A wave of villagers advances during the siege" },
      },
    ],
  },
];
