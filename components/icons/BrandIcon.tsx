import { brandIcons, type BrandIconName } from "./brand-icons";

/**
 * Logo de marca monocromo (usa `currentColor`).
 *
 * Por defecto es decorativo (`aria-hidden`); si el logo es el único contenido de un
 * enlace, pasar `title` para darle nombre accesible.
 *
 * @example <BrandIcon name="github" className="size-4" />
 */
type BrandIconProps = {
  name: BrandIconName;
  className?: string;
  title?: string;
};

export function BrandIcon({ name, className, title }: BrandIconProps) {
  const icon = brandIcons[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={icon.path} />
    </svg>
  );
}
