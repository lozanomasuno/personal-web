import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Encabezado estándar de sección: etiqueta superior (eyebrow), título y descripción.
 *
 * `titleId` permite enlazar la sección con `aria-labelledby`. El título se renderiza
 * como `<h2>`; el `<h1>` queda reservado al hero.
 *
 * @example
 * <section aria-labelledby="services-title">
 *   <SectionHeading titleId="services-title" eyebrow="Servicios" title="…" description="…" />
 * </section>
 */
type SectionHeadingProps = {
  titleId: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  titleId,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <p className="text-sm font-semibold tracking-wide text-brand-strong">{eyebrow}</p>
      <h2
        id={titleId}
        className="text-3xl font-semibold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-body text-pretty sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
