import {
  Bot,
  BrainCircuit,
  CodeXml,
  FileSearch,
  Palette,
  Server,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techCategories, type CategoryIcon, type ConceptIcon, type Technology } from "@/data/technologies";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Sección "Tecnologías" (servidor).
 *
 * Agrupa `data/technologies.ts` en tarjetas por categoría con distribución bento:
 * en escritorio, Frontend e IA ocupan dos columnas y Diseño y Backend una. Los logos
 * de marca son monocromos y toman el azul de marca al pasar el cursor.
 */
const categoryIcons: Record<CategoryIcon, LucideIcon> = {
  frontend: CodeXml,
  design: Palette,
  backend: Server,
  ai: Sparkles,
};

const conceptIcons: Record<ConceptIcon, LucideIcon> = {
  rag: FileSearch,
  llm: BrainCircuit,
  agents: Bot,
  automation: Workflow,
};

/** Columnas de la cuadrícula interna según el número de tecnologías y el ancho de la tarjeta. */
function itemGrid(count: number, span: 1 | 2): string {
  // Con dos elementos en una tarjeta estrecha, en escritorio se apilan para alinearse
  // con las dos filas de la tarjeta vecina (Frontend).
  if (span === 1) return count > 2 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-1";
  return "grid-cols-2 sm:grid-cols-4";
}

function techName(tech: Technology, locale: Locale): string {
  return typeof tech.name === "string" ? tech.name : tech.name[locale];
}

export async function Technologies() {
  const locale = await getLocale();
  const { technologies: t } = await getDictionary();

  return (
    <section id="technologies" aria-labelledby="technologies-title" className="bg-mist py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading
            titleId="technologies-title"
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
            align="center"
          />
        </Reveal>

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:gap-5">
          {techCategories.map((category) => {
            const CategoryIconComponent = categoryIcons[category.icon];
            return (
              <RevealItem as="li" key={category.id} className={cn("flex", category.span === 2 && "lg:col-span-2")}>
                <Card
                  as="article"
                  aria-labelledby={`tech-${category.id}`}
                  className="flex w-full flex-col gap-6 p-6 sm:p-7"
                >
                  <header className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky text-brand-strong"
                    >
                      <CategoryIconComponent className="size-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3
                        id={`tech-${category.id}`}
                        className="text-lg font-semibold tracking-[-0.01em] text-ink"
                      >
                        {category.title[locale]}
                      </h3>
                      <p className="mt-0.5 text-sm text-body">{category.description[locale]}</p>
                    </div>
                  </header>

                  <ul className={cn("mt-auto grid gap-3", itemGrid(category.items.length, category.span))}>
                    {category.items.map((tech) => {
                      const name = techName(tech, locale);
                      const ConceptIconComponent = tech.kind === "concept" ? conceptIcons[tech.icon] : null;
                      return (
                        <li
                          key={name}
                          className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-mist/70 px-3 py-5 text-center ring-1 ring-line/60 transition-[background-color,box-shadow,transform] duration-500 ease-apple hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                        >
                          {tech.kind === "brand" ? (
                            <BrandIcon
                              name={tech.icon}
                              className="size-7 text-ink/75 transition-colors duration-300 group-hover:text-brand-strong"
                            />
                          ) : ConceptIconComponent ? (
                            <ConceptIconComponent
                              aria-hidden="true"
                              strokeWidth={1.6}
                              className="size-7 text-ink/75 transition-colors duration-300 group-hover:text-brand-strong"
                            />
                          ) : null}
                          <span className="text-[0.8125rem] leading-tight font-medium text-ink">{name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
