import type { Localized } from "@/lib/i18n/config";

/**
 * Contenido editable de la sección "Sobre mí".
 *
 * - `competencies`: áreas destacadas (icono + título + descripción breve).
 * - `interests`: temas que se exploran actualmente.
 * - `stats`: cifras profesionales. Está VACÍO a propósito: solo deben añadirse datos
 *   reales y verificables (p. ej. años de experiencia). Mientras esté vacío, la
 *   sección no muestra ninguna cifra.
 *
 * @example stats: [{ value: "5+", label: { es: "años de experiencia", en: "years of experience" } }]
 */
export type CompetencyIcon = "engineering" | "frontend" | "ecommerce" | "uiux" | "architecture" | "ai" | "agents";

export const about = {
  competencies: [
    {
      icon: "engineering",
      title: { es: "Ingeniería de software", en: "Software engineering" },
      description: {
        es: "Bases sólidas para construir productos mantenibles y escalables.",
        en: "Solid foundations for maintainable, scalable products.",
      },
    },
    {
      icon: "frontend",
      title: { es: "Desarrollo Front End", en: "Front End development" },
      description: {
        es: "Interfaces rápidas, accesibles y responsive con React y Next.js.",
        en: "Fast, accessible, responsive interfaces with React and Next.js.",
      },
    },
    {
      icon: "ecommerce",
      title: { es: "Ecommerce", en: "Ecommerce" },
      description: {
        es: "Experiencias de compra claras, orientadas a la conversión.",
        en: "Clear shopping experiences focused on conversion.",
      },
    },
    {
      icon: "uiux",
      title: { es: "UI/UX", en: "UI/UX" },
      description: {
        es: "Diseño centrado en las personas, del prototipo al sistema visual.",
        en: "Human-centered design, from prototype to visual system.",
      },
    },
    {
      icon: "architecture",
      title: { es: "Arquitectura de interfaces", en: "Interface architecture" },
      description: {
        es: "Componentes reutilizables y estructuras front end fáciles de evolucionar.",
        en: "Reusable components and front end structures that are easy to evolve.",
      },
    },
    {
      icon: "ai",
      title: { es: "Inteligencia artificial", en: "Artificial intelligence" },
      description: {
        es: "Integración de LLMs y RAG en productos con utilidad real.",
        en: "Integrating LLMs and RAG into genuinely useful products.",
      },
    },
    {
      icon: "agents",
      title: { es: "Sistemas agénticos", en: "Agentic systems" },
      description: {
        es: "Flujos que razonan, usan herramientas y automatizan tareas.",
        en: "Workflows that reason, use tools and automate tasks.",
      },
    },
  ] satisfies Array<{ icon: CompetencyIcon; title: Localized; description: Localized }>,
  interests: [
    { es: "Inteligencia artificial", en: "Artificial intelligence" },
    { es: "Sistemas agénticos", en: "Agentic systems" },
    { es: "Automatización", en: "Automation" },
    { es: "RAG", en: "RAG" },
    { es: "LLMs", en: "LLMs" },
  ] satisfies Localized[],
  stats: [] as Array<{ value: string; label: Localized }>,
};
