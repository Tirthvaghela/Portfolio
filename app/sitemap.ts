import type { MetadataRoute } from "next";
import { SLUGS } from "@/content/projects";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...SLUGS.map((slug) => ({ url: `${SITE.url}/projects/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
