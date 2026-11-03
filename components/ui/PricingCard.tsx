import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Tarjeta de precio (componente de servidor, sin estado).
 *
 * Recibe textos y precio ya formateados para poder reutilizarse con cualquier moneda o
 * idioma. Estructura: etiqueta de modalidad, icono, nombre, precio destacado
 * (prefijo "Desde", importe y sufijo de moneda/unidad), lista de características y CTA.
 * `highlighted` aplica el fondo azul cielo (se usa para la modalidad por hora).
 *
 * @example
 * <PricingCard id="landing" name="Landing Pages" mode="Por proyecto" prefix="Desde"
 *   price="$1.500.000" suffix="COP" features={[…]} cta="Solicitar cotización" ctaHref="#contact" … />
 */
type PricingCardProps = {
  id: string;
  icon: ReactNode;
  name: string;
  mode: string;
  highlighted?: boolean;
  prefix?: string;
  price: string;
  suffix: string;
  featuresLabel: string;
  features: string[];
  cta: string;
  ctaHref: string;
  /** Valor de `data-contact-topic`: preselecciona el tipo de proyecto en el formulario de contacto. */
  ctaTopic?: string;
  ctaIcon?: ReactNode;
  checkIcon: ReactNode;
};

export function PricingCard({
  id,
  icon,
  name,
  mode,
  highlighted = false,
  prefix,
  price,
  suffix,
  featuresLabel,
  features,
  cta,
  ctaHref,
  ctaTopic,
  ctaIcon,
  checkIcon,
}: PricingCardProps) {
  const titleId = `plan-${id}`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex w-full flex-col rounded-3xl p-7 ring-1 transition-[box-shadow,transform] duration-500 ease-apple",
        "hover:-translate-y-1 hover:shadow-lift hover:ring-brand/30 sm:p-8",
        highlighted
          ? "bg-[linear-gradient(160deg,#eaf4ff_0%,#f5f9ff_55%,#ffffff_100%)] ring-brand/20 shadow-soft"
          : "bg-white ring-line shadow-soft",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-11 place-items-center rounded-2xl transition-colors duration-500 ease-apple [&>svg]:size-5",
            highlighted
              ? "bg-brand-strong text-white"
              : "bg-sky text-brand-strong group-hover:bg-brand-strong group-hover:text-white",
          )}
        >
          {icon}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            highlighted ? "bg-white text-brand-strong ring-1 ring-brand/20" : "bg-mist text-body ring-1 ring-line/70",
          )}
        >
          {mode}
        </span>
      </div>

      <h3 id={titleId} className="mt-6 text-lg font-semibold tracking-[-0.01em] text-ink">
        {name}
      </h3>

      <p className="mt-4 flex flex-col">
        {/* Sin prefijo se reserva su línea para alinear precio y lista con las demás tarjetas. */}
        {prefix ? (
          <span className="text-sm font-medium text-body">{prefix}</span>
        ) : (
          <span aria-hidden="true" className="text-sm">
            &nbsp;
          </span>
        )}
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[2.25rem] leading-tight font-semibold tracking-[-0.04em] text-ink">{price}</span>
          <span className="text-sm font-medium text-body">{suffix}</span>
        </span>
      </p>

      <div className="my-6 h-px bg-line" aria-hidden="true" />

      <p className="sr-only">{featuresLabel}</p>
      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-body">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky text-brand-strong [&>svg]:size-3"
            >
              {checkIcon}
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* El CTA queda alineado al pie aunque las tarjetas tengan listas de distinta longitud. */}
      <div className="mt-auto pt-8">
        <a
          href={ctaHref}
          data-contact-topic={ctaTopic}
          className={cn(
            "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium",
            "transition-[background-color,box-shadow,color] duration-300 ease-apple",
            highlighted
              ? "bg-brand-strong text-white shadow-glow hover:bg-brand-deep"
              : "bg-white text-ink ring-1 ring-line hover:text-brand-strong hover:ring-brand/40",
          )}
        >
          {cta}
          <span className="sr-only">: {name}</span>
          {ctaIcon ? (
            <span
              aria-hidden="true"
              className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5 [&>svg]:size-4"
            >
              {ctaIcon}
            </span>
          ) : null}
        </a>
      </div>
    </article>
  );
}
