# Nelson Lozano — Portafolio profesional

Sitio personal y portafolio de Nelson Lozano, Ingeniero de Software y Front End Developer.
Landing page bilingüe (español/inglés) con presentación, dashboards de ejemplo, servicios,
proyectos, tecnologías, precios de referencia y contacto.

## Stack

| Herramienta | Versión | Uso |
| --- | --- | --- |
| Next.js (App Router, Cache Components) | 16.4 | Framework, rutas por idioma, metadata, imágenes OG |
| React | 19.3 | Componentes |
| TypeScript | 5 | Tipado estricto |
| Tailwind CSS | 4 | Estilos y sistema visual (`app/globals.css`) |
| Motion | 14 | Animaciones de aparición, indicadores y menú |
| Lucide React | 1.67 | Iconografía |

Los logos de tecnologías provienen de [Simple Icons](https://simpleicons.org) (CC0) y se
incluyen como trazados SVG en `components/icons/brand-icons.ts`, sin dependencia adicional.
La imagen Open Graph usa Inter (SIL OFL 1.1, `assets/fonts/`).

## Requisitos y scripts

Node.js 20.9 o superior (probado con Node 24).

```bash
npm install        # dependencias
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
npx tsc --noEmit   # comprobación de tipos
```

Variables de entorno: copiar `.env.example` a `.env.local` y definir `NEXT_PUBLIC_SITE_URL`
con el dominio público (sin barra final). Sin ella, las URL absolutas usan `http://localhost:3000`.

## Estructura

```
app/
  [lang]/               Rutas por idioma (/es, /en): layout raíz, página, 404, icono, imagen OG
  globals.css           Tokens de color, utilidades y reglas de movimiento reducido
  sitemap.ts, robots.ts
components/
  layout/               Navbar, Footer, MotionProvider, StructuredData (JSON-LD)
  sections/             Hero, DashboardShowcase, About, Services, Projects, Technologies, Pricing, Contact
  ui/                   Button, Card, SectionHeading, DashboardCard, PricingCard, Reveal
  dashboards/           Los 4 dashboards de ejemplo y sus gráficos (HTML/SVG, sin librerías)
  projects/, contact/, icons/
data/                   Contenido editable (ver tabla siguiente)
lib/
  i18n/                 Idiomas, diccionarios es/en y carga del diccionario activo
  format.ts             Formato de números, monedas y porcentajes por idioma
  contact.ts            Canales de contacto configurados
proxy.ts                Redirige "/" a /es o /en según el idioma del navegador
public/images/          Imagen de perfil
```

## Editar el contenido

Casi todo el contenido vive en `data/` y en los diccionarios; no hace falta tocar componentes.

| Qué | Dónde |
| --- | --- |
| Nombre, URL, imagen de perfil, email, WhatsApp, GitHub, LinkedIn | `data/site.ts` |
| Áreas de especialidad, intereses y cifras de "Sobre mí" | `data/about.ts` |
| Servicios | `data/services.ts` |
| Proyectos | `data/projects.ts` |
| Tecnologías por categoría | `data/technologies.ts` |
| Modalidades y precios (COP) | `data/pricing.ts` |
| Datos de los dashboards de ejemplo (ficticios) | `data/dashboards.ts` |
| Textos de interfaz por idioma | `lib/i18n/dictionaries/es.ts` y `en.ts` |

### Pendientes antes de publicar

- **Datos de contacto** (`data/site.ts`): `email`, `whatsapp`, `github`, `linkedin`.
  Mientras estén vacíos no se muestran, y el formulario avisa que el correo no está configurado.
- **Foto de perfil**: guardar la foto en `public/images/` (4:5, mínimo 800×1000 px),
  actualizar `profileImage.src` y poner `isPlaceholder: false`.
- **Proyectos** (`data/projects.ts`): los 3 actuales son marcadores ("Próximamente").
  Para publicar uno real, quitar `placeholder`, escribir sus textos y añadir `image` y `links`.
- **Cifras de "Sobre mí"** (`data/about.ts`): `stats` está vacío a propósito; añadir solo datos reales.
- **Dominio**: definir `NEXT_PUBLIC_SITE_URL`.
- **Precios**: son estimaciones iniciales; revisar `data/pricing.ts`.

## Idiomas

Las rutas `/es` y `/en` se generan estáticamente. `proxy.ts` redirige `/` según `Accept-Language`
(español por defecto). Para añadir un idioma: registrarlo en `lib/i18n/config.ts`, crear su
diccionario (TypeScript exige las mismas claves que `es.ts`), añadirlo en
`lib/i18n/dictionaries.ts` y completar los campos `Localized` de `data/`.

## SEO

- Metadata por idioma: título, descripción, canonical, `hreflang` (incluido `x-default`),
  Open Graph y Twitter.
- Imagen Open Graph por idioma generada en el build (`app/[lang]/opengraph-image.tsx`).
- `sitemap.xml` con alternativas por idioma y `robots.txt`.
- Datos estructurados JSON-LD (`Person` y `WebSite`).

## Accesibilidad y movimiento

- HTML semántico, enlace "Saltar al contenido", navegación por teclado (menú, pestañas de
  dashboards con flechas, gráfico de ingresos) y foco visible.
- Contraste AA: el azul `#3A83F7` se reserva para acentos y gráficos; botones y texto azul
  usan `#2668D8`.
- `prefers-reduced-motion`: se desactivan animaciones CSS y desplazamientos de Motion
  (se conserva la opacidad) y el scroll suave.
- Sin JavaScript, el contenido animado se muestra igualmente (regla `<noscript>` del layout).
- Las cifras de los dashboards se rotulan como "Datos ilustrativos".

## Despliegue

El sitio necesita un entorno Node.js (por ejemplo Vercel u otro hosting compatible con Next.js)
porque `proxy.ts` redirige `/` según el idioma. Definir `NEXT_PUBLIC_SITE_URL` antes del build.
