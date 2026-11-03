import { ArrowRight, Bot, CodeXml, Globe, PenTool, ShoppingCart, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type ServiceIcon } from "@/data/services";
import { cn } from "@/lib/cn";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Sección "Servicios" (servidor).
 *
 * Renderiza `data/services.ts` en una cuadrícula tipo bento: en escritorio los servicios
 * destacados (`featured`) ocupan media fila y el resto un tercio; en tablet, dos columnas;
 * en móvil, una. Las tarjetas destacadas incluyen una pequeña ilustración decorativa.
 * Cada tarjeta tiene un único enlace (CTA) hacia la sección de contacto.
 */
/** Modalidad de `data/pricing.ts` que se preselecciona en Contacto desde cada servicio. */
const serviceTopics: Record<string, string> = {
  frontend: "frontend",
  ecommerce: "ecommerce",
  uiux: "uiux",
  ai: "ai",
  web: "landing",
};

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  code: CodeXml,
  cart: ShoppingCart,
  pen: PenTool,
  bot: Bot,
  globe: Globe,
};

export async function Services() {
  const locale = await getLocale();
  const { services: t } = await getDictionary();

  return (
    <section id="services" aria-labelledby="services-title" className="bg-mist py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading titleId="services-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />
        </Reveal>

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            const isLast = index === services.length - 1;
            return (
              <RevealItem
                as="li"
                key={service.id}
                className={cn(
                  "flex",
                  service.featured ? "lg:col-span-3" : "lg:col-span-2",
                  // Con un número impar de servicios, el último ocupa la fila completa en tablet.
                  isLast && services.length % 2 === 1 && "md:col-span-2 lg:col-span-2",
                )}
              >
                <Card
                  as="article"
                  interactive
                  aria-labelledby={`service-${service.id}`}
                  className="group flex w-full flex-col overflow-hidden p-6 sm:p-7"
                >
                  <div className={cn("flex items-start justify-between gap-4", service.featured && "sm:min-h-20")}>
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-items-center rounded-2xl bg-sky text-brand-strong transition-colors duration-500 ease-apple group-hover:bg-brand-strong group-hover:text-white"
                    >
                      <Icon className="size-5.5" strokeWidth={1.7} />
                    </span>
                    {service.featured ? <ServiceVisual id={service.id} /> : null}
                  </div>

                  <h3
                    id={`service-${service.id}`}
                    className="mt-6 text-xl font-semibold tracking-[-0.02em] text-ink sm:text-[1.375rem]"
                  >
                    {service.title[locale]}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body text-pretty">
                    {service.description[locale]}
                  </p>

                  <ul aria-label={t.stackLabel} className="mt-6 flex flex-wrap gap-2">
                    {service.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-body ring-1 ring-line/70"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    data-contact-topic={serviceTopics[service.id]}
                    className="mt-auto inline-flex items-center gap-1.5 self-start pt-7 text-sm font-semibold text-brand-strong transition-colors hover:text-brand-deep"
                  >
                    {t.cta}
                    <span className="sr-only">: {service.title[locale]}</span>
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Ilustraciones decorativas de las tarjetas destacadas (no contienen datos). */
function ServiceVisual({ id }: { id: string }) {
  if (id === "frontend") {
    return (
      <div
        aria-hidden="true"
        className="hidden h-20 w-44 flex-col justify-center rounded-xl bg-ink px-3 font-mono text-[0.625rem] leading-relaxed text-white/70 shadow-soft transition-transform duration-500 ease-apple group-hover:-translate-y-1 sm:flex"
      >
        <p>
          <span className="text-[#7cb4ff]">export</span> <span className="text-[#c4b5fd]">function</span>{" "}
          <span className="text-white">Hero</span>() {"{"}
        </p>
        <p className="pl-3">
          <span className="text-[#c4b5fd]">return</span> &lt;<span className="text-[#7cb4ff]">Section</span> /&gt;
        </p>
        <p>{"}"}</p>
      </div>
    );
  }

  if (id === "ecommerce") {
    return (
      <div
        aria-hidden="true"
        className="hidden h-20 w-44 flex-col justify-center gap-2 rounded-xl bg-white px-3 ring-1 ring-line shadow-soft transition-transform duration-500 ease-apple group-hover:-translate-y-1 sm:flex"
      >
        <div className="flex items-center gap-2">
          <span className="size-6 rounded-md bg-[linear-gradient(135deg,#eaf4ff,#bcd6fb)]" />
          <span className="flex flex-1 flex-col gap-1">
            <span className="h-1.5 w-16 rounded-full bg-line" />
            <span className="h-1.5 w-10 rounded-full bg-sky" />
          </span>
        </div>
        <span className="flex gap-1">
          <span className="h-1 flex-1 rounded-full bg-brand" />
          <span className="h-1 flex-1 rounded-full bg-brand" />
          <span className="h-1 flex-1 rounded-full bg-sky" />
        </span>
        <span className="h-4 rounded-md bg-brand-strong" />
      </div>
    );
  }

  return null;
}
