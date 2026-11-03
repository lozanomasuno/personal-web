import type { BrandIconName } from "@/components/icons/brand-icons";
import type { Localized } from "@/lib/i18n/config";

/**
 * Tecnologías de la sección "Tecnologías", agrupadas por categoría.
 *
 * Cada tecnología usa un logo de marca (`brand`, ver `components/icons/brand-icons.ts`)
 * o, para conceptos sin logo, un icono de Lucide (`concept`). Para añadir una tecnología
 * con logo nuevo, registrar primero su trazado en `brand-icons.ts`.
 *
 * `span` controla el ancho de la categoría en escritorio (columnas de 3).
 */
export type ConceptIcon = "rag" | "llm" | "agents" | "automation";
export type CategoryIcon = "frontend" | "design" | "backend" | "ai";

export type Technology = { name: Localized | string } & (
  | { kind: "brand"; icon: BrandIconName }
  | { kind: "concept"; icon: ConceptIcon }
);

export type TechCategory = {
  id: string;
  icon: CategoryIcon;
  title: Localized;
  description: Localized;
  span: 1 | 2;
  items: Technology[];
};

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    icon: "frontend",
    span: 2,
    title: { es: "Frontend", en: "Frontend" },
    description: {
      es: "Interfaces rápidas, accesibles y mantenibles.",
      en: "Fast, accessible and maintainable interfaces.",
    },
    items: [
      { name: "React", kind: "brand", icon: "react" },
      { name: "Next.js", kind: "brand", icon: "nextdotjs" },
      { name: "JavaScript", kind: "brand", icon: "javascript" },
      { name: "TypeScript", kind: "brand", icon: "typescript" },
      { name: "HTML", kind: "brand", icon: "html5" },
      { name: "CSS", kind: "brand", icon: "css" },
      { name: "Tailwind CSS", kind: "brand", icon: "tailwindcss" },
      { name: "Bootstrap", kind: "brand", icon: "bootstrap" },
    ],
  },
  {
    id: "design",
    icon: "design",
    span: 1,
    title: { es: "Diseño", en: "Design" },
    description: {
      es: "Del prototipo al sitio publicado.",
      en: "From prototype to published site.",
    },
    items: [
      { name: "Figma", kind: "brand", icon: "figma" },
      { name: "Webflow", kind: "brand", icon: "webflow" },
    ],
  },
  {
    id: "backend",
    icon: "backend",
    span: 1,
    title: { es: "Backend", en: "Backend" },
    description: {
      es: "APIs y servicios que conectan productos.",
      en: "APIs and services that connect products.",
    },
    items: [
      { name: "Node.js", kind: "brand", icon: "nodedotjs" },
      { name: "Python", kind: "brand", icon: "python" },
      { name: "FastAPI", kind: "brand", icon: "fastapi" },
    ],
  },
  {
    id: "ai",
    icon: "ai",
    span: 2,
    title: { es: "Inteligencia artificial", en: "Artificial intelligence" },
    description: {
      es: "Soluciones inteligentes construidas sobre LLMs.",
      en: "Intelligent solutions built on LLMs.",
    },
    items: [
      { name: "RAG", kind: "concept", icon: "rag" },
      { name: "LLMs", kind: "concept", icon: "llm" },
      { name: { es: "Sistemas agénticos", en: "Agentic systems" }, kind: "concept", icon: "agents" },
      { name: { es: "Automatización", en: "Automation" }, kind: "concept", icon: "automation" },
    ],
  },
];
