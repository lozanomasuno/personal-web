import { ecommerceDashboard as data } from "@/data/dashboards";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { formatDelta, formatValue } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

import { AreaChart } from "./AreaChart";
import { RankedBars } from "./charts";
import { StatTile, StatusLabel } from "./widgets";

/**
 * Dashboard de ecommerce (ilustrativo): KPIs, ingresos semanales, productos más
 * vendidos y pedidos recientes.
 *
 * Distribución: KPIs en 2×2 (móvil) o 4 columnas; debajo, gráfico principal y
 * columna lateral que pasa bajo el gráfico en pantallas pequeñas.
 */
export function EcommerceDashboard({ locale, t }: { locale: Locale; t: Dictionary["showcase"] }) {
  const revenue = data.revenue.map((point) => ({
    label: point.label[locale],
    value: point.value,
    valueLabel: formatValue(point.value, locale, "currency"),
  }));
  const ticks = [0, 5000, 10000, 15000].map((value) => ({ value, label: formatValue(value, locale, "compact") }));

  return (
    <div className="grid gap-3 sm:gap-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <StatTile
            key={kpi.id}
            label={kpi.label[locale]}
            value={formatValue(kpi.value, locale, kpi.format)}
            delta={kpi.delta}
            deltaLabel={kpi.delta === undefined ? undefined : formatDelta(kpi.delta, locale)}
            comparison={t.vsPrevious}
          />
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.6fr_1fr]">
        <DashboardCard title={t.widgets.revenue} subtitle={t.widgets.revenueUnit}>
          <AreaChart
            data={revenue}
            ticks={ticks}
            ariaLabel={`${t.widgets.revenue}: ${revenue.map((p) => `${p.label} ${p.valueLabel}`).join(", ")}`}
          />
        </DashboardCard>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
          <DashboardCard title={t.widgets.topProducts} subtitle={t.widgets.topProductsUnit}>
            <RankedBars
              ariaLabel={t.widgets.topProducts}
              max={30}
              data={data.topProducts.map((item) => ({
                label: item.label[locale],
                value: item.value,
                valueLabel: formatValue(item.value, locale, "percent"),
              }))}
            />
          </DashboardCard>

          <DashboardCard title={t.widgets.recentOrders}>
            <ul className="flex flex-col divide-y divide-line/70">
              {data.orders.map((order) => (
                <li key={order.id} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-ink">{order.id}</span>
                    <span className="block truncate text-xs text-muted">{order.customer}</span>
                  </span>
                  <span className="flex flex-col items-end gap-1">
                    <span className="text-xs font-semibold text-ink tabular-nums">
                      {formatValue(order.total, locale, "currency")}
                    </span>
                    <StatusLabel
                      status={order.status}
                      label={order.status === "good" ? t.status.paid : t.status.pending}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
