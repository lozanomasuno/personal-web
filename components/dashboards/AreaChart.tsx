"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import type { ChartDatum } from "./charts";

/**
 * Gráfico de área de una serie con cursor interactivo (componente cliente).
 *
 * - Línea de 2 px y área al ~10 % del color de marca, sobre un único eje Y que empieza en 0.
 * - Al pasar el cursor (o con las flechas del teclado tras enfocarlo) muestra una línea
 *   vertical, el punto activo y un tooltip con la etiqueta y el valor.
 * - El último punto lleva rotulado su valor de forma permanente (etiqueta selectiva).
 * - `ariaLabel` resume todos los valores; además, un texto `aria-live` anuncia el punto activo.
 *
 * La línea se dibuja en SVG con `preserveAspectRatio="none"`; los textos y puntos son HTML
 * posicionado en porcentaje para que no se deformen al cambiar el ancho. La altura mínima
 * es fija y el gráfico crece hasta ocupar el alto disponible de su tarjeta.
 */
type AreaChartProps = {
  data: ChartDatum[];
  /** Marcas del eje Y; el último valor define el máximo de la escala. */
  ticks: Array<{ value: number; label: string }>;
  ariaLabel: string;
};

const HEIGHT = 100;

export function AreaChart({ data, ticks, ariaLabel }: AreaChartProps) {
  const [active, setActive] = useState<number | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();
  const max = ticks[ticks.length - 1].value;
  const last = data.length - 1;

  const x = (index: number) => (index / last) * 100;
  const y = (value: number) => HEIGHT - (value / max) * HEIGHT;

  const line = data.map((d, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(d.value)}`).join(" ");
  const area = `${line} L100,${HEIGHT} L0,${HEIGHT} Z`;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    setActive(Math.round(ratio * last));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, (current: number) => number> = {
      ArrowRight: (current) => Math.min(current + 1, last),
      ArrowLeft: (current) => Math.max(current - 1, 0),
      Home: () => 0,
      End: () => last,
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    setActive((current) => move(current ?? last));
  };

  const point = active === null ? null : data[active];

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 gap-3">
        {/* Eje Y: etiquetas alineadas con la rejilla. */}
        <div aria-hidden="true" className="relative w-8 shrink-0 text-right text-[0.6875rem] text-muted tabular-nums">
          {ticks.map((tick) => (
            <span
              key={tick.value}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(y(tick.value) / HEIGHT) * 100}%` }}
            >
              {tick.label}
            </span>
          ))}
        </div>

        <div
          ref={plotRef}
          role="img"
          aria-label={ariaLabel}
          tabIndex={0}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(null)}
          onFocus={() => setActive(last)}
          onBlur={() => setActive(null)}
          onKeyDown={onKeyDown}
          className="relative min-h-40 flex-1 cursor-crosshair touch-pan-y rounded-sm sm:min-h-48"
        >
          {/* Rejilla horizontal (hairline, sólida). */}
          {ticks.map((tick) => (
            <span
              key={tick.value}
              aria-hidden="true"
              className="absolute inset-x-0 border-t border-line/70"
              style={{ top: `${(y(tick.value) / HEIGHT) * 100}%` }}
            />
          ))}

          <svg
            aria-hidden="true"
            viewBox={`0 0 100 ${HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3a83f7" stopOpacity="0.16" />
                <stop offset="1" stopColor="#3a83f7" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={area} fill={`url(#${gradientId})`} />
            <path
              d={line}
              fill="none"
              stroke="#3a83f7"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Último punto con su valor rotulado. */}
          <span
            aria-hidden="true"
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white"
            style={{ left: "100%", top: `${(y(data[last].value) / HEIGHT) * 100}%` }}
          />
          <span
            aria-hidden="true"
            className={
              "absolute right-0 -translate-y-[170%] rounded-md bg-white/90 px-1 text-[0.6875rem] font-semibold " +
              `text-ink transition-opacity ${point ? "opacity-0" : "opacity-100"}`
            }
            style={{ top: `${(y(data[last].value) / HEIGHT) * 100}%` }}
          >
            {data[last].valueLabel}
          </span>

          {/* Capa de interacción: cursor vertical, punto activo y tooltip. */}
          {point && active !== null ? (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute inset-y-0 w-px bg-ink/15" style={{ left: `${x(active)}%` }} />
              <span
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white shadow-soft"
                style={{ left: `${x(active)}%`, top: `${(y(point.value) / HEIGHT) * 100}%` }}
              />
              <span
                className="absolute top-0 z-10 flex flex-col rounded-lg bg-ink px-2.5 py-1.5 text-white shadow-lift"
                style={{
                  left: `${x(active)}%`,
                  transform: `translateX(${active > last / 2 ? "calc(-100% - 10px)" : "10px"})`,
                }}
              >
                <span className="text-[0.6875rem] text-white/70">{point.label}</span>
                <span className="text-sm font-semibold tabular-nums">{point.valueLabel}</span>
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Eje X: en móvil se muestra una etiqueta de cada dos, contando desde la última. */}
      <div aria-hidden="true" className="relative mt-2 ml-11 h-4">
        {data.map((d, index) => (
          <span
            key={d.label}
            className={
              "absolute -translate-x-1/2 text-[0.6875rem] text-muted " +
              ((last - index) % 2 === 1 ? "hidden sm:inline" : "")
            }
            style={{ left: `${x(index)}%` }}
          >
            {d.label}
          </span>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {point ? `${point.label}: ${point.valueLabel}` : ""}
      </p>
    </div>
  );
}
