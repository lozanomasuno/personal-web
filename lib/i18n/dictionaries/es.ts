/**
 * Diccionario en español (idioma por defecto).
 *
 * Define la forma de `Dictionary`: el diccionario inglés debe cumplir este mismo tipo,
 * de modo que TypeScript avisa si falta una traducción. Solo contiene textos de interfaz;
 * los contenidos editables (servicios, proyectos, precios) viven en `data/`.
 */
const es = {
  meta: {
    title: "Nelson Lozano — Ingeniero de Software y Front End Developer",
    description:
      "Portafolio de Nelson Lozano: desarrollo de interfaces, UI/UX, ecommerce " +
      "y soluciones digitales impulsadas por inteligencia artificial.",
    jobTitle: "Ingeniero de Software y Front End Developer",
    ogTagline: "Interfaces, ecommerce y soluciones digitales con IA.",
  },
  nav: {
    label: "Navegación principal",
    home: "Inicio",
    about: "Sobre mí",
    services: "Servicios",
    projects: "Proyectos",
    technologies: "Tecnologías",
    pricing: "Pricing",
    contact: "Contacto",
    cta: "Hablemos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    homeLink: "ir al inicio",
    skipToContent: "Saltar al contenido",
  },
  hero: {
    eyebrow: "Ingeniero de Software · Front End Developer",
    titleStart: "Desarrollo experiencias digitales que convierten ideas en ",
    titleHighlight: "productos reales.",
    description:
      "Soy Nelson Lozano, Ingeniero de Software y Front End Developer. Diseño y construyo " +
      "interfaces modernas, ecommerce y soluciones digitales impulsadas por tecnología " +
      "e inteligencia artificial.",
    primaryCta: "Ver proyectos",
    secondaryCta: "Conocer servicios",
    specialtiesLabel: "Especialidades",
    specialties: {
      frontend: "Front End",
      uiux: "UI/UX",
      ecommerce: "Ecommerce",
      ai: "IA y agentes",
    },
    imageAlt: "Imagen de perfil temporal",
    floating: {
      stackTitle: "Interfaces modernas",
      stackDetail: "React · Next.js · TypeScript",
      agentTitle: "Flujo agéntico",
      agentSteps: ["Contexto", "Razonamiento", "Acción"],
      chip: "Diseño + Código",
    },
  },
  showcase: {
    eyebrow: "Dashboard Showcase",
    title: "Interfaces de producto pensadas para decidir mejor.",
    description:
      "Composiciones de ejemplo que muestran cómo diseño y construyo dashboards: jerarquía " +
      "clara, componentes reutilizables y visualizaciones que se adaptan a cada pantalla.",
    illustrative: "Datos ilustrativos",
    illustrativeNote:
      "Todas las cifras de esta sección son ficticias y se usan solo como ejemplo de diseño.",
    tabsLabel: "Tipos de dashboard",
    tabs: {
      ecommerce: "Ecommerce",
      analytics: "Analítica",
      products: "Productos",
      automation: "IA y automatización",
    },
    vsPrevious: "vs. periodo anterior",
    widgets: {
      revenue: "Ingresos semanales",
      revenueUnit: "USD · últimas 12 semanas",
      topProducts: "Productos más vendidos",
      topProductsUnit: "% de los ingresos",
      recentOrders: "Pedidos recientes",
      activeUsers: "Usuarios activos",
      newCustomers: "Clientes nuevos",
      sessions: "Sesiones por día",
      funnel: "Embudo de conversión",
      funnelUnit: "% de las visitas",
      sources: "Fuentes de tráfico",
      vitals: "Rendimiento (Core Web Vitals)",
      inventory: "Inventario",
      product: "Producto",
      category: "Categoría",
      stock: "Stock",
      price: "Precio",
      status: "Estado",
      units: "unid.",
      pipeline: "Flujo agéntico",
      automationRate: "Tasa de automatización",
      automationRateNote: "solicitudes resueltas sin intervención manual",
      tasksPerDay: "Tareas por día",
      activity: "Actividad reciente",
    },
    status: {
      good: "Bueno",
      warning: "Atención",
      critical: "Crítico",
      neutral: "Agotado",
      paid: "Pagado",
      pending: "Pendiente",
      done: "Completado",
      running: "En curso",
      active: "Activo",
      lowStock: "Bajo stock",
    },
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Ingeniería, diseño y negocio en una misma interfaz.",
    paragraphs: [
      "Soy Ingeniero de Software y Front End Developer. Diseño y construyo interfaces para " +
        "productos digitales y comercio electrónico, cuidando cada paso entre la idea y el " +
        "código en producción.",
      "Combino criterios de UI/UX con una base sólida de ingeniería para crear experiencias " +
        "rápidas, accesibles y fáciles de mantener. Hoy amplío ese trabajo hacia la inteligencia " +
        "artificial: sistemas agénticos, automatización, RAG y soluciones basadas en LLMs.",
    ],
    competenciesLabel: "Áreas de especialidad",
    interestsTitle: "Explorando ahora",
    cta: "Hablemos",
    secondaryCta: "Ver servicios",
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Trabajo seleccionado.",
    description:
      "Una selección de proyectos donde se cruzan diseño, desarrollo y negocio. " +
      "Pronto encontrarás aquí casos de estudio detallados.",
    comingSoon: "Próximamente",
    techLabel: "Tecnologías",
    live: "Ver proyecto",
    repo: "Ver código",
    newTab: "(se abre en una pestaña nueva)",
    ctaTitle: "¿Tienes un proyecto en mente?",
    ctaText: "Cuéntame qué necesitas y te propongo la mejor forma de llevarlo a cabo.",
    cta: "Hablemos",
  },
  technologies: {
    eyebrow: "Tecnologías",
    title: "Herramientas que uso para construir.",
    description:
      "Un stack moderno para diseñar, desarrollar e integrar productos digitales, " +
      "del prototipo a la inteligencia artificial.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Modalidades claras, precios de referencia.",
    description:
      "Elige la modalidad que mejor se ajusta a tu proyecto. Cada propuesta se define " +
      "contigo según el alcance.",
    modes: { hourly: "Por hora", project: "Por proyecto" },
    from: "Desde",
    perHour: "/ hora",
    currency: "COP",
    includesLabel: "Incluye",
    cta: "Solicitar cotización",
    disclaimer:
      "Los precios son orientativos y pueden variar según el alcance, complejidad y " +
      "requerimientos del proyecto.",
    currencyNote: "Valores en pesos colombianos (COP).",
  },
  services: {
    eyebrow: "Servicios",
    title: "Del concepto a la interfaz en producción.",
    description:
      "Acompaño cada proyecto desde el diseño hasta el desarrollo, con foco en experiencia " +
      "de usuario, rendimiento y resultados de negocio.",
    stackLabel: "Tecnologías relacionadas",
    cta: "Hablemos de tu proyecto",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos de tu próximo proyecto.",
    description:
      "Cuéntame qué quieres construir. Con un poco de contexto puedo proponerte la " +
      "modalidad y el alcance que mejor se ajustan a tu idea.",
    channelsLabel: "Canales de contacto",
    channels: { email: "Email", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub" },
    newTab: "(se abre en una pestaña nueva)",
    tipsTitle: "Para una mejor propuesta, incluye:",
    tips: ["El objetivo del proyecto", "Alcance y funcionalidades clave", "Plazos o fechas importantes"],
    form: {
      title: "Escríbeme",
      name: "Nombre",
      email: "Correo electrónico",
      topic: "Tipo de proyecto",
      topicPlaceholder: "Selecciona una opción",
      topicOther: "Otro / aún no lo sé",
      message: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto, objetivos y plazos.",
      characters: "caracteres",
      submit: "Preparar correo",
      note: "Al enviar se abrirá tu aplicación de correo con el mensaje listo para enviar.",
      errors: {
        nameRequired: "Escribe tu nombre.",
        nameTooLong: "El nombre supera los {max} caracteres.",
        emailRequired: "Escribe tu correo electrónico.",
        emailInvalid: "Revisa el formato del correo (por ejemplo, nombre@dominio.com).",
        emailTooLong: "El correo supera los {max} caracteres.",
        messageRequired: "Escribe un mensaje.",
        messageTooShort: "El mensaje es muy corto: escribe al menos {min} caracteres.",
        messageTooLong: "El mensaje supera los {max} caracteres.",
        summary: "Revisa los campos marcados.",
      },
      success: "Se abrió tu aplicación de correo con el mensaje listo. Si no se abrió, escríbeme a {email}.",
      unavailable:
        "El correo de contacto aún no está configurado. Tu mensaje no se ha enviado; " +
        "inténtalo de nuevo más adelante.",
      subjectPrefix: "Portafolio",
    },
  },
  footer: {
    tagline: "Ingeniero de Software y Front End Developer. Interfaces, ecommerce y soluciones con IA.",
    navTitle: "Navegación",
    socialTitle: "Redes",
    languageTitle: "Idioma",
    backToTop: "Volver arriba",
    rights: "Todos los derechos reservados.",
  },
  notFound: {
    title: "Página no encontrada",
    description: "La dirección que buscas no existe o fue movida.",
    back: "Volver al inicio",
  },
};

export default es;

export type Dictionary = typeof es;
