import { BarChart3, Bot, Package, ShoppingCart } from "lucide-react";

import { AnalyticsDashboard } from "@/components/dashboards/AnalyticsDashboard";
import { AutomationDashboard } from "@/components/dashboards/AutomationDashboard";
import { DashboardTabs } from "@/components/dashboards/DashboardTabs";
import { EcommerceDashboard } from "@/components/dashboards/EcommerceDashboard";
import { ProductsDashboard } from "@/components/dashboards/ProductsDashboard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Sección "Dashboard Showcase" (servidor).
 *
 * Presenta cuatro dashboards de ejemplo construidos con componentes React, CSS y SVG.
 * Todos los datos son ilustrativos (`data/dashboards.ts`) y la interfaz lo indica en el
 * marco de cada dashboard y en el texto de la sección.
 *
 * Para añadir un dashboard: crear el componente en `components/dashboards/`, añadir su
 * pestaña en `tabs` y su panel en `panels` en la misma posición.
 */
export async function DashboardShowcase() {
  const locale = await getLocale();
  const { showcase: t } = await getDictionary();

  const tabs = [
    { id: "ecommerce", label: t.tabs.ecommerce, icon: <ShoppingCart strokeWidth={1.8} /> },
    { id: "analytics", label: t.tabs.analytics, icon: <BarChart3 strokeWidth={1.8} /> },
    { id: "products", label: t.tabs.products, icon: <Package strokeWidth={1.8} /> },
    { id: "automation", label: t.tabs.automation, icon: <Bot strokeWidth={1.8} /> },
  ];

  const panels = [
    <EcommerceDashboard key="ecommerce" locale={locale} t={t} />,
    <AnalyticsDashboard key="analytics" locale={locale} t={t} />,
    <ProductsDashboard key="products" locale={locale} t={t} />,
    <AutomationDashboard key="automation" locale={locale} t={t} />,
  ];

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f9ff_50%,#ffffff_100%)] py-24 sm:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            titleId="showcase-title"
            eyebrow={t.eyebrow}
            title={t.title}
            description={
              <>
                {t.description} <span className="font-medium text-ink">{t.illustrativeNote}</span>
              </>
            }
            align="center"
          />
        </Reveal>

        <Reveal className="mt-12 sm:mt-16" delay={0.1}>
          <DashboardTabs
            tabs={tabs}
            panels={panels}
            label={t.tabsLabel}
            illustrative={t.illustrative}
            illustrativeNote={t.illustrativeNote}
          />
        </Reveal>
      </div>
    </section>
  );
}
