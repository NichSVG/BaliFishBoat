import { defineType, defineField } from "sanity";

export const species = defineType({
  name: "species",
  title: "Fish Species",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "string", validation: (r) => r.max(160) }),
    defineField({ name: "scientificName", title: "Scientific Name", type: "string" }),
    defineField({ name: "summary", title: "Short Summary", type: "text", rows: 3, description: "1-2 sentence overview for cards and AI search." }),
    defineField({ name: "body", title: "Full Guide (Markdown)", type: "text", rows: 30 }),
    defineField({ name: "bestSeason", title: "Best Season", type: "string", description: "e.g. 'April – October'" }),
    defineField({ name: "whereFound", title: "Where Found", type: "string", description: "e.g. 'Offshore, 5-20km from Serangan'" }),
    defineField({ name: "bestBait", title: "Best Bait / Lure", type: "string" }),
    defineField({ name: "techniques", title: "Fishing Techniques", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "averageSize", title: "Average Size", type: "string", description: "e.g. '5-15 kg'" }),
    defineField({ name: "recordSize", title: "Record / Trophy Size", type: "string" }),
    defineField({ name: "difficulty", title: "Difficulty", type: "string", options: { list: ["Beginner", "Intermediate", "Advanced"] } }),
    defineField({ name: "eatingQuality", title: "Eating Quality", type: "string", options: { list: ["Excellent", "Good", "Fair", "Catch and release"] } }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() })],
    }),
    defineField({ name: "relatedSpecies", title: "Related Species", type: "array", of: [{ type: "reference", to: [{ type: "species" }] }] }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ name: "order_asc", title: "Sort Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "bestSeason", media: "image" } },
});
