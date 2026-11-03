import { intlLocale, type Locale } from "@/lib/i18n/config";

/**
 * Formateo de números según el idioma activo (servidor y cliente).
 *
 * Los dashboards formatean en el servidor y pasan cadenas ya resueltas a los
 * componentes cliente, para evitar diferencias de ICU entre Node y el navegador.
 */
export type NumberFormat = "number" | "currency" | "percent" | "compact";

export function formatValue(value: number, locale: Locale, format: NumberFormat = "number"): string {
  const lang = intlLocale[locale];
  switch (format) {
    case "currency": {
      // Importes < 1.000 siempre con 2 decimales (precios); mayores, sin decimales.
      const digits = Math.abs(value) >= 1000 ? 0 : 2;
      return new Intl.NumberFormat(lang, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(value);
    }
    case "percent":
      // `value` se expresa en puntos porcentuales (3.8 → 3,8 %).
      return new Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 1 }).format(value / 100);
    case "compact":
      return formatCompact(value, locale);
    default:
      return new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(value);
  }
}

/**
 * Notación compacta uniforme ("24,8 k" / "24.8K", "1,2 M" / "1.2M").
 * Se implementa a mano porque la notación compacta de ICU para `es-CO` alterna
 * "k" y "K" según la magnitud, lo que se ve inconsistente en un mismo eje.
 */
function formatCompact(value: number, locale: Locale): string {
  const units: Array<[number, string]> = [
    [1_000_000, "M"],
    [1_000, locale === "es" ? "k" : "K"],
  ];
  const unit = units.find(([size]) => Math.abs(value) >= size);
  if (!unit) return formatValue(value, locale);
  const scaled = new Intl.NumberFormat(intlLocale[locale], { maximumFractionDigits: 1 }).format(value / unit[0]);
  return locale === "es" ? `${scaled} ${unit[1]}` : `${scaled}${unit[1]}`;
}

/**
 * Importe en pesos colombianos sin la moneda: "$1.500.000" (es) / "$1,500,000" (en).
 * La etiqueta "COP" se muestra aparte para mantener el mismo formato en ambos idiomas.
 */
export function formatCOP(value: number, locale: Locale): string {
  return `$${new Intl.NumberFormat(intlLocale[locale], { maximumFractionDigits: 0 }).format(value)}`;
}

/** Variación porcentual con signo: +12,4 % / −2,1 %. */
export function formatDelta(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "percent",
    signDisplay: "exceptZero",
    maximumFractionDigits: 1,
  }).format(value / 100);
}
