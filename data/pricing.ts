import type { Localized } from "@/lib/i18n/config";

/**
 * Modalidades de contratación y precios de referencia de la sección "Pricing".
 *
 * Los valores son ESTIMACIONES INICIALES EDITABLES en pesos colombianos (COP); la
 * interfaz los presenta como orientativos ("Desde …") junto con un aviso visible.
 * Para cambiar un precio, editar `price`. `unit: "hour"` muestra "/ hora" en lugar
 * de "Desde". `icon` debe existir en `pricingIcons` (components/sections/Pricing.tsx).
 */
export type PricingIcon = "hour" | "landing" | "frontend" | "ecommerce" | "uiux" | "ai";

export type PricingPlan = {
  id: string;
  icon: PricingIcon;
  name: Localized;
  /** Etiqueta de modalidad (por hora / por proyecto). */
  mode: "hourly" | "project";
  price: number;
  unit: "hour" | "project";
  features: Localized[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "hourly",
    icon: "hour",
    mode: "hourly",
    unit: "hour",
    price: 100_000,
    name: { es: "Desarrollo por hora", en: "Hourly development" },
    features: [
      { es: "Desarrollo de componentes", en: "Component development" },
      { es: "Mejoras de interfaces", en: "Interface improvements" },
      { es: "Consultoría técnica", en: "Technical consulting" },
      { es: "Optimización de Front End", en: "Front End optimization" },
      { es: "Asesoría en arquitectura de interfaces", en: "Interface architecture advice" },
    ],
  },
  {
    id: "landing",
    icon: "landing",
    mode: "project",
    unit: "project",
    price: 1_500_000,
    name: { es: "Landing Pages", en: "Landing Pages" },
    features: [
      { es: "Diseño responsive", en: "Responsive design" },
      { es: "Desarrollo Front End", en: "Front End development" },
      { es: "Animaciones", en: "Animations" },
      { es: "SEO básico", en: "Basic SEO" },
      { es: "Integración de formularios", en: "Form integration" },
    ],
  },
  {
    id: "frontend",
    icon: "frontend",
    mode: "project",
    unit: "project",
    price: 2_500_000,
    name: { es: "Desarrollo Front End", en: "Front End Development" },
    features: [
      { es: "Interfaces React", en: "React interfaces" },
      { es: "Componentes reutilizables", en: "Reusable components" },
      { es: "Integración de APIs", en: "API integration" },
      { es: "Responsive design", en: "Responsive design" },
      { es: "Optimización de rendimiento", en: "Performance optimization" },
    ],
  },
  {
    id: "ecommerce",
    icon: "ecommerce",
    mode: "project",
    unit: "project",
    price: 4_000_000,
    name: { es: "Ecommerce", en: "Ecommerce" },
    features: [
      { es: "Diseño de experiencia de compra", en: "Shopping experience design" },
      { es: "Interfaces de catálogo", en: "Catalog interfaces" },
      { es: "Optimización UX", en: "UX optimization" },
      { es: "Desarrollo de componentes", en: "Component development" },
      { es: "Integraciones según alcance", en: "Integrations based on scope" },
    ],
  },
  {
    id: "uiux",
    icon: "uiux",
    mode: "project",
    unit: "project",
    price: 1_200_000,
    name: { es: "UI/UX Design", en: "UI/UX Design" },
    features: [
      { es: "Diseño de interfaces", en: "Interface design" },
      { es: "Prototipos", en: "Prototypes" },
      { es: "Sistemas visuales", en: "Visual systems" },
      { es: "Componentes", en: "Components" },
      { es: "Diseño responsive", en: "Responsive design" },
    ],
  },
  {
    id: "ai",
    icon: "ai",
    mode: "project",
    unit: "project",
    price: 3_000_000,
    name: { es: "Automatización e IA", en: "Automation & AI" },
    features: [
      { es: "Automatizaciones", en: "Automations" },
      { es: "Integración de APIs", en: "API integration" },
      { es: "Flujos inteligentes", en: "Intelligent workflows" },
      { es: "Soluciones basadas en IA", en: "AI-based solutions" },
    ],
  },
];
