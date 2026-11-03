import { about } from "@/data/about";
import { site } from "@/data/site";
import { getContactChannels } from "@/lib/contact";
import { localeMeta } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * Datos estructurados JSON-LD (schema.org) para buscadores: `Person` y `WebSite`.
 *
 * Solo incluye datos verificables del sitio: nombre, cargo, áreas de conocimiento,
 * perfiles configurados (`sameAs`) y la foto únicamente si ya no es la temporal.
 * Se escapa `<` para evitar inyección de HTML (recomendación de Next.js).
 */
export async function StructuredData() {
  const locale = await getLocale();
  const { meta } = await getDictionary();
  const sameAs = getContactChannels()
    .filter((channel) => channel.type === "github" || channel.type === "linkedin")
    .map((channel) => channel.href);

  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: meta.jobTitle,
    url: `${site.url}/${locale}`,
    knowsAbout: about.competencies.map((item) => item.title[locale]),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(site.profileImage.isPlaceholder ? {} : { image: `${site.url}${site.profileImage.src}` }),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/${locale}`,
    name: site.name,
    description: meta.description,
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": `${site.url}/#person` },
  };

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [person, website] });

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }} />
  );
}
