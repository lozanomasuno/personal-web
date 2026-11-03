import type { Dictionary } from "./es";

/**
 * Diccionario en inglés. Debe cumplir el tipo `Dictionary` definido por `es.ts`.
 */
const en: Dictionary = {
  meta: {
    title: "Nelson Lozano — Software Engineer & Front End Developer",
    description:
      "Portfolio of Nelson Lozano: interface development, UI/UX, ecommerce " +
      "and digital solutions powered by artificial intelligence.",
    jobTitle: "Software Engineer and Front End Developer",
    ogTagline: "Interfaces, ecommerce and AI-powered digital solutions.",
  },
  nav: {
    label: "Main navigation",
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    technologies: "Technologies",
    pricing: "Pricing",
    contact: "Contact",
    cta: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    homeLink: "go to home",
    skipToContent: "Skip to content",
  },
  hero: {
    eyebrow: "Software Engineer · Front End Developer",
    titleStart: "I build digital experiences that turn ideas into ",
    titleHighlight: "real products.",
    description:
      "I'm Nelson Lozano, a Software Engineer and Front End Developer. I design and build " +
      "modern interfaces, ecommerce and digital solutions powered by technology " +
      "and artificial intelligence.",
    primaryCta: "View projects",
    secondaryCta: "Explore services",
    specialtiesLabel: "Specialties",
    specialties: {
      frontend: "Front End",
      uiux: "UI/UX",
      ecommerce: "Ecommerce",
      ai: "AI & agents",
    },
    imageAlt: "Temporary profile image",
    floating: {
      stackTitle: "Modern interfaces",
      stackDetail: "React · Next.js · TypeScript",
      agentTitle: "Agentic workflow",
      agentSteps: ["Context", "Reasoning", "Action"],
      chip: "Design + Code",
    },
  },
  showcase: {
    eyebrow: "Dashboard Showcase",
    title: "Product interfaces designed for better decisions.",
    description:
      "Sample compositions that show how I design and build dashboards: clear hierarchy, " +
      "reusable components and visualizations that adapt to every screen.",
    illustrative: "Illustrative data",
    illustrativeNote: "Every figure in this section is fictional and used only as a design example.",
    tabsLabel: "Dashboard types",
    tabs: {
      ecommerce: "Ecommerce",
      analytics: "Analytics",
      products: "Products",
      automation: "AI & automation",
    },
    vsPrevious: "vs. previous period",
    widgets: {
      revenue: "Weekly revenue",
      revenueUnit: "USD · last 12 weeks",
      topProducts: "Top-selling products",
      topProductsUnit: "% of revenue",
      recentOrders: "Recent orders",
      activeUsers: "Active users",
      newCustomers: "New customers",
      sessions: "Sessions per day",
      funnel: "Conversion funnel",
      funnelUnit: "% of visits",
      sources: "Traffic sources",
      vitals: "Performance (Core Web Vitals)",
      inventory: "Inventory",
      product: "Product",
      category: "Category",
      stock: "Stock",
      price: "Price",
      status: "Status",
      units: "units",
      pipeline: "Agentic workflow",
      automationRate: "Automation rate",
      automationRateNote: "requests resolved without manual work",
      tasksPerDay: "Tasks per day",
      activity: "Recent activity",
    },
    status: {
      good: "Good",
      warning: "Attention",
      critical: "Critical",
      neutral: "Sold out",
      paid: "Paid",
      pending: "Pending",
      done: "Done",
      running: "Running",
      active: "Active",
      lowStock: "Low stock",
    },
  },
  about: {
    eyebrow: "About",
    title: "Engineering, design and business in a single interface.",
    paragraphs: [
      "I'm a Software Engineer and Front End Developer. I design and build interfaces for " +
        "digital products and ecommerce, taking care of every step between the idea and " +
        "production code.",
      "I combine UI/UX thinking with a solid engineering foundation to create fast, accessible " +
        "and maintainable experiences. Today I'm extending that work into artificial intelligence: " +
        "agentic systems, automation, RAG and LLM-based solutions.",
    ],
    competenciesLabel: "Areas of expertise",
    interestsTitle: "Exploring now",
    cta: "Let's talk",
    secondaryCta: "View services",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work.",
    description:
      "A selection of projects where design, development and business meet. " +
      "Detailed case studies are coming soon.",
    comingSoon: "Coming soon",
    techLabel: "Technologies",
    live: "View project",
    repo: "View code",
    newTab: "(opens in a new tab)",
    ctaTitle: "Have a project in mind?",
    ctaText: "Tell me what you need and I'll propose the best way to make it happen.",
    cta: "Let's talk",
  },
  technologies: {
    eyebrow: "Technologies",
    title: "The tools I build with.",
    description:
      "A modern stack to design, develop and integrate digital products, " +
      "from prototype to artificial intelligence.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Clear engagement models, reference prices.",
    description:
      "Choose the model that best fits your project. Every proposal is defined " +
      "with you based on scope.",
    modes: { hourly: "Hourly", project: "Per project" },
    from: "From",
    perHour: "/ hour",
    currency: "COP",
    includesLabel: "Includes",
    cta: "Request a quote",
    disclaimer:
      "Prices are indicative and may vary depending on the scope, complexity and " +
      "requirements of the project.",
    currencyNote: "Amounts in Colombian pesos (COP).",
  },
  services: {
    eyebrow: "Services",
    title: "From concept to production-ready interfaces.",
    description:
      "I support each project from design to development, focusing on user experience, " +
      "performance and business outcomes.",
    stackLabel: "Related technologies",
    cta: "Let's talk about your project",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your next project.",
    description:
      "Tell me what you want to build. With a bit of context I can propose the " +
      "engagement model and scope that best fit your idea.",
    channelsLabel: "Contact channels",
    channels: { email: "Email", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub" },
    newTab: "(opens in a new tab)",
    tipsTitle: "For a better proposal, include:",
    tips: ["The project goal", "Scope and key features", "Deadlines or important dates"],
    form: {
      title: "Write to me",
      name: "Name",
      email: "Email",
      topic: "Project type",
      topicPlaceholder: "Select an option",
      topicOther: "Other / not sure yet",
      message: "Message",
      messagePlaceholder: "Tell me about your project, goals and timeline.",
      characters: "characters",
      submit: "Prepare email",
      note: "Submitting opens your email app with the message ready to send.",
      errors: {
        nameRequired: "Enter your name.",
        nameTooLong: "The name exceeds {max} characters.",
        emailRequired: "Enter your email.",
        emailInvalid: "Check the email format (for example, name@domain.com).",
        emailTooLong: "The email exceeds {max} characters.",
        messageRequired: "Write a message.",
        messageTooShort: "The message is too short: write at least {min} characters.",
        messageTooLong: "The message exceeds {max} characters.",
        summary: "Please review the highlighted fields.",
      },
      success: "Your email app opened with the message ready. If it didn't open, write to {email}.",
      unavailable:
        "The contact email is not configured yet. Your message has not been sent; " +
        "please try again later.",
      subjectPrefix: "Portfolio",
    },
  },
  footer: {
    tagline: "Software Engineer and Front End Developer. Interfaces, ecommerce and AI solutions.",
    navTitle: "Navigation",
    socialTitle: "Social",
    languageTitle: "Language",
    backToTop: "Back to top",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or was moved.",
    back: "Back to home",
  },
};

export default en;
