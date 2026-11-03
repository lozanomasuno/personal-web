import type { Localized } from "@/lib/i18n/config";

/**
 * Proyectos de la sección "Proyectos".
 *
 * Las entradas actuales son MARCADORES (`placeholder: true`): no representan proyectos,
 * clientes ni resultados reales y se muestran con la etiqueta "Próximamente".
 *
 * Para publicar un proyecto real, reemplazar un marcador (o añadir una entrada) con:
 *  - `placeholder: false` (o quitar la propiedad),
 *  - textos reales en `title`, `category` y `description`,
 *  - `image`: captura en `public/images/projects/` (recomendado 1600×1000, 16:10);
 *    si no hay imagen, se dibuja la maqueta indicada en `mockup`,
 *  - `links.live` y/o `links.repo` solo si existen (los vacíos no se muestran).
 *
 * El primer proyecto se muestra destacado (ancho completo en escritorio).
 */
export type ProjectMockup = "store" | "dashboard" | "assistant";

export type Project = {
  id: string;
  title: Localized;
  category: Localized;
  description: Localized;
  tech: string[];
  mockup: ProjectMockup;
  image?: { src: string; alt: Localized; width: number; height: number };
  links?: { live?: string; repo?: string };
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "ecommerce-case",
    placeholder: true,
    mockup: "store",
    title: { es: "Caso de estudio de ecommerce", en: "Ecommerce case study" },
    category: { es: "Ecommerce · UI/UX", en: "Ecommerce · UI/UX" },
    description: {
      es:
        "Espacio reservado para un proyecto de comercio electrónico: el reto, la solución " +
        "de diseño y desarrollo, las tecnologías y el rol desempeñado.",
      en:
        "Reserved for an ecommerce project: the challenge, the design and development " +
        "solution, the technologies and the role played.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "dashboard-case",
    placeholder: true,
    mockup: "dashboard",
    title: { es: "Dashboard de producto", en: "Product dashboard" },
    category: { es: "Front End · Datos", en: "Front End · Data" },
    description: {
      es: "Espacio reservado para un dashboard o panel de gestión desarrollado de punta a punta.",
      en: "Reserved for a dashboard or management panel built end to end.",
    },
    tech: ["React", "TypeScript", "APIs"],
  },
  {
    id: "ai-case",
    placeholder: true,
    mockup: "assistant",
    title: { es: "Solución con IA", en: "AI solution" },
    category: { es: "IA · Automatización", en: "AI · Automation" },
    description: {
      es: "Espacio reservado para un proyecto con LLMs, RAG o un flujo agéntico de automatización.",
      en: "Reserved for a project using LLMs, RAG or an agentic automation workflow.",
    },
    tech: ["Python", "FastAPI", "LLMs", "RAG"],
  },
];
