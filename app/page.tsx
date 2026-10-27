import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Reveals from "@/components/Reveals";
import Scene from "@/components/Scene";
import { LangKeyed } from "@/lib/i18n";

export default function Home() {
  return (
    <LangKeyed>
      <Navbar /> {/* 1. Menú */}
      <main>
        <Hero /> {/* 2. Hero + foto + CV */}
        <About /> {/* 3. Acerca de mí */}
        <Projects /> {/* 4. Proyectos */}
        <Testimonials /> {/* 5. Testimonios */}
        <Education /> {/* 6. Experiencia académica */}
        <Experience /> {/* 6. Experiencia laboral */}
        <Contact /> {/* 7. Contactos */}
        <Services /> {/* ⭐ Sección adicional */}
      </main>
      <Footer /> {/* 8. Pie de página */}

      {/* Van al final a propósito: miden la página cuando los pins ya existen */}
      <Reveals />
      <Scene />
    </LangKeyed>
  );
}
