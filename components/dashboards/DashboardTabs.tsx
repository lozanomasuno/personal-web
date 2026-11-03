"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Selector de dashboards con patrón de pestañas accesible (WAI-ARIA Tabs) y marco de
 * aplicación (cliente).
 *
 * - Las flechas izquierda/derecha, Inicio y Fin mueven el foco y activan la pestaña.
 * - Todos los paneles se renderizan en el servidor; los inactivos llevan `hidden`.
 *   Al mostrarse, el panel repite la animación CSS `animate-rise`.
 * - El marco (barra de ventana, rótulo "Datos ilustrativos" y barra lateral decorativa)
 *   es común a todos los paneles.
 *
 * Contrato: `tabs` y `panels` deben tener la misma longitud y el mismo orden.
 */
type Tab = { id: string; label: string; icon: ReactNode };

type DashboardTabsProps = {
  tabs: Tab[];
  panels: ReactNode[];
  label: string;
  illustrative: string;
  illustrativeNote: string;
};

export function DashboardTabs({ tabs, panels, label, illustrative, illustrativeNote }: DashboardTabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const noteId = `${baseId}-note`;

  const select = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key]);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Pestañas: en móvil se desplazan horizontalmente sin desbordar la página. */}
      <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="mx-auto flex w-max items-center gap-1 rounded-full bg-mist p-1.5 ring-1 ring-line"
        >
          {tabs.map((tab, index) => {
            const selected = index === active;
            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`${baseId}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap",
                  "transition-colors duration-300",
                  selected ? "text-ink" : "text-body hover:text-ink",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId={`${baseId}-pill`}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-line"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn("relative [&>svg]:size-4", selected ? "text-brand" : "text-muted")}
                >
                  {tab.icon}
                </span>
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Marco de aplicación. */}
      <div className="overflow-hidden rounded-[1.75rem] bg-mist ring-1 ring-line shadow-lift sm:rounded-[2rem]">
        <div className="flex items-center gap-3 border-b border-line/80 bg-white/80 px-4 py-3 sm:px-5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span aria-hidden="true" className="hidden truncate text-xs font-medium text-muted sm:block">
            dashboard / {tabs[active].label}
          </span>
          <span
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-sky px-2.5 py-1 text-[0.6875rem] font-semibold text-brand-strong ring-1 ring-brand/20"
            title={illustrativeNote}
            aria-describedby={noteId}
          >
            <Info className="size-3.5" strokeWidth={2} aria-hidden="true" />
            {illustrative}
          </span>
          <span id={noteId} className="sr-only">
            {illustrativeNote}
          </span>
        </div>

        <div className="flex">
          {/* Barra lateral decorativa (solo escritorio). */}
          <div aria-hidden="true" className="hidden w-16 shrink-0 flex-col items-center gap-3 border-r border-line/80 bg-white/60 py-5 lg:flex">
            <span className="grid size-9 place-items-center rounded-xl bg-ink text-[0.6875rem] font-semibold text-white">
              NL
            </span>
            {tabs.map((tab, index) => (
              <span
                key={tab.id}
                className={cn(
                  "grid size-9 place-items-center rounded-xl transition-colors duration-300 [&>svg]:size-4",
                  index === active ? "bg-sky text-brand-strong" : "text-muted",
                )}
              >
                {tab.icon}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 p-3 sm:p-5 lg:p-6">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                id={`${baseId}-panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${tab.id}`}
                hidden={index !== active}
                className="animate-rise [animation-duration:0.6s]"
              >
                {/* Mantiene la jerarquía h2 (sección) → h3 (dashboard) → h4 (widgets). */}
                <h3 className="sr-only">{tab.label}</h3>
                {panels[index]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
