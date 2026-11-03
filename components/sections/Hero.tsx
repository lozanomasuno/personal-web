import { ArrowRight, BrainCircuit, CodeXml, Layers, PenTool, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Sección inicial (componente de servidor).
 *
 * Composición: titular `<h1>`, descripción, dos CTA (proyectos y servicios),
 * indicadores de especialidad y una columna visual con la imagen de perfil y
 * tarjetas flotantes decorativas (`aria-hidden`, sin métricas).
 *
 * En móvil la imagen pasa debajo del texto y las tarjetas flotantes se recolocan
 * dentro del marco para no desbordar. La imagen se toma de `site.profileImage`.
 *
 * La entrada usa la animación CSS `animate-rise` (no Motion) para que el titular,
 * candidato a LCP, sea visible desde el primer pintado aunque JavaScript no haya cargado.
 */
export async function Hero() {
  const { hero } = await getDictionary();

  const specialties = [
    { label: hero.specialties.frontend, icon: CodeXml },
    { label: hero.specialties.uiux, icon: PenTool },
    { label: hero.specialties.ecommerce, icon: ShoppingBag },
    { label: hero.specialties.ai, icon: BrainCircuit },
  ];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-hero pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-36 lg:pb-28"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-16">
        <div className="flex flex-col items-start">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink ring-1 ring-line shadow-soft">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/50" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              {hero.eyebrow}
            </p>
          </div>

          <div className="animate-rise [animation-delay:80ms]">
            <h1
              id="hero-title"
              className={
                "mt-6 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.045em] text-ink text-balance " +
                "sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]"
              }
            >
              {hero.titleStart}
              <span className="text-gradient">{hero.titleHighlight}</span>
            </h1>
          </div>

          <div className="animate-rise [animation-delay:160ms]">
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body text-pretty sm:text-xl sm:leading-relaxed lg:text-lg xl:text-xl">
              {hero.description}
            </p>
          </div>

          <div className="mt-9 flex w-full animate-rise flex-col gap-3 [animation-delay:240ms] sm:w-auto sm:flex-row">
            <Button href="#projects" size="lg" icon={<ArrowRight />}>
              {hero.primaryCta}
            </Button>
            <Button href="#services" size="lg" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </div>

          <ul
            aria-label={hero.specialtiesLabel}
            className="mt-10 flex animate-rise flex-wrap gap-2.5 [animation-delay:320ms]"
          >
            {specialties.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line"
              >
                <Icon className="size-4 text-brand" strokeWidth={1.8} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] animate-rise [animation-delay:200ms] lg:max-w-[28rem]">
          <HeroVisual
            alt={site.profileImage.isPlaceholder ? hero.imageAlt : site.name}
            floating={hero.floating}
          />
        </div>
      </div>
    </section>
  );
}

type HeroVisualProps = {
  alt: string;
  floating: {
    stackTitle: string;
    stackDetail: string;
    agentTitle: string;
    agentSteps: string[];
    chip: string;
  };
};

/** Imagen de perfil enmarcada con halos y tarjetas flotantes decorativas. */
function HeroVisual({ alt, floating }: HeroVisualProps) {
  return (
    <div className="relative px-4 sm:px-8">
      {/* Halos de color detrás del marco. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(58_131_247/0.28),transparent)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[2.25rem] bg-white p-2 ring-1 ring-line shadow-lift">
        <Image
          src={site.profileImage.src}
          width={site.profileImage.width}
          height={site.profileImage.height}
          alt={alt}
          preload
          sizes="(min-width: 1024px) 448px, (min-width: 640px) 416px, 90vw"
          className="aspect-[4/5] w-full rounded-[1.85rem] object-cover"
        />
      </div>

      {/* Tarjeta: stack de interfaces (arriba a la izquierda). */}
      <div
        aria-hidden="true"
        className="glass absolute top-8 -left-1 flex animate-float items-center gap-3 rounded-2xl px-3.5 py-3 ring-1 ring-white/70 shadow-lift sm:-left-6"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-sky text-brand-strong">
          <Layers className="size-4.5" strokeWidth={1.8} />
        </span>
        <span className="flex flex-col">
          <span className="text-[0.8125rem] font-semibold text-ink">{floating.stackTitle}</span>
          <span className="text-xs text-body">{floating.stackDetail}</span>
        </span>
      </div>

      {/* Tarjeta: flujo agéntico (abajo a la derecha). */}
      <div
        aria-hidden="true"
        className="glass absolute -right-1 bottom-10 w-52 animate-float-slow rounded-2xl p-3.5 ring-1 ring-white/70 shadow-lift [animation-delay:-3s] sm:-right-8 lg:-right-3 xl:-right-8"
      >
        <span className="flex items-center gap-2 text-[0.8125rem] font-semibold text-ink">
          <Sparkles className="size-4 text-brand" strokeWidth={1.8} />
          {floating.agentTitle}
        </span>
        <ol className="mt-3 flex items-center gap-1.5">
          {floating.agentSteps.map((step, index) => (
            <li key={step} className="flex flex-1 flex-col gap-1.5">
              <span
                className={
                  index < 2
                    ? "h-1.5 rounded-full bg-brand"
                    : "h-1.5 overflow-hidden rounded-full bg-sky"
                }
              />
              <span className="text-[0.6875rem] font-medium text-body">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Chip: diseño + código (abajo a la izquierda). */}
      <div
        aria-hidden="true"
        className="absolute bottom-24 -left-2 hidden animate-float rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white shadow-lift [animation-delay:-5s] sm:-left-10 sm:block"
      >
        <span className="font-mono text-brand">&lt;/&gt;</span> {floating.chip}
      </div>
    </div>
  );
}
