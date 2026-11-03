import { ArrowUpRight, Check } from "lucide-react";

import { ChannelIcon } from "@/components/contact/ChannelIcon";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/data/pricing";
import { site } from "@/data/site";
import { getContactChannels } from "@/lib/contact";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Sección "Contacto" (servidor).
 *
 * - Izquierda: encabezado, canales configurados en `data/site.ts` (solo los que tienen
 *   valor) y recomendaciones para escribir el mensaje.
 * - Derecha: `ContactForm`, que prepara un correo con `mailto:`. Los tipos de proyecto
 *   del formulario son las modalidades de `data/pricing.ts`.
 */
export async function Contact() {
  const locale = await getLocale();
  const { contact: t } = await getDictionary();
  const channels = getContactChannels();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eaf4ff_100%)] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-10">
          <SectionHeading titleId="contact-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />

          {channels.length > 0 ? (
            <ul aria-label={t.channelsLabel} className="flex flex-col gap-3">
              {channels.map((channel) => (
                <li key={channel.type}>
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl bg-white/80 p-4 ring-1 ring-line transition-[box-shadow,transform] duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-soft hover:ring-brand/30"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky text-brand-strong">
                      <ChannelIcon type={channel.type} className="size-5" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs font-medium text-muted">{t.channels[channel.type]}</span>
                      <span className="truncate text-[0.9375rem] font-medium text-ink">{channel.display}</span>
                    </span>
                    <ArrowUpRight
                      className="ml-auto size-4 shrink-0 text-muted transition-colors group-hover:text-brand-strong"
                      aria-hidden="true"
                    />
                    {channel.external ? <span className="sr-only">{t.newTab}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-line">
            <p className="text-sm font-semibold text-ink">{t.tipsTitle}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {t.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-[0.9375rem] text-body">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky text-brand-strong"
                  >
                    <Check className="size-3" strokeWidth={2.2} />
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-line shadow-lift sm:p-9">
            <ContactForm
              email={site.contact.email}
              topics={pricingPlans.map((plan) => ({ id: plan.id, label: plan.name[locale] }))}
              labels={t.form}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
