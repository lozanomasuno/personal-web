"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Configuración global de Motion.
 *
 * `reducedMotion="user"` respeta `prefers-reduced-motion`: cuando el usuario lo activa,
 * Motion omite transformaciones (desplazamientos, escalas) y conserva la opacidad.
 * Las animaciones CSS (p. ej. `animate-float`) se desactivan en `globals.css`.
 *
 * Nota de rendimiento: se probó `LazyMotion` con carga diferida de `domMax` y, con
 * Turbopack, no redujo el JavaScript inicial (~232 KB gz en ambos casos), así que se
 * mantiene la importación directa por simplicidad.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
