import type { MetadataRoute } from "next";

import { site } from "@/data/site";

/** `/robots.txt`: permite el rastreo completo y apunta al sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
