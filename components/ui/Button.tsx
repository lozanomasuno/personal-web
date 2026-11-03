import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Botón/enlace con los estilos del sistema visual.
 *
 * Se renderiza como `<a>` cuando recibe `href` (anclas internas, enlaces externos)
 * y como `<button>` en caso contrario. No es componente cliente: puede usarse en
 * componentes de servidor y de cliente.
 *
 * Variantes:
 *  - `primary`: acción principal (azul `brand-strong`, texto blanco).
 *  - `secondary`: acción alternativa sobre fondos claros (blanco con borde).
 *  - `ghost`: acción de baja jerarquía (solo texto).
 *
 * @example <Button href="#projects" icon={<ArrowRight />}>Ver proyectos</Button>
 */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Icono decorativo mostrado después del texto (se marca `aria-hidden`). */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps>;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof CommonProps
  >;

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
  "whitespace-nowrap transition-[background-color,box-shadow,color,transform] duration-300 " +
  "ease-apple active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-strong text-white shadow-glow hover:bg-brand-deep hover:shadow-[0_22px_44px_-16px_rgb(38_104_216/0.55)]",
  secondary:
    "bg-white text-ink ring-1 ring-line shadow-soft hover:ring-brand/40 hover:text-brand-strong",
  ghost: "text-ink hover:text-brand-strong",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base sm:h-13 sm:px-7",
};

export function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = "primary", size = "md", icon, children, className, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className="-mr-0.5 inline-flex transition-transform duration-300 ease-apple group-hover:translate-x-0.5 [&>svg]:size-4"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a {...(rest as ComponentPropsWithoutRef<"a">)} className={classes}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} {...buttonRest} className={classes}>
      {content}
    </button>
  );
}
