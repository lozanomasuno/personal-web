import { BrainCircuit, Database, FileSearch, Zap } from "lucide-react";

import { automationDashboard as data } from "@/data/dashboards";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { cn } from "@/lib/cn";
import { formatDelta, formatValue } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

import { ColumnChart, Meter } from "./charts";
import { StatTile, StatusLabel } from "./widgets";

/**
 * Dashboard de IA y automatización (ilustrativo): indicadores, flujo agéntico tipo RAG
 * por etapas, tasa de automatización, tareas por día y actividad reciente.
 */
const pipelineIcons = {
  ingest: FileSearch,
  retrieve: Database,
  reason: BrainCircuit,
  act: Zap,
} as const;

export function AutomationDashboard({ locale, t }: { locale: Locale; t: Dictionary["showcase"] }) {
  const tasks = data.tasksPerDay.map((point) => ({
    label: point.label[locale],
    value: point.value,
    valueLabel: formatValue(point.value, locale),
  }));

  return (
    <div className="grid gap-3 sm:gap-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {data.kpis.map((kpi, index) => (
          <StatTile
            key={kpi.id}
            label={kpi.label[locale]}
            value={formatValue(kpi.value, locale, kpi.format)}
            delta={kpi.delta}
            deltaLabel={kpi.delta === undefined ? undefined : formatDelta(kpi.delta, locale)}
            upIsGood={kpi.upIsGood}
            comparison={t.vsPrevious}
            className={index === data.kpis.length - 1 ? "col-span-2 lg:col-span-1" : undefined}
          />
        ))}
      </div>

      <DashboardCard title={t.widgets.pipeline}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.pipeline.map((step, index) => {
            const Icon = pipelineIcons[step.id as keyof typeof pipelineIcons];
            return (
              <li
                key={step.id}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl p-3 ring-1",
                  step.done ? "bg-white ring-line/80" : "bg-sky/60 ring-brand/25",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg",
                    step.done ? "bg-sky text-brand-strong" : "bg-brand-strong text-white",
                  )}
                >
                  <Icon className="size-4.5" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-ink">
                    <span className="text-body">{index + 1}.</span> {step.label[locale]}
                  </span>
                  <span className="block truncate text-[0.6875rem] text-body">{step.detail[locale]}</span>
                </span>
                <span className="sr-only">
                  {step.done ? t.status.done : t.status.running}
                </span>
                {!step.done ? (
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </DashboardCard>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1.3fr_1.2fr]">
        <DashboardCard title={t.widgets.automationRate}>
          <p className="text-4xl font-semibold tracking-[-0.04em] text-ink">
            {formatValue(data.automationRate, locale, "percent")}
          </p>
          <p className="mt-1 text-xs text-body">{t.widgets.automationRateNote}</p>
          <Meter value={data.automationRate / 100} className="mt-4" />
        </DashboardCard>

        <DashboardCard title={t.widgets.tasksPerDay}>
          <ColumnChart
            data={tasks}
            ariaLabel={`${t.widgets.tasksPerDay}: ${tasks.map((p) => `${p.label} ${p.valueLabel}`).join(", ")}`}
          />
        </DashboardCard>

        <DashboardCard title={t.widgets.activity}>
          <ul className="flex flex-col gap-3.5">
            {data.activity.map((item) => (
              <li key={item.text.en} className="flex items-start justify-between gap-3">
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-xs text-ink">{item.text[locale]}</span>
                  <span className="text-[0.6875rem] text-muted">{item.time[locale]}</span>
                </span>
                <StatusLabel status="good" label={t.status.done} />
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>
    </div>
  );
}
