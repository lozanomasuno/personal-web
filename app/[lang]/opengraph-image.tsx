import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/data/site";
import { defaultLocale, hasLocale, locales, type Locale } from "@/lib/i18n/config";
import en from "@/lib/i18n/dictionaries/en";
import es from "@/lib/i18n/dictionaries/es";

/**
 * Imagen Open Graph por idioma (1200×630), generada en el build con `next/og`.
 *
 * Es una ruta especial: no puede usar `next/root-params`, por eso lee `params` y
 * los diccionarios directamente. `ImageResponse` solo admite flexbox y estilos en línea.
 * Fuente: Inter 500/700 en `.woff` (`assets/fonts/`, licencia SIL OFL 1.1), porque
 * `next/og` no admite `.woff2` y su fuente por defecto no tiene negrita.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Software Engineer & Front End Developer`;

const dictionaries: Record<Locale, typeof es> = { es, en };

/** Genera una imagen por idioma en el build en lugar de hacerlo en cada petición. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Lectura a nivel de módulo (como en la documentación de Next.js): dentro de la función
// se trataría como E/S dinámica y la imagen dejaría de generarse en el build.
const fontDir = join(process.cwd(), "assets/fonts");
const interMedium = await readFile(join(fontDir, "inter-latin-500-normal.woff"));
const interBold = await readFile(join(fontDir, "inter-latin-700-normal.woff"));

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = dictionaries[hasLocale(lang) ? lang : defaultLocale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(160deg, #eaf4ff 0%, #f6faff 45%, #ffffff 100%)",
          color: "#0d2136",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#0d2136",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 940 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: "#2668d8" }}>
            {dict.meta.jobTitle}
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            {dict.hero.titleStart + dict.hero.titleHighlight}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: "#475569" }}>
            {dict.meta.ogTagline}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[0.35, 0.6, 1].map((opacity) => (
              <div
                key={opacity}
                style={{ width: 56, height: 10, borderRadius: 999, background: "#3a83f7", opacity }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    },
  );
}
