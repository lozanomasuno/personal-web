"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { SectionId } from "@/data/site";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Navegación principal fija (cliente).
 *
 * Responsabilidades:
 *  - Fondo transparente en la parte superior; blanco translúcido con blur y borde al desplazarse.
 *  - Indicador de sección activa: un IntersectionObserver detecta la sección que ocupa
 *    la franja central de la pantalla; el indicador se desplaza con `layoutId` de Motion.
 *  - Menú móvil desplegable (< lg) que se cierra con Escape, al elegir un enlace o al
 *    pasar a escritorio. El CTA "Hablemos" permanece visible en la barra en todos los
 *    tamaños; en < sm el selector de idioma se muestra dentro del menú.
 *  - Selector ES/EN: enlaza a la otra ruta de idioma (`/es`, `/en`).
 *
 * Recibe los textos ya traducidos desde el layout (servidor); no carga diccionarios.
 */
export type NavItem = { id: SectionId; label: string };

type NavbarProps = {
  locale: Locale;
  name: string;
  initials: string;
  items: NavItem[];
  labels: {
    nav: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    /** Texto solo para lectores de pantalla que acompaña al nombre en el enlace del logo. */
    homeLink: string;
  };
};

export function Navbar({ locale, name, initials, items, labels }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Estado "desplazado" para el fondo translúcido.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección activa: la que cruza la franja central del viewport.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Cierre del menú móvil con Escape y al cambiar a escritorio.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);


  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-apple",
          // Con el menú móvil abierto el fondo es opaco para que el contenido no se lea detrás.
          open
            ? "bg-white shadow-[0_1px_0_rgb(13_33_54/0.06),0_24px_48px_-24px_rgb(13_33_54/0.3)]"
            : scrolled
              ? "glass shadow-[0_1px_0_rgb(13_33_54/0.06),0_8px_30px_-20px_rgb(13_33_54/0.25)]"
              : "bg-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-18">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-ink text-[0.8125rem] font-semibold tracking-tight text-white shadow-soft"
            >
              {initials}
            </span>
            {/* Entre lg y xl el nombre se oculta solo visualmente: sigue formando el nombre accesible. */}
            <span className="text-[0.9375rem] font-semibold tracking-tight text-ink lg:sr-only xl:not-sr-only">
              {name}
            </span>
            <span className="sr-only"> ({labels.homeLink})</span>
          </a>

          <nav aria-label={labels.nav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                        isActive ? "text-brand-strong" : "text-body hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-sky ring-1 ring-brand/15"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* El selector se envuelve para no mezclar `hidden` con el `flex` propio del componente. */}
            <div className="hidden sm:block">
              <LanguageSwitch locale={locale} label={labels.language} />
            </div>
            <Button href="#contact" size="sm" onClick={() => setOpen(false)}>
              {labels.cta}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-10 place-items-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? labels.closeMenu : labels.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.nav
              id={menuId}
              aria-label={labels.nav}
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line/70 lg:hidden"
            >
              <div className="shell flex flex-col gap-6 pt-4 pb-6">
                <ul className="grid gap-1">
                  {items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active === item.id ? "location" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-lg font-medium tracking-tight transition-colors",
                          active === item.id ? "bg-sky text-brand-strong" : "text-ink hover:bg-mist",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 px-4 sm:hidden">
                  <span className="text-sm text-body">{labels.language}</span>
                  <LanguageSwitch locale={locale} label={labels.language} />
                </div>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

/** Selector segmentado ES / EN. Cada opción es un enlace a la ruta del idioma. */
function LanguageSwitch({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center rounded-full bg-mist p-1 ring-1 ring-line", className)}
    >
      {locales.map((code) => {
        const current = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}`}
            hrefLang={code}
            lang={code}
            aria-current={current ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors duration-300",
              current ? "bg-white text-ink shadow-soft" : "text-body hover:text-ink",
            )}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}
