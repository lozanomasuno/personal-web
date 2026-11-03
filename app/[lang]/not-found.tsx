import { ArrowLeft } from "lucide-react";

import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/** Página 404 dentro de un idioma válido (p. ej. `/es/ruta-inexistente`). */
export default async function NotFound() {
  const locale = await getLocale();
  const { notFound } = await getDictionary();

  return (
    <main id="main" className="bg-hero grid min-h-dvh place-items-center px-5 text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm font-semibold text-brand-strong">404</p>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink">{notFound.title}</h1>
        <p className="text-body">{notFound.description}</p>
        <a
          href={`/${locale}`}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-strong px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-deep"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {notFound.back}
        </a>
      </div>
    </main>
  );
}
