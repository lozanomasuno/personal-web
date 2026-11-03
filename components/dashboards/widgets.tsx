import { ArrowDownRight, ArrowUpRight, CircleCheck, CircleMinus, CircleX, TriangleAlert } from "lucide-react";

import type { Status } from "@/data/dashboards";
import { cn } from "@/lib/cn";

/**
 * Piezas pequeñas compartidas por los dashboards (componentes de servidor).
 *
 * - `StatTile`: etiqueta + valor + variación opcional (contrato "stat tile").
 * - `DeltaBadge`: variación con signo; el color depende de la dirección y de si
 *   subir es bueno (`upIsGood`).
 * - `StatusLabel`: estado con icono + texto; el color nunca comunica solo.
 *
 * Los valores llegan ya formateados desde el dashboard (ver `lib/format.ts`).
 */

export function DeltaBadge({
  delta,
  label,
  upIsGood = true,
}: {
  delta: number;
  label: string;
  upIsGood?: boolean;
}) {
  const positive = delta >= 0 === upIsGood;
  const Icon = delta >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[0.6875rem] font-semibold",
        positive ? "bg-[#ecfdf5] text-up" : "bg-[#fef3f2] text-down",
      )}
    >
      <Icon className="size-3" strokeWidth={2.2} aria-hidden="true" />
      {label}
    </span>
  );
}

type StatTileProps = {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  upIsGood?: boolean;
  /** Texto accesible del periodo de comparación (p. ej. "vs. periodo anterior"). */
  comparison?: string;
  className?: string;
};

export function StatTile({ label, value, delta, deltaLabel, upIsGood, comparison, className }: StatTileProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-line/80", className)}>
      <p className="text-xs leading-snug font-medium text-muted">{label}</p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <p className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{value}</p>
        {delta !== undefined && deltaLabel ? (
          <span title={comparison}>
            <DeltaBadge delta={delta} label={deltaLabel} upIsGood={upIsGood} />
            {comparison ? <span className="sr-only"> {comparison}</span> : null}
          </span>
        ) : null}
      </div>
    </div>
  );
}

const statusIcon = {
  good: { Icon: CircleCheck, className: "text-good" },
  warning: { Icon: TriangleAlert, className: "text-warning" },
  critical: { Icon: CircleX, className: "text-critical" },
  neutral: { Icon: CircleMinus, className: "text-muted" },
} satisfies Record<Status, { Icon: typeof CircleCheck; className: string }>;

export function StatusLabel({ status, label }: { status: Status; label: string }) {
  const { Icon, className } = statusIcon[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap text-ink">
      <Icon className={cn("size-3.5", className)} strokeWidth={2.2} aria-hidden="true" />
      {label}
    </span>
  );
}
