import type { Localized } from "@/lib/i18n/config";
import type { NumberFormat } from "@/lib/format";

/**
 * DATOS ILUSTRATIVOS de los dashboards de la sección "Dashboard Showcase".
 *
 * Son valores ficticios creados para mostrar diseño de interfaces; no corresponden
 * a proyectos, clientes ni resultados reales. La interfaz los rotula como
 * "Datos ilustrativos". Las cifras se mantienen coherentes entre sí
 * (p. ej. ingresos del mes = suma de las últimas 4 semanas; ticket = ingresos / pedidos).
 */

export type Kpi = {
  id: string;
  label: Localized;
  value: number;
  format: NumberFormat;
  /** Variación porcentual frente al periodo anterior. */
  delta?: number;
  /** Si `false`, una subida es negativa (p. ej. tiempo de respuesta). */
  upIsGood?: boolean;
};

export type SeriesPoint = { label: Localized; value: number };
export type Share = { label: Localized; value: number };
export type Status = "good" | "warning" | "critical" | "neutral";

const weeks = (count: number): Localized[] =>
  Array.from({ length: count }, (_, index) => ({ es: `S${index + 1}`, en: `W${index + 1}` }));

const days: Localized[] = [
  { es: "Lun", en: "Mon" },
  { es: "Mar", en: "Tue" },
  { es: "Mié", en: "Wed" },
  { es: "Jue", en: "Thu" },
  { es: "Vie", en: "Fri" },
  { es: "Sáb", en: "Sat" },
  { es: "Dom", en: "Sun" },
];

/* ------------------------------------------------------------------ */
/* 1. Ecommerce                                                         */
/* ------------------------------------------------------------------ */

const weeklyRevenue = [8100, 8800, 8400, 9600, 10200, 10900, 10400, 11400, 11400, 12100, 11600, 13100];

export const ecommerceDashboard = {
  kpis: [
    { id: "revenue", label: { es: "Ingresos", en: "Revenue" }, value: 48200, format: "currency", delta: 12.4 },
    { id: "orders", label: { es: "Pedidos", en: "Orders" }, value: 1284, format: "number", delta: 8.1 },
    {
      id: "conversion",
      label: { es: "Tasa de conversión", en: "Conversion rate" },
      value: 3.8,
      format: "percent",
      delta: 4.2,
    },
    { id: "aov", label: { es: "Ticket promedio", en: "Avg. order value" }, value: 37.54, format: "currency", delta: -2.1 },
  ] satisfies Kpi[],
  revenue: weeklyRevenue.map((value, index) => ({ label: weeks(12)[index], value })) satisfies SeriesPoint[],
  topProducts: [
    { label: { es: "Audífonos inalámbricos", en: "Wireless headphones" }, value: 24 },
    { label: { es: "Reloj inteligente", en: "Smart watch" }, value: 18 },
    { label: { es: "Teclado mecánico", en: "Mechanical keyboard" }, value: 14 },
    { label: { es: "Lámpara de escritorio", en: "Desk lamp" }, value: 9 },
  ] satisfies Share[],
  orders: [
    { id: "#1048", customer: "M. Rojas", total: 82.4, status: "good" },
    { id: "#1047", customer: "A. Gómez", total: 39.9, status: "warning" },
    { id: "#1046", customer: "J. Pérez", total: 126.0, status: "good" },
  ] satisfies Array<{ id: string; customer: string; total: number; status: Status }>,
};

/* ------------------------------------------------------------------ */
/* 2. Analítica y métricas                                              */
/* ------------------------------------------------------------------ */

export const analyticsDashboard = {
  activeUsers: {
    value: 24800,
    delta: 9.3,
    trend: [16.2, 17.1, 16.8, 18.4, 19.0, 18.7, 20.3, 21.1, 20.6, 22.4, 23.5, 24.8],
  },
  newCustomers: { value: 1148, delta: 14.2 },
  sessions: [3200, 3800, 4100, 3900, 4600, 2700, 2400].map((value, index) => ({
    label: days[index],
    value,
  })) satisfies SeriesPoint[],
  funnel: [
    { label: { es: "Visitas", en: "Visits" }, value: 100 },
    { label: { es: "Vista de producto", en: "Product view" }, value: 58 },
    { label: { es: "Carrito", en: "Add to cart" }, value: 21 },
    { label: { es: "Checkout", en: "Checkout" }, value: 9.4 },
    { label: { es: "Compra", en: "Purchase" }, value: 3.8 },
  ] satisfies Share[],
  sources: [
    { label: { es: "Orgánico", en: "Organic" }, value: 42 },
    { label: { es: "Directo", en: "Direct" }, value: 27 },
    { label: { es: "Redes sociales", en: "Social" }, value: 18 },
    { label: { es: "Email", en: "Email" }, value: 13 },
  ] satisfies Share[],
  /** Core Web Vitals: `ratio` = valor / umbral "bueno" de Google (≤ 1 es bueno). */
  vitals: [
    { id: "LCP", value: "1,9 s", valueEn: "1.9 s", ratio: 0.76, status: "good" },
    { id: "INP", value: "120 ms", valueEn: "120 ms", ratio: 0.6, status: "good" },
    { id: "CLS", value: "0,03", valueEn: "0.03", ratio: 0.3, status: "good" },
  ] satisfies Array<{ id: string; value: string; valueEn: string; ratio: number; status: Status }>,
};

