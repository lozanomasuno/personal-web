import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { localeMeta, locales } from "@/lib/i18n/config";

/**
 * `/sitemap.xml`: una entrada por idioma, cada una con sus alternativas `hreflang`.
 * La base de las URL es `NEXT_PUBLIC_SITE_URL` (ver `data/site.ts`).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((code) => [localeMeta[code].htmlLang, `${site.url}/${code}`]),
  );

  return locales.map((code) => ({
    url: `${site.url}/${code}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
