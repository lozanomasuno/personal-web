import { site } from "@/data/site";

/**
 * Canales de contacto disponibles a partir de `data/site.ts`.
 *
 * Solo devuelve los canales con valor configurado, de modo que Contacto y Footer
 * no muestran enlaces vacíos mientras los datos sigan como marcadores.
 * Lo usan `components/sections/Contact.tsx` y `components/layout/Footer.tsx`.
 */
export type ChannelType = "email" | "whatsapp" | "linkedin" | "github";

export type ContactChannel = {
  type: ChannelType;
  href: string;
  /** Texto visible (correo, número o URL abreviada). */
  display: string;
  external: boolean;
};

export function getContactChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [];
  const { email, whatsapp } = site.contact;
  const { linkedin, github } = site.social;

  if (email) channels.push({ type: "email", href: `mailto:${email}`, display: email, external: false });
  if (whatsapp) {
    // wa.me requiere solo dígitos, con indicativo de país y sin "+".
    const digits = whatsapp.replace(/\D/g, "");
    channels.push({ type: "whatsapp", href: `https://wa.me/${digits}`, display: `+${digits}`, external: true });
  }
  if (linkedin) channels.push({ type: "linkedin", href: linkedin, display: shortUrl(linkedin), external: true });
  if (github) channels.push({ type: "github", href: github, display: shortUrl(github), external: true });

  return channels;
}

function shortUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
