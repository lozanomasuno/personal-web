import {
  ArrowRight,
  BrainCircuit,
  Braces,
  CodeXml,
  LayoutGrid,
  PenTool,
  ShoppingBag,
  Telescope,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, type CompetencyIcon } from "@/data/about";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Sección "Sobre mí" (servidor), con composición editorial en dos columnas.
 *
 * - Izquierda: encabezado, presentación y CTA. En escritorio queda fija (sticky)
 *   mientras se recorre la columna derecha.
 * - Derecha: cuadrícula de especialidades separadas por líneas finas y un bloque
 *   final con los intereses actuales.
 * - Cifras: solo se muestran si `about.stats` tiene datos reales (hoy está vacío).
 */
const competencyIcons: Record<CompetencyIcon, LucideIcon> = {
  engineering: Braces,
  frontend: CodeXml,
  ecommerce: ShoppingBag,
  uiux: PenTool,
  architecture: LayoutGrid,
  ai: BrainCircuit,
  agents: Workflow,
};

export async function About() {
  const locale = await getLocale();
  const { about: t } = await getDictionary();

  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading titleId="about-title" eyebrow={t.eyebrow} title={t.title} />
          <div className="mt-6 flex max-w-xl flex-col gap-5 text-base leading-relaxed text-body text-pretty sm:text-lg sm:leading-relaxed">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          {about.stats.length > 0 ? (
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {about.stats.map((stat) => (
                <div key={stat.label.en} className="flex flex-col-reverse gap-1">
                  <dt className="text-sm text-body">{stat.label[locale]}</dt>
                  <dd className="text-4xl font-semibold tracking-[-0.03em] text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" icon={<ArrowRight />}>
              {t.cta}
            </Button>
            <Button href="#services" variant="secondary">
              {t.secondaryCta}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul
            aria-label={t.competenciesLabel}
            className="grid overflow-hidden rounded-3xl bg-line ring-1 ring-line [gap:1px] sm:grid-cols-2"
          >
            {about.competencies.map((item) => {
              const Icon = competencyIcons[item.icon];
              return (
                <li key={item.icon} className="group flex flex-col gap-3 bg-white p-6 transition-colors duration-500 hover:bg-[#fbfdff] sm:p-7">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-xl bg-sky text-brand-strong transition-transform duration-500 ease-apple group-hover:-translate-y-0.5"
                  >
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-2 text-base font-semibold tracking-[-0.01em] text-ink">{item.title[locale]}</h3>
                  <p className="text-sm leading-relaxed text-body">{item.description[locale]}</p>
                </li>
              );
            })}

            {/* Bloque final: intereses actuales (completa la cuadrícula de 2 columnas). */}
            <li className="flex flex-col gap-4 bg-sky p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-xl bg-white text-brand-strong shadow-soft"
              >
                <Telescope className="size-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-1 text-base font-semibold tracking-[-0.01em] text-ink">{t.interestsTitle}</h3>
              <ul className="flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <li
                    key={interest.en}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink ring-1 ring-brand/15"
                  >
                    {interest[locale]}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
