/**
 * Configuración de idiomas del sitio.
 *
 * Es un módulo sin dependencias de servidor: lo usan el layout raíz, `proxy.ts`
 * (redirección inicial según `Accept-Language`) y componentes cliente como el Navbar.
 * Para añadir un idioma: registrarlo en `locales`, crear su diccionario en
 * `lib/i18n/dictionaries/` y añadirlo al mapa de `lib/i18n/dictionaries.ts`.
 */
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Valores para el atributo `lang` y para Open Graph (`og:locale`). */
export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  es: { htmlLang: "es", ogLocale: "es_CO", label: "Español" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "English" },
};

/** Locale de `Intl` para formatear números y fechas en cada idioma. */
export const intlLocale: Record<Locale, string> = { es: "es-CO", en: "en-US" };

/**
 * Texto traducible dentro de los archivos de `data/`.
 * @example const title: Localized = { es: "Servicios", en: "Services" };
 */
export type Localized<T = string> = Record<Locale, T>;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
