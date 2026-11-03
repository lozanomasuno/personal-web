import { ArrowUp } from "lucide-react";
import Link from "next/link";

import { ChannelIcon } from "@/components/contact/ChannelIcon";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { getContactChannels } from "@/lib/contact";
import { localeMeta, locales } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Pie de página (servidor): identidad, navegación por secciones, canales configurados,
 * selector de idioma y copyright.
 *
 * El año se calcula con `"use cache"`: Cache Components no permite leer la hora actual
 * durante el prerenderizado sin caché, y para un sitio estático basta el año del build.
 */
async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const locale = await getLocale();
  const { nav, footer: t, contact } = await getDictionary();
  const channels = getContactChannels();
  const year = await getCopyrightYear();

  const links = [
    { id: "home", label: nav.home },
    { id: "about", label: nav.about },
    { id: "services", label: nav.services },
    { id: "projects", label: nav.projects },
    { id: "technologies", label: nav.technologies },
    { id: "pricing", label: nav.pricing },
    { id: "contact", label: nav.contact },
  ];

  return (
    <footer className="border-t border-line bg-white">
      <div className="shell grid gap-12 py-14 sm:py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-4">
          <a href="#home" className="flex items-center gap-3 self-start rounded-full">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-ink text-[0.8125rem] font-semibold text-white"
            >
              {site.initials}
            </span>
            <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">{site.name}</span>
            <span className="sr-only"> ({nav.homeLink})</span>
          </a>
          <p className="text-sm leading-relaxed text-body">{t.tagline}</p>

          {channels.length > 0 ? (
            <ul aria-label={t.socialTitle} className="mt-2 flex gap-2">
              {channels.map((channel) => (
                <li key={channel.type}>
                  <a
                    href={channel.href}
                    aria-label={`${contact.channels[channel.type]}${channel.external ? ` ${contact.newTab}` : ""}`}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid size-10 place-items-center rounded-full text-body ring-1 ring-line transition-colors hover:bg-sky hover:text-brand-strong"
                  >
                    <ChannelIcon type={channel.type} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label={t.navTitle}>
          <h2 className="text-sm font-semibold text-ink">{t.navTitle}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
            {links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-sm text-body transition-colors hover:text-brand-strong">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t.languageTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {locales.map((code) => (
              <li key={code}>
                <Link
                  href={`/${code}`}
                  hrefLang={code}
                  lang={code}
                  aria-current={code === locale ? "page" : undefined}
                  className={cn(
                    "text-sm transition-colors hover:text-brand-strong",
                    code === locale ? "font-semibold text-ink" : "text-body",
                  )}
                >
                  {localeMeta[code].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="shell flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {year} {site.name}. {t.rights}
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-body transition-colors hover:text-brand-strong"
          >
            {t.backToTop}
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
