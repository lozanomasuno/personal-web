import { Link2, Mail } from "lucide-react";

import { BrandIcon } from "@/components/icons/BrandIcon";
import type { ChannelType } from "@/lib/contact";

/**
 * Icono de un canal de contacto (decorativo). LinkedIn no está disponible en
 * simple-icons por petición de la marca, así que usa un icono genérico de enlace.
 */
export function ChannelIcon({ type, className }: { type: ChannelType; className?: string }) {
  switch (type) {
    case "email":
      return <Mail className={className} strokeWidth={1.8} aria-hidden="true" />;
    case "whatsapp":
      return <BrandIcon name="whatsapp" className={className} />;
    case "github":
      return <BrandIcon name="github" className={className} />;
    case "linkedin":
      return <Link2 className={className} strokeWidth={1.8} aria-hidden="true" />;
  }
}