/* ------------------------------------------------------------------ */
/* 3. Gestión de productos                                              */
/* ------------------------------------------------------------------ */

export const productsDashboard = {
  kpis: [
    { id: "active", label: { es: "Productos activos", en: "Active products" }, value: 342, format: "number" },
    { id: "low", label: { es: "Bajo stock", en: "Low stock" }, value: 12, format: "number" },
    { id: "categories", label: { es: "Categorías", en: "Categories" }, value: 18, format: "number" },
    { id: "drafts", label: { es: "Borradores", en: "Drafts" }, value: 7, format: "number" },
  ] satisfies Kpi[],
  products: [
    {
      name: { es: "Audífonos inalámbricos", en: "Wireless headphones" },
      sku: "AUD-0142",
      category: { es: "Audio", en: "Audio" },
      stock: 184,
      capacity: 250,
      price: 59.9,
      status: "good",
    },
    {
      name: { es: "Reloj inteligente", en: "Smart watch" },
      sku: "WTC-0088",
      category: { es: "Wearables", en: "Wearables" },
      stock: 23,
      capacity: 200,
      price: 129.0,
      status: "warning",
    },
    {
      name: { es: "Teclado mecánico", en: "Mechanical keyboard" },
      sku: "KEY-0310",
      category: { es: "Periféricos", en: "Peripherals" },
      stock: 96,
      capacity: 150,
      price: 89.5,
      status: "good",
    },
    {
      name: { es: "Lámpara de escritorio", en: "Desk lamp" },
      sku: "LMP-0027",
      category: { es: "Hogar", en: "Home" },
      stock: 4,
      capacity: 120,
      price: 34.0,
      status: "critical",
    },
    {
      name: { es: "Soporte para portátil", en: "Laptop stand" },
      sku: "STD-0215",
      category: { es: "Accesorios", en: "Accessories" },
      stock: 0,
      capacity: 100,
      price: 42.0,
      status: "neutral",
    },
  ] satisfies Array<{
    name: Localized;
    sku: string;
    category: Localized;
    stock: number;
    capacity: number;
    price: number;
    status: Status;
  }>,
};

/* ------------------------------------------------------------------ */
/* 4. IA y automatización                                               */
/* ------------------------------------------------------------------ */

export const automationDashboard = {
  kpis: [
    {
      id: "workflows",
      label: { es: "Flujos activos", en: "Active workflows" },
      value: 14,
      format: "number",
    },
    {
      id: "tasks",
      label: { es: "Tareas automatizadas", en: "Automated tasks" },
      value: 1920,
      format: "number",
      delta: 21,
    },
    {
      id: "response",
      label: { es: "Respuesta media (s)", en: "Avg. response (s)" },
      value: 1.8,
      format: "number",
      delta: -12,
      upIsGood: false,
    },
  ] satisfies Kpi[],
  /** Porcentaje de solicitudes resueltas sin intervención manual. */
  automationRate: 72,
  /** Etapas de un flujo agéntico tipo RAG; `done` marca las completadas en la ejecución mostrada. */
  pipeline: [
    { id: "ingest", label: { es: "Ingesta", en: "Ingest" }, detail: { es: "Documentos y catálogo", en: "Docs & catalog" }, done: true },
    { id: "retrieve", label: { es: "Recuperación", en: "Retrieval" }, detail: { es: "Búsqueda vectorial (RAG)", en: "Vector search (RAG)" }, done: true },
    { id: "reason", label: { es: "Razonamiento", en: "Reasoning" }, detail: { es: "LLM con herramientas", en: "LLM with tools" }, done: true },
    { id: "act", label: { es: "Acción", en: "Action" }, detail: { es: "Respuesta o integración", en: "Reply or integration" }, done: false },
  ],
  tasksPerDay: [210, 248, 265, 251, 302, 188, 156].map((value, index) => ({
    label: days[index],
    value,
  })) satisfies SeriesPoint[],
  activity: [
    {
      text: { es: "Ticket #2381 clasificado y respondido", en: "Ticket #2381 classified and answered" },
      time: { es: "hace 2 min", en: "2 min ago" },
    },
    {
      text: { es: "Catálogo indexado para búsqueda semántica", en: "Catalog indexed for semantic search" },
      time: { es: "hace 14 min", en: "14 min ago" },
    },
    {
      text: { es: "Resumen semanal de ventas generado", en: "Weekly sales summary generated" },
      time: { es: "hace 1 h", en: "1 h ago" },
    },
  ],
};
