import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/layout/StructuredData";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";

/**
 * Landing page. Cada sección es un componente independiente en `components/sections/`
 * y se añade aquí en orden; los `id` de las secciones navegables coinciden con
 * `sectionIds` en `data/site.ts`.
 */
export default function Page() {
  return (
    <>
      <StructuredData />
      <main id="main">
        <Hero />
        <DashboardShowcase />
        <About />
        <Services />
        <Projects />
        <Technologies />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
