"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animaciones de aparición reutilizables (fade + slide up), basadas en Motion.
 *
 * - `Reveal`: anima un bloque al entrar en pantalla (`trigger="inView"`, por defecto)
 *   o al montarse (`trigger="mount"`, útil en el hero).
 * - `RevealGroup` + `RevealItem`: aparición escalonada (stagger) de una lista.
 *
 * Con `prefers-reduced-motion`, el `MotionConfig reducedMotion="user"` del layout
 * desactiva los desplazamientos y conserva solo la transición de opacidad.
 * El estado inicial se renderiza en el servidor con opacidad 0 (el texto sigue presente
 * en el HTML). Sin JavaScript, la regla `<noscript>` del layout muestra todo lo marcado
 * con `data-reveal`. No usar en contenido visible al cargar (p. ej. el hero).
 *
 * @example
 * <RevealGroup as="ul" className="grid gap-6">
 *   {items.map((item) => <RevealItem as="li" key={item.id}>…</RevealItem>)}
 * </RevealGroup>
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type Tag = "div" | "ul" | "ol" | "li" | "article" | "section" | "header" | "p" | "span";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  trigger?: "inView" | "mount";
};

export function Reveal({ children, className, as = "div", delay = 0, trigger = "inView" }: RevealProps) {
  const Component = motion[as];
  const animation =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Component
      className={className}
      data-reveal=""
      initial="hidden"
      {...animation}
      variants={{
        hidden: itemVariants.hidden,
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE, delay },
        },
      }}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delay?: number;
  trigger?: "inView" | "mount";
  "aria-label"?: string;
};

export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
  trigger = "inView",
  "aria-label": ariaLabel,
}: RevealGroupProps) {
  const Component = motion[as];
  const animation =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Component
      className={className}
      aria-label={ariaLabel}
      data-reveal=""
      initial="hidden"
      {...animation}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Component = motion[as];
  return (
    <Component className={className} data-reveal="" variants={itemVariants}>
      {children}
    </Component>
  );
}
