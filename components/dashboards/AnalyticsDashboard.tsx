import { analyticsDashboard as data } from "@/data/dashboards";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { formatDelta, formatValue } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

import { ColumnChart, Meter, RankedBars, Sparkline } from "./charts";
import { DeltaBadge, StatusLabel } from "./widgets";

/**
 * Dashboard de analítica (ilustrativo): cifra principal de usuarios activos con
 * tendencia, clientes nuevos, sesiones por día, embudo de conversión, fuentes de
 * tráfico y Core Web Vitals.
 */
export function AnalyticsDashboard({ locale, t }: { locale: Locale; t: Dictionary["showcase"] }) {
  const sessions = data.sessions.map((point) => ({
    label: point.label[locale],
    value: point.value,
    valueLabel: formatValue(point.value, locale, "compact"),
  }));

  return (
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
      {/* Cifra principal: una por vista. */}
      <DashboardCard title={t.widgets.activeUsers} className="lg:col-span-1">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-5xl font-semibold tracking-[-0.04em] text-ink">
              {formatValue(data.activeUsers.value, locale, "compact")}
            </p>
            <span title={t.vsPrevious}>
              <DeltaBadge delta={data.activeUsers.delta} label={formatDelta(data.activeUsers.delta, locale)} />
              <span className="sr-only"> {t.vsPrevious}</span>
            </span>
          </div>
          <Sparkline values={data.activeUsers.trend} />
          <div className="flex items-center justify-between gap-3 border-t border-line/70 pt-4">
            <span className="text-xs text-muted">{t.widgets.newCustomers}</span>
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ink">{formatValue(data.newCustomers.value, locale)}</span>
              <DeltaBadge delta={data.newCustomers.delta} label={formatDelta(data.newCustomers.delta, locale)} />
            </span>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title={t.widgets.sessions} className="lg:col-span-2">
        <ColumnChart
          data={sessions}
          ariaLabel={`${t.widgets.sessions}: ${sessions.map((p) => `${p.label} ${p.valueLabel}`).join(", ")}`}
        />
      </DashboardCard>

      <DashboardCard title={t.widgets.funnel} subtitle={t.widgets.funnelUnit}>
        <RankedBars
          ariaLabel={t.widgets.funnel}
          max={100}
          data={data.funnel.map((step) => ({
            label: step.label[locale],
            value: step.value,
            valueLabel: formatValue(step.value, locale, "percent"),
          }))}
        />
      </DashboardCard>

      <DashboardCard title={t.widgets.sources}>
        <RankedBars
          ariaLabel={t.widgets.sources}
          max={50}
          data={data.sources.map((source) => ({
            label: source.label[locale],
            value: source.value,
            valueLabel: formatValue(source.value, locale, "percent"),
          }))}
        />
      </DashboardCard>

      <DashboardCard title={t.widgets.vitals}>
        <ul className="flex flex-col gap-4">
          {data.vitals.map((vital) => (
            <li key={vital.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-ink">
                  {vital.id}
                  <span className="ml-2 font-normal text-body tabular-nums">
                    {locale === "es" ? vital.value : vital.valueEn}
                  </span>
                </span>
                <StatusLabel status={vital.status} label={t.status.good} />
              </div>
              <Meter value={vital.ratio} />
            </li>
          ))}
        </ul>
      </DashboardCard>
    </div>
  );
}
