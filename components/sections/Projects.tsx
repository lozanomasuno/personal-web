import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { ProjectMockup } from "@/components/projects/ProjectMockup";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, getLocale, type Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Sección "Proyectos" (servidor).
 *
 * Muestra `data/projects.ts`: el primer proyecto ocupa el ancho completo en escritorio
 * (imagen a la izquierda, texto a la derecha) y el resto se reparte en dos columnas.
 * Los marcadores (`placeholder`) llevan la etiqueta "Próximamente" y no muestran enlaces.
 * Al final, una franja de llamada a la acción hacia Contacto.
 */
export async function Projects() {
  const locale = await getLocale();
  const { projects: t } = await getDictionary();

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-white py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading titleId="projects-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />
        </Reveal>

        <RevealGroup as="ul" className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <RevealItem as="li" key={project.id} className={cn("flex", index === 0 && "lg:col-span-2")}>
              <ProjectCard project={project} locale={locale} t={t} featured={index === 0} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 sm:mt-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[linear-gradient(120deg,#eaf4ff_0%,#f5f9ff_60%,#ffffff_100%)] p-8 ring-1 ring-brand/10 sm:p-10 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">{t.ctaTitle}</h3>
              <p className="mt-2 text-base leading-relaxed text-body">{t.ctaText}</p>
            </div>
            <Button href="#contact" size="lg" icon={<ArrowRight />}>
              {t.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  t: Dictionary["projects"];
  featured: boolean;
};

function ProjectCard({ project, locale, t, featured }: ProjectCardProps) {
  const titleId = `project-${project.id}`;
  const links = project.placeholder ? undefined : project.links;

  return (
    <Card
      as="article"
      interactive
      aria-labelledby={titleId}
      className={cn("group flex w-full flex-col overflow-hidden", featured && "lg:grid lg:grid-cols-[1.3fr_1fr]")}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[linear-gradient(150deg,#eaf4ff_0%,#f5f9ff_55%,#dcebff_100%)]",
          // En tablet (una columna) se usa 2:1 para que la maqueta no quede demasiado alta.
          featured
            ? "aspect-[16/10] sm:aspect-[2/1] lg:aspect-auto lg:min-h-[24rem]"
            : "aspect-[16/10] sm:aspect-[2/1] lg:aspect-[16/10]",
        )}
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt[locale]}
            width={project.image.width}
            height={project.image.height}
            sizes={featured ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
            className="size-full object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-x-6 top-8 bottom-0 sm:inset-x-10 sm:top-10">
            <ProjectMockup kind={project.mockup} />
          </div>
        )}

        {project.placeholder ? (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink ring-1 ring-line shadow-soft">
            <Clock className="size-3.5 text-brand" strokeWidth={2} aria-hidden="true" />
            {t.comingSoon}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-sm font-semibold text-brand-strong">{project.category[locale]}</p>
        <h3
          id={titleId}
          className={cn(
            "mt-2 font-semibold tracking-[-0.02em] text-ink",
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          {project.title[locale]}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-body text-pretty">{project.description[locale]}</p>

        <ul aria-label={t.techLabel} className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-body ring-1 ring-line/70">
              {tech}
            </li>
          ))}
        </ul>

        {links?.live || links?.repo ? (
          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-7">
            {links.live ? (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:text-brand-deep"
              >
                {t.live}
                <span className="sr-only">: {project.title[locale]} {t.newTab}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
            {links.repo ? (
              <a
                href={links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-strong"
              >
                <BrandIcon name="github" className="size-4" />
                {t.repo}
                <span className="sr-only">: {project.title[locale]} {t.newTab}</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
