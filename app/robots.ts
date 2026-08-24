import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
