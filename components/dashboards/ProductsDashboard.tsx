import { productsDashboard as data, type Status } from "@/data/dashboards";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { formatValue } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

import { Meter } from "./charts";
import { StatTile, StatusLabel } from "./widgets";

/**
 * Dashboard de gestión de productos (ilustrativo): indicadores de catálogo y tabla
 * de inventario con medidor de stock y estado.
 *
 * En escritorio la tabla muestra todas las columnas; en móvil se reorganiza como
 * lista de tarjetas (nombre, estado y stock), sin desplazamiento horizontal.
 */
export function ProductsDashboard({ locale, t }: { locale: Locale; t: Dictionary["showcase"] }) {
  const statusLabel: Record<Status, string> = {
    good: t.status.active,
    warning: t.status.lowStock,
    critical: t.status.critical,
    neutral: t.status.neutral,
  };

  return (
    <div className="grid gap-3 sm:gap-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <StatTile key={kpi.id} label={kpi.label[locale]} value={formatValue(kpi.value, locale, kpi.format)} />
        ))}
      </div>

      <DashboardCard title={t.widgets.inventory}>
        {/* Escritorio y tablet: tabla. */}
        <table className="hidden w-full text-left text-xs md:table">
          <thead>
            <tr className="border-b border-line text-muted">
              <th scope="col" className="pb-2.5 font-medium">{t.widgets.product}</th>
              <th scope="col" className="pb-2.5 font-medium">{t.widgets.category}</th>
              <th scope="col" className="w-[26%] pb-2.5 font-medium">{t.widgets.stock}</th>
              <th scope="col" className="pb-2.5 text-right font-medium">{t.widgets.price}</th>
              <th scope="col" className="pb-2.5 pl-6 font-medium">{t.widgets.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {data.products.map((product) => (
              <tr key={product.sku}>
                <td className="py-3 pr-3">
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-lg bg-sky text-[0.625rem] font-semibold text-brand-strong"
                    >
                      {product.sku.slice(0, 3)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{product.name[locale]}</span>
                      <span className="block text-muted tabular-nums">{product.sku}</span>
                    </span>
                  </span>
                </td>
                <td className="py-3 pr-3 text-body">{product.category[locale]}</td>
                <td className="py-3 pr-3">
                  <span className="flex items-center gap-3">
                    <Meter value={product.stock / product.capacity} className="flex-1" />
                    <span className="w-14 text-right text-ink tabular-nums">
                      {formatValue(product.stock, locale)} <span className="text-muted">{t.widgets.units}</span>
                    </span>
                  </span>
                </td>
                <td className="py-3 text-right font-semibold text-ink tabular-nums">
                  {formatValue(product.price, locale, "currency")}
                </td>
                <td className="py-3 pl-6">
                  <StatusLabel status={product.status} label={statusLabel[product.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Móvil: lista de tarjetas. */}
        <ul className="flex flex-col divide-y divide-line/70 md:hidden">
          {data.products.map((product) => (
            <li key={product.sku} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{product.name[locale]}</span>
                  <span className="block text-xs text-muted">
                    {product.sku} · {formatValue(product.price, locale, "currency")}
                  </span>
                </span>
                <StatusLabel status={product.status} label={statusLabel[product.status]} />
              </div>
              <div className="flex items-center gap-3">
                <Meter value={product.stock / product.capacity} className="flex-1" />
                <span className="text-xs text-ink tabular-nums">
                  {formatValue(product.stock, locale)} {t.widgets.units}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </DashboardCard>
    </div>
  );
}
