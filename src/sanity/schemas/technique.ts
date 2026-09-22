import { defineType, defineField } from "sanity";

export const technique = defineType({
  name: "technique",
  title: "Fishing Technique",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "string", validation: (r) => r.max(160) }),
    defineField({ name: "summary", title: "Short Summary", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Full Guide (Markdown)", type: "text", rows: 30 }),
    defineField({ name: "bestFor", title: "Best For", type: "string", description: "e.g. 'Tuna, GT, Mahi Mahi'" }),
    defineField({ name: "skillLevel", title: "Skill Level", type: "string", options: { list: ["Beginner", "Intermediate", "Advanced"] } }),
    defineField({ name: "equipmentNeeded", title: "Equipment Needed", type: "text", rows: 4 }),
    defineField({ name: "bestSeason", title: "Best Season", type: "string" }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() })],
    }),
    defineField({ name: "relatedSpecies", title: "Target Species", type: "array", of: [{ type: "reference", to: [{ type: "species" }] }] }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ name: "order_asc", title: "Sort Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "skillLevel", media: "image" } },
});
