import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, locales, type Locale } from "@/lib/i18n/config";

/**
 * Redirige las rutas sin prefijo de idioma (por ejemplo `/`) a `/es` o `/en`.
 *
 * El idioma se elige a partir de `Accept-Language` con un análisis mínimo
 * (sin dependencias): se toma el primer idioma soportado por orden de calidad `q`
 * y, si ninguno coincide, el idioma por defecto. Las rutas que ya tienen prefijo
 * y los archivos estáticos no pasan por aquí (ver `config.matcher`).
 */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.base && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  return ranked.map((entry) => entry.base).find(hasLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Excluye internos de Next.js, la API y cualquier archivo con extensión (imágenes, iconos, robots…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
