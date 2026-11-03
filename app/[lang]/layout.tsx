import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "../globals.css";

import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar, type NavItem } from "@/components/layout/Navbar";
import { site } from "@/data/site";
import { localeMeta, locales } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Layout raíz por idioma (`/es`, `/en`).
 *
 * Define `<html lang>`, la fuente Inter, la metadata SEO por idioma y la navegación.
 * Con Cache Components, `generateStaticParams` debe listar al menos un idioma:
 * aquí se listan todos para prerenderizarlos en el build.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = await getDictionary();

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((code) => [localeMeta[code].htmlLang, `/${code}`])),
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((code) => code !== locale).map((code) => localeMeta[code].ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const { nav } = await getDictionary();

  const items: NavItem[] = [
    { id: "home", label: nav.home },
    { id: "about", label: nav.about },
    { id: "services", label: nav.services },
    { id: "projects", label: nav.projects },
    { id: "technologies", label: nav.technologies },
    { id: "pricing", label: nav.pricing },
    { id: "contact", label: nav.contact },
  ];

  return (
    <html lang={localeMeta[locale].htmlLang} className={inter.variable}>
      <body className="min-h-dvh bg-white">
        {/* Sin JavaScript, las animaciones de aparición no se ejecutan: se muestra el contenido. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {nav.skipToContent}
        </a>
        <MotionProvider>
          <Navbar
            locale={locale}
            name={site.name}
            initials={site.initials}
            items={items}
            labels={{
              nav: nav.label,
              cta: nav.cta,
              openMenu: nav.openMenu,
              closeMenu: nav.closeMenu,
              language: nav.language,
              homeLink: nav.homeLink,
            }}
          />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
