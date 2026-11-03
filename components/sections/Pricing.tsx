import {
  ArrowRight,
  Bot,
  Check,
  Clock,
  CodeXml,
  Info,
  LayoutTemplate,
  PenTool,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/ui/PricingCard";
import { pricingPlans, type PricingIcon } from "@/data/pricing";
import { formatCOP } from "@/lib/format";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Sección "Pricing" (servidor).
 *
 * Renderiza `data/pricing.ts` con `PricingCard`: 3 columnas en escritorio, 2 en tablet
 * y 1 en móvil. La modalidad por hora se distingue visualmente (fondo azul cielo).
 * Debajo de las tarjetas se muestra el aviso de precios orientativos exigido por el brief.
 */
const pricingIcons: Record<PricingIcon, LucideIcon> = {
  hour: Clock,
  landing: LayoutTemplate,
  frontend: CodeXml,
  ecommerce: ShoppingCart,
  uiux: PenTool,
  ai: Bot,
};

export async function Pricing() {
  const locale = await getLocale();
  const { pricing: t } = await getDictionary();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32"
    >
      {/* Halo azul cielo muy suave detrás de las tarjetas. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 -z-10 h-[36rem] bg-[radial-gradient(60%_50%_at_50%_50%,rgb(234_244_255/0.9),transparent)]"
      />

      <div className="shell">
        <Reveal>
          <SectionHeading
            titleId="pricing-title"
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
            align="center"
          />
        </Reveal>

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pricingPlans.map((plan) => {
            const Icon = pricingIcons[plan.icon];
            return (
              <RevealItem as="li" key={plan.id} className="flex">
                <PricingCard
                  id={plan.id}
                  icon={<Icon strokeWidth={1.7} />}
                  name={plan.name[locale]}
                  mode={t.modes[plan.mode]}
                  highlighted={plan.mode === "hourly"}
                  prefix={plan.unit === "hour" ? undefined : t.from}
                  price={formatCOP(plan.price, locale)}
                  suffix={plan.unit === "hour" ? `${t.currency} ${t.perHour}` : t.currency}
                  featuresLabel={t.includesLabel}
                  features={plan.features.map((feature) => feature[locale])}
                  cta={t.cta}
                  ctaHref="#contact"
                  ctaTopic={plan.id}
                  ctaIcon={<ArrowRight />}
                  checkIcon={<Check strokeWidth={2.2} />}
                />
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-body text-pretty sm:justify-center sm:text-center">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-strong" strokeWidth={2} aria-hidden="true" />
            <span>
              {t.disclaimer} {t.currencyNote}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
