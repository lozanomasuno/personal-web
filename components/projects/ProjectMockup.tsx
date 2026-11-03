import { FileText, Search, Send, Sparkles } from "lucide-react";

import type { ProjectMockup as MockupKind } from "@/data/projects";

/**
 * Maquetas decorativas para proyectos sin captura (`aria-hidden`).
 *
 * Se dibujan con HTML/CSS para que la tarjeta se vea completa mientras no exista una
 * imagen real. No contienen datos ni textos de proyectos reales. Para usar una captura,
 * definir `image` en el proyecto (`data/projects.ts`); entonces esta maqueta no se usa.
 */
export function ProjectMockup({ kind }: { kind: MockupKind }) {
  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-line shadow-lift transition-transform duration-700 ease-apple group-hover:-translate-y-1 group-hover:scale-[1.015]"
    >
      <div className="flex items-center gap-1.5 border-b border-line/80 px-3 py-2">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="ml-3 h-2 w-24 rounded-full bg-mist" />
      </div>
      <div className="flex-1 p-3 sm:p-4">
        {kind === "store" ? <StoreMockup /> : null}
        {kind === "dashboard" ? <DashboardMockup /> : null}
        {kind === "assistant" ? <AssistantMockup /> : null}
      </div>
    </div>
  );
}

const line = "block h-1.5 rounded-full";

function StoreMockup() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className={`${line} w-14 bg-ink/80`} />
        <span className="flex gap-2">
          <span className={`${line} w-8 bg-line`} />
          <span className={`${line} w-8 bg-line`} />
          <span className={`${line} w-8 bg-line`} />
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-lg bg-[linear-gradient(120deg,#eaf4ff,#d6e7ff)] p-3">
        <span className="flex flex-col gap-1.5">
          <span className={`${line} w-20 bg-ink/70`} />
          <span className={`${line} w-14 bg-ink/25`} />
          <span className="mt-1 h-3 w-12 rounded-full bg-brand-strong" />
        </span>
        <span className="size-10 rounded-full bg-white/70 sm:size-12" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2].map((item) => (
          <span key={item} className="flex flex-col gap-1.5 rounded-lg ring-1 ring-line/80 p-1.5">
            <span className="flex-1 rounded-md bg-[linear-gradient(160deg,#f5f7fa,#e3ecf8)]" />
            <span className={`${line} w-3/4 bg-line`} />
            <span className={`${line} w-1/3 bg-brand/70`} />
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="flex h-full gap-3">
      <span className="hidden w-8 flex-col items-center gap-2 rounded-lg bg-mist py-2 sm:flex">
        <span className="size-4 rounded-md bg-ink/80" />
        <span className="size-3 rounded bg-brand/60" />
        <span className="size-3 rounded bg-line" />
        <span className="size-3 rounded bg-line" />
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((item) => (
            <span key={item} className="flex flex-col gap-1.5 rounded-lg ring-1 ring-line/80 p-2">
              <span className={`${line} w-2/3 bg-line`} />
              <span className="block h-2.5 w-1/2 rounded-full bg-ink/70" />
            </span>
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden rounded-lg ring-1 ring-line/80">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 size-full">
            <path d="M0,32 L12,28 L24,30 L36,22 L48,24 L60,16 L72,18 L84,10 L100,6 L100,40 L0,40 Z" fill="#3a83f7" fillOpacity="0.1" />
            <path
              d="M0,32 L12,28 L24,30 L36,22 L48,24 L60,16 L72,18 L84,10 L100,6"
              fill="none"
              stroke="#3a83f7"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AssistantMockup() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <span className="flex items-center gap-1.5 self-end rounded-2xl rounded-br-md bg-brand-strong px-3 py-2">
        <span className={`${line} w-24 bg-white/80`} />
      </span>
      <span className="flex max-w-[85%] flex-col gap-1.5 rounded-2xl rounded-bl-md bg-mist px-3 py-2">
        <span className="flex items-center gap-1.5">
          <Sparkles className="size-3 text-brand" strokeWidth={2} />
          <span className={`${line} w-28 bg-ink/50`} />
        </span>
        <span className={`${line} w-36 bg-ink/25`} />
        <span className={`${line} w-20 bg-ink/25`} />
      </span>
      <span className="flex gap-1.5">
        {[0, 1].map((item) => (
          <span key={item} className="flex items-center gap-1 rounded-full bg-sky px-2 py-1">
            <FileText className="size-2.5 text-brand-strong" strokeWidth={2} />
            <span className={`${line} w-8 bg-brand/40`} />
          </span>
        ))}
      </span>
      {/* Segundo intercambio: solo visible cuando la maqueta tiene altura suficiente. */}
      <span className="hidden flex-col gap-2.5 sm:flex">
        <span className="flex items-center self-end rounded-2xl rounded-br-md bg-brand-strong px-3 py-2">
          <span className={`${line} w-16 bg-white/80`} />
        </span>
        <span className="flex max-w-[70%] flex-col gap-1.5 rounded-2xl rounded-bl-md bg-mist px-3 py-2">
          <span className={`${line} w-28 bg-ink/40`} />
          <span className={`${line} w-16 bg-ink/25`} />
        </span>
      </span>
      <span className="mt-auto flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 ring-line">
        <Search className="size-3 text-muted" strokeWidth={2} />
        <span className={`${line} flex-1 bg-mist`} />
        <span className="grid size-5 place-items-center rounded-full bg-brand-strong">
          <Send className="size-2.5 text-white" strokeWidth={2} />
        </span>
      </span>
    </div>
  );
}
