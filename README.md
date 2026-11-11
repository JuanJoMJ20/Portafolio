# Portafolio · Juan José Muñoz Jurado

Portafolio personal para Diseño de Interfaces, hecho con Next.js (App Router), TypeScript y Tailwind CSS, exportado como sitio estático para Netlify. Está en español e inglés.

Es un recorrido de scrollytelling: Lenis suaviza el scroll, GSAP + ScrollTrigger (siempre con `scrub: true`) mueven cada animación con la rueda, y una nube de partículas en Three.js acompaña el inicio y las transiciones entre capítulos.

## Sistema de diseño

- **Color:** tres tokens por tema en `app/globals.css`: `--bg`, `--fg` y `--accent` (el cian de MJ Digital Lab, `#00D4F0`), más `--on-accent`, la tinta que va siempre encima del cian. El cian es el primario: bloques enteros (Proyectos, Contacto), botones y detalles. El tema claro es el predeterminado; el sol/luna del menú activa el oscuro y se recuerda.
- **Tipografía:** Inter Tight (neo-grotesca) para titulares gigantes y Geist Mono para micro-etiquetas.
- **Idioma:** botón ES / EN en el menú. Los textos de la interfaz están en `data/ui.ts` y el contenido en cada archivo de `data/`, siempre como `{ es, en }`.
- **Movimiento:** se añade con atributos `data-reveal` (`split`, `fade`, `line`, `rise`, `clip`, `drift`) que lee `components/Reveals.tsx`. El Hero tiene su propia línea de tiempo con pin, y Proyectos mueve los dispositivos con parallax.
- **Escena 3D:** `components/Scene.tsx`. Cada sección con `data-scene` hace avanzar un cambio de forma, y con `data-dim` baja la escena a esa opacidad mientras se lee.
- **Movimiento reducido:** si el sistema lo pide, no hay Lenis ni animaciones y todo se muestra estático.

## Arrancar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

```
app/
  layout.tsx        Fuentes, tema claro/oscuro sin parpadeo, grano y Lenis
  icon.svg          Favicon con el logo de MJ Digital Lab
  page.tsx          Une las secciones en el orden de la guía
  globals.css       Tokens de color y escala tipográfica
components/
  Navbar.tsx        1. Menú (idioma, tema, CV, barra de avance)
  Hero.tsx          2. Bienvenida con foto + botón Descargar CV
  About.tsx         3. Acerca de mí
  Projects.tsx      4. Proyectos con mockups (DeviceFrame.tsx)
  Testimonials.tsx  5. Testimonios
  Education.tsx     6. Experiencia académica (Formación)
  Experience.tsx    6. Experiencia laboral
  Contact.tsx       7. Contactos (formulario → Google Sheets)
  Services.tsx      ⭐ Sección adicional: Servicios
  Footer.tsx        8. Pie de página
  Scene.tsx         Fondo 3D ligado al scroll
  Reveals.tsx       Animaciones declarativas con data-reveal
  tech-icons.ts     Logos de tecnologías (simple-icons)
lib/                gsap.ts, lenis.ts e i18n.tsx (idioma)
data/               Todo tu contenido en español e inglés
public/             cv.pdf, perfil.webp y capturas en images/<Proyecto>/
```

Todo el texto se edita en `data/`, sin tocar los componentes.

## Pendientes antes de entregar

- [x] CV, capturas de los 4 proyectos, testimonios y experiencia del CV.
- [ ] **Instaladores:** sube cada `.exe` / `.apk` a GitHub Releases de su repositorio y pega el link directo del archivo en `download` de `data/projects.ts`. Vacío = "pronto". Dead Echo no tiene botón de descarga.
- [ ] **Formulario → Google Sheets:** sigue los pasos al inicio de `google-apps-script/Contacto.gs` y pega la URL `/exec` en `contactEndpoint` de `data/profile.ts`. Cada mensaje queda como fila en la hoja y te llega un aviso al correo.

## Publicar en Netlify (arrastrar y soltar)

El proyecto está configurado como exportación estática (`output: "export"` en `next.config.ts`).

1. Pega la URL del Apps Script en `contactEndpoint` (`data/profile.ts`) **antes** de compilar: queda escrita dentro de la carpeta generada.
2. Compila:

   ```bash
   npm run build
   ```

3. Se crea la carpeta `out/`. Esa es la única que se sube: en app.netlify.com → **Add new site → Deploy manually**, arrastra `out/`.
4. Para actualizar el sitio, repite `npm run build` y arrastra la nueva `out/` en **Deploys** del mismo sitio.

`out/` se regenera en cada compilación y está en `.gitignore`: no la edites a mano.

## Subir un instalador a GitHub Releases

1. En github.com abre el repositorio de la app → **Releases** → **Draft a new release**.
2. En **Choose a tag** escribe `v1.0.0` y crea la etiqueta.
3. Arrastra el `.exe` o `.apk` a la zona de archivos y pulsa **Publish release**.
4. Clic derecho sobre el archivo publicado → **Copiar dirección del enlace**. Ese link va en `download`.
