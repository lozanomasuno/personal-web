import type { Localized } from "@/lib/i18n/config";

/**
 * Servicios profesionales mostrados en la sección "Servicios".
 *
 * Para añadir o editar un servicio basta con modificar este arreglo: el orden del
 * arreglo es el orden en pantalla. `icon` es el nombre de un icono registrado en
 * `serviceIcons` (components/sections/Services.tsx). `featured` hace que la tarjeta
 * ocupe más ancho en escritorio (se recomiendan como máximo dos destacados).
 */
export type ServiceIcon = "code" | "cart" | "pen" | "bot" | "globe";

export type Service = {
  id: string;
  icon: ServiceIcon;
  title: Localized;
  description: Localized;
  stack: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "frontend",
    icon: "code",
    featured: true,
    title: { es: "UI / Front End Development", en: "UI / Front End Development" },
    description: {
      es: "Desarrollo de interfaces modernas, accesibles, responsive y optimizadas.",
      en: "Development of modern, accessible, responsive and optimized interfaces.",
    },
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "ecommerce",
    icon: "cart",
    featured: true,
    title: { es: "Ecommerce Development", en: "Ecommerce Development" },
    description: {
      es:
        "Diseño y desarrollo de experiencias de compra digitales, tiendas online e " +
        "interfaces orientadas a conversión.",
      en: "Design and development of digital shopping experiences, online stores and conversion-focused interfaces.",
    },
    stack: ["Next.js", "React", "APIs", "UX"],
  },
  {
    id: "uiux",
    icon: "pen",
    title: { es: "UI/UX Design", en: "UI/UX Design" },
    description: {
      es: "Prototipado, diseño de interfaces, sistemas visuales y experiencias centradas en el usuario.",
      en: "Prototyping, interface design, visual systems and user-centered experiences.",
    },
    stack: ["Figma", "Design systems", "Prototyping"],
  },
  {
    id: "ai",
    icon: "bot",
    title: { es: "AI & Agentic Systems", en: "AI & Agentic Systems" },
    description: {
      es: "Desarrollo de automatizaciones, integraciones con LLMs, sistemas agénticos y soluciones inteligentes.",
      en: "Automations, LLM integrations, agentic systems and intelligent solutions.",
    },
    stack: ["LLMs", "RAG", "Python", "FastAPI"],
  },
  {
    id: "web",
    icon: "globe",
    title: { es: "Web Development", en: "Web Development" },
    description: {
      es: "Desarrollo de sitios web, landing pages y experiencias digitales utilizando React, Next.js y Webflow.",
      en: "Websites, landing pages and digital experiences built with React, Next.js and Webflow.",
    },
    stack: ["React", "Next.js", "Webflow"],
  },
];
