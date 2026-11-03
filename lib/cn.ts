/**
 * Une clases CSS condicionales ignorando valores falsy.
 * Alternativa mínima a `clsx` para no añadir dependencias.
 *
 * @example cn("px-4", isActive && "text-brand", undefined) // "px-4 text-brand"
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
