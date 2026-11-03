import { cn } from "@/lib/cn";

/**
 * Gráficos ligeros de los dashboards, en HTML/SVG sin librerías (componentes de servidor).
 *
 * Convenciones (comunes a todos):
 *  - Una sola serie por gráfico, en el azul de marca (`bg-brand`); sin ejes dobles.
 *  - Marcas finas: columnas ≤ 24 px con extremo redondeado de 4 px y base recta;
 *    rejilla de 1 px, sólida y discreta.
 *  - Etiquetas selectivas: se rotula el valor destacado; el resto aparece al pasar el cursor.
 *  - Cada gráfico expone un `aria-label` con todos los valores, por lo que el tooltip
 *    nunca es la única forma de leer un dato.
 *
 * El gráfico de área con cursor interactivo vive en `AreaChart.tsx` (componente cliente).
 */

export type ChartDatum = { label: string; value: number; valueLabel: string };

type ColumnChartProps = {
  data: ChartDatum[];
  ariaLabel: string;
  /** Índice de la columna rotulada de forma permanente (por defecto, la mayor). */
  labelIndex?: number;
  className?: string;
};

/** Columnas verticales con línea base, tooltip al pasar el cursor y una etiqueta destacada. */
export function ColumnChart({ data, ariaLabel, labelIndex, className }: ColumnChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const highlighted = labelIndex ?? data.findIndex((d) => d.value === max);

  return (
    <div role="img" aria-label={ariaLabel} className={cn("flex flex-col", className)}>
      <div aria-hidden="true" className="relative flex h-32 items-end justify-between gap-1.5 border-b border-line sm:h-36">
        {/* Rejilla: 50 % y 100 % del máximo. */}
        <span className="absolute inset-x-0 top-0 border-t border-line/70" />
        <span className="absolute inset-x-0 top-1/2 border-t border-line/70" />
        {data.map((d, index) => (
          <div key={d.label} className="group relative flex h-full flex-1 items-end justify-center">
            <span
              className={cn(
                "pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 -translate-y-2 rounded-md bg-ink px-1.5 py-0.5",
                "text-[0.6875rem] font-semibold whitespace-nowrap text-white opacity-0 transition-opacity duration-200",
                "group-hover:opacity-100",
              )}
              style={{ bottom: `${(d.value / max) * 100}%` }}
            >
              {d.valueLabel}
            </span>
            {index === highlighted ? (
              <span
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1.5 text-[0.6875rem] font-semibold whitespace-nowrap text-ink tabular-nums transition-opacity group-hover:opacity-0"
                style={{ bottom: `${(d.value / max) * 100}%` }}
              >
                {d.valueLabel}
              </span>
            ) : null}
            <span
              className="w-full max-w-6 rounded-t-[4px] bg-brand transition-[filter] duration-200 group-hover:brightness-110"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="mt-2 flex justify-between gap-1.5">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-[0.6875rem] text-muted">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

type SparklineProps = { values: number[]; className?: string };

/**
 * Tendencia mínima de 12 puntos: línea en tono de baja prioridad y el periodo actual
 * en el color de acento. Decorativa: el valor y su variación se muestran como texto.
 */
export function Sparkline({ values, className }: SparklineProps) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const x = (index: number) => (index / (values.length - 1)) * 100;
  const y = (value: number) => 4 + (1 - (value - min) / range) * 32;
  const points = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const last = values.length - 1;

  return (
    <div aria-hidden="true" className={cn("relative h-10", className)}>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white"
        style={{ left: `${x(last)}%`, top: `${(y(values[last]) / 40) * 100}%` }}
      />
    </div>
  );
}

type RankedBarsProps = {
  data: ChartDatum[];
  ariaLabel: string;
  /** Valor que corresponde al 100 % del ancho (por defecto, el mayor). */
  max?: number;
  className?: string;
};

/** Barras horizontales ordenadas: nombre y valor en texto, barra fina de un solo color. */
export function RankedBars({ data, ariaLabel, max, className }: RankedBarsProps) {
  const top = max ?? Math.max(...data.map((d) => d.value));
  return (
    <ul aria-label={ariaLabel} className={cn("flex flex-col gap-3.5", className)}>
      {data.map((d) => (
        <li key={d.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate text-body">{d.label}</span>
            <span className="font-semibold text-ink tabular-nums">{d.valueLabel}</span>
          </div>
          <span aria-hidden="true" className="block h-2 overflow-hidden rounded-full bg-sky">
            <span
              className="block h-full rounded-full bg-brand"
              style={{ width: `${Math.max((d.value / top) * 100, 2)}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Medidor de una sola proporción (0–1). La pista usa un tono claro de la misma rampa. */
export function Meter({ value, className }: { value: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("block h-2 overflow-hidden rounded-full bg-sky", className)}>
      <span
        className="block h-full rounded-full bg-brand"
        style={{ width: `${Math.min(Math.max(value, 0), 1) * 100}%` }}
      />
    </span>
  );
}
