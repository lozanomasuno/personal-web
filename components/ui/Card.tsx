import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

/**
 * Superficie base de tarjetas: fondo blanco, borde suave, radio amplio y sombra discreta.
 *
 * Lo reutilizan servicios, proyectos, pricing y dashboards. `interactive` añade la
 * elevación al pasar el cursor; `as` permite usar el elemento semántico adecuado
 * (`article`, `li`, etc.).
 *
 * @example <Card as="article" interactive className="p-6">…</Card>
 */
type CardProps<T extends ElementType> = {
  as?: T;
  interactive?: boolean;
} & ComponentPropsWithoutRef<T>;

export function Card<T extends ElementType = "div">({
  as,
  interactive = false,
  className,
  ...rest
}: CardProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "relative rounded-3xl bg-white ring-1 ring-line shadow-soft",
        interactive &&
          "transition-[box-shadow,transform] duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
      {...rest}
    />
  );
}
