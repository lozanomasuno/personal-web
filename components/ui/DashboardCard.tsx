import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Widget de dashboard: superficie blanca con título, subtítulo opcional (unidad o
 * periodo) y una acción opcional a la derecha.
 *
 * Lo usan los cuatro dashboards de `components/dashboards/`. Es más compacto que `Card`
 * (radio y sombra menores) porque vive dentro del marco de un dashboard.
 *
 * @example <DashboardCard title="Ingresos semanales" subtitle="USD">…</DashboardCard>
 */
type DashboardCardProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DashboardCard({ title, subtitle, action, children, className }: DashboardCardProps) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-2xl bg-white p-4 ring-1 ring-line/80 sm:p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-ink">{title}</h4>
          {subtitle ? <p className="mt-0.5 text-xs text-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
