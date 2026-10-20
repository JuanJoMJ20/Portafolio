import type { Localized } from "@/lib/i18n";

export type Testimonial = {
  name: string;
  role: Localized; // Cargo o relación: "Cliente · GISA", "Profesor", "Compañera"
  text: Localized; // Si solo lo tienes en un idioma, pon el mismo texto en los dos
  photo?: string; // Opcional: "/images/testimonios/nombre.jpg"
};

// Testimonios reales de clientes. El texto en español es el original; el inglés es una traducción.
export const testimonials: Testimonial[] = [
  {
    name: "Jose Alberto",
    role: { es: "Dueño y gerente · Ferretería J. Alberto S.A.S.", en: "Owner & manager · Ferretería J. Alberto S.A.S." },
    text: {
      es: "Trabajar con Juan José ha marcado un antes y un después en Ferretería J. Alberto. Su capacidad para entender un negocio de gran trayectoria y llevarlo al siguiente nivel tecnológico es excepcional. Gracias al desarrollo a medida de las calculadoras web J.MAS y la automatización de cotizaciones por WhatsApp, hemos agilizado enormemente la atención y los presupuestos para nuestros clientes de obra. Además, su innovador uso de inteligencia artificial para nuestro contenido audiovisual modernizó por completo la imagen de la empresa. Un profesional integral, resolutivo y altamente recomendado.",
      en: "Working with Juan José marked a before and after for Ferretería J. Alberto. His ability to understand a long-established business and take it to the next technological level is exceptional. Thanks to the custom J.MAS web calculators and the automated WhatsApp quotes, we've greatly sped up service and estimates for our construction customers. On top of that, his innovative use of artificial intelligence for our video content completely modernized the company's image. A well-rounded, resourceful professional I highly recommend.",
    },
  },
  {
    name: "Vladimir",
    role: { es: "Dueño · Tink+U Lab", en: "Owner · Tink+U Lab" },
    text: {
      es: "Juan José fue una pieza fundamental en la construcción y despliegue del sitio web de Tink+U Lab. Su dominio en el desarrollo frontend y la optimización SEO nos permitió lanzar un ecosistema de landing pages rápido, escalable y enfocado en la conversión.",
      en: "Juan José was a key piece in building and launching the Tink+U Lab website. His command of frontend development and SEO optimization let us launch a fast, scalable, conversion-focused ecosystem of landing pages.",
    },
  },
  {
    name: "Johana",
    role: {
      es: "Gerente · Grupo Integral de Soluciones Avanzadas S.A.S.",
      en: "Manager · Grupo Integral de Soluciones Avanzadas S.A.S.",
    },
    text: {
      es: "Trabajar con Juan José y MJ Digital Lab en el desarrollo de nuestra web corporativa fue un acierto total. Demostró un nivel técnico excelente y comprendió nuestra visión comercial a la perfección, entregándonos una plataforma robusta y profesional.",
      en: "Working with Juan José and MJ Digital Lab on our corporate website was absolutely the right call. He showed excellent technical skill and understood our business vision perfectly, delivering a solid, professional platform.",
    },
  },
  {
    name: "Alejandra",
    role: { es: "Administradora · Ferretería Pasto Plaza", en: "Administrator · Ferretería Pasto Plaza" },
    text: {
      es: "La digitalización de nuestra ferretería estuvo en las mejores manos con Juan José. Su trabajo implementando nuestro posicionamiento en Google y la atención automatizada por WhatsApp transformó por completo nuestra forma de conectar con los clientes.",
      en: "Our hardware store's digital transformation was in the best hands with Juan José. His work setting up our Google positioning and automated WhatsApp support completely changed the way we connect with customers.",
    },
  },
];
