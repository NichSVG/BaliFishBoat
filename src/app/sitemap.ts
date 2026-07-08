import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getTripPackages } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const trips = await getTripPackages();
  const tripPages = trips.map((t) => ({
    url: `${SITE_URL}/trips/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/trips`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...tripPages,
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
