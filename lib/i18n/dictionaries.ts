import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { hasLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/es";

/**
 * Carga del diccionario del idioma activo (solo servidor).
 *
 * El idioma se obtiene del segmento raíz `app/[lang]` mediante `next/root-params`,
 * por lo que las páginas y secciones de servidor llaman `getDictionary()` sin argumentos.
 * Los componentes cliente reciben los textos ya resueltos como props.
 * Un idioma no registrado responde 404.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./dictionaries/es").then((module) => module.default),
  en: () => import("./dictionaries/en").then((module) => module.default),
};

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}

export type { Dictionary };
