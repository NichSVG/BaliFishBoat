import { defineType, defineField } from "sanity";

export const location = defineType({
  name: "fishingLocation",
  title: "Fishing Location",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "string", validation: (r) => r.max(160) }),
    defineField({ name: "summary", title: "Short Summary", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Full Guide (Markdown)", type: "text", rows: 30 }),
    defineField({ name: "region", title: "Region", type: "string", description: "e.g. 'South Bali', 'Nusa Islands'" }),
    defineField({ name: "distanceFromHarbor", title: "Distance from Serangan", type: "string", description: "e.g. '20 minutes by car'" }),
    defineField({ name: "bestSpecies", title: "Best Species Here", type: "array", of: [{ type: "reference", to: [{ type: "species" }] }] }),
    defineField({ name: "bestSeason", title: "Best Season", type: "string" }),
    defineField({ name: "waterDepth", title: "Water Depth", type: "string", description: "e.g. '30-80m'" }),
    defineField({ name: "boatAccess", title: "Boat Access", type: "string", options: { list: ["Easy", "Moderate", "Difficult"] } }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() })],
    }),
    defineField({ name: "mapUrl", title: "Google Maps URL", type: "url" }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ name: "order_asc", title: "Sort Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "region", media: "image" } },
});
