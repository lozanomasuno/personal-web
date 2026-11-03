/**
 * Datos personales y de contacto del sitio.
 *
 * Archivo pensado para editarse a mano. Los valores marcados con `PENDIENTE`
 * son marcadores: no se inventan datos de contacto. Mientras un enlace esté vacío,
 * la interfaz no lo muestra.
 */
export const site = {
  name: "Nelson Lozano",
  initials: "NL",
  /** URL pública definitiva; se usa en metadata, Open Graph y sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Imagen de perfil. Para reemplazarla, guardar la foto definitiva en
   * `public/images/` (idealmente 4:5, mínimo 800×1000 px) y actualizar `src`.
   * Al usar una foto real, cambiar también `isPlaceholder` a `false`.
   */
  profileImage: {
    src: "/images/profile-placeholder.png",
    width: 800,
    height: 1000,
    /**
     * `true` mientras se use la imagen temporal. Al poner una foto real, cambiar a `false`:
     * el texto alternativo pasa a ser el nombre y la foto se incluye en los datos estructurados.
     */
    isPlaceholder: true as boolean,
  },
  // `as string`: evita que TypeScript trate los marcadores vacíos como el literal "".
  contact: {
    email: "" as string, // PENDIENTE: correo de contacto
    whatsapp: "" as string, // PENDIENTE: número en formato internacional, p. ej. 573001234567
  },
  social: {
    github: "" as string, // PENDIENTE: https://github.com/usuario
    linkedin: "" as string, // PENDIENTE: https://www.linkedin.com/in/usuario
  },
} as const;

/** Identificadores de las secciones de la landing, en orden de aparición. */
export const sectionIds = [
  "home",
  "about",
  "services",
  "projects",
  "technologies",
  "pricing",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
